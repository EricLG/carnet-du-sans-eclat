import { APP_ID } from '../../src/config/identity.ts';
import assert from 'node:assert/strict';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { browser } from './cdp.mjs';
const b = await browser();
async function readSave() {
  return b.evaluate(`new Promise((resolve,reject)=>{const request=indexedDB.open(${JSON.stringify(APP_ID)},1);request.onsuccess=()=>{const db=request.result;const read=db.transaction('saves').objectStore('saves').get('progress');read.onsuccess=()=>{resolve(read.result);db.close()};read.onerror=reject};request.onerror=reject})`);
}
async function pick(path) {
  await b.click('Choisir un fichier JSON');
  const { root } = await b.send('DOM.getDocument');
  const { nodeId } = await b.send('DOM.querySelector', { nodeId: root.nodeId, selector: 'input[type="file"]' });
  assert.ok(nodeId);
  await b.send('DOM.setFileInputFiles', { nodeId, files: [resolve(path)] });
}
try {
  await b.send('Page.navigate', { url: 'http://127.0.0.1:8081' }); await b.wait('Ouvrir mon carnet'); await b.click('Ouvrir mon carnet'); await b.wait('Mes quêtes');
  await b.click('Parties'); await b.wait('Sauvegardes et transfert'); await b.click('Sauvegardes et transfert'); await b.wait('Exporter mes parties');
  const before = await readSave();
  const selected = before.characters.find(character => character.id === before.selected.characterId);
  const backup = { format: APP_ID, schemaVersion: 1, exportedAt: new Date().toISOString(),
    data: { ...before, characters: [selected] } };
  await writeFile('.browser-check/import-source.json', JSON.stringify(backup));
  await writeFile('.browser-check/invalid.json', '{');
  await b.send('Page.setInterceptFileChooserDialog', { enabled: true });
  await pick('.browser-check/invalid.json'); await b.wait('Le fichier ne contient pas un JSON valide.');
  assert.deepEqual(await readSave(), before);
  await pick('.browser-check/import-source.json'); await b.wait('Importer 1 personnage en copie');
  assert.deepEqual(await readSave(), before, 'preview must not mutate the save');
  await b.click('Importer 1 personnage en copie'); await b.wait('Personnages importés.');
  const after = await readSave();
  assert.equal(after.characters.length, before.characters.length + 1);
  assert.deepEqual(after.characters.slice(0, -1), before.characters);
  const copy = after.characters.at(-1);
  assert.notEqual(copy.id, selected.id);
  assert.deepEqual(copy.collection, selected.collection);
  assert.deepEqual(copy.runs.map(({ id, ...run }) => run), selected.runs.map(({ id, ...run }) => run));
  const folder = resolve(`.browser-check/downloads/${Date.now()}`); await mkdir(folder, { recursive: true });
  await b.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: folder });
  await b.click('Exporter mes parties'); await b.wait('Export transmis au navigateur');
  let file;
  for (let attempt = 0; attempt < 30; attempt++) {
    file = (await readdir(folder)).find(file => file.endsWith('.json'));
    if (file) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(file, 'export download');
  const exported = JSON.parse(await readFile(resolve(folder,file), 'utf8'));
  assert.equal(exported.format, APP_ID);
  assert.deepEqual(exported.data, after);
  assert.equal(b.errors.length,0,JSON.stringify(b.errors));
  console.log('Browser backup: invalid JSON, preview without writes, copy import and downloaded export passed');
} finally { b.close(); }
