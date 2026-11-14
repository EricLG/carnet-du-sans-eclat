import assert from 'node:assert/strict';
import { test } from 'node:test';
import { npcs, quests, regions } from '../src/catalog/quests';
import { questScope } from '../src/catalog/questScope';
import { validateQuestCoverage } from '../src/catalog/coverage';
import { validateQuests } from '../src/domain/catalog';
import { addCharacter, currentPart, emptySave, exportSave, parseBackup, updateQuest } from '../src/domain/save';

test('le catalogue livré est valide : identifiants uniques, références et branches existantes', () => {
  assert.deepEqual(validateQuests(quests, regions.map(region => region.id), npcs.map(npc => npc.id)), []);
  assert.deepEqual(validateQuestCoverage(quests, questScope), []);
});
test('le contrôle détecte les doublons, références cassées et branches inexistantes', () => {
  const invalid = structuredClone(quests[0]);
  invalid.npcId = 'missing'; invalid.regionIds = ['unknown'];
  invalid.steps[0].branch = { groupId: 'missing', optionId: 'missing' };
  const errors = validateQuests([invalid, invalid], [], []);
  assert.ok(errors.some(error => error.includes('dupliqué')));
  assert.ok(errors.some(error => error.includes('PNJ inconnu')));
  assert.ok(errors.some(error => error.includes('Région inconnue')));
  assert.ok(errors.some(error => error.includes('Branche inconnue')));
});
test('les branches et étapes ne changent pas automatiquement le statut ni les autres rubriques', () => {
  let save = addCharacter(emptySave(), 'A');
  save = updateQuest(save, 'quest.sellen', quest => ({ ...quest, status: 'failed', steps: { 'sellen.help': true }, branches: { 'sellen.duel': 'sellen' } }));
  save = updateQuest(save, 'quest.sellen', quest => ({ ...quest, branches: { 'sellen.duel': 'jerren' } }));
  assert.equal(currentPart(save).run!.quests['quest.sellen'].status, 'failed');
  assert.equal(currentPart(save).run!.quests['quest.sellen'].steps['sellen.help'], true);
  assert.deepEqual(currentPart(save).run!.bosses, {});
  assert.deepEqual(currentPart(save).character!.collection, {});
  const restored = parseBackup(exportSave(save)).data;
  assert.deepEqual(restored, save);
});
