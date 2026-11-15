import type { AcquisitionActor, GraceReference } from '../../domain/items';
import { npcs } from '../quests';

// Références documentaires : les fiches complètes de boss/grâces arrivent au lot 5.
// Conserver ces identifiants lors de leur intégration.
export const itemActors: AcquisitionActor[] = [
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
  {
    "id": "boss.darriwil.limgrave",
    "name": "Darriwil, chevalier-limier · Nécrolimbe",
    "kind": "boss"
  },
  {
    "id": "boss.tree-sentinel.limgrave",
    "name": "Sentinelle de l’Arbre · Nécrolimbe",
    "kind": "boss"
  },
  {
    "id": "boss.godrick.stormveil",
    "name": "Godrick le Greffé · Voilorage",
    "kind": "boss"
  },
  {
    "id": "boss.beastman.groveside",
    "name": "Homme-bête de Farum Azula · Grotte du bosquet",
    "kind": "boss"
  },
  {
    "id": "boss.black-knife.deathtouched",
    "name": "Assassin des Couteaux noirs · Catacombes funestes",
    "kind": "boss"
  },
  {
    "id": "boss.watchdog.stormfoot",
    "name": "Chat de garde funéraire de l’Arbre-Monde · Catacombes orageuses",
    "kind": "boss"
  },
  {
    "id": "boss.tree-spirit.fringefolk",
    "name": "Esprit d’arbre ulcéreux · Tombe des héros des confins",
    "kind": "boss"
  },
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
  {
    "id": "grace.elleh",
    "name": "Église d’Elleh",
    "regionId": "limgrave"
  },
  {
    "id": "grace.gatefront",
    "name": "Portorage",
    "regionId": "limgrave"
  },
  {
    "id": "grace.agheel-north",
    "name": "Lac d’Agheel, nord",
    "regionId": "limgrave"
  },
  {
    "id": "grace.agheel-south",
    "name": "Lac d’Agheel, sud",
    "regionId": "limgrave"
  },
  {
    "id": "grace.deathtouched",
    "name": "Catacombes funestes",
    "regionId": "limgrave"
  },
  {
    "id": "grace.morne-lift",
    "name": "Ascenseur du château de Vent-Hurlant",
    "regionId": "weeping"
  },
  {
    "id": "grace.morne-rampart",
    "name": "Rempart du château de Vent-Hurlant",
    "regionId": "weeping"
  },
  {
    "id": "grace.isolated-weeping",
    "name": "Cabane du marchand ascétique",
    "regionId": "weeping"
  },
  {
    "id": "grace.liurnia-shore",
    "name": "Rive sud du lac de Liurnia",
    "regionId": "liurnia"
  },
  {
    "id": "grace.waypoint",
    "name": "Cave des ruines du relais",
    "regionId": "limgrave"
  },
  {
    "id": "grace.stormhill-shack",
    "name": "Cabane de Valorage",
    "regionId": "limgrave"
  },
  {
    "id": "grace.third-marika",
    "name": "Troisième église de Marika",
    "regionId": "limgrave"
  },
  {
    "id": "grace.fort-haight-west",
    "name": "Fort Haight, ouest",
    "regionId": "limgrave"
  },
  {
    "id": "grace.secluded-cell",
    "name": "Cellule isolée",
    "regionId": "limgrave"
  },
  {
    "id": "grace.stranded",
    "name": "Cimetière abandonné",
    "regionId": "limgrave"
  },
  {
    "id": "grace.groveside",
    "name": "Grotte du bosquet",
    "regionId": "limgrave"
  },
  {
    "id": "grace.stormfoot",
    "name": "Catacombes orageuses",
    "regionId": "limgrave"
  },
  {
    "id": "grace.summonwater",
    "name": "Abords du village des eaux nécromantes",
    "regionId": "limgrave"
  },
  {
    "id": "grace.pilgrimage",
    "name": "Église des pèlerinages",
    "regionId": "weeping"
  },
  {
    "id": "grace.fourth-marika",
    "name": "Quatrième église de Marika",
    "regionId": "weeping"
  }
];
