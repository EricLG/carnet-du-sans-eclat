import { merchantItems } from './merchants';
import { teachingItems } from './teachings';
import { earlyRewardItems } from './early-rewards';
import { explorationEquipmentItems } from './exploration-equipment';
import { liurniaArmorItems } from './liurnia-armor';
import { regionalSorceryItems } from './regional-sorceries';
import { buildCompletionItems } from './completion';
import { gearItems } from './gear';
import { magicItems } from './magic';
import { toolsItems } from './tools';
import { upgradesItems } from './upgrades';
export { pickups } from './pickups';
export { itemActors, itemGraces } from './references';
export { collectionScope } from './scope';
const selectedItems = [...gearItems, ...magicItems, ...toolsItems, ...upgradesItems, ...merchantItems, ...teachingItems, ...earlyRewardItems,
  ...explorationEquipmentItems, ...liurniaArmorItems, ...regionalSorceryItems];
export const items = [...selectedItems, ...buildCompletionItems(selectedItems)];

// Les améliorations se suivent uniquement par emplacement et par cycle.
export const collectionItems = items.filter(item => item.category !== 'upgrade');
