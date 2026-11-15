import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { auditCatalog, formatCatalogAudit } from '../src/catalog/audit';
import { publishedCatalog } from '../src/catalog/snapshot';
import { questCoverage } from '../src/catalog/coverage';
import { catalogProgress } from '../src/domain/catalogProgress';
import { worldItems, worldProgress } from '../src/catalog/world/query';
import { addCharacter, currentPart, emptySave, exportSave, importCopies, parseBackup, toggleFlag } from '../src/domain/save';

const asOf = '2026-11-15';
const clone = () => structuredClone(publishedCatalog);
test('l’audit consolidé contrôle tous les catalogues et sépare publication et couverture du jeu', () => {
  const before = clone();
  const report = auditCatalog(publishedCatalog, asOf);
  assert.deepEqual(report.errors, []);
  assert.deepEqual(publishedCatalog, before);
  assert.deepEqual(report.publication, { quests: 40, items: 154, collection: 150, acquisitions: 190, pickups: 27, bosses: 32, graces: 40 });
  assert.deepEqual(report.knownSubtotal, { published: 138, knownTotal: 1376 });
  for (const category of ['tool', 'key_item', 'upgrade']) {
    const row = report.itemCoverage.find(row => row.category === category)!;
    assert.equal(row.knownTotal, null); assert.equal(row.percent, null);
  }
  assert.ok(report.regionalCoverage.some(row => row.bosses === 0 && row.graces === 0));
  assert.equal(report.sources.unique, 184);
  assert.equal(report.sources.versionedCitations, 0);
  assert.ok(report.limits.some(limit => limit.includes('aucun pourcentage global')));
  const markdown = formatCatalogAudit(report);
  assert.match(markdown, /138\/1376/); assert.match(markdown, /À recenser/); assert.match(markdown, /disponibilité actuelle des pages/);
});
test('l’audit détecte une collision entre catalogues et un doublon probable sans les fusionner', () => {
  const collision = clone();
  collision.items[0].acquisitions[0].id = collision.quests[0].steps[0].id;
  assert.ok(auditCatalog(collision, asOf).errors.some(error => error.includes('Identifiant global dupliqué')));
  const duplicate = clone();
  const item = structuredClone(duplicate.items[0]);
  item.id = 'item.duplicate'; item.acquisitions.forEach((acquisition, index) => { acquisition.id = `acquisition.duplicate.${index}`; });
  duplicate.items.push(item); duplicate.collectionScope.itemIds.push(item.id);
  assert.ok(auditCatalog(duplicate, asOf).errors.some(error => error.includes('Doublon probable')));
  assert.equal(duplicate.items.length, 155);
});
test('les références répétées, dates futures et URL non documentaires ne passent pas l’audit', () => {
  const duplicate = clone();
  const source = duplicate.items[0].sources[0];
  duplicate.items[0].sources.push({ ...source, url: `${source.url}#section` });
  assert.ok(auditCatalog(duplicate, asOf).errors.some(error => error.includes('Source répétée')));
  const future = clone(); future.items[0].sources[0].verifiedAt = '2030-01-01';
  assert.ok(auditCatalog(future, asOf).errors.some(error => error.includes('Vérification documentaire future')));
  const badUrl = clone(); badUrl.items[0].sources[0].url = 'ftp://example.org/page';
  assert.ok(auditCatalog(badUrl, asOf).errors.some(error => error.includes('URL documentaire invalide')));
  assert.ok(auditCatalog(publishedCatalog, 'demain').errors.some(error => error.includes('Date de contrôle invalide')));
});
test('le périmètre de contenu, les dénominateurs et les références de PNJ restent cohérents', () => {
  const dlc = clone(); dlc.items[0].content = 'dlc';
  assert.ok(auditCatalog(dlc, asOf).errors.some(error => error.includes('Contenu hors publication')));
  const total = clone(); total.knownBaseItemTotals.weapon!.total = 0;
  const invalid = auditCatalog(total, asOf);
  assert.ok(invalid.errors.some(error => error.includes('Dénominateur invalide')));
  assert.equal(invalid.itemCoverage.find(row => row.category === 'weapon')!.percent, null);
  const npc = clone(); npc.itemActors.find(actor => actor.id === 'npc.sellen')!.name = 'Autre nom';
  assert.ok(auditCatalog(npc, asOf).errors.some(error => error.includes('Référence PNJ divergente')));
});
test('les liens d’arène doivent être réciproques et une référence de boss exige une récompense de boss', () => {
  const arena = clone(); arena.bosses.find(boss => boss.id === 'boss.godrick.stormveil')!.graceIds = ['grace.secluded-cell'];
  assert.ok(auditCatalog(arena, asOf).errors.some(error => error.includes('Grâce d’arène sans lien réciproque')));
  const method = clone(); method.items.find(item => item.id === 'item.golden-halberd')!.acquisitions[0].method = 'exploration';
  assert.ok(auditCatalog(method, asOf).errors.some(error => error.includes('Méthode de récompense de boss incohérente')));
  assert.deepEqual(worldItems('boss', 'boss.tree-sentinel.limgrave', method.items), []);
});
test('la couverture PNJ compte les fiches réellement présentes, sans gonfler les nombres par les doublons', () => {
  const catalog = clone();
  const missingId = catalog.quests.find(quest => quest.kind === 'quest')!.id;
  const present = catalog.quests.filter(quest => quest.id !== missingId);
  const coverage = questCoverage([...present, present[0]], [...catalog.questScope, catalog.questScope[0]]);
  assert.equal(coverage.expected, 40); assert.equal(coverage.published, 39); assert.equal(coverage.quests, 31);
  assert.equal(coverage.encounters + coverage.stories + coverage.quests, coverage.published);
});
test('les compteurs partagés ignorent doublons, anciennes améliorations et coches inconnues sans altérer les sauvegardes', () => {
  const entries = [{ id: 'item.torch' }, { id: 'item.torch' }, { id: 'item.lantern' }];
  let save = addCharacter(emptySave(), 'Avant consolidation');
  for (const id of ['item.torch', 'item.golden-seed', 'item.future']) save = toggleFlag(save, 'collection', id);
  save = toggleFlag(save, 'bosses', 'boss.godrick.stormveil'); save = toggleFlag(save, 'bosses', 'boss.future');
  const original = structuredClone(save);
  assert.deepEqual(catalogProgress(entries, currentPart(save).character!.collection), { done: 1, total: 2 });
  const bosses = publishedCatalog.bosses;
  assert.deepEqual(worldProgress([...bosses, bosses[0]], currentPart(save).run!.bosses), { done: 1, total: 32 });
  assert.deepEqual(save, original);
  const copied = importCopies(save, parseBackup(exportSave(save)));
  assert.deepEqual(copied.characters[0], original.characters[0]);
  assert.equal(copied.characters[1].collection['item.golden-seed'], true);
  assert.equal(copied.characters[1].collection['item.future'], true);
  assert.equal(copied.characters[1].runs[0].bosses['boss.future'], true);
});

