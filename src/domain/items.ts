import { z } from 'zod';
import { sourceSchema } from './catalog';

export const itemCategorySchema = z.enum(['weapon', 'shield', 'armor', 'talisman', 'sorcery', 'incantation', 'ash_of_war', 'spirit_ash', 'tool', 'key_item', 'upgrade']);
export const acquisitionMethodSchema = z.enum(['merchant', 'boss_reward', 'enemy_drop', 'exploration', 'npc_dialogue', 'quest_reward', 'remembrance_exchange', 'puzzle', 'other']);
const entrySchema = z.object({
  id: z.string().min(1), name: z.string().min(1), content: z.enum(['base', 'dlc']),
  regionIds: z.array(z.string().min(1)).min(1), sources: z.array(sourceSchema).min(1),
});
export const probabilitySchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('guaranteed') }),
  z.object({ kind: z.literal('chance'), percent: z.number().gt(0).lt(100), conditions: z.string().min(1) }),
  z.object({ kind: z.literal('unknown') }),
]);
export const acquisitionSchema = z.object({
  id: z.string().min(1), method: acquisitionMethodSchema, regionId: z.string().min(1),
  location: z.string().min(1), description: z.string().min(1),
  sourceEntityId: z.string().min(1).optional(), graceId: z.string().min(1).optional(),
  relatedQuestId: z.string().min(1).optional(), requiredItemId: z.string().min(1).optional(),
  price: z.string().min(1).optional(), conditions: z.array(z.string().min(1)), probability: probabilitySchema,
  sources: z.array(sourceSchema).min(1),
});
export const itemSchema = entrySchema.extend({
  category: itemCategorySchema, armorSlot: z.enum(['head', 'chest', 'hands', 'legs']).optional(), summary: z.string().min(1), aliases: z.array(z.string().min(1)),
  acquisitions: z.array(acquisitionSchema).min(1),
});
export const pickupSchema = entrySchema.extend({ itemId: z.string().min(1), acquisitionId: z.string().min(1) });
export type Acquisition = z.infer<typeof acquisitionSchema>;
export type Item = z.infer<typeof itemSchema>;
export type Pickup = z.infer<typeof pickupSchema>;
export type ItemCategory = Item['category'];
export type AcquisitionMethod = Acquisition['method'];
export type AcquisitionActor = { id: string; name: string; kind: 'npc' | 'boss' | 'enemy' };
export type GraceReference = { id: string; name: string; regionId: string };

export function probabilityLabel(probability: Acquisition['probability']): string {
  if (probability.kind === 'guaranteed') return 'Obtention garantie si les conditions sont remplies';
  if (probability.kind === 'unknown') return 'Butin aléatoire — taux non renseigné';
  return `Butin aléatoire — ${probability.percent.toLocaleString('fr-FR')} %`;
}

