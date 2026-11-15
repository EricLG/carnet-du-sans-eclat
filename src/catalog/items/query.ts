import type { Acquisition, AcquisitionActor, AcquisitionMethod, Item, ItemCategory, Pickup } from '../../domain/items';
import { normalizeSearch } from '../query';

export const categoryLabels: Record<ItemCategory, string> = {
  weapon: 'Armes', shield: 'Boucliers', armor: 'Armures', talisman: 'Talismans',
  sorcery: 'Sorcelleries', incantation: 'Incantations', ash_of_war: 'Cendres de guerre',
  spirit_ash: 'Cendres d’invocation', tool: 'Outils permanents', key_item: 'Objets de progression', upgrade: 'Améliorations importantes',
};
export const collectionCategoryLabels = Object.fromEntries(Object.entries(categoryLabels).filter(([category]) => category !== 'upgrade'));
export const methodLabels: Record<AcquisitionMethod, string> = {
  merchant: 'Marchand', boss_reward: 'Récompense de boss', enemy_drop: 'Butin d’ennemi',
  exploration: 'Exploration', npc_dialogue: 'Discussion avec un PNJ', quest_reward: 'Récompense de quête',
  remembrance_exchange: 'Échange de souvenir', puzzle: 'Énigme', other: 'Autre',
};
export const armorSlotLabels = { head: 'Tête', chest: 'Torse', hands: 'Mains', legs: 'Jambes' };
export type CollectionFilter = {
  search: string; category: 'all' | ItemCategory; region: string; method: 'all' | AcquisitionMethod;
  status: 'all' | 'obtained' | 'missing';
};
export const emptyCollectionFilter: CollectionFilter = { search: '', category: 'all', region: 'all', method: 'all', status: 'all' };
function matches(item: Item, acquisitions: Acquisition[], actors: AcquisitionActor[], filter: CollectionFilter): boolean {
  if (filter.category !== 'all' && item.category !== filter.category) return false;
  // La région et la méthode doivent décrire la même source.
  const matching = acquisitions.filter(a => (filter.region === 'all' || a.regionId === filter.region) &&
    (filter.method === 'all' || a.method === filter.method));
  if (!matching.length) return false;
  const names = new Map(actors.map(actor => [actor.id, actor.name]));
  const searchable = [item.name, ...item.aliases, item.summary, ...matching.flatMap(a => [a.location, a.description, names.get(a.sourceEntityId ?? '') ?? ''])].join(' ');
  return normalizeSearch(searchable).includes(normalizeSearch(filter.search));
}
function matchesStatus(id: string, flags: Record<string, boolean>, status: CollectionFilter['status']) {
  return status === 'all' || (status === 'obtained' ? !!flags[id] : !flags[id]);
}
export function filterItems(items: Item[], actors: AcquisitionActor[], filter: CollectionFilter, collection: Record<string, boolean> = {}): Item[] {
  return items.filter(item => matchesStatus(item.id, collection, filter.status) && matches(item, item.acquisitions, actors, filter))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}
export function filterPickups(pickups: Pickup[], items: Item[], actors: AcquisitionActor[], filter: CollectionFilter, progress: Record<string, boolean> = {}): Pickup[] {
  const byId = new Map(items.map(item => [item.id, item]));
  return pickups.filter(pickup => {
    const item = byId.get(pickup.itemId);
    if (!item || !matchesStatus(pickup.id, progress, filter.status)) return false;
    return matches(item, item.acquisitions.filter(a => a.id === pickup.acquisitionId), actors, filter);
  }).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}
export function groupPickupsByItem(pickups: Pickup[], items: Item[]) {
  return items.filter(item => item.category === 'upgrade')
    .map(item => ({ item, pickups: pickups.filter(pickup => pickup.itemId === item.id) }))
    .filter(group => group.pickups.length > 0)
    .sort((a, b) => a.item.name.localeCompare(b.item.name, 'fr'));
}
export function validateCollectionScope(items: Item[], pickups: Pickup[], scope: { itemIds: string[]; pickupIds: string[] }): string[] {
  const errors: string[] = [];
  for (const [label, actual, expected] of [['objets', items.map(item => item.id), scope.itemIds], ['ramassages', pickups.map(pickup => pickup.id), scope.pickupIds]] as const) {
    if (new Set(expected).size !== expected.length) errors.push(`Périmètre dupliqué : ${label}`);
    if (JSON.stringify([...actual].sort()) !== JSON.stringify([...expected].sort())) errors.push(`Couverture incohérente : ${label}`);
  }
  return errors;
}
