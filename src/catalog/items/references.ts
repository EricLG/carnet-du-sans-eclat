import type { AcquisitionActor, GraceReference } from '../../domain/items';
import { npcs } from '../quests';
import { bosses } from '../world/bosses';
import { graces } from '../world/graces';

function bossReference(id: string): AcquisitionActor {
  const boss = bosses.find(entry => entry.id === id);
  if (!boss) throw new Error(`Référence de boss absente : ${id}`);
  return { id, name: boss.name, kind: 'boss' };
}
function graceReference(id: string): GraceReference {
  const grace = graces.find(entry => entry.id === id);
  if (!grace) throw new Error(`Référence de grâce absente : ${id}`);
  return { id, name: grace.name, regionId: grace.regionIds[0] };
}

// Les noms et régions proviennent du catalogue d’exploration ; les identifiants
// de cette sélection restent stables pour conserver les anciennes acquisitions.
export const itemActors: AcquisitionActor[] = [
  bossReference('boss.scaly-misbegotten.morne-tunnel'),
  bossReference('boss.leonine-misbegotten.morne'),
  bossReference('boss.loretta.caria-manor'),
  bossReference('boss.alabaster-lord.royal-grave'),
  { id: 'enemy.demi-human-queen.forest-ruins', name: 'Reine semi-humaine des ruines sylvestres', kind: 'enemy' },
  { id: 'enemy.moongrum.raya-lucaria', name: 'Moongrum, chevalier de Caria', kind: 'enemy' },
  { id: 'enemy.scarab.carian-piercer', name: 'Scarabée d’Empaleuse de Caria', kind: 'enemy' },
  { id: 'enemy.miriam.carian-study', name: 'Préceptrice Miriam · Salle d’étude non inversée', kind: 'enemy' },
  ...[
  {
    "id": "npc.nomad.north-limgrave",
    "name": "Marchand nomade du nord de Nécrolimbe",
    "kind": "npc"
  },
  {
    "id": "npc.nomad.east-limgrave",
    "name": "Marchand nomade de l’est de Nécrolimbe",
    "kind": "npc"
  },
  {
    "id": "npc.nomad.west-limgrave",
    "name": "Marchand nomade de la plage de Nécrolimbe",
    "kind": "npc"
  },
  bossReference('boss.cemetery-shade.tombsward'),
  bossReference('boss.watchdog.impalers'),
  bossReference('boss.demi-human-chiefs.coastal-cave'),
  bossReference('boss.red-wolf.raya-lucaria'),
  bossReference('boss.maggie.gelmir')
] as AcquisitionActor[],
  ...npcs.map(npc => ({ id: npc.id, name: npc.name, kind: 'npc' as const })),
  ...[
  {
    "id": "npc.kale",
    "name": "Kalé",
    "kind": "npc"
  },
  {
    "id": "npc.twin-maidens",
    "name": "Servantes jumelles",
    "kind": "npc"
  },
  {
    "id": "npc.enia",
    "name": "Enia",
    "kind": "npc"
  },
  {
    "id": "npc.nomad.morne",
    "name": "Marchand nomade du rempart du château",
    "kind": "npc"
  },
  {
    "id": "npc.isolated.weeping",
    "name": "Marchand ascétique de la Péninsule",
    "kind": "npc"
  },
  {
    "id": "npc.nomad.liurnia-shore",
    "name": "Marchand nomade des rives de Liurnia",
    "kind": "npc"
  },
  bossReference('boss.darriwil.limgrave'),
  bossReference('boss.tree-sentinel.limgrave'),
  bossReference('boss.godrick.stormveil'),
  bossReference('boss.beastman.groveside'),
  bossReference('boss.black-knife.deathtouched'),
  bossReference('boss.watchdog.stormfoot'),
  bossReference('boss.tree-spirit.fringefolk'),
  {
    "id": "enemy.godrick-soldier.sword",
    "name": "Soldat de Godrick portant une épée droite",
    "kind": "enemy"
  },
  {
    "id": "enemy.godrick-soldier.brass",
    "name": "Soldat de Godrick portant le bouclier en laiton",
    "kind": "enemy"
  },
  {
    "id": "enemy.godrick-knight.fort-haight",
    "name": "Chevalier de Godrick sanguinaire du fort Haight",
    "kind": "enemy"
  },
  {
    "id": "enemy.scarab.determination",
    "name": "Scarabée de Détermination près du pont du lac d’Agheel",
    "kind": "enemy"
  },
  {
    "id": "enemy.tree-spirit.stormveil",
    "name": "Esprit d’arbre ulcéreux des sous-sols de Voilorage",
    "kind": "enemy"
  }
] as AcquisitionActor[],
];
export const itemGraces: GraceReference[] = [
  'grace.elleh',
  'grace.gatefront',
  'grace.agheel-north',
  'grace.agheel-south',
  'grace.deathtouched',
  'grace.morne-lift',
  'grace.morne-rampart',
  'grace.isolated-weeping',
  'grace.liurnia-shore',
  'grace.waypoint',
  'grace.stormhill-shack',
  'grace.third-marika',
  'grace.fort-haight-west',
  'grace.secluded-cell',
  'grace.stranded',
  'grace.groveside',
  'grace.stormfoot',
  'grace.summonwater',
  'grace.pilgrimage',
  'grace.fourth-marika',
].map(graceReference);