type References = { regionIds: string[]; actors: AcquisitionActor[]; graces: GraceReference[]; questIds: string[] };
export function validateItems(items: Item[], pickups: Pickup[], refs: References): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const knownItems = new Set(items.map(item => item.id));
  const actorById = new Map(refs.actors.map(actor => [actor.id, actor]));
  const graceById = new Map(refs.graces.map(grace => [grace.id, grace]));
  const acquisitions = new Map<string, { item: Item; acquisition: Acquisition }>();
  const register = (id: string) => { if (ids.has(id)) errors.push(`Identifiant dupliqué : ${id}`); ids.add(id); };
  for (const input of items) {
    const parsed = itemSchema.safeParse(input);
    if (!parsed.success) { errors.push(`Objet invalide : ${input.id}`); continue; }
    const item = parsed.data;
    register(item.id);
    if ((item.category === 'armor') !== !!item.armorSlot) errors.push(`Emplacement d’armure incohérent : ${item.id}`);
    if (new Set(item.regionIds).size !== item.regionIds.length) errors.push(`Régions dupliquées : ${item.id}`);
    for (const id of item.regionIds) if (!refs.regionIds.includes(id)) errors.push(`Région inconnue : ${id}`);
    for (const acquisition of item.acquisitions) {
      register(acquisition.id);
      acquisitions.set(acquisition.id, { item, acquisition });
      if (!item.regionIds.includes(acquisition.regionId)) errors.push(`Région d’obtention absente de l’objet : ${acquisition.id}`);
      const actor = acquisition.sourceEntityId ? actorById.get(acquisition.sourceEntityId) : undefined;
      if (acquisition.sourceEntityId && !actor) errors.push(`Source inconnue : ${acquisition.id}`);
      if (['merchant', 'npc_dialogue', 'quest_reward', 'remembrance_exchange'].includes(acquisition.method) && actor?.kind !== 'npc') errors.push(`PNJ requis : ${acquisition.id}`);
      if (acquisition.method === 'boss_reward' && actor?.kind !== 'boss') errors.push(`Rencontre de boss requise : ${acquisition.id}`);
      if (acquisition.method === 'enemy_drop' && actor?.kind !== 'enemy') errors.push(`Ennemi requis : ${acquisition.id}`);
      if (acquisition.method === 'merchant' && !acquisition.price) errors.push(`Prix manquant : ${acquisition.id}`);
      if (acquisition.relatedQuestId && !refs.questIds.includes(acquisition.relatedQuestId)) errors.push(`Quête inconnue : ${acquisition.id}`);
      if (acquisition.method === 'quest_reward' && !acquisition.relatedQuestId) errors.push(`Quête requise : ${acquisition.id}`);
      if (acquisition.requiredItemId && (!knownItems.has(acquisition.requiredItemId) || acquisition.requiredItemId === item.id)) errors.push(`Objet requis inconnu : ${acquisition.id}`);
      if (acquisition.method === 'remembrance_exchange' && !acquisition.requiredItemId) errors.push(`Souvenir requis : ${acquisition.id}`);
      if (acquisition.graceId) {
        const grace = graceById.get(acquisition.graceId);
        if (!grace || grace.regionId !== acquisition.regionId) errors.push(`Grâce de référence invalide : ${acquisition.id}`);
      }
      if (!['enemy_drop', 'other'].includes(acquisition.method) && acquisition.probability.kind !== 'guaranteed') errors.push(`Garantie incohérente : ${acquisition.id}`);
    }
    if (item.regionIds.some(id => !item.acquisitions.some(acquisition => acquisition.regionId === id))) errors.push(`Région sans source d’obtention : ${item.id}`);
  }
  const tracked = new Set<string>();
  for (const input of pickups) {
    const parsed = pickupSchema.safeParse(input);
    if (!parsed.success) { errors.push(`Ramassage invalide : ${input.id}`); continue; }
    const pickup = parsed.data;
    register(pickup.id);
    const linked = acquisitions.get(pickup.acquisitionId);
    if (!linked || linked.item.id !== pickup.itemId || linked.item.category !== 'upgrade') errors.push(`Ramassage sans amélioration correspondante : ${pickup.id}`);
    if (linked && (pickup.regionIds.length !== 1 || pickup.regionIds[0] !== linked.acquisition.regionId || linked.acquisition.probability.kind !== 'guaranteed')) errors.push(`Emplacement de ramassage invalide : ${pickup.id}`);
    if (tracked.has(pickup.acquisitionId)) errors.push(`Ramassage dupliqué pour une source : ${pickup.acquisitionId}`);
    tracked.add(pickup.acquisitionId);
  }
  for (const item of items) if (item.category === 'upgrade') for (const acquisition of item.acquisitions) {
    if (!tracked.has(acquisition.id)) errors.push(`Emplacement d’amélioration non suivi : ${acquisition.id}`);
  }
  for (const entries of [refs.actors, refs.graces]) if (new Set(entries.map(entry => entry.id)).size !== entries.length) errors.push('Références dupliquées.');
  for (const grace of refs.graces) if (!refs.regionIds.includes(grace.regionId)) errors.push(`Région de grâce inconnue : ${grace.id}`);
  return errors;
}
