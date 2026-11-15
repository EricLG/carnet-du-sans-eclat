import type { Source } from '../../domain/catalog';
import type { Item } from '../../domain/items';

const guide = (title: string, slug: string): Source => ({
  label: `SuperSoluce — ${title}`, url: `https://www.supersoluce.com/soluce/elden-ring/${slug}`, verifiedAt: '2026-11-15',
});
const thrusting = guide('Épées d’estoc lourdes', 'epees-d-estoc-lourdes');
const greataxes = guide('Grandes haches', 'grandes-haches');
const lances = guide('Grandes lances', 'grandes-lances');
const hammers = guide('Marteaux', 'marteaux');
const morne = guide('Château de Vent-Hurlant', 'chateau-de-vent-hurlant');
const morneTunnel = guide('Galerie de Vent-Hurlant', 'galerie-de-vent-hurlant');
const stormveil = guide('Château de Voilorage — partie 2', 'chateau-de-voilorage-partie-2');
const claws = guide('Griffes', 'griffes');
const caria = guide('Manoir de Caria', 'manoir-de-caria');
const swords = guide('Épées droites', 'epees-droites');
const albinaurics = guide('Village des Albinauriques', 'village-des-albinauriques');
const ruins = guide('Ruines sylvestres des semi-humains', 'ruines-sylvestres-des-semi-humains');
const shields = guide('Boucliers moyens', 'boucliers-moyens');
const greatshields = guide('Pavois', 'pavois');
const meteorite: Source = { label: 'ActuGaming — Bâton météorique', url: 'https://www.actugaming.net/baton-meteorique-elden-ring-489143/', verifiedAt: '2026-11-15' };
const axes: Source = { label: 'Jeuxvideo.com — Haches', url: 'https://www.jeuxvideo.com/wikis-soluce-astuces/1551978/hache-liste-complete.htm', verifiedAt: '2026-11-15' };
const merchant: Source = { label: 'SegmentNext — inventaires des marchands', url: 'https://segmentnext.com/elden-ring/merchants', verifiedAt: '2026-11-15' };

