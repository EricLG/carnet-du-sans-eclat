import { z } from 'zod';

export const sourceSchema = z.object({ label: z.string().min(1), url: z.url(), verifiedAt: z.iso.date(), gameVersion: z.string().optional() });
export const questSchema = z.object({
  id: z.string().min(1), name: z.string().min(1), npcId: z.string().min(1),
  content: z.enum(['base', 'dlc']), regionIds: z.array(z.string()).min(1),
  summary: z.string().min(1), requirements: z.array(z.string()), warnings: z.array(z.string()), rewards: z.array(z.string()),
  sources: z.array(sourceSchema).min(1),
  branches: z.array(z.object({ id: z.string(), label: z.string(), options: z.array(z.object({ id: z.string(), label: z.string(), consequence: z.string() })).min(2) })),
  steps: z.array(z.object({ id: z.string().min(1), title: z.string().min(1), location: z.string().min(1),
    detail: z.string().min(1), optional: z.boolean().optional(), branch: z.object({ groupId: z.string(), optionId: z.string() }).optional() })).min(1),
});
export type Quest = z.infer<typeof questSchema>;
export type Content = Quest['content'];
export type Source = z.infer<typeof sourceSchema>;
export type CatalogEntry = { id: string; name: string; content: Content; regionIds: string[]; sources: Source[] };
export type Acquisition = {
  id: string;
  method: 'merchant' | 'boss_reward' | 'enemy_drop' | 'exploration' | 'npc_dialogue' | 'quest_reward' | 'remembrance_exchange' | 'puzzle' | 'other';
  location: string; description: string; sourceEntityId?: string; graceId?: string;
  price?: string; conditions: string[];
  probability: { kind: 'guaranteed' } | { kind: 'chance'; percent: number; conditions: string } | { kind: 'unknown' };
  sources: Source[];
};
export type Item = CatalogEntry & {
  category: 'weapon' | 'shield' | 'armor' | 'talisman' | 'sorcery' | 'incantation' | 'ash_of_war' | 'spirit_ash' | 'tool' | 'key_item' | 'upgrade';
  acquisitions: Acquisition[];
};
export type Boss = CatalogEntry & { location: string; access: string; respawns: false; kind: 'boss' | 'mini_boss'; itemIds: string[] };
export type Grace = CatalogEntry & { location: string; access: string };
export type Pickup = CatalogEntry & { itemId: string; acquisitionId: string };

export function validateQuests(quests: Quest[], regionIds: string[], npcIds: string[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const input of quests) {
    const result = questSchema.safeParse(input);
    if (!result.success) { errors.push(`Fiche invalide : ${input.id}`); continue; }
    const quest = result.data;
    for (const id of [quest.id, ...quest.steps.map(step => step.id), ...quest.branches.map(branch => branch.id)]) {
      if (ids.has(id)) errors.push(`Identifiant dupliqué : ${id}`);
      ids.add(id);
    }
    if (!npcIds.includes(quest.npcId)) errors.push(`PNJ inconnu : ${quest.npcId}`);
    for (const id of quest.regionIds) if (!regionIds.includes(id)) errors.push(`Région inconnue : ${id}`);
    for (const branch of quest.branches) if (new Set(branch.options.map(option => option.id)).size !== branch.options.length) errors.push(`Options dupliquées : ${branch.id}`);
    for (const step of quest.steps) if (step.branch && !quest.branches.some(branch => branch.id === step.branch!.groupId && branch.options.some(option => option.id === step.branch!.optionId))) {
      errors.push(`Branche inconnue : ${step.id}`);
    }
  }
  return errors;
}
