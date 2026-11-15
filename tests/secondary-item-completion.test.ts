import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { items, itemActors } from '../src/catalog/items';
import talismans from '../src/catalog/items/extended-talismans-inventory.json';
import incantations from '../src/catalog/items/extended-incantations-inventory.json';
import ashes from '../src/catalog/items/extended-ashes-inventory.json';
import { emptyCollectionFilter, filterItems } from '../src/catalog/items/query';
import { knownBaseItemTotals } from '../src/catalog/itemCoverage';
import { bosses } from '../src/catalog/world';
import { addCharacter, addCycle, currentPart, emptySave, exportSave, importCopies, parseBackup, toggleFlag } from '../src/domain/save';

const inventory = [...talismans, ...incantations, ...ashes];
function entry(english: string) {
  const expected = inventory.find(item => item.english === english); assert.ok(expected, english);
  const published = items.find(item => item.id === expected.id); assert.ok(published, expected.id);
  return published;
}

test('talismans, incantations et cendres couvrent exactement leurs types permanents du jeu de base', () => {
  for (const [category, total] of Object.entries({ talisman: 114, incantation: 101, ash_of_war: 91, spirit_ash: 64 })) {
    const expected = inventory.filter(item => item.category === category);
    const published = items.filter(item => item.category === category);
    assert.equal(expected.length, total);
    assert.equal(knownBaseItemTotals[category as keyof typeof knownBaseItemTotals]!.total, total);
    assert.deepEqual(published.map(item => item.id).sort(), expected.map(item => item.id).sort());
    assert.ok(published.every(item => item.content === 'base' && item.acquisitions.length > 0));
  }
  assert.equal(inventory.length, 370);
  for (const excluded of ['Sacrificial Twig', 'Two-Headed Turtle Talisman', "Messmer's Orb", 'Ash of War: Blind Spot', 'Mimic Tear Ashes +10']) {
    assert.ok(!inventory.some(item => item.english === excluded), excluded);
  }
  assert.equal(new Set(inventory.map(item => item.id)).size, inventory.length);
});

test('les variantes de talismans et les homonymes de sorts et cendres ont des identifiants distincts', () => {
  assert.notEqual(entry('Crimson Amber Medallion').id, entry('Crimson Amber Medallion +1').id);
  assert.notEqual(entry('Crimson Amber Medallion +1').id, entry('Crimson Amber Medallion +2').id);
  const vow = entry('Golden Vow'), ash = entry('Ash of War: Golden Vow');
  assert.notEqual(vow.id, ash.id); assert.equal(vow.category, 'incantation'); assert.equal(ash.category, 'ash_of_war');
  assert.equal(incantations.find(item => item.english === 'Golden Vow')!.textId, '6600');
  assert.equal(incantations.find(item => item.english === 'Lightning Spear')!.textId, '6900');
  assert.ok(ashes.filter(item => item.category === 'ash_of_war').every(item => item.english.startsWith('Ash of War: ')));
  for (const category of ['incantation', 'ash_of_war'] as const) {
    const matches = filterItems(items, itemActors, { ...emptyCollectionFilter, search: 'Golden Vow', category });
    assert.deepEqual(matches.map(item => item.id), [category === 'incantation' ? vow.id : ash.id]);
  }
});

test('les grimoires et souvenirs requis correspondent à des fiches et à la bonne méthode', () => {
  const lightning = entry('Lightning Spear').acquisitions[0];
  assert.equal(lightning.method, 'merchant');
  assert.ok(items.find(item => item.id === lightning.requiredItemId)!.aliases.includes('Dragon Cult Prayerbook'));
  const fortissax = entry("Fortissax's Lightning Spear").acquisitions[0];
  assert.equal(fortissax.method, 'remembrance_exchange');
  const remembrance = items.find(item => item.id === fortissax.requiredItemId)!;
  assert.ok(remembrance.aliases.includes('Remembrance of the Lichdragon'));
  assert.equal(remembrance.acquisitions[0].method, 'boss_reward');
  assert.ok(bosses.some(boss => boss.id === remembrance.acquisitions[0].sourceEntityId));
  const dragon = entry('Dragonfire').acquisitions[0];
  assert.equal(dragon.method, 'other'); assert.equal(dragon.sourceEntityId, undefined);
  assert.equal(dragon.probability.kind, 'guaranteed'); assert.match(dragon.price!, /cœur|coeur/i);
});

test('les récompenses divergentes de Millicent restent documentées et cochables indépendamment', () => {
  const help = entry('Rotten Winged Sword Insignia'); const oppose = entry("Millicent's Prosthesis");
  assert.equal(help.acquisitions[0].relatedQuestId, 'quest.millicent');
  assert.ok(oppose.acquisitions.some(acquisition => acquisition.relatedQuestId === 'quest.millicent'));
  assert.notEqual(help.acquisitions[0].description, oppose.acquisitions[0].description);
  let save = addCharacter(emptySave(), 'Branches de Millicent');
  save = toggleFlag(save, 'collection', help.id);
  assert.equal(currentPart(save).character!.collection[oppose.id], undefined);
  save = toggleFlag(save, 'collection', oppose.id);
  assert.equal(currentPart(save).character!.collection[help.id], true);
  assert.deepEqual(currentPart(save).run!.quests, {});
});

test('cendres de guerre et invocations sont des objets du personnage sans coche automatique de boss', () => {
  const war = entry("Ash of War: Bloodhound's Step"); const spirit = entry('Black Knife Tiche');
  assert.equal(war.acquisitions[0].method, 'boss_reward'); assert.equal(spirit.acquisitions[0].method, 'boss_reward');
  assert.notEqual(war.acquisitions[0].sourceEntityId, spirit.acquisitions[0].sourceEntityId);
  const kaiden = entry('Kaiden Sellsword Ashes').acquisitions[0];
  assert.equal(kaiden.regionId, 'liurnia'); assert.match(kaiden.location, /falaise/i);
  let save = addCharacter(emptySave(), 'Cendres et NG+');
  for (const id of [war.id, spirit.id]) save = toggleFlag(save, 'collection', id);
  assert.deepEqual(currentPart(save).run!.bosses, {}); assert.deepEqual(currentPart(save).run!.pickups, {});
  save = addCycle(save, currentPart(save).character!.id);
  assert.equal(currentPart(save).character!.collection[spirit.id], true);
  const copy = importCopies(save, parseBackup(exportSave(save)));
  assert.deepEqual(copy.characters[1].collection, save.characters[0].collection);
});

test('les nouveaux identifiants restent rattachés à leurs acquisitions pour les publications futures', () => {
  const fixture = JSON.parse(readFileSync('tests/fixtures/secondary-item-completion-ids.json', 'utf8')) as {
    itemAcquisitions: Record<string, string[]>; bossIds: string[];
  };
  for (const [id, acquisitions] of Object.entries(fixture.itemAcquisitions)) {
    const item = items.find(item => item.id === id); assert.ok(item, id);
    for (const id of acquisitions) assert.ok(item.acquisitions.some(acquisition => acquisition.id === id), id);
  }
  for (const id of fixture.bossIds) assert.ok(bosses.some(boss => boss.id === id), id);
});
