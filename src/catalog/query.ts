import type { Quest } from '../domain/catalog';

export const questStatusLabels = { not_started: 'Non commencée', in_progress: 'En cours', completed: 'Terminée', failed: 'Échouée' } as const;
export const questKindLabels = { quest: 'Quête', encounter: 'Rencontre', story: 'Parcours principal' } as const;
export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr').trim();
export type QuestFilter = {
  search: string; region: string;
  status: 'all' | keyof typeof questStatusLabels;
  kind: 'all' | NonNullable<Quest['kind']>;
};
export function filterQuests(quests: Quest[], npcs: { id: string; name: string }[], filter: QuestFilter, progression: Record<string, { status: string }> = {}): Quest[] {
  const names = new Map(npcs.map(npc => [npc.id, npc.name]));
  const search = normalizeSearch(filter.search);
  return quests.filter(quest => {
    const characters = [quest.npcId, ...(quest.relatedNpcIds ?? [])].map(id => names.get(id) ?? '').join(' ');
    return normalizeSearch(`${quest.name} ${characters} ${quest.summary}`).includes(search) &&
      (filter.region === 'all' || quest.regionIds.includes(filter.region)) &&
      (filter.kind === 'all' || quest.kind === filter.kind) &&
      (filter.status === 'all' || (progression[quest.id]?.status ?? 'not_started') === filter.status);
  });
}
export function groupQuestsByStartRegion(quests: Quest[], regions: { id: string; name: string }[]) {
  return regions.map(region => ({ ...region, quests: quests.filter(quest => quest.startRegionId === region.id) }))
    .filter(group => group.quests.length > 0);
}