// Itinéraires sélectionnés : une fiche n’énumère pas nécessairement toutes les sources.
export const explorationEquipmentItems: Item[] = [
  {
    id: 'item.great-epee', name: 'Grande rapière', category: 'weapon', content: 'base', regionIds: ['limgrave'],
    summary: 'Épée d’estoc lourde à récupérer dans un campement.', aliases: ['Great Épée', 'Great Epee'], sources: [thrusting],
    acquisitions: [{ id: 'acquisition.great-epee.agheel-camp', method: 'exploration', regionId: 'limgrave',
      location: 'Campement à l’est du lac d’Agheel, sud', description: 'Ouvrir le coffre du campement, près d’une tente.',
      graceId: 'grace.agheel-south', conditions: [], probability: { kind: 'guaranteed' }, sources: [thrusting] }],
  },
  {
    id: 'item.greataxe', name: 'Grande hache', category: 'weapon', content: 'base', regionIds: ['limgrave'],
    summary: 'Grande hache transportée par un convoi.', aliases: ['Greataxe'], sources: [greataxes],
    acquisitions: [{ id: 'acquisition.greataxe.limgrave-carriage', method: 'exploration', regionId: 'limgrave',
      location: 'Convoi à l’est du lac d’Agheel', description: 'Arrêter le fourgon tiré par les trolls et ouvrir son coffre arrière.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [greataxes] }],
  },
  {
    id: 'item.lance', name: 'Lance de cavalerie', category: 'weapon', content: 'base', regionIds: ['limgrave'],
    summary: 'Grande lance posée sur une ruine de Valorage.', aliases: ['Lance'], sources: [lances],
    acquisitions: [{ id: 'acquisition.lance.stormhill-ruins', method: 'exploration', regionId: 'limgrave',
      location: 'Ruines au nord-est de la cabane du maître de guerre', description: 'Rejoindre le sommet de la ruine et ramasser l’arme sur le corps.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [lances] }],
  },
  {
    id: 'item.morning-star', name: 'Morgenstern', category: 'weapon', content: 'base', regionIds: ['weeping'],
    summary: 'Marteau à pointes récupérable sur la route de la Péninsule.', aliases: ['Morning Star'], sources: [hammers],
    acquisitions: [{ id: 'acquisition.morning-star.weeping-carriage', method: 'exploration', regionId: 'weeping',
      location: 'Fourgon abandonné au sud du pont du Sacrifice', description: 'Fouiller le coffre du fourgon sur la route du nord de la Péninsule.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [hammers] }],
  },
  {
    id: 'item.rusted-anchor', name: 'Ancre rouillée', category: 'weapon', content: 'base', regionIds: ['weeping'],
    summary: 'Grande hache obtenue au fond d’une galerie.', aliases: ['Rusted Anchor'], sources: [morneTunnel],
    acquisitions: [{ id: 'acquisition.rusted-anchor.morne-tunnel', method: 'boss_reward', regionId: 'weeping',
      location: 'Galerie de Vent-Hurlant', description: 'Vaincre la Chimère écailleuse au bout de la galerie.',
      sourceEntityId: 'boss.scaly-misbegotten.morne-tunnel', conditions: [], probability: { kind: 'guaranteed' }, sources: [morneTunnel] }],
  },
  {
    id: 'item.grafted-blade-greatsword', name: 'Espadon fusionné', category: 'weapon', content: 'base', regionIds: ['weeping'],
    summary: 'Épée colossale remise à la victoire sur le boss du château.', aliases: ['Grafted Blade Greatsword'], sources: [morne],
    acquisitions: [{ id: 'acquisition.grafted-blade-greatsword.morne', method: 'boss_reward', regionId: 'weeping',
      location: 'Plage derrière le château de Vent-Hurlant', description: 'Vaincre la Chimère léonine dans l’arène derrière le château.',
      sourceEntityId: 'boss.leonine-misbegotten.morne', conditions: [], probability: { kind: 'guaranteed' }, sources: [morne] }],
  },
  {
    id: 'item.whip', name: 'Fouet', category: 'weapon', content: 'base', regionIds: ['weeping'],
    summary: 'Fouet à ramasser pendant la descente derrière le château.', aliases: ['Whip'], sources: [morne],
    acquisitions: [{ id: 'acquisition.whip.morne-rats-room', method: 'exploration', regionId: 'weeping',
      location: 'Château de Vent-Hurlant · salle aux rats', description: 'Descendre par les toits et les poutres à l’arrière du château. Fouiller le corps au rez-de-chaussée de la salle aux rats.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [morne] }],
  },
  {
    id: 'item.hookclaws', name: 'Griffes', category: 'weapon', content: 'base', regionIds: ['limgrave'],
    summary: 'Griffes récupérables dans le château de Voilorage.', aliases: ['Hookclaws'], sources: [claws],
    acquisitions: [{ id: 'acquisition.hookclaws.stormveil', method: 'exploration', regionId: 'limgrave',
      location: 'Voilorage · réserve du chemin latéral', description: 'Emprunter le chemin latéral du château et fouiller le corps dans la réserve, au niveau inférieur.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [claws] }],
  },
  {
    id: 'item.highland-axe', name: 'Hache des montagnes', category: 'weapon', content: 'base', regionIds: ['limgrave'],
    summary: 'Hache exposée dans la grande salle du Rejeton greffé.', aliases: ['Highland Axe'], sources: [axes, stormveil],
    acquisitions: [{ id: 'acquisition.highland-axe.stormveil-painting', method: 'exploration', regionId: 'limgrave',
      location: 'Voilorage · salle du Rejeton greffé', description: 'Ramasser l’arme sous le grand tableau de la salle.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [stormveil] }],
  },
  {
    id: 'item.misericorde', name: 'Miséricorde', category: 'weapon', content: 'base', regionIds: ['limgrave'],
    summary: 'Dague dans une salle scellée de Voilorage.', aliases: ['Misericorde', 'Miséricorde'], sources: [stormveil],
    acquisitions: [{ id: 'acquisition.misericorde.stormveil-sealed-room', method: 'exploration', regionId: 'limgrave',
      location: 'Voilorage · salle scellée près du Rejeton greffé', description: 'Dissiper le mur de brume avec une clé-lame de pierre puis fouiller les corps dans la salle.',
      conditions: ['Consommer une clé-lame de pierre pour ouvrir le sceau.'], probability: { kind: 'guaranteed' }, sources: [stormveil] }],
  },
  {
    id: 'item.sword-night-flame', name: 'Épée de la nuit ardente', category: 'weapon', content: 'base', regionIds: ['liurnia'],
    summary: 'Épée légendaire cachée dans le manoir de Caria.', aliases: ['Sword of Night and Flame'], sources: [caria],
    acquisitions: [{ id: 'acquisition.sword-night-flame.caria-chest', method: 'exploration', regionId: 'liurnia',
      location: 'Manoir de Caria · bâtiment sous les passerelles', description: 'Depuis les passerelles de l’étage inférieur, sauter sur les toits en contrebas, descendre à l’échelle et ouvrir le coffre du bâtiment.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [caria] }],
  },
  {
    id: 'item.carian-knight-sword', name: 'Épée de chevalier de Caria', category: 'weapon', content: 'base', regionIds: ['liurnia'],
    summary: 'Épée transportée sur la route occidentale de Liurnia.', aliases: ["Carian Knight's Sword"], sources: [swords],
    acquisitions: [{ id: 'acquisition.carian-knight-sword.liurnia-carriage', method: 'exploration', regionId: 'liurnia',
      location: 'Convoi sur la route à l’ouest du lac de Liurnia, près des Quatre Beffrois', description: 'Arrêter le fourgon tiré par deux trolls et ouvrir le coffre à l’arrière.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [swords, { label: 'ActuGaming — Épée de chevalier de Caria', url: 'https://www.actugaming.net/arme-epee-de-chevalier-de-caria-elden-ring-484443/', verifiedAt: '2026-11-15' }] }],
  },
  {
    id: 'item.icerind-hatchet', name: 'Hachette auréolée de glace', category: 'weapon', content: 'base', regionIds: ['liurnia'],
    summary: 'Hachette à récupérer dans le quartier du Temple.', aliases: ['Icerind Hatchet'], sources: [axes],
    acquisitions: [{ id: 'acquisition.icerind-hatchet.temple-quarter', method: 'exploration', regionId: 'liurnia',
      location: 'Quartier du Temple · bâtiment en ruine', description: 'Ouvrir le coffre dans le bâtiment en ruine du quartier du Temple.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [axes] }],
  },
  {
    id: 'item.crystal-sword', name: 'Épée de cristal', category: 'weapon', content: 'base', regionIds: ['liurnia'],
    summary: 'Épée sur un corps à l’écart du village des Albinauriques.', aliases: ['Crystal Sword'], sources: [albinaurics],
    acquisitions: [{ id: 'acquisition.crystal-sword.albinauric-village', method: 'exploration', regionId: 'liurnia',
      location: 'Village des Albinauriques · au-delà du pont en bois', description: 'Traverser le pont en bois près du site de grâce, puis fouiller le cadavre au bout du chemin.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [albinaurics] }],
  },
  {
    id: 'item.meteorite-staff', name: 'Bâton météorique', category: 'weapon', content: 'base', regionIds: ['caelid'],
    summary: 'Bâton à ramasser dans les ruines du marais d’Ivoine.', aliases: ['Meteorite Staff'], sources: [meteorite],
    acquisitions: [{ id: 'acquisition.meteorite-staff.street-sages', method: 'exploration', regionId: 'caelid',
      location: 'Ruines de la rue des sages · fenêtre d’un bâtiment en ruine', description: 'Fouiller le corps suspendu à la fenêtre du bâtiment en pierre, dans le marais.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [meteorite] }],
  },
  {
    id: 'item.demi-human-queen-staff', name: 'Bâton de la reine semi-humaine', category: 'weapon', content: 'base', regionIds: ['weeping'],
    summary: 'Bâton obtenu sur la reine des ruines sylvestres.', aliases: ["Demi-Human Queen's Staff"], sources: [ruins],
    acquisitions: [{ id: 'acquisition.demi-human-queen-staff.forest-ruins', method: 'enemy_drop', regionId: 'weeping',
      location: 'Ruines sylvestres des semi-humains', description: 'Vaincre la reine semi-humaine au centre des ruines. Elle donne aussi la sorcellerie Volée de cristal.',
      sourceEntityId: 'enemy.demi-human-queen.forest-ruins', conditions: [], probability: { kind: 'guaranteed' }, sources: [ruins] }],
  },
  {
    id: 'item.estoc', name: 'Estoc', category: 'weapon', content: 'base', regionIds: ['liurnia'],
    summary: 'Épée d’estoc vendue sur la rive sud du lac.', aliases: ['Estoc'], sources: [merchant],
    acquisitions: [{ id: 'acquisition.estoc.liurnia-shore', method: 'merchant', regionId: 'liurnia',
      location: 'Marchand de la rive sud du lac de Liurnia', description: 'Acheter l’arme au marchand nomade près du site de grâce.',
      sourceEntityId: 'npc.nomad.liurnia-shore', graceId: 'grace.liurnia-shore', price: '3 000 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [merchant] }],
  },
  {
    id: 'item.astrologer-staff', name: 'Bâton d’astrologue', category: 'weapon', content: 'base', regionIds: ['liurnia'],
    summary: 'Bâton vendu sur la rive sud du lac.', aliases: ["Astrologer's Staff"], sources: [merchant],
    acquisitions: [{ id: 'acquisition.astrologer-staff.liurnia-shore', method: 'merchant', regionId: 'liurnia',
      location: 'Marchand de la rive sud du lac de Liurnia', description: 'Acheter le bâton au marchand nomade près du site de grâce.',
      sourceEntityId: 'npc.nomad.liurnia-shore', graceId: 'grace.liurnia-shore', price: '800 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [merchant] }],
  },
  {
    id: 'item.beast-crest-heater-shield', name: 'Écu bestial', category: 'shield', content: 'base', regionIds: ['limgrave'],
    summary: 'Écu conservé dans un campement de Valorage.', aliases: ['Beast Crest Heater Shield'], sources: [shields],
    acquisitions: [{ id: 'acquisition.beast-crest-heater-shield.stormhill-camp', method: 'exploration', regionId: 'limgrave',
      location: 'Campement au nord-est de la cabane du maître de guerre', description: 'Ouvrir le coffre du campement de soldats.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [shields] }],
  },
  {
    id: 'item.great-turtle-shell', name: 'Grande carapace', category: 'shield', content: 'base', regionIds: ['weeping'],
    summary: 'Bouclier posé au sommet d’une tour de la Péninsule.', aliases: ['Great Turtle Shell'], sources: [shields],
    acquisitions: [{ id: 'acquisition.great-turtle-shell.morne-rampart', method: 'exploration', regionId: 'weeping',
      location: 'Tour près du rempart du château de Vent-Hurlant', description: 'Utiliser la source spirituelle avec Torrent pour atteindre le sommet de la tour et fouiller le corps.',
      graceId: 'grace.morne-rampart', conditions: [], probability: { kind: 'guaranteed' }, sources: [shields] }],
  },
  {
    id: 'item.shield-guilty', name: 'Bouclier de culpabilité', category: 'shield', content: 'base', regionIds: ['weeping'],
    summary: 'Petit bouclier caché dans une cave des ruines sylvestres.', aliases: ['Shield of the Guilty'], sources: [ruins],
    acquisitions: [{ id: 'acquisition.shield-guilty.forest-ruins-cellar', method: 'exploration', regionId: 'weeping',
      location: 'Ruines sylvestres des semi-humains · cave au sud', description: 'Sauter le mur du petit bâtiment au sud de la reine avec Torrent, descendre dans la cave et ouvrir le coffre.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [ruins] }],
  },
  {
    id: 'item.hawk-crest-wooden-shield', name: 'Bouclier en bois aquilin', category: 'shield', content: 'base', regionIds: ['limgrave'],
    summary: 'Bouclier dans la même salle scellée que Miséricorde.', aliases: ['Hawk Crest Wooden Shield'], sources: [stormveil],
    acquisitions: [{ id: 'acquisition.hawk-crest-wooden-shield.stormveil-sealed-room', method: 'exploration', regionId: 'limgrave',
      location: 'Voilorage · salle scellée près du Rejeton greffé', description: 'Ouvrir le sceau avec une clé-lame de pierre et fouiller les corps de la salle contenant Miséricorde.',
      conditions: ['Consommer une clé-lame de pierre pour ouvrir le sceau.'], probability: { kind: 'guaranteed' }, sources: [stormveil] }],
  },
  {
    id: 'item.carian-knight-shield', name: 'Bouclier de chevalier de Caria', category: 'shield', content: 'base', regionIds: ['liurnia'],
    summary: 'Bouclier garanti du chevalier qui garde l’ascenseur de Rennala.', aliases: ["Carian Knight's Shield"], sources: [shields],
    acquisitions: [{ id: 'acquisition.carian-knight-shield.moongrum', method: 'enemy_drop', regionId: 'liurnia',
      location: 'Raya Lucaria · cour devant l’ascenseur de la grande bibliothèque', description: 'Vaincre Moongrum, chevalier de Caria, pour récupérer son bouclier.',
      sourceEntityId: 'enemy.moongrum.raya-lucaria', conditions: ['Accéder à l’académie de Raya Lucaria avec une clé de pierre d’éclat.'],
      probability: { kind: 'guaranteed' }, sources: [shields] }],
  },
  {
    id: 'item.jellyfish-shield', name: 'Bouclier de la méduse', category: 'shield', content: 'base', regionIds: ['liurnia'],
    summary: 'Pavois à ramasser sur la route des Quatre Beffrois.', aliases: ['Jellyfish Shield'], sources: [greatshields],
    acquisitions: [{ id: 'acquisition.jellyfish-shield.four-belfries-road', method: 'exploration', regionId: 'liurnia',
      location: 'Route au nord du pied des Quatre Beffrois', description: 'Fouiller le corps près du fourgon détruit, entouré de méduses.',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [greatshields, { label: 'Gameranx — boucliers et armures', url: 'https://gameranx.com/features/id/293907/article/elden-ring-how-to-find-the-weirdest-armor-sets-shields/', verifiedAt: '2026-11-15' }] }],
  },
  {
    id: 'item.kite-shield', name: 'Rempart', category: 'shield', content: 'base', regionIds: ['liurnia'],
    summary: 'Bouclier vendu sur la rive sud du lac.', aliases: ['Kite Shield'], sources: [shields, merchant],
    acquisitions: [{ id: 'acquisition.kite-shield.liurnia-shore', method: 'merchant', regionId: 'liurnia',
      location: 'Marchand de la rive sud du lac de Liurnia', description: 'Acheter le bouclier au marchand nomade près du site de grâce.',
      sourceEntityId: 'npc.nomad.liurnia-shore', graceId: 'grace.liurnia-shore', price: '1 000 runes',
      conditions: [], probability: { kind: 'guaranteed' }, sources: [merchant] }],
  },
];
