import type { Source } from '../../domain/catalog';
import type { Item } from '../../domain/items';

const astrologerSource: Source = {
  label: 'GAMEWAVE — tenue d’astrologue et prix',
  url: 'https://gamewave.fr/elden-ring/elden-ring-ou-trouver-le-set-d-armure-de-la-classe-astrologue/', verifiedAt: '2026-11-15',
};
const armorSource: Source = {
  label: 'Jeuxvideo.com — pièces et emplacements des armures',
  url: 'https://www.jeuxvideo.com/wikis-soluce-astuces/1540622/localisation-des-armures-uniques-legendaires-pnj-boss.htm', verifiedAt: '2026-11-15',
};
const sageSource: Source = {
  label: 'SuperSoluce — Grotte aux eaux stagnantes',
  url: 'https://www.supersoluce.com/soluce/elden-ring/grotte-aux-eaux-stagnantes', verifiedAt: '2026-11-15',
};

export const liurniaArmorItems: Item[] = [
  {
    id: 'item.astrologer-hood', name: 'Capuche d’astrologue', category: 'armor', armorSlot: 'head',
    content: 'base', regionIds: ['liurnia'], summary: 'Coiffe de la tenue d’astrologue.', aliases: ['Astrologer Hood'], sources: [astrologerSource],
    acquisitions: [{ id: 'acquisition.astrologer-hood.liurnia-shore', method: 'merchant', regionId: 'liurnia',
      location: 'Marchand de la rive sud du lac de Liurnia', description: 'Acheter la capuche au marchand près du site de grâce.',
      sourceEntityId: 'npc.nomad.liurnia-shore', graceId: 'grace.liurnia-shore', price: '1 000 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [astrologerSource] }],
  },
  {
    id: 'item.astrologer-robe', name: 'Robe d’astrologue', category: 'armor', armorSlot: 'chest',
    content: 'base', regionIds: ['liurnia'], summary: 'Pièce de torse de la tenue d’astrologue, dans sa forme non retouchée.', aliases: ['Astrologer Robe'], sources: [astrologerSource],
    acquisitions: [{ id: 'acquisition.astrologer-robe.liurnia-shore', method: 'merchant', regionId: 'liurnia',
      location: 'Marchand de la rive sud du lac de Liurnia', description: 'Acheter la robe au marchand près du site de grâce.',
      sourceEntityId: 'npc.nomad.liurnia-shore', graceId: 'grace.liurnia-shore', price: '1 500 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [astrologerSource] }],
  },
  {
    id: 'item.astrologer-gloves', name: 'Gants d’astrologue', category: 'armor', armorSlot: 'hands',
    content: 'base', regionIds: ['liurnia'], summary: 'Gants de la tenue d’astrologue.', aliases: ['Astrologer Gloves'], sources: [astrologerSource],
    acquisitions: [{ id: 'acquisition.astrologer-gloves.liurnia-shore', method: 'merchant', regionId: 'liurnia',
      location: 'Marchand de la rive sud du lac de Liurnia', description: 'Acheter les gants au marchand près du site de grâce.',
      sourceEntityId: 'npc.nomad.liurnia-shore', graceId: 'grace.liurnia-shore', price: '1 000 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [astrologerSource] }],
  },
  {
    id: 'item.astrologer-trousers', name: 'Pantalon d’astrologue', category: 'armor', armorSlot: 'legs',
    content: 'base', regionIds: ['liurnia'], summary: 'Pantalon de la tenue d’astrologue.', aliases: ['Astrologer Trousers'], sources: [astrologerSource],
    acquisitions: [{ id: 'acquisition.astrologer-trousers.liurnia-shore', method: 'merchant', regionId: 'liurnia',
      location: 'Marchand de la rive sud du lac de Liurnia', description: 'Acheter le pantalon au marchand près du site de grâce.',
      sourceEntityId: 'npc.nomad.liurnia-shore', graceId: 'grace.liurnia-shore', price: '1 000 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [astrologerSource] }],
  },
  {
    id: 'item.carian-knight-helm', name: 'Casque de chevalier de Caria', category: 'armor', armorSlot: 'head',
    content: 'base', regionIds: ['liurnia'], summary: 'Casque à ramasser avec la tenue de chevalier de Caria.', aliases: ['Carian Knight Helm'], sources: [armorSource],
    acquisitions: [{ id: 'acquisition.carian-knight-helm.academy-graveyard', method: 'exploration', regionId: 'liurnia',
      location: 'Raya Lucaria · cimetière après l’église du Coucou', description: 'Après le pont du cimetière, descendre sur le replat près de la grande tombe et ramasser la tenue complète.',
      conditions: ['Accéder à l’académie de Raya Lucaria avec une clé de pierre d’éclat.'], probability: { kind: 'guaranteed' }, sources: [armorSource] }],
  },
  {
    id: 'item.carian-knight-armor', name: 'Armure de chevalier de Caria', category: 'armor', armorSlot: 'chest',
    content: 'base', regionIds: ['liurnia'], summary: 'Pièce de torse non retouchée de la tenue de chevalier de Caria.', aliases: ['Carian Knight Armor'], sources: [armorSource],
    acquisitions: [{ id: 'acquisition.carian-knight-armor.academy-graveyard', method: 'exploration', regionId: 'liurnia',
      location: 'Raya Lucaria · cimetière après l’église du Coucou', description: 'Ramasser la tenue près de la grande tombe sur le replat en contrebas du cimetière.',
      conditions: ['Accéder à l’académie de Raya Lucaria avec une clé de pierre d’éclat.'], probability: { kind: 'guaranteed' }, sources: [armorSource] }],
  },
  {
    id: 'item.carian-knight-gauntlets', name: 'Gantelets de chevalier de Caria', category: 'armor', armorSlot: 'hands',
    content: 'base', regionIds: ['liurnia'], summary: 'Gantelets de la tenue de chevalier de Caria.', aliases: ['Carian Knight Gauntlets'], sources: [armorSource],
    acquisitions: [{ id: 'acquisition.carian-knight-gauntlets.academy-graveyard', method: 'exploration', regionId: 'liurnia',
      location: 'Raya Lucaria · cimetière après l’église du Coucou', description: 'Ramasser la tenue près de la grande tombe sur le replat en contrebas du cimetière.',
      conditions: ['Accéder à l’académie de Raya Lucaria avec une clé de pierre d’éclat.'], probability: { kind: 'guaranteed' }, sources: [armorSource] }],
  },
  {
    id: 'item.carian-knight-greaves', name: 'Bottes de chevalier de Caria', category: 'armor', armorSlot: 'legs',
    content: 'base', regionIds: ['liurnia'], summary: 'Bottes de la tenue de chevalier de Caria.', aliases: ['Carian Knight Greaves'], sources: [armorSource],
    acquisitions: [{ id: 'acquisition.carian-knight-greaves.academy-graveyard', method: 'exploration', regionId: 'liurnia',
      location: 'Raya Lucaria · cimetière après l’église du Coucou', description: 'Ramasser la tenue près de la grande tombe sur le replat en contrebas du cimetière.',
      conditions: ['Accéder à l’académie de Raya Lucaria avec une clé de pierre d’éclat.'], probability: { kind: 'guaranteed' }, sources: [armorSource] }],
  },
  {
    id: 'item.sage-hood', name: 'Capuche de sage', category: 'armor', armorSlot: 'head',
    content: 'base', regionIds: ['liurnia'], summary: 'Capuche de la tenue de sage, qui comporte trois pièces.', aliases: ['Sage Hood'], sources: [armorSource, sageSource],
    acquisitions: [{ id: 'acquisition.sage-hood.stillwater-cave', method: 'exploration', regionId: 'liurnia',
      location: 'Grotte aux eaux stagnantes · cavité empoisonnée', description: 'Dans la première salle, sauter vers le passage du sud-est et suivre la galerie jusqu’aux chauves-souris. Fouiller le corps pour récupérer les trois pièces.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [sageSource] }],
  },
  {
    id: 'item.sage-robe', name: 'Robe de sage', category: 'armor', armorSlot: 'chest',
    content: 'base', regionIds: ['liurnia'], summary: 'Robe de la tenue de sage.', aliases: ['Sage Robe'], sources: [armorSource, sageSource],
    acquisitions: [{ id: 'acquisition.sage-robe.stillwater-cave', method: 'exploration', regionId: 'liurnia',
      location: 'Grotte aux eaux stagnantes · cavité empoisonnée', description: 'Prendre le passage du sud-est dans la première salle et fouiller le corps près des chauves-souris ; les trois pièces se ramassent ensemble.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [sageSource] }],
  },
  {
    id: 'item.sage-trousers', name: 'Pantalon de sage', category: 'armor', armorSlot: 'legs',
    content: 'base', regionIds: ['liurnia'], summary: 'Pantalon de la tenue de sage.', aliases: ['Sage Trousers'], sources: [armorSource, sageSource],
    acquisitions: [{ id: 'acquisition.sage-trousers.stillwater-cave', method: 'exploration', regionId: 'liurnia',
      location: 'Grotte aux eaux stagnantes · cavité empoisonnée', description: 'Prendre le passage du sud-est dans la première salle et fouiller le corps près des chauves-souris ; les trois pièces se ramassent ensemble.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [sageSource] }],
  },
];
