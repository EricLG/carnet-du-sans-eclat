import { items, pickups, itemActors, itemGraces, collectionScope } from './items';
import { quests, npcs, regions } from './quests';
import { questScope, scopeSource } from './questScope';
import { bosses, graces, worldScope } from './world';
import { knownBaseItemTotals } from './itemCoverage';

// Catalogue public uniquement : ni progression personnelle, ni accès au stockage.
export const publishedCatalog = {
  quests, npcs, regions, questScope, scopeSource, items, pickups, itemActors, itemGraces,
  collectionScope, bosses, graces, worldScope, knownBaseItemTotals,
};
export type PublishedCatalog = typeof publishedCatalog;
