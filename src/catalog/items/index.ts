import { gearItems } from './gear';
import { magicItems } from './magic';
import { toolsItems } from './tools';
import { upgradesItems } from './upgrades';
export { pickups } from './pickups';
export { itemActors, itemGraces } from './references';
export { collectionScope } from './scope';
export const items = [...gearItems, ...magicItems, ...toolsItems, ...upgradesItems];

// Les améliorations se suivent uniquement par emplacement et par cycle.
export const collectionItems = items.filter(item => item.category !== 'upgrade');
