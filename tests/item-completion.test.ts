import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { items, itemActors, pickups } from '../src/catalog/items';
import { completedBaseInventory } from '../src/catalog/items/completion';
import { filterItems, emptyCollectionFilter } from '../src/catalog/items/query';
import { knownBaseItemTotals } from '../src/catalog/itemCoverage';
import { bosses } from '../src/catalog/world';
import { addCharacter, addCycle, currentPart, emptySave, exportSave, importCopies, parseBackup, toggleFlag } from '../src/domain/save';

const item = (english: string) => {
  const entry = completedBaseInventory.find(entry => entry.english === english)!;
  assert.ok(entry, english);
  return items.find(item => item.id === entry.id)!;
};
test('les identifiants de la complétion restent compatibles avec les coches des prochaines publications', () => {
  const fixture = JSON.parse(readFileSync('tests/fixtures/item-completion-ids.json', 'utf8')) as {
    itemAcquisitions: Record<string, string[]>; bossIds: string[];
  };
  for (const [id, acquisitions] of Object.entries(fixture.itemAcquisitions)) {
    const entry = items.find(item => item.id === id); assert.ok(entry, id);
    for (const id of acquisitions) assert.ok(entry.acquisitions.some(acquisition => acquisition.id === id), id);
  }
  for (const id of fixture.bossIds) assert.ok(bosses.some(boss => boss.id === id), id);
});
test('les quatre catégories couvrent exactement les types du jeu de base d’origine, sans DLC, affinité ni niveau', () => {
  for (const [category, total] of Object.entries({ weapon: 308, shield: 69, armor: 559, sorcery: 70 })) {
    const expected = completedBaseInventory.filter(entry => entry.category === category);
    const actual = items.filter(item => item.category === category);
    assert.equal(expected.length, total); assert.equal(knownBaseItemTotals[category as keyof typeof knownBaseItemTotals]!.total, total);
    assert.deepEqual(actual.map(item => item.id).sort(), expected.map(entry => entry.id).sort());
    assert.ok(actual.every(item => item.content === 'base' && item.acquisitions.length > 0));
  }
  assert.equal(completedBaseInventory.length, 1006);
  for (const excluded of ['Backhand Blade', "Rellana's Twin Moons", 'Dryleaf Arts', "Rogier's Rapier+8", 'Heavy Dagger']) {
    assert.ok(!completedBaseInventory.some(entry => entry.english === excluded), excluded);
  }
  assert.equal(item("Commoner's Simple Garb").armorSlot, 'chest');
  assert.equal(item('Nox Bracelets').armorSlot, 'hands');
  assert.equal(item('Nox Greaves').armorSlot, 'legs');
  assert.ok(completedBaseInventory.every(entry => entry.name === entry.name.trim()));
});

test('les retouches sont distinctes des variantes obtenues directement et gardent le bon prérequis', () => {
  const altered = item("Malenia's Armor (Altered)");
  assert.equal(altered.acquisitions[0].method, 'other');
  assert.equal(altered.acquisitions[0].requiredItemId, item("Malenia's Armor").id);
  for (const english of ['Banished Knight Helm (Altered)', 'Banished Knight Armor (Altered)', 'Fire Prelate Armor (Altered)']) {
    const acquisition = item(english).acquisitions[0];
    assert.equal(acquisition.method, 'enemy_drop'); assert.equal(acquisition.requiredItemId, undefined);
    assert.equal(acquisition.probability.kind, 'unknown');
  }
  const champion = item('Beast Champion Armor');
  assert.equal(champion.acquisitions[0].requiredItemId, item('Beast Champion Armor (Altered)').id);
  assert.equal(item('Beast Champion Armor (Altered)').acquisitions[0].method, 'enemy_drop');
});

test('parchemins et souvenirs existent, et l’échange reste distinct de la victoire sur le boss', () => {
  const moon = item("Rennala's Full Moon").acquisitions[0];
  assert.equal(moon.method, 'remembrance_exchange'); assert.equal(moon.regionId, 'roundtable');
  const souvenir = items.find(item => item.id === moon.requiredItemId)!;
  assert.ok(souvenir.aliases.includes('Remembrance of the Full Moon Queen'));
  assert.equal(souvenir.acquisitions[0].sourceEntityId, 'boss.rennala.raya-lucaria');
  assert.ok(bosses.some(boss => boss.id === souvenir.acquisitions[0].sourceEntityId));
  const swift = item('Swift Glintstone Shard').acquisitions[0];
  assert.equal(swift.price, '600 runes');
  assert.ok(items.find(item => item.id === swift.requiredItemId)!.aliases.includes('Academy Scroll'));
  assert.equal(item('Star Shower').acquisitions[0].requiredItemId, 'item.conspectus-scroll');
});

test('les filtres retrouvent les nouvelles fiches françaises et anglaises et le butin ne reçoit aucun taux inventé', () => {
  for (const english of ['Moonveil', 'Fingerprint Stone Shield', "Malenia's Armor", 'Comet']) {
    const entry = item(english);
    for (const search of [english, entry.name]) assert.ok(filterItems(items, itemActors, { ...emptyCollectionFilter, search }).some(item => item.id === entry.id));
  }
  assert.equal(item('Magma Blade').acquisitions[0].probability.kind, 'unknown');
  assert.equal(item('Rivers of Blood').acquisitions[0].probability.kind, 'guaranteed');
  assert.ok(item('Bolt of Gransax').acquisitions[0].conditions.some(condition => condition.includes('Maliketh')));
  assert.ok(item('White Mask').acquisitions[0].conditions.some(condition => condition.includes('Mohg')));
  assert.equal(item('Cloth Garb').acquisitions[0].method, 'exploration');
  assert.equal(item("Perfumer's Traveling Garb").acquisitions[0].regionId, 'caelid');
  assert.equal(item('Flame Crest Wooden Shield').acquisitions[0].regionId, 'weeping');
});

test('nouvelles pièces, variantes, récompenses et boss conservent des coches indépendantes en NG+ et à l’import', () => {
  let save = addCharacter(emptySave(), 'Collection complète');
  save = toggleFlag(save, 'collection', item("Malenia's Armor").id);
  save = toggleFlag(save, 'collection', item('Moonveil').id);
  assert.equal(currentPart(save).character!.collection[item("Malenia's Armor (Altered)").id], undefined);
  assert.deepEqual(currentPart(save).run!.bosses, {}); assert.deepEqual(currentPart(save).run!.pickups, {});
  save = toggleFlag(save, 'bosses', 'boss.malenia.haligtree');
  assert.equal(currentPart(save).character!.collection[item('Hand of Malenia').id], undefined);
  save = addCycle(save, currentPart(save).character!.id);
  assert.equal(currentPart(save).character!.collection[item('Moonveil').id], true);
  assert.deepEqual(currentPart(save).run!.bosses, {});
  const copied = importCopies(save, parseBackup(exportSave(save)));
  assert.deepEqual(copied.characters[1].collection, save.characters[0].collection);
  assert.equal(copied.characters[1].runs[0].bosses['boss.malenia.haligtree'], true);
  assert.equal(pickups.length, 27);
});
