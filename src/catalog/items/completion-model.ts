import type { Source } from '../../domain/catalog';
import type { AcquisitionActor, AcquisitionMethod, Item } from '../../domain/items';

export type CompletionRoute = {
  names: string[]; region: string; method: AcquisitionMethod; location: string; description: string;
  conditions: string[]; actor?: AcquisitionActor; bossAlias?: string; price?: string;
  questId?: string; required?: string; guaranteed: boolean; sources?: Source[];
};
export const splitNames = (names: string) => names.split('|').map(name => name.trim());
export const itemSlug = (name: string) => name.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function route(names: string, region: string, method: AcquisitionMethod, location: string, description: string, conditions: string[] = []): CompletionRoute {
  return { names: splitNames(names), region, method, location, description, conditions, guaranteed: true };
}
export const explore = (names: string, region: string, location: string, description: string, conditions: string[] = []) => route(names, region, 'exploration', location, description, conditions);
export const puzzle = (names: string, region: string, location: string, description: string, conditions: string[] = []) => route(names, region, 'puzzle', location, description, conditions);
export function drop(names: string, region: string, location: string, enemy: string, description: string, guaranteed = false, conditions: string[] = []): CompletionRoute {
  return { ...route(names, region, 'enemy_drop', location, description, conditions), guaranteed,
    actor: { id: `enemy.equipment.${itemSlug(enemy)}`, name: enemy, kind: 'enemy' } };
}
export function shop(names: string, region: string, location: string, npcId: string, npcName: string, price: string, conditions: string[] = []): CompletionRoute {
  return { ...route(names, region, 'merchant', location, `Acheter auprès de ${npcName}.`, conditions),
    actor: { id: npcId, name: npcName, kind: 'npc' }, price };
}
export function reward(names: string, region: string, location: string, npcId: string, npcName: string, questId: string, description: string, conditions: string[] = []): CompletionRoute {
  return { ...route(names, region, 'quest_reward', location, description, conditions), actor: { id: npcId, name: npcName, kind: 'npc' }, questId };
}
export function dialogue(names: string, region: string, location: string, npcId: string, npcName: string, description: string, conditions: string[] = []): CompletionRoute {
  return { ...route(names, region, 'npc_dialogue', location, description, conditions), actor: { id: npcId, name: npcName, kind: 'npc' } };
}
export function bossReward(names: string, region: string, location: string, id: string, name: string, alias: string, conditions: string[] = []): CompletionRoute {
  return { ...route(names, region, 'boss_reward', location, `Vaincre ${name} pour recevoir la récompense de cet affrontement.`, conditions),
    actor: { id, name: `${name} · ${location}`, kind: 'boss' }, bossAlias: alias };
}
export function exchange(names: string, required: string): CompletionRoute {
  return { ...route(names, 'roundtable', 'remembrance_exchange', 'Table ronde · Enia', 'Échanger le souvenir auprès d’Enia contre cette récompense.',
    ['Le souvenir offre plusieurs choix : chaque échange ne donne qu’une récompense. Une duplication autorisée peut permettre l’autre choix.']),
    actor: { id: 'npc.enia', name: 'Enia, l’Augure des Doigts', kind: 'npc' }, required };
}
export function alteration(name: string, original: string, region: string): CompletionRoute {
  return { ...route(name, region, 'other', 'Menu de retouche aux sites de grâce ou auprès de Boc', 'Retoucher la pièce d’origine pour obtenir cette variante. Les deux variantes ont des coches distinctes.',
    ['Posséder la pièce d’origine et les outils de couture adaptés ; certaines pièces de demi-dieux demandent le nécessaire de couture en or.', 'Une retouche modifie la pièce possédée ; elle ne crée pas automatiquement une seconde pièce.']), required: original };
}
export const completionSource = (label: string, url: string): Source => ({ label, url, verifiedAt: '2026-11-15' });
export type InventoryEntry = { id: string; name: string; english: string; category: Item['category']; armorSlot?: Item['armorSlot']; textId: string; wiki: string };
