import talismans from './extended-talismans-inventory.json';
import incantations from './extended-incantations-inventory.json';
import ashes from './extended-ashes-inventory.json';
import sharedPrerequisites from './extended-prerequisites.json';
import incantationPrerequisites from './incantation-prerequisites.json';
import type { InventoryEntry } from './completion-model';

// Inventaires de types du jeu de base d’origine, indépendants des obtentions.
export const secondaryBaseInventory = [...talismans, ...incantations, ...ashes] as InventoryEntry[];
export const secondaryPrerequisites = [...sharedPrerequisites, ...incantationPrerequisites] as InventoryEntry[];
