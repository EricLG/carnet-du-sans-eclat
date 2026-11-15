import type { Item } from '../../domain/items';
import inventoryJson from './base-inventory.json';
import prerequisiteJson from './completion-prerequisites.json';
import prices from './completion-prices.json';
import { completionRoutes } from './completion-routes';
import { completionSource, itemSlug, type InventoryEntry } from './completion-model';
import { secondaryBaseInventory, secondaryPrerequisites } from './secondary-inventory';

export const completedBaseInventory = inventoryJson as InventoryEntry[];
const prerequisites = prerequisiteJson as InventoryEntry[];
const identity = (name: string) => itemSlug(name).replaceAll('-', '');
const translatedNames = completionSource('Elden Ring Data — noms français du jeu', 'https://github.com/elden-ring-data/msg/blob/4bbba478e478e9018d0293e0b18cd8cf706199e9/frafr/item.msgbnd.dcx.json');
const inventorySource = (category: Item['category']) => completionSource('Elden Ring Completion Sheets — inventaire du jeu de base',
  `https://github.com/rdmaw/elden-ring-completion-sheets/blob/151490b721e05fc7138aee9264c2e171fca10c0f/sheets/${category === 'armor' ? 'armor' : ['sorcery', 'incantation'].includes(category) ? 'spells' : category === 'talisman' ? 'talismans' : ['ash_of_war', 'spirit_ash'].includes(category) ? 'ashes' : 'weapons'}.html`);

export function buildCompletionItems(existing: Item[]): Item[] {
  const oldIds = new Set(existing.map(item => item.id));
  const entries = [...completedBaseInventory, ...prerequisites, ...secondaryBaseInventory, ...secondaryPrerequisites];
  const itemIds = new Map([...existing.flatMap(item => [item.name, ...item.aliases].map(name => [identity(name), item.id] as const)),
    ...entries.map(entry => [identity(entry.english), entry.id] as const)]);
  const routes = new Map<string, typeof completionRoutes[number]>();
  for (const route of completionRoutes) for (const name of route.names) if (!routes.has(identity(name))) routes.set(identity(name), route);
  const priceByName = new Map(Object.entries(prices).map(([name, price]) => [identity(name), price]));
  return entries.filter(entry => !oldIds.has(entry.id)).map(entry => {
    const route = routes.get(identity(entry.english));
    if (!route) throw new Error(`Obtention absente : ${entry.english}`);
    const requiredItemId = route.required ? itemIds.get(identity(route.required)) : undefined;
    if (route.required && !requiredItemId) throw new Error(`Prérequis absent : ${route.required}`);
    const summary = entry.category === 'armor' ? `Pièce d’armure ${entry.english.includes('(Altered)') ? 'retouchée, suivie séparément de sa version d’origine' : 'du jeu de base'}.`
      : entry.category === 'sorcery' ? 'Sorcellerie du jeu de base, à mémoriser à un site de grâce et à lancer avec un bâton.'
      : entry.category === 'incantation' ? 'Incantation du jeu de base, à mémoriser à un site de grâce et à lancer avec un sceau sacré.'
      : entry.category === 'talisman' ? 'Talisman permanent du jeu de base. Les variantes nommées et les versions +1 ou +2 ont des coches distinctes.'
      : entry.category === 'ash_of_war' ? 'Cendre de guerre du jeu de base, à appliquer à une arme ou un bouclier compatible depuis un site de grâce.'
      : entry.category === 'spirit_ash' ? 'Cendres d’invocation du jeu de base. Les niveaux d’amélioration partagent la même coche.'
      : entry.category === 'key_item' ? 'Objet de progression. Son obtention et son utilisation restent indépendantes des autres coches.'
      : `${entry.category === 'shield' ? 'Bouclier' : 'Arme'} du jeu de base ; les niveaux d’amélioration et affinités ne changent pas cette coche.`;
    const item: Item = {
      id: entry.id, name: entry.name, aliases: [entry.english], category: entry.category, content: 'base',
      ...(entry.armorSlot ? { armorSlot: entry.armorSlot } : {}), summary, regionIds: [route.region],
      sources: [...(entry.category === 'key_item' ? [] : [inventorySource(entry.category)]), translatedNames, ...route.sources!].filter((source, index, all) => all.findIndex(other => other.url === source.url) === index),
      acquisitions: [{ id: `acquisition.${entry.id.slice(5)}.base`, method: route.method, regionId: route.region,
        location: route.location, description: route.description, conditions: [...route.conditions],
        ...(route.actor ? { sourceEntityId: route.actor.id } : {}), ...(route.questId ? { relatedQuestId: route.questId } : {}),
        ...(requiredItemId ? { requiredItemId } : {}),
        ...(route.price ? { price: route.method === 'merchant' && priceByName.has(identity(entry.english)) ? `${priceByName.get(identity(entry.english))!.toLocaleString('fr-FR').replaceAll('\u202f', ' ')} runes` : route.price } : {}),
        probability: { kind: route.guaranteed ? 'guaranteed' : 'unknown' }, sources: route.sources! }],
    };
    return item;
  });
}
