import { z } from 'zod';

export const sourceSchema = z.object({ label: z.string().min(1), url: z.url(), verifiedAt: z.iso.date(), gameVersion: z.string().optional() });
export const questSchema = z.object({
  id: z.string().min(1), name: z.string().min(1), npcId: z.string().min(1),
  content: z.enum(['base', 'dlc']), regionIds: z.array(z.string().min(1)).min(1),
  startRegionId: z.string().min(1).optional(), kind: z.enum(['quest', 'encounter', 'story']).optional(),
  relatedNpcIds: z.array(z.string().min(1)).optional(), relatedQuestIds: z.array(z.string().min(1)).optional(),
  summary: z.string().min(1), requirements: z.array(z.string()), warnings: z.array(z.string()), rewards: z.array(z.string()),
  sources: z.array(sourceSchema).min(1),
  branches: z.array(z.object({ id: z.string().min(1), label: z.string().min(1), options: z.array(z.object({ id: z.string().min(1), label: z.string().min(1), consequence: z.string() })).min(2) })),
  steps: z.array(z.object({ id: z.string().min(1), title: z.string().min(1), location: z.string().min(1),
    detail: z.string().min(1), optional: z.boolean().optional(), branch: z.object({ groupId: z.string(), optionId: z.string() }).optional() })).min(1),
});
export type Quest = z.infer<typeof questSchema>;
export type Content = Quest['content'];
export type Source = z.infer<typeof sourceSchema>;
export type CatalogEntry = { id: string; name: string; content: Content; regionIds: string[]; sources: Source[] };
export type { Acquisition, Item, Pickup } from './items';
export type { Boss, Grace } from './world';

export function validateQuests(quests: Quest[], regionIds: string[], npcIds: string[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const questIds = new Set(quests.map(quest => quest.id));
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
    if (quest.startRegionId && (!regionIds.includes(quest.startRegionId) || !quest.regionIds.includes(quest.startRegionId))) errors.push(`Région de départ invalide : ${quest.id}`);
    if (new Set(quest.regionIds).size !== quest.regionIds.length) errors.push(`Régions dupliquées : ${quest.id}`);
    for (const id of quest.relatedNpcIds ?? []) if (!npcIds.includes(id)) errors.push(`PNJ associé inconnu : ${id}`);
    for (const id of quest.relatedQuestIds ?? []) if (!questIds.has(id) || id === quest.id) errors.push(`Quête associée invalide : ${id}`);
    for (const values of [quest.relatedNpcIds ?? [], quest.relatedQuestIds ?? []]) if (new Set(values).size !== values.length) errors.push(`Liens dupliqués : ${quest.id}`);
    for (const branch of quest.branches) if (new Set(branch.options.map(option => option.id)).size !== branch.options.length) errors.push(`Options dupliquées : ${branch.id}`);
    for (const step of quest.steps) if (step.branch && !quest.branches.some(branch => branch.id === step.branch!.groupId && branch.options.some(option => option.id === step.branch!.optionId))) {
      errors.push(`Branche inconnue : ${step.id}`);
    }
  }
  return errors;
}
