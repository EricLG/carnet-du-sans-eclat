import { sourceSchema, questSchema, validateQuests, type Source } from '../domain/catalog';
import { itemCategorySchema, itemSchema, pickupSchema, validateItems } from '../domain/items';
import { bossSchema, graceSchema, validateWorld } from '../domain/world';
import { validateQuestCoverage, questCoverage } from './coverage';
import { categoryLabels, validateCollectionScope } from './items/query';
import { normalizeSearch } from './query';
import type { PublishedCatalog } from './snapshot';
import { validateWorldScope } from './world/query';

function identity(text: string) { return normalizeSearch(text).replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
function sourceIdentity(url: string) {
  const value = new URL(url); value.hash = ''; value.searchParams.sort();
  return value.href.replace(/\/$/, '');
}
export function auditCatalog(catalog: PublishedCatalog, asOf: string) {
  const errors: string[] = [];
  const check = (label: string, results: string[]) => errors.push(...results.map(error => `${label} : ${error}`));
  const validDate = sourceSchema.shape.verifiedAt.safeParse(asOf).success;
  if (!validDate) errors.push('Date de contrôle invalide.');
  const quests = catalog.quests.filter(entry => { const valid = questSchema.safeParse(entry).success; if (!valid) errors.push(`Quête invalide : ${entry.id}`); return valid; });
  const items = catalog.items.filter(entry => { const valid = itemSchema.safeParse(entry).success; if (!valid) errors.push(`Objet invalide : ${entry.id}`); return valid; });
  const pickups = catalog.pickups.filter(entry => { const valid = pickupSchema.safeParse(entry).success; if (!valid) errors.push(`Ramassage invalide : ${entry.id}`); return valid; });
  const bosses = catalog.bosses.filter(entry => { const valid = bossSchema.safeParse(entry).success; if (!valid) errors.push(`Boss invalide : ${entry.id}`); return valid; });
  const graces = catalog.graces.filter(entry => { const valid = graceSchema.safeParse(entry).success; if (!valid) errors.push(`Grâce invalide : ${entry.id}`); return valid; });
  const regionIds = catalog.regions.map(entry => entry.id);
  const questIds = quests.map(entry => entry.id);
  check('Quêtes', validateQuests(quests, regionIds, catalog.npcs.map(entry => entry.id)));
  check('Périmètre PNJ', validateQuestCoverage(quests, catalog.questScope));
  check('Objets', validateItems(items, pickups, { regionIds, actors: catalog.itemActors, graces: catalog.itemGraces, questIds }));
  check('Périmètre objets', validateCollectionScope(items, pickups, catalog.collectionScope));
  check('Exploration', validateWorld(bosses, graces, { regionIds, questIds, actors: catalog.itemActors, graces: catalog.itemGraces, items }));
  check('Périmètre exploration', validateWorldScope(bosses, graces, catalog.worldScope));

  const registry = new Set<string>();
  const register = (id: string) => {
    if (registry.has(id)) errors.push(`Identifiant global dupliqué : ${id}`);
    registry.add(id);
  };
  for (const entry of [...catalog.regions, ...catalog.npcs, ...quests, ...items, ...pickups, ...bosses, ...graces]) register(entry.id);
  for (const quest of quests) {
    for (const step of quest.steps) register(step.id);
    for (const branch of quest.branches) register(branch.id);
  }
  const acquisitions = items.flatMap(item => item.acquisitions);
  for (const acquisition of acquisitions) register(acquisition.id);

  const primaryKeys = new Map<string, string>();
  for (const entry of [...items, ...bosses, ...graces]) {
    const category = 'category' in entry ? `objet.${entry.category}` : 'respawns' in entry ? 'boss' : 'grâce';
    const place = 'category' in entry ? '' : `${entry.regionIds[0]}:${'respawns' in entry ? identity(entry.location) : ''}`;
    const key = `${category}:${place}:${identity(entry.aliases[0] ?? entry.name)}`;
    const previous = primaryKeys.get(key);
    if (previous && previous !== entry.id) errors.push(`Doublon probable à examiner : ${previous} / ${entry.id}`);
    primaryKeys.set(key, entry.id);
  }
  for (const entry of [...quests, ...items, ...pickups, ...bosses, ...graces]) {
    if (entry.content !== 'base') errors.push(`Contenu hors publication du jeu de base : ${entry.id}`);
  }
  const actors = new Map(catalog.itemActors.map(actor => [actor.id, actor]));
  for (const npc of catalog.npcs) {
    const actor = actors.get(npc.id);
    if (actor && (actor.kind !== 'npc' || actor.name !== npc.name)) errors.push(`Référence PNJ divergente : ${npc.id}`);
  }
  for (const acquisition of acquisitions) {
    const actor = actors.get(acquisition.sourceEntityId ?? '');
    if (actor?.kind === 'boss' && acquisition.method !== 'boss_reward') errors.push(`Méthode de récompense de boss incohérente : ${acquisition.id}`);
  }
  for (const pickup of pickups) {
    const item = items.find(item => item.id === pickup.itemId);
    if (item && item.content !== pickup.content) errors.push(`Contenu du ramassage incohérent : ${pickup.id}`);
  }

  const sourceGroups: { id: string; sources: Source[] }[] = [...quests, ...items, ...pickups, ...bosses, ...graces, ...acquisitions,
    { id: 'périmètre.pnj', sources: [catalog.scopeSource] }];
  for (const [category, reference] of Object.entries(catalog.knownBaseItemTotals)) {
    if (!reference || !Number.isInteger(reference.total) || reference.total <= 0 || !reference.sources.length) errors.push(`Dénominateur invalide : ${category}`);
    if (reference) sourceGroups.push({ id: `total.${category}`, sources: reference.sources });
  }
  const sources = new Map<string, { url: string; verifiedAt: string; labels: Set<string> }>();
  let citations = 0, versionedCitations = 0;
  for (const group of sourceGroups) {
    const seen = new Set<string>();
    for (const source of group.sources) {
      citations++;
      if (!sourceSchema.safeParse(source).success) { errors.push(`Référence invalide : ${group.id}`); continue; }
      const url = new URL(source.url);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) errors.push(`URL documentaire invalide : ${group.id}`);
      if (validDate && source.verifiedAt > asOf) errors.push(`Vérification documentaire future : ${group.id}`);
      if (!source.label.trim() || source.label !== source.label.trim()) errors.push(`Libellé de source invalide : ${group.id}`);
      const key = sourceIdentity(source.url);
      if (seen.has(key)) errors.push(`Source répétée dans la même fiche : ${group.id}`);
      seen.add(key);
      const existing = sources.get(key);
      if (existing) { existing.labels.add(source.label); if (source.verifiedAt > existing.verifiedAt) existing.verifiedAt = source.verifiedAt; }
      else sources.set(key, { url: source.url, verifiedAt: source.verifiedAt, labels: new Set([source.label]) });
      if (source.gameVersion) versionedCitations++;
    }
  }

  const unique = <T extends { id: string }>(entries: T[]): T[] => [...new Map(entries.map(entry => [entry.id, entry])).values()];
  const uniqueItems = unique(items), uniqueBosses = unique(bosses), uniqueGraces = unique(graces);
  const itemCoverage = itemCategorySchema.options.map(category => {
    const published = uniqueItems.filter(item => item.content === 'base' && item.category === category).length;
    const input = catalog.knownBaseItemTotals[category];
    const reference = input && Number.isInteger(input.total) && input.total > 0 ? input : undefined;
    if (reference && published > reference.total) errors.push(`Total publié supérieur au dénominateur : ${category}`);
    return { category, label: categoryLabels[category], published, knownTotal: reference?.total ?? null,
      percent: reference ? Math.round(published / reference.total * 10000) / 100 : null };
  });
  const knownCategories = itemCoverage.filter(row => row.knownTotal !== null);
  const knownSubtotal = { published: knownCategories.reduce((n, row) => n + row.published, 0), knownTotal: knownCategories.reduce((n, row) => n + row.knownTotal!, 0) };
  const publication = { quests: unique(quests).length, items: uniqueItems.length, collection: uniqueItems.filter(item => item.category !== 'upgrade').length,
    acquisitions: unique(acquisitions).length, pickups: unique(pickups).length, bosses: uniqueBosses.length, graces: uniqueGraces.length };
  const regionalCoverage = catalog.regions.map(region => ({ id: region.id, name: region.name,
    quests: unique(quests).filter(quest => quest.startRegionId === region.id).length,
    acquisitions: unique(acquisitions).filter(acquisition => acquisition.regionId === region.id).length,
    bosses: uniqueBosses.filter(boss => boss.regionIds.includes(region.id)).length,
    graces: uniqueGraces.filter(grace => grace.regionIds.includes(region.id)).length }));
  return { asOf, errors: [...new Set(errors)].sort(), publication, questCoverage: questCoverage(quests, catalog.questScope), itemCoverage,
    knownSubtotal, regionalCoverage, sources: { unique: sources.size, citations, versionedCitations,
      entries: [...sources.values()].map(source => ({ ...source, labels: [...source.labels].sort() })).sort((a, b) => a.url.localeCompare(b.url)) },
    limits: ['Les objets, acquisitions, boss et grâces restent partiels.', `Les ${publication.quests} parcours PNJ couvrent le périmètre éditorial défini, sans recenser chaque dialogue.`,
      `Les dénominateurs chiffrés concernent ${knownCategories.length} catégories du jeu de base d’origine ; aucun pourcentage global du jeu.`,
      'Les dates de revue documentaire ne prouvent ni un essai en jeu ni la disponibilité actuelle des pages.'] };
}
export type CatalogAudit = ReturnType<typeof auditCatalog>;

