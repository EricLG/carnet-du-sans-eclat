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
  return { asOf, version: catalog.collectionScope.version, errors: [...new Set(errors)].sort(), publication, questCoverage: questCoverage(quests, catalog.questScope), itemCoverage,
    knownSubtotal, regionalCoverage, sources: { unique: sources.size, citations, versionedCitations,
      entries: [...sources.values()].map(source => ({ ...source, labels: [...source.labels].sort() })).sort((a, b) => a.url.localeCompare(b.url)) },
    limits: ['Les objets, acquisitions, boss et grâces restent partiels.', `Les ${publication.quests} parcours PNJ couvrent le périmètre éditorial défini, sans recenser chaque dialogue.`,
      `Les dénominateurs chiffrés concernent ${knownCategories.length} catégories du jeu de base d’origine ; aucun pourcentage global du jeu.`,
      'Les dates de revue documentaire ne prouvent ni un essai en jeu ni la disponibilité actuelle des pages.'] };
}
export type CatalogAudit = ReturnType<typeof auditCatalog>;

export function formatCatalogAudit(report: CatalogAudit): string {
  const p = report.publication;
  const q = report.questCoverage;
  const knownCategories = report.itemCoverage.filter(row => row.knownTotal !== null).length;
  const unknownCategories = report.itemCoverage.length - knownCategories;
  const lines = ['# Catalogue : contenu, couverture et contrôles', '',
    `Publication \`${report.version}\` · contrôle local du ${report.asOf} : **${report.errors.length} erreur(s) d’intégrité**.`, '',
    'Ce document regroupe le périmètre des quêtes, objets, boss et grâces, leurs sources et les commandes de vérification. La [feuille de route](ROADMAP.md) décrit les travaux restants ; le [README](../README.md) explique comment lancer et utiliser le carnet.', '',
    'Les chiffres sont calculés depuis les données embarquées dans l’application, sans lire les sauvegardes personnelles. Ils indiquent ce que le carnet référence, pas ce qu’un personnage a obtenu ou terminé.', '',
    '## Contenu disponible', '',
    '| Donnée | Nombre | Ce qui est compté |', '| --- | ---: | --- |',
    `| Parcours PNJ | ${p.quests} | Une fiche de suivi, parfois commune à plusieurs personnages |`,
    `| Types d’objets | ${p.items} | Une fiche par type ou variante nommée, indépendamment des quantités possédées |`,
    `| Objets de collection | ${p.collection} | Les types d’objets cochables par personnage, hors améliorations suivies par cycle |`,
    `| Obtentions documentées | ${p.acquisitions} | Les acquisitions : un lieu, une méthode et des conditions pour obtenir un objet |`,
    `| Emplacements d’amélioration | ${p.pickups} | Les ramassages garantis cochables par cycle ; ils font déjà partie des obtentions |`,
    `| Rencontres de boss | ${p.bosses} | Une rencontre à un lieu donné ; des boss homonymes peuvent avoir plusieurs fiches |`,
    `| Sites de grâce | ${p.graces} | Une fiche par site référencé |`, '',
    'Un objet peut avoir plusieurs obtentions : un achat et un ramassage du même objet comptent pour deux acquisitions, mais pour un seul type. Un ensemble d’armure conserve une fiche et une coche par pièce.', '',
    '## Périmètre des parcours PNJ', '',
    `${q.published}/${q.expected} parcours du périmètre éditorial sont présents : **${q.quests} quêtes, ${q.encounters} rencontres courtes et ${q.stories} parcours principal**. Melina relève du récit principal. Plusieurs personnages peuvent partager une fiche, notamment Irina/Edgar, Millicent/Gowry et Corhyn/Masque d’or.`, '',
    'Les rencontres courtes couvrent Albus, Ensha, Hewg, Iji, Miriel, Pidia et la Grande jarre. Les boutiques ordinaires, répliques isolées, contenus supprimés et PNJ du DLC sont exclus. Une couverture de 40/40 porte sur cet inventaire, sans prétendre reproduire tous les dialogues ou itinéraires possibles du jeu.', '',
    'Les parcours sont classés par région de départ ; la recherche peut aussi retrouver leurs régions visitées. L’inventaire indépendant est dans [questScope.ts](../src/catalog/questScope.ts), les fiches dans [quests/](../src/catalog/quests/).', '',
    '## Couverture des types d’objets du jeu de base d’origine', '', '| Catégorie | Publiés | Total connu | Couverture |', '| --- | ---: | ---: | ---: |'];
  for (const row of report.itemCoverage) lines.push(`| ${row.label} | ${row.published} | ${row.knownTotal ?? 'À recenser'} | ${row.percent === null ? '—' : `${row.percent.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} %`} |`);
  lines.push('', `Sous-total des ${knownCategories} catégories chiffrées : **${report.knownSubtotal.published}/${report.knownSubtotal.knownTotal}** types. Les ${unknownCategories} autres catégories sont exclues de ce dénominateur.`, '',
    'La couverture mesure la présence de fiches avec au moins une obtention ; elle ne garantit pas que tous les marchands, équipements de départ ou lieux alternatifs sont répertoriés. « À recenser » signifie que le total attendu n’est pas encore établi : aucun pourcentage n’est calculé pour ces catégories, ni pour le catalogue entier.', '',
    'Les armes comprennent arcs, bâtons, sceaux et torches ; les boucliers sont séparés. Les armures retouchées et variantes nommées de talismans (+1, +2…) sont distinctes. Les niveaux d’amélioration, affinités et niveaux des invocations ne créent pas de types supplémentaires. La Brindille sacrificielle, consommable, est exclue des talismans permanents.', '',
    'Le DLC et les ajouts de versions ultérieures hors inventaire sont exclus. Les consommables ordinaires, munitions, matériaux de fabrication et pierres/muguets ordinaires d’amélioration ne sont pas publiés. Les souvenirs sont classés comme objets de progression.', '',
    'Les améliorations suivies par cycle comprennent les Larmes de vie et Pierres de mémoire du jeu de base, ainsi qu’une partie des Graines dorées et Larmes de cristal. Elles apparaissent uniquement dans « Améliorations du cycle », regroupées par objet puis par emplacement.', '',
    'Les totaux et leurs sources sont centralisés dans [itemCoverage.ts](../src/catalog/itemCoverage.ts) : [Roundtable — armes et boucliers](https://roundtablehold.net/checklists/weapons.html), [Lore Armory — équipement](https://lorearmory.com/eldenring/), [Cheat Sheet — sorts](https://barcodebunny.github.io/elden-ring-cheat-sheet/) et [exclusion de la Brindille sacrificielle](https://eldenring.wiki.gg/wiki/Sacrificial_Twig).', '',
    '## Fiches et obtentions présentes dans le carnet, par région', '',
    'Ce tableau répartit les données du catalogue selon leur rattachement géographique. Il ne mesure pas la progression d’un personnage et ne donne pas le nombre total d’éléments existant dans chaque région du jeu.', '',
    '- **Parcours PNJ au départ** : fiches dont la région de départ est celle de la ligne, même si elles continuent ailleurs (`startRegionId`). Un parcours n’est compté qu’une fois.',
    '- **Obtentions d’objets** : acquisitions dont le lieu est dans cette région (`regionId`). Plusieurs obtentions d’un même objet comptent séparément ; ce n’est pas un nombre de types d’objets distincts.',
    '- **Rencontres de boss** et **sites de grâce** : fiches rattachées à cette région (`regionIds`). Les homonymes à des lieux différents restent des rencontres distinctes.', '',
    'Par exemple, la ligne Farum Azula peut contenir zéro parcours au départ tout en comprenant des obtentions et des boss : des quêtes commencées ailleurs y passent. Un zéro signifie « aucune fiche de cette catégorie rattachée ici dans le carnet », pas « aucun contenu dans le jeu ». Si une fiche de boss ou de grâce est rattachée à plusieurs régions, elle apparaît dans chacune ; les totaux généraux la comptent une seule fois.', '',
    '| Région | Parcours PNJ au départ | Obtentions d’objets | Rencontres de boss | Sites de grâce |', '| --- | ---: | ---: | ---: | ---: |');
  for (const row of report.regionalCoverage) lines.push(`| ${row.name} | ${row.quests} | ${row.acquisitions} | ${row.bosses} | ${row.graces} |`);
  lines.push('', 'Les boss et grâces restent partiels : les premières régions et les rencontres donnant les objets publiés ont été privilégiées. Les invasions et ennemis uniques ordinaires ne deviennent pas des boss. Les fiches sont dans [world/](../src/catalog/world/), avec un inventaire de publication indépendant.', '',
    '## Sources et adaptation des données', '',
    `${report.sources.unique} URL documentaires distinctes pour ${report.sources.citations} citations dans les fiches et les totaux. Une même page citée dans plusieurs fiches compte pour une URL et plusieurs citations. ${report.sources.versionedCitations} citations précisent une version du jeu.`, '',
    '- **Inventaires** : [Roundtable — parcours PNJ](https://roundtablehold.net/checklists/npc_questlines.html) et [Completion Sheets — objets](https://github.com/rdmaw/elden-ring-completion-sheets/tree/151490b721e05fc7138aee9264c2e171fca10c0f/sheets). Les balises DLC et Tarnished Pack sont exclues de l’inventaire d’objets.',
    '- **Noms français** : [textes extraits du jeu](https://github.com/elden-ring-data/msg/blob/4bbba478e478e9018d0293e0b18cd8cf706199e9/frafr/item.msgbnd.dcx.json), rapprochés des noms anglais par identifiant et table de texte. Les longs textes narratifs du jeu ne sont pas importés.',
    '- **Obtentions et conditions** : références propres aux fiches, notamment Roundtable, Eldenpedia, Tarnished, PowerPyx, SuperSoluce et Neoseeker. Les descriptions sont des synthèses françaises ; les prix et taux ne sont pas déduits des listes d’inventaire.', '',
    'Les inventaires et révisions sources sont conservés dans [items/](../src/catalog/items/), notamment `base-inventory.json`, `extended-*-inventory.json` et les références des fichiers `complete-*.ts`. Les tables AccessoryName, GoodsName et GemName restent distinctes pour éviter les homonymes ; les cendres de guerre ont un alias anglais préfixé `Ash of War:`. L’incantation et la cendre « Serment doré » ont deux identifiants.', '',
    'Les retouches, souvenirs, parchemins et bréviaires renvoient aux objets requis. Les limites liées à Maliketh, Rykard, Seluvis, Millicent et aux autres branches sont décrites dans les acquisitions concernées. Les exceptions recoupées restent dans les données : Danse des lames vient d’un scarabée, les cendres de Kaiden des catacombes au pied des falaises, et le Talisman de la graine pourpre d’un ramassage derrière un sceau.', '',
    'La méthode d’obtention et sa garantie sont distinctes. Un taux inconnu reste absent ; il ne devient jamais 0 %. La communion draconique est décrite comme un échange en cœurs, sans faux marchand ni échange de souvenir. Les marionnettes précisent les choix de potion et leurs prix en éclats.', '',
    'Les données sont embarquées : aucune API communautaire n’est appelée pendant l’utilisation. FanAPI et ERDB ne sont pas importés. La date `verifiedAt` correspond à une revue documentaire, sans essai en jeu ; un succès HTTP ne prouve pas le contenu d’une page. Toutes les URL et leurs dates sont disponibles dans les fiches et dans la sortie JSON de l’audit.', '',
    '## Vérifier et actualiser ce document', '',
    'Les commandes se lancent à la racine du projet. Aucun serveur Expo ni navigateur n’est nécessaire. Dans PowerShell, utiliser `npm.cmd` si `npm` est bloqué par la politique d’exécution.', '',
    '| Commande | À quoi elle sert | Réseau / fichiers modifiés |', '| --- | --- | --- |',
    '| `npm run catalog:check` | Détecter les incohérences du catalogue local : fiches manquantes, identifiants dupliqués, liens vers des objets/PNJ/boss absents, sources ou totaux invalides | Sans réseau ; ne modifie aucun fichier |',
    '| `npm run catalog:check -- --write-report` | Faire le même contrôle et recalculer les chiffres de ce document après une mise à jour des données | Sans réseau ; réécrit uniquement `docs/CATALOG_AUDIT.md` |',
    '| `npm run catalog:check -- --json` | Obtenir les résultats détaillés, dont les URL sources, pour examiner une erreur ou exploiter les données | Sans réseau ; écrit le JSON dans le terminal |',
    '| `npm run catalog:links` | Tester si les pages web citées comme sources répondent encore | Accès Internet ; ne modifie ni le catalogue ni ce document |',
    '| `npm run catalog:links -- --json` | Afficher le détail du contrôle HTTP pour chaque URL | Accès Internet ; écrit le JSON dans le terminal |', '',
    '**Après un ajout ou une correction de données** : lancer `npm test`, puis `npm run catalog:check -- --write-report` et lire les erreurs éventuelles. `catalog:check` ne télécharge pas de nouveaux objets et ne vérifie pas les faits du jeu. La compatibilité des anciens identifiants et des sauvegardes est également couverte par les tests métier.', '',
    '**Pour revoir les liens des sources** : lancer `npm run catalog:links` (avec un « s », sans commande `catalog:link` au singulier). Un accès réussi confirme seulement que le serveur répond. Une absence 404/410 est confirmée par une requête GET ; un refus 403/429, une erreur serveur ou un délai dépassé reste « non vérifié ». Le contrôle utilise les certificats système, au plus trois requêtes simultanées et huit secondes par requête.', '',
    'Codes de sortie : `catalog:check` renvoie **0** si le contrôle local passe, **1** sinon. `catalog:links` renvoie **0** si toutes les pages sont accessibles, **1** si une page est absente ou si le contrôle local échoue, **2** si des accès restent non vérifiés sans absence confirmée. Les dates de revue documentaire ne sont jamais actualisées automatiquement.', '',
    'Le contrôle HTTP est séparé du rapport local : sa régénération ne recontrôle pas les liens. Le dernier relevé du 15 novembre 2026 ne couvrait que les 27 nouvelles URL de cette publication : 23 accessibles, aucune absence confirmée et quatre accès non vérifiés. Il ne vaut pas validation HTTP de toutes les sources actuelles.', '',
    'Le texte explicatif et les tableaux sont produits par [formatCatalogAudit](../src/catalog/audit.ts) ; modifier ce générateur pour conserver une correction lors de la prochaine régénération. Les commandes sont définies dans [package.json](../package.json).', '',
    '## Progression, compatibilité et limites', '',
    'La collection appartient au personnage et persiste en NG+. Quêtes, boss, grâces et ramassages appartiennent au cycle. Toutes les coches et le statut global des quêtes sont manuels et indépendants : obtenir une récompense ne coche pas son boss et changer de branche ne supprime aucune coche.', '',
    'Le format de sauvegarde reste en version 1. Les imports créent des copies après aperçu. Les identifiants inconnus et anciennes coches de collection des améliorations restent conservés, sans gonfler les compteurs ni être convertis en ramassages. Les références `catalog-ids.v1.json`, `item-completion-ids.json` et `secondary-item-completion-ids.json`, dans [tests/fixtures/](../tests/fixtures/), protègent les identifiants déjà publiés ; ne pas les régénérer pour masquer une suppression.', '');
  lines.push(...report.limits.map(limit => `- ${limit}`));
  lines.push('', 'La dernière validation de la publication `2026.11.15.4` comportait 64 tests métier et sept parcours navigateur réussis aux formats 390 × 844 et 360 × 800, avec lint, TypeScript, export web et audit local réussis. Ce bilan ne se met pas à jour avec `catalog:check` et ne remplace pas une nouvelle exécution des vérifications après modification. Android et iOS restent à tester sur appareil.', '',
    '## Erreurs', '', ...(report.errors.length ? report.errors.map(error => `- ${error}`) : ['Aucune erreur détectée sur le catalogue publié.']), '');
  return lines.join('\n');
}
