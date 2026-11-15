import { z } from 'zod';
import { sourceSchema } from './catalog';
import type { AcquisitionActor, GraceReference, Item } from './items';

const entrySchema = z.object({
  id: z.string().min(1), name: z.string().min(1), aliases: z.array(z.string().min(1)),
  content: z.enum(['base', 'dlc']), regionIds: z.array(z.string().min(1)).length(1),
  location: z.string().min(1), access: z.string().min(1), conditions: z.array(z.string().min(1)),
  relatedQuestIds: z.array(z.string().min(1)), sources: z.array(sourceSchema).min(1),
});
export const bossSchema = entrySchema.extend({
  id: z.string().regex(/^boss\./), respawns: z.literal(false), kind: z.enum(['boss', 'mini_boss']),
  graceIds: z.array(z.string().min(1)),
});
export const graceSchema = entrySchema.extend({ id: z.string().regex(/^grace\./), bossId: z.string().min(1).optional() });
export type Boss = z.infer<typeof bossSchema>;
export type Grace = z.infer<typeof graceSchema>;
export type WorldEntry = Boss | Grace;
export type WorldKind = 'boss' | 'grace';

type References = { regionIds: string[]; questIds: string[]; actors: AcquisitionActor[]; graces: GraceReference[]; items: Item[] };
export function validateWorld(bosses: Boss[], graces: Grace[], refs: References): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const validBosses = bosses.filter(entry => {
    if (bossSchema.safeParse(entry).success) return true;
    errors.push(`Fiche d’exploration invalide : ${entry.id}`); return false;
  });
  const validGraces = graces.filter(entry => {
    if (graceSchema.safeParse(entry).success) return true;
    errors.push(`Fiche d’exploration invalide : ${entry.id}`); return false;
  });
  const bossById = new Map(validBosses.map(entry => [entry.id, entry]));
  const graceById = new Map(validGraces.map(entry => [entry.id, entry]));
  for (const entries of [validBosses, validGraces]) {
    for (const entry of entries) {
      if (ids.has(entry.id)) errors.push(`Identifiant d’exploration dupliqué : ${entry.id}`);
      ids.add(entry.id);
      for (const id of entry.regionIds) if (!refs.regionIds.includes(id)) errors.push(`Région inconnue : ${entry.id}`);
      for (const id of entry.relatedQuestIds) if (!refs.questIds.includes(id)) errors.push(`Quête inconnue : ${entry.id}`);
      if (new Set(entry.relatedQuestIds).size !== entry.relatedQuestIds.length) errors.push(`Quêtes dupliquées : ${entry.id}`);
    }
  }
  for (const boss of validBosses) {
    if (new Set(boss.graceIds).size !== boss.graceIds.length) errors.push(`Grâces dupliquées : ${boss.id}`);
    for (const id of boss.graceIds) {
      const grace = graceById.get(id);
      if (!grace || grace.regionIds[0] !== boss.regionIds[0] || (grace.bossId && grace.bossId !== boss.id)) errors.push(`Grâce de boss invalide : ${boss.id}`);
    }
  }
  for (const grace of validGraces) if (grace.bossId) {
    const boss = bossById.get(grace.bossId);
    if (!boss || boss.regionIds[0] !== grace.regionIds[0]) errors.push(`Boss de grâce invalide : ${grace.id}`);
    else if (!boss.graceIds.includes(grace.id)) errors.push(`Grâce d’arène sans lien réciproque : ${grace.id}`);
  }
  for (const actor of refs.actors.filter(actor => actor.kind === 'boss')) {
    const boss = bossById.get(actor.id);
    if (!boss || boss.name !== actor.name) errors.push(`Référence de boss non reprise : ${actor.id}`);
  }
  for (const ref of refs.graces) {
    const grace = graceById.get(ref.id);
    if (!grace || grace.name !== ref.name || grace.regionIds[0] !== ref.regionId) errors.push(`Référence de grâce non reprise : ${ref.id}`);
  }
  for (const actor of refs.actors.filter(actor => actor.kind !== 'boss')) {
    if (bossById.has(actor.id)) errors.push(`Ennemi ou PNJ classé comme boss : ${actor.id}`);
  }
  for (const item of refs.items) for (const acquisition of item.acquisitions) {
    const boss = bossById.get(acquisition.sourceEntityId ?? '');
    const grace = graceById.get(acquisition.graceId ?? '');
    if ((boss && boss.regionIds[0] !== acquisition.regionId) || (grace && grace.regionIds[0] !== acquisition.regionId)) errors.push(`Acquisition hors région : ${acquisition.id}`);
  }
  return errors;
}
