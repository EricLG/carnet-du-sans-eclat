import assert from 'node:assert/strict';
import { test } from 'node:test';
import { collectionItems, collectionScope, itemActors, itemGraces, items, pickups } from '../src/catalog/items';
import { collectionCategoryLabels, emptyCollectionFilter, groupPickupsByItem, filterItems, filterPickups, validateCollectionScope } from '../src/catalog/items/query';
import { quests, regions } from '../src/catalog/quests';
import { itemCategorySchema, probabilityLabel, probabilitySchema, validateItems } from '../src/domain/items';
import { addCharacter, addCycle, currentPart, emptySave, exportSave, importCopies, parseBackup, selectRun, toggleFlag, updateQuest, type SaveData } from '../src/domain/save';
import { ProgressService } from '../src/state/ProgressService';
import type { ProgressStorage } from '../src/storage/types';

const refs = { regionIds: regions.map(region => region.id), actors: itemActors, graces: itemGraces, questIds: quests.map(quest => quest.id) };
test('la sélection d’objets et ses emplacements sont valides, sourcés et explicitement partiels', () => {
  assert.deepEqual(validateItems(items, pickups, refs), []);
  assert.deepEqual(validateCollectionScope(items, pickups, collectionScope), []);
  assert.equal(collectionScope.status, 'partial');
  assert.equal(items.length, 45);
  assert.equal(pickups.length, 13);
  assert.deepEqual([...new Set(items.map(item => item.category))].sort(), [...itemCategorySchema.options].sort());
  assert.equal(new Set(items.filter(item => item.category === 'armor').map(item => item.armorSlot)).size, 4);
  assert.equal(new Set(items.flatMap(item => item.acquisitions.map(a => a.method))).size, 9);
});
test('les identifiants dupliqués et les références absentes sont rejetés', () => {
  const broken = structuredClone(items);
  broken[0].acquisitions[0].sourceEntityId = 'npc.absent';
  broken[0].acquisitions[0].graceId = 'grace.absente';
  broken[0].acquisitions[0].relatedQuestId = 'quest.absente';
  broken[0].acquisitions[0].requiredItemId = 'item.absent';
  broken[0].acquisitions[0].regionId = 'region.absente';
  const errors = validateItems([...broken, broken[0]], pickups, refs);
  for (const fragment of ['dupliqué', 'Source inconnue', 'Grâce de référence invalide', 'Quête inconnue', 'Objet requis inconnu', 'Région d’obtention absente']) assert.ok(errors.some(error => error.includes(fragment)), fragment);
});
test('un marchand exige un prix, un boss sa rencontre, un échange son souvenir et une quête son lien', () => {
  const broken = structuredClone(items);
  const merchant = broken.find(item => item.id === 'item.torch')!.acquisitions[0];
  delete merchant.price;
  const boss = broken.find(item => item.id === 'item.bloodhound-fang')!.acquisitions[0];
  boss.sourceEntityId = 'npc.blaidd';
  const exchange = broken.find(item => item.id === 'item.axe-godrick')!.acquisitions[0];
  delete exchange.requiredItemId;
  delete broken.find(item => item.id === 'item.erdsteel-dagger')!.acquisitions[0].relatedQuestId;
  const errors = validateItems(broken, pickups, refs);
  for (const fragment of ['Prix manquant', 'Rencontre de boss requise', 'Souvenir requis', 'Quête requise']) assert.ok(errors.some(error => error.includes(fragment)), fragment);
});
test('chaque emplacement d’amélioration correspond à une seule source garantie et au bon objet', () => {
  const broken = structuredClone(pickups);
  broken[0].itemId = 'item.torch';
  broken[1].regionIds = ['caelid'];
  let errors = validateItems(items, broken, refs);
  assert.ok(errors.some(error => error.includes('sans amélioration')));
  assert.ok(errors.some(error => error.includes('Emplacement de ramassage invalide')));
  errors = validateItems(items, pickups.slice(1), refs);
  assert.ok(errors.some(error => error.includes('non suivi')));
  assert.ok(validateItems(items, [...pickups, { ...pickups[0], id: 'pickup.double' }], refs).some(error => error.includes('Ramassage dupliqué')));
  assert.ok(validateCollectionScope(items.slice(1), pickups, collectionScope).length);
  assert.ok(validateCollectionScope(items, pickups.slice(1), collectionScope).length);
});
test('méthode et garantie sont indépendantes ; les taux inconnus ne deviennent pas zéro', () => {
  const bloodySlash = items.find(item => item.id === 'item.bloody-slash')!.acquisitions[0];
  assert.equal(bloodySlash.method, 'enemy_drop');
  assert.equal(bloodySlash.probability.kind, 'guaranteed');
  const sword = items.find(item => item.id === 'item.lordsworn-straight-sword')!.acquisitions[0];
  assert.equal(sword.probability.kind, 'chance');
  assert.match(probabilityLabel(sword.probability), /2 %/);
  assert.match(probabilityLabel({ kind: 'unknown' }), /non renseigné/);
  assert.doesNotMatch(probabilityLabel({ kind: 'unknown' }), /0|%/);
  for (const percent of [-1, 0, 100, 101, Number.NaN]) assert.equal(probabilitySchema.safeParse({ kind: 'chance', percent, conditions: 'Découverte' }).success, false);
  assert.equal(probabilitySchema.safeParse({ kind: 'chance', percent: 2, conditions: '' }).success, false);
  const unknown = structuredClone(items);
  unknown.find(item => item.id === 'item.brass-shield')!.acquisitions[0].probability = { kind: 'unknown' };
  assert.deepEqual(validateItems(unknown, pickups, refs), []);
});
test('recherche française/anglaise, marchand, région, catégorie et statut se combinent', () => {
  const find = (search: string) => filterItems(items, itemActors, { ...emptyCollectionFilter, search }).map(item => item.id);
  assert.deepEqual(find('  ÉPÉE À DOUBLE LAME  '), ['item.twinblade']);
  assert.deepEqual(find('Twinblade'), ['item.twinblade']);
  assert.ok(find('Kalé').includes('item.torch'));
  assert.deepEqual(filterItems(items, itemActors, { ...emptyCollectionFilter, category: 'armor' }).map(item => item.armorSlot).sort(), ['chest', 'hands', 'head', 'legs']);
  assert.deepEqual(filterItems(items, itemActors, { ...emptyCollectionFilter, status: 'obtained' }, { 'item.torch': true, 'item.future': true }).map(item => item.id), ['item.torch']);
  assert.ok(!filterItems(items, itemActors, { ...emptyCollectionFilter, status: 'missing' }, { 'item.torch': true }).some(item => item.id === 'item.torch'));
});
test('la région et la méthode doivent correspondre à la même acquisition', () => {
  const filter = { ...emptyCollectionFilter, category: 'upgrade' as const, region: 'roundtable', method: 'puzzle' as const };
  assert.equal(filterItems(items, itemActors, filter).length, 0);
  const oridys = { ...filter, region: 'weeping' };
  assert.deepEqual(filterItems(items, itemActors, oridys).map(item => item.id), ['item.memory-stone']);
  assert.deepEqual(filterPickups(pickups, items, itemActors, oridys).map(pickup => pickup.id), ['pickup.memory-stone.oridys']);
  assert.deepEqual(filterPickups(pickups, items, itemActors, { ...oridys, status: 'missing' }, { 'pickup.memory-stone.oridys': true }), []);
  assert.equal(filterPickups(pickups, items, itemActors, { ...emptyCollectionFilter, category: 'weapon' }).length, 0);
});
test('collection, ramassages, quêtes et personnages restent indépendants, y compris en NG+', () => {
  let save = addCharacter(emptySave(), 'A');
  const first = currentPart(save);
  save = updateQuest(save, 'quest.kenneth', quest => ({ ...quest, steps: { 'kenneth.fort': true } }));
  save = toggleFlag(save, 'collection', 'item.golden-seed');
  assert.deepEqual(currentPart(save).run!.pickups, {});
  save = toggleFlag(save, 'pickups', 'pickup.golden-seed.stormhill');
  assert.equal(currentPart(save).run!.pickups['pickup.golden-seed.fort-haight'], undefined);
  save = toggleFlag(save, 'collection', 'item.erdsteel-dagger');
  assert.equal(currentPart(save).run!.quests['quest.kenneth'].status, 'in_progress');
  assert.equal(currentPart(save).run!.quests['quest.kenneth'].steps['kenneth.report'], undefined);
  assert.deepEqual(currentPart(save).run!.bosses, {});
  save = addCycle(save, first.character!.id);
  assert.equal(currentPart(save).character!.collection['item.golden-seed'], true);
  assert.deepEqual(currentPart(save).run!.pickups, {});
  save = toggleFlag(save, 'pickups', 'pickup.sacred-tear.callu');
  assert.equal(currentPart(save).character!.collection['item.sacred-tear'], undefined);
  save = addCharacter(save, 'B');
  assert.deepEqual(currentPart(save).character!.collection, {});
  assert.deepEqual(currentPart(save).run!.pickups, {});
  save = selectRun(save, first.character!.id, first.run!.id);
  save = toggleFlag(save, 'pickups', 'pickup.golden-seed.stormhill');
  assert.equal(currentPart(save).run!.pickups['pickup.golden-seed.stormhill'], false);
  assert.equal(currentPart(save).character!.collection['item.golden-seed'], true);
});
test('l’export existant restaure les collections et emplacements sans migration ni perte des entrées inconnues', () => {
  let save = addCharacter(emptySave(), 'Avant lot 4');
  save = updateQuest(save, 'quest.ranni', quest => ({ ...quest, steps: { 'ranni.blade': true } }));
  const originalQuests = structuredClone(currentPart(save).run!.quests);
  const old = parseBackup(exportSave(save));
  assert.deepEqual(old.data, save);
  save = toggleFlag(save, 'collection', 'item.lantern');
  save = toggleFlag(save, 'pickups', 'pickup.memory-stone.oridys');
  save = toggleFlag(save, 'collection', 'item.future');
  const copied = importCopies(save, parseBackup(exportSave(save)));
  assert.equal(copied.characters.length, 2);
  assert.deepEqual(copied.characters[1].collection, save.characters[0].collection);
  assert.deepEqual(copied.characters[1].runs[0].pickups, save.characters[0].runs[0].pickups);
  assert.deepEqual(copied.characters[0].runs[0].quests, originalQuests);
  assert.deepEqual(copied.characters[0], save.characters[0]);
});
function storage(): ProgressStorage & { value: SaveData | null } {
  return { value: null, async read() { return this.value; }, async write(value) { await new Promise(resolve => setTimeout(resolve, 1)); this.value = value; } };
}
test('les coches rapides de collection et ramassage survivent au rechargement', async () => {
  const memory = storage();
  const service = new ProgressService(memory);
  await service.load(); await service.mutate(save => addCharacter(save, 'A'));
  await Promise.all(Array.from({ length: 11 }, () => service.mutate(save => toggleFlag(save, 'collection', 'item.lantern'))));
  await Promise.all(Array.from({ length: 12 }, () => service.mutate(save => toggleFlag(save, 'pickups', 'pickup.memory-stone.oridys'))));
  assert.equal(currentPart(service.getSnapshot().data).character!.collection['item.lantern'], true);
  assert.equal(currentPart(service.getSnapshot().data).run!.pickups['pickup.memory-stone.oridys'], false);
  const reloaded = new ProgressService(memory); await reloaded.load();
  assert.deepEqual(reloaded.getSnapshot().data, service.getSnapshot().data);
});
test('une erreur de stockage ne présente pas une nouvelle coche comme enregistrée', async () => {
  const memory = storage(); const service = new ProgressService(memory);
  await service.load(); await service.mutate(save => addCharacter(save, 'A'));
  memory.write = async () => { throw new Error('Quota dépassé'); };
  assert.equal(await service.mutate(save => toggleFlag(save, 'collection', 'item.lantern')), false);
  assert.equal(currentPart(service.getSnapshot().data).character!.collection['item.lantern'], undefined);
  assert.match(service.getSnapshot().error!, /Quota dépassé/);
});