export function formatCatalogAudit(report: CatalogAudit): string {
  const p = report.publication;
  const knownCategories = report.itemCoverage.filter(row => row.knownTotal !== null).length;
  const unknownCategories = report.itemCoverage.length - knownCategories;
  const lines = ['# Audit consolidé du catalogue', '', `Contrôle du ${report.asOf} : **${report.errors.length} erreur(s) d’intégrité**.`, '',
    `${p.quests} parcours PNJ · ${p.items} types d’objets (${p.collection} dans la collection) · ${p.acquisitions} acquisitions · ${p.pickups} ramassages · ${p.bosses} rencontres · ${p.graces} grâces.`, '',
    '## Couverture des types d’objets du jeu de base d’origine', '', '| Catégorie | Publiés | Total connu | Couverture |', '| --- | ---: | ---: | ---: |'];
  for (const row of report.itemCoverage) lines.push(`| ${row.label} | ${row.published} | ${row.knownTotal ?? 'À recenser'} | ${row.percent === null ? '—' : `${row.percent.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} %`} |`);
  lines.push('', `Sous-total des ${knownCategories} catégories chiffrées : **${report.knownSubtotal.published}/${report.knownSubtotal.knownTotal}** types. Les ${unknownCategories} autres catégories sont exclues de ce dénominateur.`, '',
    '## Sélection régionale publiée', '', '| Région | Parcours au départ | Acquisitions | Boss | Grâces |', '| --- | ---: | ---: | ---: | ---: |');
  for (const row of report.regionalCoverage) lines.push(`| ${row.name} | ${row.quests} | ${row.acquisitions} | ${row.bosses} | ${row.graces} |`);
  lines.push('', '## Références et limites', '', `${report.sources.unique} URL documentaires distinctes pour ${report.sources.citations} citations. ${report.sources.versionedCitations} citations précisent une version du jeu.`, '');
  lines.push(...report.limits.map(limit => `- ${limit}`));
  lines.push('', 'Une région vide désigne une absence dans la sélection. Les coches inconnues restent sauvegardées et ne sont pas comptées.', '',
    'Les totaux et leurs sources sont définis dans `src/catalog/itemCoverage.ts`. Les URL de toutes les fiches figurent dans la sortie JSON de `npm run catalog:check -- --json`.', '',
    '## Erreurs', '', ...(report.errors.length ? report.errors.map(error => `- ${error}`) : ['Aucune erreur détectée sur le catalogue publié.']), '');
  return lines.join('\n');
}
