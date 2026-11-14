import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveSchema } from '../domain/save';
import type { ProgressStorage } from './types';
import { APP_ID } from '../config/identity';

const key = `${APP_ID}/progress/v1`;
export const progressStorage: ProgressStorage = {
  async read() {
    const text = await AsyncStorage.getItem(key);
    if (text === null) return null;
    try { return saveSchema.parse(JSON.parse(text)); }
    catch { throw new Error('La sauvegarde locale est incompatible ou endommagée. Elle a été conservée sans modification.'); }
  },
  async write(save, expectedRevision) {
    const previous = await this.read();
    if ((previous?.revision ?? 0) !== expectedRevision) throw new Error('La sauvegarde a changé. Rechargez les données.');
    await AsyncStorage.setItem(key, JSON.stringify(save));
  },
};
