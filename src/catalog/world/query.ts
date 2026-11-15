import type { Item } from '../../domain/items';
import type { WorldEntry, WorldKind } from '../../domain/world';
import { normalizeSearch } from '../query';

export type WorldFilter = { search: string; region: string; status: 'all' | 'done' | 'missing' };
export const emptyWorldFilter: WorldFilter = { search: '', region: 'all', status: 'all' };
export function filterWorld<T extends WorldEntry>(entries: T[], filter: WorldFilter, flags: Record<string, boolean> = {}): T[] {
  const search = normalizeSearch(filter.search);
  return entries.filter(entry => (filter.region === 'all' || entry.regionIds.includes(filter.region)) &&
    (filter.status === 'all' || (filter.status === 'done' ? !!flags[entry.id] : !flags[entry.id])) &&
    normalizeSearch([entry.name, ...entry.aliases, entry.location, entry.access].join(' ')).includes(search))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}
export function worldItems(kind: WorldKind, id: string, items: Item[]): Item[] {
  return items.filter(item => item.acquisitions.some(acquisition => kind === 'boss' ? acquisition.sourceEntityId === id : acquisition.graceId === id));
}
export function worldProgress(entries: WorldEntry[], flags: Record<string, boolean> = {}) {
  return { done: entries.filter(entry => !!flags[entry.id]).length, total: entries.length };
}
export function validateWorldScope(bosses: WorldEntry[], graces: WorldEntry[], scope: { bossIds: string[]; graceIds: string[] }) {
  const errors: string[] = [];
  for (const [entries, expected, label] of [[bosses, scope.bossIds, 'boss'], [graces, scope.graceIds, 'grâces']] as const) {
    if (new Set(expected).size !== expected.length) errors.push(`Périmètre dupliqué : ${label}`);
    if (JSON.stringify(entries.map(entry => entry.id).sort()) !== JSON.stringify([...expected].sort())) errors.push(`Couverture incohérente : ${label}`);
  }
  return errors;
}
