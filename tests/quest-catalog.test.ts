import assert from 'node:assert/strict';
import { test } from 'node:test';
import { quests, npcs, regions } from '../src/catalog/quests';
import { questScope } from '../src/catalog/questScope';
import { questCoverage, validateQuestCoverage } from '../src/catalog/coverage';
import { filterQuests, groupQuestsByStartRegion, type QuestFilter } from '../src/catalog/query';
import { validateQuests } from '../src/domain/catalog';
import { addCharacter, addCycle, currentPart, emptySave, exportSave, parseBackup, updateQuest } from '../src/domain/save';

const filters: QuestFilter = { search: '', region: 'all', kind: 'all', status: 'all' };
const validate = (input: typeof quests) => validateQuests(input, regions.map(region => region.id), npcs.map(npc => npc.id));
test('le périmètre des parcours du jeu de base est couvert, avec des types distincts', () => {
  assert.deepEqual(questCoverage(quests, questScope), { expected: 40, published: 40, quests: 32, encounters: 7, stories: 1 });
  assert.equal(npcs.length, 45);
  assert.ok(quests.every(quest => quest.content === 'base'));
  assert.deepEqual(validateQuests(quests, regions.map(region => region.id), npcs.map(npc => npc.id)), []);
  assert.deepEqual(validateQuestCoverage(quests, questScope), []);
});
test('la couverture détecte une fiche absente, répétée, hors périmètre ou mal classée', () => {
  assert.ok(validateQuestCoverage(quests.slice(1), questScope).length);
  assert.ok(validateQuestCoverage([...quests, quests[0]], questScope).length);
  assert.ok(validateQuestCoverage([...quests, { ...quests[0], id: 'quest.unexpected' }], questScope).some(error => error.includes('hors périmètre')));
  const wrong = structuredClone(quests);
  wrong[0].startRegionId = 'liurnia';
  wrong[1].relatedNpcIds = ['npc.missing'];
  assert.ok(validateQuestCoverage(wrong, questScope).some(error => error.includes('Classement')));
  assert.ok(validateQuestCoverage(wrong, questScope).some(error => error.includes('Personnages')));
  assert.ok(validateQuestCoverage(quests, [...questScope, questScope[0]]).some(error => error.includes('dupliqué')));
});
test('les liens croisés et régions de départ ne peuvent référencer des entrées absentes', () => {
  const broken = structuredClone(quests);
  broken[0].relatedQuestIds = ['quest.missing', broken[0].id];
  broken[0].relatedNpcIds = ['npc.missing'];
  broken[0].startRegionId = 'not-a-region';
  const errors = validate(broken);
  assert.ok(errors.some(error => error.includes('Quête associée invalide')));
  assert.ok(errors.some(error => error.includes('PNJ associé inconnu')));
  assert.ok(errors.some(error => error.includes('Région de départ invalide')));
});
test('recherche française, noms associés, types et régions visitées se combinent', () => {
  const search = (text: string) => filterQuests(quests, npcs, { ...filters, search: text }).map(quest => quest.id);
  assert.deepEqual(search('  RODÉRIKA  '), ['quest.roderika', 'quest.hewg']);
  assert.deepEqual(search('Goldmask'), ['quest.corhyn']);
  assert.deepEqual(search('Edgar'), ['quest.irina']);
  assert.deepEqual(search('Gowry'), ['quest.millicent']);
  assert.deepEqual(search('Jerren'), ['quest.sellen']);
  assert.deepEqual(search('Patches'), ['quest.patches']);
  assert.deepEqual(search('Alexander'), ['quest.alexander']);
  assert.equal(filterQuests(quests, npcs, { ...filters, kind: 'encounter' }).length, 7);
  assert.deepEqual(filterQuests(quests, npcs, { ...filters, region: 'farum', status: 'failed' }, { 'quest.alexander': { status: 'failed' } }).map(q => q.id), ['quest.alexander']);
  assert.equal(filterQuests(quests, npcs, { ...filters, search: 'inexistant' }).length, 0);
});
test('le regroupement affiche chaque parcours une fois, même lors d’un filtre par région visitée', () => {
  const all = groupQuestsByStartRegion(quests, regions).flatMap(group => group.quests.map(q => q.id));
  assert.equal(new Set(all).size, quests.length);
  assert.deepEqual([...all].sort(), quests.map(q => q.id).sort());
  const farum = filterQuests(quests, npcs, { ...filters, region: 'farum' });
  const alexander = groupQuestsByStartRegion(farum, regions).find(group => group.id === 'limgrave')!;
  assert.ok(alexander.quests.some(q => q.id === 'quest.alexander'));
});
test('les identifiants des cinq parcours validés restent compatibles avec les anciennes coches', () => {
  const historical: Record<string, string[]> = {
    roderika: ['shack', 'memento', 'hold', 'hewg', 'convince', 'tuning', 'gesture'],
    boc: ['tree', 'needle', 'travel', 'gold', 'beautiful', 'rebirth'],
    kenneth: ['meet', 'fort', 'report', 'return', 'nepheli', 'throne'],
    ranni: ['serve', 'radahn', 'blade', 'deliver', 'miniature', 'shadow', 'ring', 'astel', 'cathedral', 'ending'],
    sellen: ['teacher', 'azur', 'lusat', 'radahn', 'primal', 'body', 'jerren', 'help', 'oppose'],
  };
  let save = addCharacter(emptySave(), 'Partie avant lot 3');
  for (const [id, suffixes] of Object.entries(historical)) {
    assert.deepEqual(quests.find(q => q.id === 'quest.' + id)!.steps.map(step => step.id), suffixes.map(suffix => id + '.' + suffix));
    save = updateQuest(save, 'quest.' + id, q => ({ ...q, status: 'completed', steps: Object.fromEntries(suffixes.map(suffix => [id + '.' + suffix, true])) }));
  }
  const old = structuredClone(currentPart(save).run!.quests);
  save = parseBackup(exportSave(save)).data;
  save = updateQuest(save, 'quest.millicent', q => ({ ...q, branches: { 'millicent.fate': 'assist' }, steps: { 'millicent.assist': true } }));
  save = updateQuest(save, 'quest.millicent', q => ({ ...q, branches: { 'millicent.fate': 'challenge' } }));
  assert.equal(currentPart(save).run!.quests['quest.millicent'].steps['millicent.assist'], true);
  for (const [id, progress] of Object.entries(old)) assert.deepEqual(currentPart(save).run!.quests[id], progress);
  assert.equal(currentPart(save).run!.quests['quest.shabriri'], undefined);
  const characterId = currentPart(save).character!.id;
  save = addCycle(save, characterId);
  assert.deepEqual(currentPart(save).run!.quests, {});
  assert.deepEqual(save.characters[0].runs[0].quests['quest.roderika'], old['quest.roderika']);
  assert.deepEqual(parseBackup(exportSave(save)).data, save);
});
