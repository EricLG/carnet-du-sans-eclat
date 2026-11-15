import type { Source } from '../domain/catalog';
import type { ItemCategory } from '../domain/items';

const weapons: Source = { label: 'Roundtable Hold — armes et boucliers', url: 'https://roundtablehold.net/checklists/weapons.html', verifiedAt: '2026-11-15' };
const equipment: Source = { label: 'Lore Armory — décompte du jeu de base', url: 'https://lorearmory.com/eldenring/', verifiedAt: '2026-11-15' };
const spells: Source = { label: 'Elden Ring Cheat Sheet — sorts du jeu de base', url: 'https://barcodebunny.github.io/elden-ring-cheat-sheet/', verifiedAt: '2026-11-15' };

// Types du jeu de base d’origine uniquement. Une catégorie sans total reste sans pourcentage.
// Les variantes nommées et pièces retouchées sont distinctes ; niveaux et affinités sont exclus.
export type ItemCoverageReference = { total: number; sources: Source[] };
export const knownBaseItemTotals: Partial<Record<ItemCategory, ItemCoverageReference>> = {
  weapon: { total: 308, sources: [weapons] }, shield: { total: 69, sources: [weapons] },
  armor: { total: 559, sources: [equipment] },
  talisman: { total: 114, sources: [equipment, { label: 'Eldenpedia — exclusion de la brindille consommable', url: 'https://eldenring.wiki.gg/wiki/Sacrificial_Twig', verifiedAt: '2026-11-15' }] },
  sorcery: { total: 70, sources: [spells] }, incantation: { total: 101, sources: [spells] },
  ash_of_war: { total: 91, sources: [equipment] }, spirit_ash: { total: 64, sources: [equipment] },
};