test('les identifiants déjà publiés restent rattachés aux mêmes fiches pour préserver chaque ancienne coche', () => {
  const fixture = JSON.parse(readFileSync('tests/fixtures/catalog-ids.v1.json', 'utf8')) as {
    quests: Record<string, { npcId: string; steps: string[]; branches: Record<string, string[]> }>;
    items: Record<string, string[]>; pickups: Record<string, { itemId: string; acquisitionId: string }>;
    bossIds: string[]; graceIds: string[];
  };
  for (const [id, expected] of Object.entries(fixture.quests)) {
    const quest = publishedCatalog.quests.find(quest => quest.id === id)!;
    assert.ok(quest, id); assert.equal(quest.npcId, expected.npcId);
    for (const step of expected.steps) assert.ok(quest.steps.some(entry => entry.id === step), step);
    for (const [id, options] of Object.entries(expected.branches)) {
      const branch = quest.branches.find(branch => branch.id === id)!; assert.ok(branch, id);
      for (const option of options) assert.ok(branch.options.some(entry => entry.id === option), option);
    }
  }
  for (const [id, acquisitions] of Object.entries(fixture.items)) {
    const item = publishedCatalog.items.find(item => item.id === id)!; assert.ok(item, id);
    for (const acquisition of acquisitions) assert.ok(item.acquisitions.some(entry => entry.id === acquisition), acquisition);
  }
  for (const [id, expected] of Object.entries(fixture.pickups)) {
    const pickup = publishedCatalog.pickups.find(pickup => pickup.id === id)!; assert.ok(pickup, id);
    assert.equal(pickup.itemId, expected.itemId); assert.equal(pickup.acquisitionId, expected.acquisitionId);
  }
  for (const id of fixture.bossIds) assert.ok(publishedCatalog.bosses.some(boss => boss.id === id), id);
  for (const id of fixture.graceIds) assert.ok(publishedCatalog.graces.some(grace => grace.id === id), id);
});
