import { saveSchema, type SaveData } from '../domain/save';
import type { ProgressStorage } from './types';
import { APP_ID } from '../config/identity';

let connection: Promise<IDBDatabase> | undefined;
function database(): Promise<IDBDatabase> {
  if (!connection) connection = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(APP_ID, 1);
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      reject(new Error('La base locale est bloquée. Fermez les autres onglets puis réessayez.'));
    }, 5000);
    request.onupgradeneeded = () => request.result.createObjectStore('saves');
    request.onerror = () => { clearTimeout(timeout); reject(request.error); };
    request.onsuccess = () => {
      clearTimeout(timeout);
      if (timedOut) { request.result.close(); return; }
      request.result.onversionchange = () => { request.result.close(); connection = undefined; };
      resolve(request.result);
    };
  }).catch(error => { connection = undefined; throw error; });
  return connection;
}

export const progressStorage: ProgressStorage = {
  async read() {
    const db = await database();
    return new Promise((resolve, reject) => {
      const request = db.transaction('saves').objectStore('saves').get('progress');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        if (request.result === undefined) resolve(null);
        else { try { resolve(saveSchema.parse(request.result)); } catch {
          reject(new Error('La sauvegarde locale est incompatible ou endommagée. Elle a été conservée sans modification.'));
        } }
      };
    });
  },
  async write(save: SaveData, expectedRevision: number) {
    const db = await database();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('saves', 'readwrite');
      const store = transaction.objectStore('saves');
      let conflict = false;
      const request = store.get('progress');
      request.onsuccess = () => {
        if ((request.result?.revision ?? 0) !== expectedRevision) { conflict = true; transaction.abort(); }
        else store.put(save, 'progress');
      };
      transaction.oncomplete = () => resolve();
      transaction.onabort = () => reject(new Error(conflict ?
        'Un autre onglet a modifié la sauvegarde. Rechargez les données avant de réessayer.' :
        'Échec de la sauvegarde locale. Vérifiez l’espace disponible et les autorisations du navigateur.'));
      transaction.onerror = () => { /* onabort communique l’échec au service. */ };
    });
  },
};
