import type { Quest } from '../domain/catalog';
import { questScope } from './questScope';
import { pilotQuests } from './quests/pilot';
import { limgraveQuests } from './quests/limgrave';
import { liurniaQuests } from './quests/liurnia';
import { roundtableQuests } from './quests/roundtable';
import { lateQuests } from './quests/late';
import { encountersQuests } from './quests/encounters';

export { regions } from './regions';
export const catalogVersion = '2026.11.14.2';
export const npcs = questScope.flatMap(entry => entry.characters.map(character => ({ ...character, questId: entry.questId })));
const scopeById = new Map(questScope.map(entry => [entry.questId, entry]));
const extraRegions: Record<string, string[]> = { 'quest.boc': ['capital'], 'quest.kenneth': ['roundtable', 'capital'] };
export const quests: Quest[] = [pilotQuests, limgraveQuests, liurniaQuests, roundtableQuests, lateQuests, encountersQuests].flat().map(quest => {
  const entry = scopeById.get(quest.id);
  if (!entry) throw new Error(`Parcours absent du périmètre : ${quest.id}`);
  // Ajouts géographiques uniquement : les identifiants et étapes du pilote restent inchangés.
  return { ...quest, regionIds: [...quest.regionIds, ...(extraRegions[quest.id] ?? [])], kind: entry.kind, startRegionId: entry.startRegionId,
    relatedNpcIds: entry.characters.filter(character => character.id !== quest.npcId).map(character => character.id),
    relatedQuestIds: entry.relatedQuestIds };
});
