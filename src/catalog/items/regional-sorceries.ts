import type { Source } from '../../domain/catalog';
import type { Item } from '../../domain/items';

const guide = (title: string, slug: string): Source => ({
  label: `SuperSoluce — ${title}`, url: `https://www.supersoluce.com/soluce/elden-ring/${slug}`, verifiedAt: '2026-11-15',
});
const carian = guide('Sorcelleries de Caria', 'sorcelleries-de-caria');
const caria = guide('Manoir de Caria', 'manoir-de-caria');
const ruins = guide('Ruines sylvestres des semi-humains', 'ruines-sylvestres-des-semi-humains');
const study = guide('Salle d’étude de Caria', 'salle-d-etude-de-caria-et-tour-divine-de-liurnia');
const gravity = guide('Sorcelleries gravitationnelles', 'sorcelleries-gravitationnelles');
const sellia = guide('Galerie cristalline de Sellia', 'galerie-cristalline-de-sellia');
const spells: Source = { label: 'Jeuxvideo.com — sorcelleries du jeu de base', url: 'https://www.jeuxvideo.com/wikis-soluce-astuces/1544128/sorcellerie-liste-complete.htm', verifiedAt: '2026-11-15' };
const shops: Source = { label: 'PowerPyx — emplacements et prix des sorcelleries', url: 'https://www.powerpyx.com/elden-ring-all-spell-locations/', verifiedAt: '2026-11-15' };
const phalanx: Source = { label: 'Eldenpedia — Glintblade Phalanx', url: 'https://eldenring.wiki.gg/wiki/Glintblade_Phalanx', verifiedAt: '2026-11-15' };
const thops = guide('Thops le sorcier', 'thops-le-sorcier');

