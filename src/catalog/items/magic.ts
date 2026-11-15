import type { Item } from '../../domain/items';

export const magicItems: Item[] = [
  {
    "id": "item.glintstone-pebble",
    "name": "Projectile de pierre d’éclat",
    "category": "sorcery",
    "summary": "Sorcellerie proposée par plusieurs enseignants.",
    "aliases": [
      "Glintstone Pebble"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "liurnia"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Glintstone Pebble",
        "url": "https://eldenring.wiki.gg/wiki/Glintstone_Pebble",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.glintstone-pebble.sellen",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Cave des ruines du relais",
        "description": "Acheter le sort à Sellen.",
        "conditions": [
          "Vaincre la Tête de citrouille et accepter l’enseignement de Sellen."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Glintstone Pebble",
            "url": "https://eldenring.wiki.gg/wiki/Glintstone_Pebble",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.sellen",
        "relatedQuestId": "quest.sellen",
        "graceId": "grace.waypoint",
        "price": "1 000 runes"
      },
      {
        "id": "acquisition.glintstone-pebble.thops",
        "method": "merchant",
        "regionId": "liurnia",
        "location": "Église d’Irith",
        "description": "Acheter le sort à Thops avant son départ pour l’académie.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Glintstone Pebble",
            "url": "https://eldenring.wiki.gg/wiki/Glintstone_Pebble",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.thops",
        "relatedQuestId": "quest.thops",
        "price": "1 000 runes"
      }
    ]
  },
  {
    "id": "item.glintstone-arc",
    "name": "Arc de pierre d’éclat",
    "category": "sorcery",
    "summary": "Sorcellerie proposée par plusieurs enseignants.",
    "aliases": [
      "Glintstone Arc"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "liurnia"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Sorceress Sellen",
        "url": "https://eldenring.wiki.gg/wiki/Sorceress_Sellen",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Eldenpedia — Thops",
        "url": "https://eldenring.wiki.gg/wiki/Thops",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.glintstone-arc.sellen",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Cave des ruines du relais",
        "description": "Acheter le sort à Sellen.",
        "conditions": [
          "Vaincre la Tête de citrouille et accepter l’enseignement de Sellen."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sorceress Sellen",
            "url": "https://eldenring.wiki.gg/wiki/Sorceress_Sellen",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.sellen",
        "relatedQuestId": "quest.sellen",
        "graceId": "grace.waypoint",
        "price": "1 500 runes"
      },
      {
        "id": "acquisition.glintstone-arc.thops",
        "method": "merchant",
        "regionId": "liurnia",
        "location": "Église d’Irith",
        "description": "Acheter le sort à Thops avant son départ pour l’académie.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Thops",
            "url": "https://eldenring.wiki.gg/wiki/Thops",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.thops",
        "relatedQuestId": "quest.thops",
        "price": "1 500 runes"
      }
    ]
  },
  {
    "id": "item.flame-sling",
    "name": "Boule de feu",
    "category": "incantation",
    "summary": "Incantation enseignée par Corhyn.",
    "aliases": [
      "Flame Sling"
    ],
    "content": "base",
    "regionIds": [
      "roundtable"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Flame Sling",
        "url": "https://eldenring.wiki.gg/wiki/Flame_Sling",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.flame-sling.corhyn",
        "method": "merchant",
        "regionId": "roundtable",
        "location": "Salle principale de la Table ronde",
        "description": "Acheter l’incantation à Corhyn avant son départ.",
        "conditions": [
          "Corhyn se déplace ensuite au fil de son parcours."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Flame Sling",
            "url": "https://eldenring.wiki.gg/wiki/Flame_Sling",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.corhyn",
        "relatedQuestId": "quest.corhyn",
        "price": "800 runes"
      }
    ]
  },
  {
    "id": "item.heal",
    "name": "Soin",
    "category": "incantation",
    "summary": "Incantation enseignée par Corhyn.",
    "aliases": [
      "Heal"
    ],
    "content": "base",
    "regionIds": [
      "roundtable"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Brother Corhyn",
        "url": "https://eldenring.wiki.gg/wiki/Brother_Corhyn",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.heal.corhyn",
        "method": "merchant",
        "regionId": "roundtable",
        "location": "Salle principale de la Table ronde",
        "description": "Acheter l’incantation à Corhyn avant son départ.",
        "conditions": [
          "Corhyn se déplace ensuite au fil de son parcours."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Brother Corhyn",
            "url": "https://eldenring.wiki.gg/wiki/Brother_Corhyn",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.corhyn",
        "relatedQuestId": "quest.corhyn",
        "price": "1 500 runes"
      }
    ]
  },
  {
    "id": "item.storm-stomp",
    "name": "Piétinement orageux",
    "category": "ash_of_war",
    "summary": "Cendre de guerre conservée avec le couteau à aiguiser.",
    "aliases": [
      "Ash of War: Storm Stomp"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Whetstone Knife",
        "url": "https://eldenring.wiki.gg/wiki/Whetstone_Knife",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.storm-stomp.cellar",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Ruines de la Porte",
        "description": "Ouvrir le coffre de la cave du campement.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Whetstone Knife",
            "url": "https://eldenring.wiki.gg/wiki/Whetstone_Knife",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.gatefront"
      }
    ]
  },
  {
    "id": "item.bloody-slash",
    "name": "Entaille sanglante",
    "category": "ash_of_war",
    "summary": "Butin garanti d’un ennemi unique, sans statut de boss.",
    "aliases": [
      "Ash of War: Bloody Slash"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Godrick Knight",
        "url": "https://eldenring.wiki.gg/wiki/Godrick_Knight",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.bloody-slash.knight",
        "method": "enemy_drop",
        "regionId": "limgrave",
        "location": "Fort Haight, remparts",
        "description": "Vaincre le chevalier sanguinaire du fort.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Godrick Knight",
            "url": "https://eldenring.wiki.gg/wiki/Godrick_Knight",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "enemy.godrick-knight.fort-haight",
        "relatedQuestId": "quest.kenneth",
        "graceId": "grace.fort-haight-west"
      }
    ]
  },
  {
    "id": "item.determination",
    "name": "Détermination",
    "category": "ash_of_war",
    "summary": "Cendre de guerre portée par un scarabée.",
    "aliases": [
      "Ash of War: Determination"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Somber Scarab",
        "url": "https://eldenring.wiki.gg/wiki/Somber_Scarab",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.determination.scarab",
        "method": "enemy_drop",
        "regionId": "limgrave",
        "location": "Pont au nord du lac d’Agheel",
        "description": "Tuer le scarabée situé près du pont, au sud-est de la grâce du lac d’Agheel, nord.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Somber Scarab",
            "url": "https://eldenring.wiki.gg/wiki/Somber_Scarab",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "enemy.scarab.determination",
        "graceId": "grace.agheel-north"
      }
    ]
  },
  {
    "id": "item.lone-wolf-ashes",
    "name": "Cendres de loups solitaires",
    "category": "spirit_ash",
    "summary": "Invocation remise au début du voyage, avec un rattrapage possible.",
    "aliases": [
      "Lone Wolf Ashes"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "roundtable"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Lone Wolf Ashes",
        "url": "https://eldenring.wiki.gg/wiki/Lone_Wolf_Ashes",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.lone-wolf-ashes.renna",
        "method": "npc_dialogue",
        "regionId": "limgrave",
        "location": "Église d’Elleh, de nuit",
        "description": "Accepter le don de la sorcière qui se présente comme Renna.",
        "conditions": [
          "Avoir reçu Torrent de Melina."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Lone Wolf Ashes",
            "url": "https://eldenring.wiki.gg/wiki/Lone_Wolf_Ashes",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.ranni",
        "graceId": "grace.elleh"
      },
      {
        "id": "acquisition.lone-wolf-ashes.husks",
        "method": "merchant",
        "regionId": "roundtable",
        "location": "Boutique des Servantes jumelles",
        "description": "Acheter les cendres si la rencontre de Renna a été manquée.",
        "conditions": [
          "Atteindre une grâce de Liurnia sans avoir reçu les cendres."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Lone Wolf Ashes",
            "url": "https://eldenring.wiki.gg/wiki/Lone_Wolf_Ashes",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.twin-maidens",
        "price": "500 runes"
      }
    ]
  },
  {
    "id": "item.jellyfish-ashes",
    "name": "Cendres de méduse spirituelle",
    "category": "spirit_ash",
    "summary": "Le présent de Roderika, également utile à une énigme ultérieure.",
    "aliases": [
      "Spirit Jellyfish Ashes"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "roundtable"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Spirit Jellyfish Ashes",
        "url": "https://eldenring.wiki.gg/wiki/Spirit_Jellyfish_Ashes",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.jellyfish-ashes.shack",
        "method": "npc_dialogue",
        "regionId": "limgrave",
        "location": "Cabane de Valorage",
        "description": "Épuiser les dialogues de Roderika.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Spirit Jellyfish Ashes",
            "url": "https://eldenring.wiki.gg/wiki/Spirit_Jellyfish_Ashes",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.roderika",
        "relatedQuestId": "quest.roderika",
        "graceId": "grace.stormhill-shack"
      },
      {
        "id": "acquisition.jellyfish-ashes.hold",
        "method": "npc_dialogue",
        "regionId": "roundtable",
        "location": "Table ronde",
        "description": "Si le don a été manqué, demander les cendres à Roderika après son arrivée.",
        "conditions": [
          "Revenir avant une progression trop avancée à Leyndell."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Spirit Jellyfish Ashes",
            "url": "https://eldenring.wiki.gg/wiki/Spirit_Jellyfish_Ashes",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.roderika",
        "relatedQuestId": "quest.roderika"
      }
    ]
  },
  {
    "id": "item.noble-sorcerer-ashes",
    "name": "Cendres de noble sorcier",
    "category": "spirit_ash",
    "summary": "Récompense du boss des catacombes orageuses.",
    "aliases": [
      "Noble Sorcerer Ashes"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Noble Sorcerer Ashes",
        "url": "https://eldenring.wiki.gg/wiki/Noble_Sorcerer_Ashes",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.noble-sorcerer-ashes.watchdog",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Catacombes orageuses",
        "description": "Ouvrir l’accès à l’arène et vaincre le Chat de garde funéraire.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Noble Sorcerer Ashes",
            "url": "https://eldenring.wiki.gg/wiki/Noble_Sorcerer_Ashes",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "boss.watchdog.stormfoot",
        "graceId": "grace.stormfoot"
      }
    ]
  }
];
