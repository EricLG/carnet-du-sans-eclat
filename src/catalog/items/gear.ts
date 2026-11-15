import type { Item } from '../../domain/items';

export const gearItems: Item[] = [
  {
    "id": "item.lordsworn-greatsword",
    "name": "Espadon seigneurial",
    "category": "weapon",
    "summary": "Arme à retrouver pendant l’exploration.",
    "aliases": [
      "Lordsworn's Greatsword"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Lordsworn's Greatsword",
        "url": "https://eldenring.wiki.gg/wiki/Lordsworn%27s_Greatsword",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.lordsworn-greatsword.exploration",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Ruines de la Porte",
        "description": "Ouvrir le coffre du fourgon au nord du campement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Lordsworn's Greatsword",
            "url": "https://eldenring.wiki.gg/wiki/Lordsworn%27s_Greatsword",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.gatefront"
      }
    ]
  },
  {
    "id": "item.flail",
    "name": "Fléau d’armes",
    "category": "weapon",
    "summary": "Arme à retrouver pendant l’exploration.",
    "aliases": [
      "Flail"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Flail",
        "url": "https://eldenring.wiki.gg/wiki/Flail",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.flail.exploration",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Ruines de la Porte",
        "description": "Ouvrir le coffre du second fourgon, au sud du campement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Flail",
            "url": "https://eldenring.wiki.gg/wiki/Flail",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.gatefront"
      }
    ]
  },
  {
    "id": "item.twinblade",
    "name": "Épée à double lame",
    "category": "weapon",
    "summary": "Arme à retrouver pendant l’exploration.",
    "aliases": [
      "Twinblade"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Twinblade",
        "url": "https://eldenring.wiki.gg/wiki/Twinblade",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.twinblade.exploration",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Ruines calcinées par un dragon",
        "description": "Sauter le mur avec Torrent pour atteindre la cave sud-est, sans rats. Ouvrir son coffre.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Twinblade",
            "url": "https://eldenring.wiki.gg/wiki/Twinblade",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.agheel-south"
      }
    ]
  },
  {
    "id": "item.uchigatana",
    "name": "Uchigatana",
    "category": "weapon",
    "summary": "Arme à retrouver pendant l’exploration.",
    "aliases": [
      "Uchigatana"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Uchigatana",
        "url": "https://eldenring.wiki.gg/wiki/Uchigatana",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.uchigatana.exploration",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Catacombes funestes",
        "description": "Emprunter le passage latéral sous les escaliers pour rejoindre le cadavre sur la plateforme surélevée.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Uchigatana",
            "url": "https://eldenring.wiki.gg/wiki/Uchigatana",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.deathtouched"
      },
      {
        "id": "acquisition.uchigatana.samurai",
        "method": "other",
        "regionId": "limgrave",
        "location": "Création du personnage",
        "description": "Équipement de départ de la classe Samouraï.",
        "conditions": [
          "Choisir la classe Samouraï."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Uchigatana",
            "url": "https://eldenring.wiki.gg/wiki/Uchigatana",
            "verifiedAt": "2026-11-14"
          }
        ]
      }
    ]
  },
  {
    "id": "item.claymore",
    "name": "Claymore",
    "category": "weapon",
    "summary": "Arme à retrouver pendant l’exploration.",
    "aliases": [
      "Claymore"
    ],
    "content": "base",
    "regionIds": [
      "weeping"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Claymore",
        "url": "https://eldenring.wiki.gg/wiki/Claymore",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.claymore.exploration",
        "method": "exploration",
        "regionId": "weeping",
        "location": "Château de Vent-Hurlant",
        "description": "Après l’ascenseur, passer par le tas de cadavres de la cour et ouvrir le coffre du bâtiment à droite.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Claymore",
            "url": "https://eldenring.wiki.gg/wiki/Claymore",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.morne-lift"
      }
    ]
  },
  {
    "id": "item.bloodhound-fang",
    "name": "Croc de limier",
    "category": "weapon",
    "summary": "Récompense garantie de cette rencontre.",
    "aliases": [
      "Bloodhound's Fang"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Bloodhound's Fang",
        "url": "https://eldenring.wiki.gg/wiki/Bloodhound%27s_Fang",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.bloodhound-fang.boss",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Geôle éternelle du limier",
        "description": "Vaincre la rencontre indiquée pour recevoir l’arme.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Bloodhound's Fang",
            "url": "https://eldenring.wiki.gg/wiki/Bloodhound%27s_Fang",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "boss.darriwil.limgrave",
        "graceId": "grace.agheel-south",
        "relatedQuestId": "quest.blaidd"
      }
    ]
  },
  {
    "id": "item.golden-halberd",
    "name": "Hallebarde dorée",
    "category": "weapon",
    "summary": "Récompense garantie de cette rencontre.",
    "aliases": [
      "Golden Halberd"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Golden Halberd",
        "url": "https://eldenring.wiki.gg/wiki/Golden_Halberd",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.golden-halberd.boss",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Entre le Commencement et l’église d’Elleh",
        "description": "Vaincre la rencontre indiquée pour recevoir l’arme.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Golden Halberd",
            "url": "https://eldenring.wiki.gg/wiki/Golden_Halberd",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "boss.tree-sentinel.limgrave",
        "graceId": "grace.elleh"
      }
    ]
  },
  {
    "id": "item.erdsteel-dagger",
    "name": "Dague en acier-monde",
    "category": "weapon",
    "summary": "Récompense de la libération du fort Haight.",
    "aliases": [
      "Erdsteel Dagger"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Erdsteel Dagger",
        "url": "https://eldenring.wiki.gg/wiki/Erdsteel_Dagger",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.erdsteel-dagger.kenneth",
        "method": "quest_reward",
        "regionId": "limgrave",
        "location": "Ruines où se trouve Kenneth Haight",
        "description": "Vaincre le chevalier du fort puis rendre compte à Kenneth.",
        "conditions": [
          "Accepter sa demande de libérer le fort Haight."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Erdsteel Dagger",
            "url": "https://eldenring.wiki.gg/wiki/Erdsteel_Dagger",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.kenneth",
        "relatedQuestId": "quest.kenneth"
      }
    ]
  },
  {
    "id": "item.axe-godrick",
    "name": "Hache de Godrick",
    "category": "weapon",
    "summary": "Une des deux récompenses échangeables du souvenir de Godrick.",
    "aliases": [
      "Axe of Godrick"
    ],
    "content": "base",
    "regionIds": [
      "roundtable"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Axe of Godrick",
        "url": "https://eldenring.wiki.gg/wiki/Axe_of_Godrick",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.axe-godrick.enia",
        "method": "remembrance_exchange",
        "regionId": "roundtable",
        "location": "Salle des Deux Doigts, Table ronde",
        "description": "Choisir cette récompense auprès d’Enia. Un exemplaire du souvenir est consommé.",
        "conditions": [
          "Posséder le souvenir du Greffé.",
          "L’autre récompense demande un autre exemplaire du souvenir."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Axe of Godrick",
            "url": "https://eldenring.wiki.gg/wiki/Axe_of_Godrick",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.enia",
        "requiredItemId": "item.remembrance-grafted"
      }
    ]
  },
  {
    "id": "item.grafted-dragon",
    "name": "Dragon greffé",
    "category": "weapon",
    "summary": "Une des deux récompenses échangeables du souvenir de Godrick.",
    "aliases": [
      "Grafted Dragon"
    ],
    "content": "base",
    "regionIds": [
      "roundtable"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Remembrance of the Grafted",
        "url": "https://eldenring.wiki.gg/wiki/Remembrance_of_the_Grafted",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.grafted-dragon.enia",
        "method": "remembrance_exchange",
        "regionId": "roundtable",
        "location": "Salle des Deux Doigts, Table ronde",
        "description": "Choisir cette récompense auprès d’Enia. Un exemplaire du souvenir est consommé.",
        "conditions": [
          "Posséder le souvenir du Greffé.",
          "L’autre récompense demande un autre exemplaire du souvenir."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Remembrance of the Grafted",
            "url": "https://eldenring.wiki.gg/wiki/Remembrance_of_the_Grafted",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.enia",
        "requiredItemId": "item.remembrance-grafted",
        "price": "2 000 runes"
      }
    ]
  },
  {
    "id": "item.lordsworn-straight-sword",
    "name": "Épée droite seigneuriale",
    "category": "weapon",
    "summary": "Butin aléatoire des soldats qui portent cette épée.",
    "aliases": [
      "Lordsworn's Straight Sword"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Lordsworn's Straight Sword",
        "url": "https://eldenring.wiki.gg/wiki/Lordsworn%27s_Straight_Sword",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.lordsworn-straight-sword.soldiers",
        "method": "enemy_drop",
        "regionId": "limgrave",
        "location": "Ruines de la Porte",
        "description": "Vaincre des soldats de Godrick portant une épée droite.",
        "conditions": [],
        "probability": {
          "kind": "chance",
          "percent": 2,
          "conditions": "Taux rapporté par Eldenpedia pour les soldats équipés de cette épée ; la Découverte et ses bonus modifient les chances."
        },
        "sources": [
          {
            "label": "Eldenpedia — Lordsworn's Straight Sword",
            "url": "https://eldenring.wiki.gg/wiki/Lordsworn%27s_Straight_Sword",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "enemy.godrick-soldier.sword",
        "graceId": "grace.gatefront"
      }
    ]
  },
  {
    "id": "item.torch",
    "name": "Torche",
    "category": "weapon",
    "summary": "À acheter à Kalé.",
    "aliases": [
      "Torch"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Merchant Kalé",
        "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.torch.kale",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Église d’Elleh",
        "description": "Acheter cet équipement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Merchant Kalé",
            "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.kale",
        "graceId": "grace.elleh",
        "price": "200 runes"
      }
    ]
  },
  {
    "id": "item.large-leather-shield",
    "name": "Grand bouclier de cuir",
    "category": "shield",
    "summary": "À acheter à Kalé.",
    "aliases": [
      "Large Leather Shield"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Merchant Kalé",
        "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.large-leather-shield.kale",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Église d’Elleh",
        "description": "Acheter cet équipement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Merchant Kalé",
            "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.kale",
        "graceId": "grace.elleh",
        "price": "600 runes"
      }
    ]
  },
  {
    "id": "item.chain-coif",
    "name": "Coiffe de mailles",
    "category": "armor",
    "summary": "À acheter à Kalé.",
    "aliases": [
      "Chain Coif"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Merchant Kalé",
        "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.chain-coif.kale",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Église d’Elleh",
        "description": "Acheter cet équipement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Merchant Kalé",
            "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.kale",
        "graceId": "grace.elleh",
        "price": "1 000 runes"
      }
    ],
    "armorSlot": "head"
  },
  {
    "id": "item.chain-armor",
    "name": "Cotte de mailles",
    "category": "armor",
    "summary": "À acheter à Kalé.",
    "aliases": [
      "Chain Armor"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Merchant Kalé",
        "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.chain-armor.kale",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Église d’Elleh",
        "description": "Acheter cet équipement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Merchant Kalé",
            "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.kale",
        "graceId": "grace.elleh",
        "price": "1 500 runes"
      }
    ],
    "armorSlot": "chest"
  },
  {
    "id": "item.gauntlets",
    "name": "Gantelets",
    "category": "armor",
    "summary": "À acheter à Kalé.",
    "aliases": [
      "Gauntlets"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Merchant Kalé",
        "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.gauntlets.kale",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Église d’Elleh",
        "description": "Acheter cet équipement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Merchant Kalé",
            "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.kale",
        "graceId": "grace.elleh",
        "price": "1 500 runes"
      }
    ],
    "armorSlot": "hands"
  },
  {
    "id": "item.chain-leggings",
    "name": "Jambières de mailles",
    "category": "armor",
    "summary": "À acheter à Kalé.",
    "aliases": [
      "Chain Leggings"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Merchant Kalé",
        "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.chain-leggings.kale",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Église d’Elleh",
        "description": "Acheter cet équipement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Merchant Kalé",
            "url": "https://eldenring.wiki.gg/wiki/Merchant_Kal%C3%A9",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.kale",
        "graceId": "grace.elleh",
        "price": "1 000 runes"
      }
    ],
    "armorSlot": "legs"
  },
  {
    "id": "item.brass-shield",
    "name": "Bouclier en laiton",
    "category": "shield",
    "summary": "Butin aléatoire des soldats équipés de ce bouclier.",
    "aliases": [
      "Brass Shield"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Brass Shield",
        "url": "https://eldenring.wiki.gg/wiki/Brass_Shield",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.brass-shield.soldiers",
        "method": "enemy_drop",
        "regionId": "limgrave",
        "location": "Ruines de la Porte",
        "description": "Vaincre les soldats de Godrick portant un bouclier en laiton.",
        "conditions": [],
        "probability": {
          "kind": "chance",
          "percent": 2,
          "conditions": "Taux rapporté par Eldenpedia pour les soldats équipés du bouclier ; la Découverte modifie les chances."
        },
        "sources": [
          {
            "label": "Eldenpedia — Brass Shield",
            "url": "https://eldenring.wiki.gg/wiki/Brass_Shield",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "enemy.godrick-soldier.brass",
        "graceId": "grace.gatefront"
      }
    ]
  },
  {
    "id": "item.green-turtle",
    "name": "Talisman de la tortue verte",
    "category": "talisman",
    "summary": "Talisman conservé dans une cave scellée.",
    "aliases": [
      "Green Turtle Talisman"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Green Turtle Talisman",
        "url": "https://eldenring.wiki.gg/wiki/Green_Turtle_Talisman",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.green-turtle.cellar",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Village des eaux nécromantes",
        "description": "Ouvrir la cave scellée avec une clé-lame de pierre, puis son coffre.",
        "conditions": [
          "Dépenser une clé-lame de pierre sur la statue de diablotin."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Green Turtle Talisman",
            "url": "https://eldenring.wiki.gg/wiki/Green_Turtle_Talisman",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.summonwater"
      }
    ]
  },
  {
    "id": "item.flamedrake",
    "name": "Talisman du dragon de feu",
    "category": "talisman",
    "summary": "Récompense garantie du boss du donjon.",
    "aliases": [
      "Flamedrake Talisman"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Groveside Cave",
        "url": "https://eldenring.wiki.gg/wiki/Groveside_Cave",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.flamedrake.boss",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Grotte du bosquet",
        "description": "Vaincre le boss au fond du donjon.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Groveside Cave",
            "url": "https://eldenring.wiki.gg/wiki/Groveside_Cave",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "boss.beastman.groveside",
        "graceId": "grace.groveside"
      }
    ]
  },
  {
    "id": "item.assassin-crimson",
    "name": "Dague pourpre de l’assassin",
    "category": "talisman",
    "summary": "Récompense garantie du boss du donjon.",
    "aliases": [
      "Assassin's Crimson Dagger"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Assassin's Crimson Dagger",
        "url": "https://eldenring.wiki.gg/wiki/Assassin%27s_Crimson_Dagger",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.assassin-crimson.boss",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Catacombes funestes",
        "description": "Vaincre le boss au fond du donjon.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Assassin's Crimson Dagger",
            "url": "https://eldenring.wiki.gg/wiki/Assassin%27s_Crimson_Dagger",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "boss.black-knife.deathtouched",
        "graceId": "grace.deathtouched"
      }
    ]
  },
  {
    "id": "item.crimson-amber",
    "name": "Médaillon d’ambre pourpre",
    "category": "talisman",
    "summary": "Un talisman vendu sur la route du château.",
    "aliases": [
      "Crimson Amber Medallion"
    ],
    "content": "base",
    "regionIds": [
      "weeping"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Bell Bearing",
        "url": "https://eldenring.wiki.gg/wiki/Bell_Bearing",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.crimson-amber.merchant",
        "method": "merchant",
        "regionId": "weeping",
        "location": "Près du rempart du château de Vent-Hurlant",
        "description": "Acheter le médaillon au marchand nomade.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Bell Bearing",
            "url": "https://eldenring.wiki.gg/wiki/Bell_Bearing",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.nomad.morne",
        "graceId": "grace.morne-rampart",
        "price": "1 500 runes"
      }
    ]
  }
];