export const regionalSorceryItems: Item[] = [
  {
    id: 'item.glintblade-phalanx', name: 'Phalange de laméclats', category: 'sorcery', content: 'base', regionIds: ['limgrave', 'liurnia'],
    summary: 'Sorcellerie vendue après remise du parchemin royal à un enseignant. À distinguer de la cendre de guerre du même nom.',
    aliases: ['Glintblade Phalanx'], sources: [carian, phalanx],
    acquisitions: [
      { id: 'acquisition.glintblade-phalanx.sellen', method: 'merchant', regionId: 'limgrave',
        location: 'Cave des ruines du relais', description: 'Acheter le sort à Sellen après lui avoir remis le parchemin.',
        sourceEntityId: 'npc.sellen', graceId: 'grace.waypoint', requiredItemId: 'item.royal-house-scroll', price: '2 500 runes',
        conditions: ['Vaincre la Tête de citrouille et accepter l’enseignement de Sellen.', 'Remettre le Parchemin de la maison royale à Sellen. Les enseignants sont des alternatives.'],
        probability: { kind: 'guaranteed' }, sources: [phalanx] },
      { id: 'acquisition.glintblade-phalanx.miriel', method: 'merchant', regionId: 'liurnia',
        location: 'Église des vœux', description: 'Acheter le sort à Miriel après lui avoir remis le parchemin.',
        sourceEntityId: 'npc.miriel', requiredItemId: 'item.royal-house-scroll', price: '2 500 runes',
        conditions: ['Remettre le Parchemin de la maison royale à Miriel. Les enseignants sont des alternatives.'],
        probability: { kind: 'guaranteed' }, sources: [phalanx] },
      { id: 'acquisition.glintblade-phalanx.seluvis', method: 'merchant', regionId: 'liurnia',
        location: 'Tour de Seluvis, aux Trois Sœurs', description: 'Acheter le sort à Seluvis après lui avoir remis le parchemin.',
        sourceEntityId: 'npc.seluvis', requiredItemId: 'item.royal-house-scroll', price: '2 500 runes',
        conditions: ['Rencontrer Seluvis dans le cadre du service de Ranni et accéder à sa boutique.', 'Remettre le Parchemin de la maison royale à Seluvis. Les enseignants sont des alternatives.'],
        probability: { kind: 'guaranteed' }, sources: [phalanx] },
    ],
  },
  {
    id: 'item.magic-glintblade', name: 'Laméclat magique', category: 'sorcery', content: 'base', regionIds: ['liurnia'],
    summary: 'Sorcellerie disponible dans la boutique initiale de Miriel.', aliases: ['Magic Glintblade'], sources: [carian, shops],
    acquisitions: [{ id: 'acquisition.magic-glintblade.miriel', method: 'merchant', regionId: 'liurnia',
      location: 'Église des vœux', description: 'Acheter le sort à Miriel ; aucun parchemin n’est nécessaire.', sourceEntityId: 'npc.miriel', price: '3 000 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [shops] }],
  },
  {
    id: 'item.carian-greatsword', name: 'Espadon de Caria', category: 'sorcery', content: 'base', regionIds: ['liurnia'],
    summary: 'Sorcellerie d’épée achetable auprès de Miriel.', aliases: ['Carian Greatsword'], sources: [carian, shops],
    acquisitions: [{ id: 'acquisition.carian-greatsword.miriel', method: 'merchant', regionId: 'liurnia',
      location: 'Église des vœux', description: 'Acheter le sort à Miriel ; aucun parchemin n’est nécessaire.', sourceEntityId: 'npc.miriel', price: '10 000 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [shops] }],
  },
  {
    id: 'item.starlight', name: 'Lumière stellaire', category: 'sorcery', content: 'base', regionIds: ['liurnia'],
    summary: 'Sorcellerie d’éclairage enseignée par Thops.', aliases: ['Starlight'], sources: [spells, shops, thops],
    acquisitions: [{ id: 'acquisition.starlight.thops', method: 'merchant', regionId: 'liurnia',
      location: 'Église d’Irith', description: 'Ouvrir la boutique de Thops en lui donnant 10 runes, puis acheter le sort pour 2 500 runes.',
      sourceEntityId: 'npc.thops', price: '2 500 runes', conditions: ['Donner 10 runes à Thops lors de la première rencontre pour ouvrir sa boutique.', 'Acheter pendant que Thops se trouve encore à l’église, avant son départ pour l’académie.'],
      probability: { kind: 'guaranteed' }, sources: [shops, thops] }],
  },
  {
    id: 'item.carian-piercer', name: 'Empaleuse de Caria', category: 'sorcery', content: 'base', regionIds: ['liurnia'],
    summary: 'Sorcellerie portée par un scarabée du manoir.', aliases: ['Carian Piercer'], sources: [caria],
    acquisitions: [{ id: 'acquisition.carian-piercer.caria-scarab', method: 'enemy_drop', regionId: 'liurnia',
      location: 'Manoir de Caria · jardins du rez-de-chaussée', description: 'Tuer le scarabée dans les jardins, près de la muraille, avant qu’il ne disparaisse.',
      sourceEntityId: 'enemy.scarab.carian-piercer', conditions: [], probability: { kind: 'guaranteed' }, sources: [caria] }],
  },
  {
    id: 'item.loretta-greatbow', name: 'Grand arc de Loretta', category: 'sorcery', content: 'base', regionIds: ['liurnia'],
    summary: 'Sorcellerie récompensant la victoire au manoir de Caria.', aliases: ["Loretta's Greatbow"], sources: [caria],
    acquisitions: [{ id: 'acquisition.loretta-greatbow.royal-knight', method: 'boss_reward', regionId: 'liurnia',
      location: 'Manoir de Caria · grande cour supérieure', description: 'Vaincre Loretta, chevaleresse royale, au sommet du manoir.',
      sourceEntityId: 'boss.loretta.caria-manor', conditions: [], probability: { kind: 'guaranteed' }, sources: [caria] }],
  },
  {
    id: 'item.rock-blaster', name: 'Perce-roche', category: 'sorcery', content: 'base', regionIds: ['caelid'],
    summary: 'Sorcellerie conservée dans une cabane de la galerie de Sellia.', aliases: ['Rock Blaster'], sources: [sellia],
    acquisitions: [{ id: 'acquisition.rock-blaster.sellia-chest', method: 'exploration', regionId: 'caelid',
      location: 'Galerie cristalline de Sellia · cabane de la partie supérieure', description: 'Progresser vers les cabanes en hauteur dans la galerie et ouvrir le coffre qui contient le sort.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [sellia] }],
  },
  {
    id: 'item.rock-sling', name: 'Fronde', category: 'sorcery', content: 'base', regionIds: ['caelid'],
    summary: 'Sorcellerie gravitationnelle cachée dans les ruines du marais.', aliases: ['Rock Sling'], sources: [gravity, shops],
    acquisitions: [{ id: 'acquisition.rock-sling.street-sages-cellar', method: 'exploration', regionId: 'caelid',
      location: 'Ruines de la rue des sages · cave au nord', description: 'Descendre dans la cave des ruines et ouvrir le coffre contenant la sorcellerie.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [gravity, { label: 'GameSpot — Bâton météorique et Fronde', url: 'https://www.gamespot.com/articles/where-to-find-the-meteorite-staff-in-elden-ring/1100-6501244/', verifiedAt: '2026-11-15' }] }],
  },
  {
    id: 'item.crystal-burst', name: 'Volée de cristal', category: 'sorcery', content: 'base', regionIds: ['weeping'],
    summary: 'Sorcellerie obtenue avec le bâton de la reine semi-humaine.', aliases: ['Crystal Burst'], sources: [ruins],
    acquisitions: [{ id: 'acquisition.crystal-burst.forest-ruins', method: 'enemy_drop', regionId: 'weeping',
      location: 'Ruines sylvestres des semi-humains', description: 'Vaincre la reine semi-humaine au centre des ruines pour obtenir le sort et son bâton.',
      sourceEntityId: 'enemy.demi-human-queen.forest-ruins', conditions: [], probability: { kind: 'guaranteed' }, sources: [ruins] }],
  },
  {
    id: 'item.ambush-shard', name: 'Éclat pernicieux', category: 'sorcery', content: 'base', regionIds: ['weeping'],
    summary: 'Sorcellerie à ramasser dans la cave où Sellen est emprisonnée.', aliases: ['Ambush Shard'], sources: [spells],
    acquisitions: [{ id: 'acquisition.ambush-shard.witchbane-ruins', method: 'exploration', regionId: 'weeping',
      location: 'Ruines du trépas des sorcières · cave', description: 'Descendre dans la cave et fouiller le corps près de Sellen enchaînée. Il n’est pas nécessaire d’attaquer Sellen.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [spells] }],
  },
  {
    id: 'item.meteorite', name: 'Météorite', category: 'sorcery', content: 'base', regionIds: ['liurnia'],
    summary: 'Sorcellerie gagnée dans la geôle derrière le manoir de Caria.', aliases: ['Meteorite'], sources: [gravity, spells],
    acquisitions: [{ id: 'acquisition.meteorite.royal-grave-evergaol', method: 'boss_reward', regionId: 'liurnia',
      location: 'Geôle éternelle de la tombe royale', description: 'Vaincre le Seigneur d’albâtre dans la geôle.', sourceEntityId: 'boss.alabaster-lord.royal-grave',
      conditions: ['Atteindre la zone derrière le manoir de Caria.'], probability: { kind: 'guaranteed' }, sources: [spells, gravity] }],
  },
  {
    id: 'item.magic-downpour', name: 'Déluge magique', category: 'sorcery', content: 'base', regionIds: ['liurnia'],
    summary: 'Sorcellerie garantie de Miriam dans la salle d’étude non inversée.', aliases: ['Magic Downpour'], sources: [study],
    acquisitions: [{ id: 'acquisition.magic-downpour.miriam-study-hall', method: 'enemy_drop', regionId: 'liurnia',
      location: 'Salle d’étude de Caria · version non inversée', description: 'Poursuivre la préceptrice Miriam dans les étages et la vaincre. Dans la version inversée, sa récompense est différente.',
      sourceEntityId: 'enemy.miriam.carian-study', conditions: ['Affronter Miriam dans la salle d’étude non inversée.'],
      probability: { kind: 'guaranteed' }, sources: [study] }],
  },
];
