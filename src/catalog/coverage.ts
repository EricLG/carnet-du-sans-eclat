import type { Quest } from '../domain/catalog';
import type { QuestScopeEntry } from './questScope';

export function validateQuestCoverage(quests: Quest[], scope: QuestScopeEntry[]): string[] {
  const errors: string[] = [];
  const expected = new Set<string>();
  const characters = new Set<string>();
  for (const entry of scope) {
    if (expected.has(entry.questId)) errors.push(`Parcours dupliqué dans le périmètre : ${entry.questId}`);
    expected.add(entry.questId);
    if (!entry.characters.length) errors.push(`Parcours sans personnage : ${entry.questId}`);
    for (const character of entry.characters) {
      if (characters.has(character.id)) errors.push(`Personnage dupliqué : ${character.id}`);
      characters.add(character.id);
    }
    const matches = quests.filter(quest => quest.id === entry.questId);
    if (matches.length !== 1) { errors.push(`Parcours attendu une seule fois : ${entry.questId}`); continue; }
    const quest = matches[0];
    if (quest.startRegionId !== entry.startRegionId || quest.kind !== entry.kind) errors.push(`Classement incohérent : ${quest.id}`);
    const owned = [quest.npcId, ...(quest.relatedNpcIds ?? [])].sort();
    if (JSON.stringify(owned) !== JSON.stringify(entry.characters.map(character => character.id).sort())) errors.push(`Personnages incohérents : ${quest.id}`);
    if (JSON.stringify(quest.relatedQuestIds ?? []) !== JSON.stringify(entry.relatedQuestIds)) errors.push(`Liens incohérents : ${quest.id}`);
  }
  for (const quest of quests) if (!expected.has(quest.id)) errors.push(`Parcours hors périmètre : ${quest.id}`);
  return errors;
}

export function questCoverage(quests: Quest[], scope: QuestScopeEntry[]) {
  const expected = new Map(scope.map(entry => [entry.questId, entry]));
  const published = new Map(quests.filter(quest => expected.has(quest.id)).map(quest => [quest.id, quest]));
  return {
    expected: expected.size,
    published: published.size,
    quests: [...published.values()].filter(entry => entry.kind === 'quest').length,
    encounters: [...published.values()].filter(entry => entry.kind === 'encounter').length,
    stories: [...published.values()].filter(entry => entry.kind === 'story').length,
  };
}