test('les anciennes coches d’amélioration restent sauvegardées mais sont exclues des objets du personnage', () => {
  let save = addCharacter(emptySave(), 'Ancienne partie');
  save = toggleFlag(save, 'collection', 'item.golden-seed');
  save = toggleFlag(save, 'collection', 'item.lantern');
  const before = structuredClone(save);
  const visible = filterItems(collectionItems, itemActors, { ...emptyCollectionFilter, status: 'obtained' }, currentPart(save).character!.collection);
  assert.deepEqual(visible.map(item => item.id), ['item.lantern']);
  assert.equal(collectionItems.length, items.filter(item => item.category !== 'upgrade').length);
  assert.equal(collectionCategoryLabels.upgrade, undefined);
  const restored = parseBackup(exportSave(save)).data;
  assert.deepEqual(restored, before);
  assert.equal(currentPart(restored).character!.collection['item.golden-seed'], true);
});
test('le regroupement des améliorations conserve chaque emplacement et respecte les filtres', () => {
  const original = structuredClone(pickups);
  const groups = groupPickupsByItem(pickups, items);
  assert.equal(groups.length, new Set(pickups.map(pickup => pickup.itemId)).size);
  assert.deepEqual(groups.flatMap(group => group.pickups.map(pickup => pickup.id)).sort(), pickups.map(pickup => pickup.id).sort());
  assert.deepEqual(pickups, original);
  const progress = { 'pickup.golden-seed.stormhill': true };
  const filtered = filterPickups(pickups, items, itemActors, { ...emptyCollectionFilter, status: 'obtained' }, progress);
  const obtained = groupPickupsByItem(filtered, items);
  assert.equal(obtained.length, 1);
  assert.equal(obtained[0].item.id, 'item.golden-seed');
  assert.deepEqual(obtained[0].pickups.map(pickup => pickup.id), ['pickup.golden-seed.stormhill']);
});
