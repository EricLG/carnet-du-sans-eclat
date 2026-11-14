import assert from 'node:assert/strict';
import { test } from 'node:test';
import { APP_ID } from '../src/config/identity';
import { addCharacter, addCycle, currentPart, emptySave, exportSave, importCopies, parseBackup,
  selectRun, toggleFlag, updateQuest, type SaveData } from '../src/domain/save';
import { ProgressService } from '../src/state/ProgressService';
import type { ProgressStorage } from '../src/storage/types';

test('les personnages et cycles isolent leur progression, la collection persiste en NG+', () => {
  let save = addCharacter(emptySave(), 'A');
  const first = currentPart(save);
  save = toggleFlag(save, 'collection', 'weapon');
  save = toggleFlag(save, 'bosses', 'boss');
  save = toggleFlag(save, 'graces', 'grace');
  save = toggleFlag(save, 'pickups', 'seed');
  save = updateQuest(save, 'quest', quest => ({ ...quest, status: 'completed', steps: { step: true } }));
  save = addCycle(save, first.character!.id);
  assert.equal(currentPart(save).character!.collection.weapon, true);
  assert.deepEqual(currentPart(save).run!.bosses, {});
  assert.deepEqual(currentPart(save).run!.quests, {});
  assert.deepEqual(currentPart(save).run!.graces, {});
  assert.deepEqual(currentPart(save).run!.pickups, {});
  save = addCharacter(save, 'B');
  assert.deepEqual(currentPart(save).character!.collection, {});
  save = selectRun(save, first.character!.id, first.run!.id);
  assert.equal(currentPart(save).run!.bosses.boss, true);
  assert.equal(currentPart(save).run!.quests.quest.status, 'completed');
});

test('décocher un boss ne modifie ni collection ni étapes de quête', () => {
  let save = addCharacter(emptySave(), 'A');
  save = toggleFlag(save, 'bosses', 'boss');
  save = toggleFlag(save, 'bosses', 'boss');
  assert.equal(currentPart(save).run!.bosses.boss, false);
  assert.deepEqual(currentPart(save).character!.collection, {});
  assert.deepEqual(currentPart(save).run!.quests, {});
});

test('export/import préserve chaque coche et importe des copies sans écraser les parties', () => {
  let original = addCharacter(emptySave(), 'A');
  original = toggleFlag(original, 'collection', 'unknown-future-dlc-item');
  original = toggleFlag(original, 'graces', 'grace');
  const backup = parseBackup(exportSave(original));
  const restored = importCopies(original, backup);
  assert.equal(restored.characters.length, 2);
  assert.deepEqual(restored.characters[0], original.characters[0]);
  assert.notEqual(restored.characters[1].id, original.characters[0].id);
  assert.notEqual(restored.characters[1].runs[0].id, original.characters[0].runs[0].id);
  assert.deepEqual(restored.characters[1].collection, original.characters[0].collection);
  assert.deepEqual(restored.characters[1].runs[0].graces, original.characters[0].runs[0].graces);
  assert.deepEqual(restored.selected, original.selected);
});

test('les fichiers invalides, versions futures et sélections cassées sont rejetés', () => {
  assert.throws(() => parseBackup('{'));
  const backup = JSON.parse(exportSave(addCharacter(emptySave(), 'A')));
  backup.schemaVersion = 2;
  assert.throws(() => parseBackup(JSON.stringify(backup)));
  backup.schemaVersion = 1;
  backup.data.selected.runId = 'missing';
  assert.throws(() => parseBackup(JSON.stringify(backup)));
});

test('des cycles dupliqués ou personnages sans nom ne sont pas importés', () => {
  assert.throws(() => addCharacter(emptySave(), '   '));
  const backup = JSON.parse(exportSave(addCharacter(emptySave(), 'A')));
  backup.data.characters[0].runs.push(backup.data.characters[0].runs[0]);
  assert.throws(() => parseBackup(JSON.stringify(backup)));
});

function memoryStorage(): ProgressStorage & { value: SaveData | null } {
  return { value: null, async read() { return this.value; }, async write(value, expectedRevision) {
    assert.equal(this.value?.revision ?? 0, expectedRevision);
    await new Promise(resolve => setTimeout(resolve, 1));
    this.value = value;
  } };
}
test('les modifications rapides sont sérialisées et retrouvées après rechargement', async () => {
  const storage = memoryStorage();
  const service = new ProgressService(storage);
  await service.load();
  await service.mutate(save => addCharacter(save, 'A'));
  await Promise.all(Array.from({ length: 21 }, () => service.mutate(save => toggleFlag(save, 'bosses', 'boss'))));
  assert.equal(currentPart(service.getSnapshot().data).run!.bosses.boss, true);
  assert.equal(service.getSnapshot().data.revision, 22);
  assert.equal(service.getSnapshot().pending, 0);
  const reloaded = new ProgressService(storage);
  await reloaded.load();
  assert.deepEqual(reloaded.getSnapshot().data, service.getSnapshot().data);
});

test('une écriture refusée conserve les données et expose une erreur jusqu’au rechargement', async () => {
  const storage = memoryStorage();
  const service = new ProgressService(storage);
  await service.load();
  await service.mutate(save => addCharacter(save, 'A'));
  storage.write = async () => { throw new Error('Quota dépassé'); };
  const previous = service.getSnapshot().data;
  assert.equal(await service.mutate(save => toggleFlag(save, 'bosses', 'boss')), false);
  assert.equal(service.getSnapshot().data, previous);
  assert.match(service.getSnapshot().error!, /Quota/);
  assert.equal(await service.mutate(save => addCharacter(save, 'B')), false);
});

test('une lecture impossible ne permet pas d’écraser la sauvegarde existante', async () => {
  let writes = 0;
  const service = new ProgressService({ async read() { throw new Error('Fichier incompatible'); }, async write() { writes++; } });
  await service.load();
  assert.equal(await service.mutate(save => addCharacter(save, 'A')), false);
  assert.equal(writes, 0);
});

test('les exports acceptent uniquement le format de cette application', () => {
  const save = addCharacter(emptySave(), 'Nouvelle partie');
  const backup = JSON.parse(exportSave(save));
  assert.equal(backup.format, APP_ID);
  assert.deepEqual(parseBackup(JSON.stringify(backup)).data, save);
  backup.format = 'other-app';
  assert.throws(() => parseBackup(JSON.stringify(backup)));
});
