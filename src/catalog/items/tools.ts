import type { Item } from '../../domain/items';

export const toolsItems: Item[] = [
  {
    "id": "item.whetstone-knife",
    "name": "Couteau à aiguiser",
    "category": "tool",
    "summary": "Permet d’appliquer les cendres de guerre aux grâces.",
    "aliases": [
      "Whetstone Knife"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "roundtable"
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
        "id": "acquisition.whetstone-knife.cellar",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Ruines de la Porte",
        "description": "Ouvrir le coffre de la cave, partagé avec Piétinement orageux.",
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
      },
      {
        "id": "acquisition.whetstone-knife.husks",
        "method": "merchant",
        "regionId": "roundtable",
        "location": "Boutique des Servantes jumelles",
        "description": "Acheter le couteau si le coffre n’a pas été récupéré.",
        "conditions": [
          "Avoir activé une grâce de Liurnia sans ramasser le couteau."
        ],
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
        "sourceEntityId": "npc.twin-maidens",
        "price": "500 runes"
      }
    ]
  },
  {
    "id": "item.wondrous-physick",
    "name": "Fiole de salut miraculeux",
    "category": "tool",
    "summary": "Fiole réutilisable à composer avec les larmes de cristal.",
    "aliases": [
      "Flask of Wondrous Physick"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "roundtable"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Flask of Wondrous Physick",
        "url": "https://eldenring.wiki.gg/wiki/Flask_of_Wondrous_Physick",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.wondrous-physick.church",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Troisième église de Marika",
        "description": "Prendre la fiole dans le bassin avec la larme de cristal pourpre.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Flask of Wondrous Physick",
            "url": "https://eldenring.wiki.gg/wiki/Flask_of_Wondrous_Physick",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.third-marika"
      },
      {
        "id": "acquisition.wondrous-physick.husks",
        "method": "merchant",
        "regionId": "roundtable",
        "location": "Boutique des Servantes jumelles",
        "description": "Acheter la fiole si elle n’a pas été récupérée.",
        "conditions": [
          "Avoir vaincu deux porteurs de fragments sans obtenir la fiole."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Flask of Wondrous Physick",
            "url": "https://eldenring.wiki.gg/wiki/Flask_of_Wondrous_Physick",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.twin-maidens",
        "price": "500 runes"
      }
    ]
  },
  {
    "id": "item.lantern",
    "name": "Lanterne",
    "category": "tool",
    "summary": "Éclairage réutilisable qui laisse les mains libres.",
    "aliases": [
      "Lantern"
    ],
    "content": "base",
    "regionIds": [
      "weeping",
      "liurnia"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Lantern",
        "url": "https://eldenring.wiki.gg/wiki/Lantern",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.lantern.weeping",
        "method": "merchant",
        "regionId": "weeping",
        "location": "Cabane du marchand ascétique, côte ouest",
        "description": "Acheter la lanterne au marchand.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Lantern",
            "url": "https://eldenring.wiki.gg/wiki/Lantern",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.isolated.weeping",
        "graceId": "grace.isolated-weeping",
        "price": "1 800 runes"
      },
      {
        "id": "acquisition.lantern.liurnia",
        "method": "merchant",
        "regionId": "liurnia",
        "location": "Rive sud du lac de Liurnia",
        "description": "Acheter la lanterne au marchand près de la grâce.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Lantern",
            "url": "https://eldenring.wiki.gg/wiki/Lantern",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.nomad.liurnia-shore",
        "graceId": "grace.liurnia-shore",
        "price": "1 800 runes"
      }
    ]
  },
  {
    "id": "item.telescope",
    "name": "Télescope",
    "category": "tool",
    "summary": "Outil réutilisable pour observer à distance.",
    "aliases": [
      "Telescope"
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
        "id": "acquisition.telescope.kale",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Église d’Elleh",
        "description": "Acheter cet outil à Kalé.",
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
        "price": "500 runes"
      }
    ]
  },
  {
    "id": "item.crafting-kit",
    "name": "Nécessaire de fabrication",
    "category": "tool",
    "summary": "Débloque la fabrication ; les matériaux ne font pas partie de ce catalogue.",
    "aliases": [
      "Crafting Kit"
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
        "id": "acquisition.crafting-kit.kale",
        "method": "merchant",
        "regionId": "limgrave",
        "location": "Église d’Elleh",
        "description": "Acheter cet outil à Kalé.",
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
        "price": "50 runes"
      }
    ]
  },
  {
    "id": "item.spirit-calling-bell",
    "name": "Cloche mande-esprit",
    "category": "tool",
    "summary": "Permet d’utiliser les cendres d’invocation dans les zones prévues.",
    "aliases": [
      "Spirit Calling Bell"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "roundtable"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Spirit Calling Bell",
        "url": "https://eldenring.wiki.gg/wiki/Spirit_Calling_Bell",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.spirit-calling-bell.renna",
        "method": "npc_dialogue",
        "regionId": "limgrave",
        "location": "Église d’Elleh, de nuit",
        "description": "Accepter le don de Renna après avoir obtenu Torrent.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Spirit Calling Bell",
            "url": "https://eldenring.wiki.gg/wiki/Spirit_Calling_Bell",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.ranni",
        "graceId": "grace.elleh"
      },
      {
        "id": "acquisition.spirit-calling-bell.husks",
        "method": "merchant",
        "regionId": "roundtable",
        "location": "Boutique des Servantes jumelles",
        "description": "Acheter la cloche si la rencontre a été manquée.",
        "conditions": [
          "Activer une grâce de Liurnia sans avoir reçu la cloche."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Spirit Calling Bell",
            "url": "https://eldenring.wiki.gg/wiki/Spirit_Calling_Bell",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.twin-maidens",
        "price": "100 runes"
      }
    ]
  },
  {
    "id": "item.spectral-steed-whistle",
    "name": "Sifflet de destrier spectral",
    "category": "tool",
    "summary": "Le sifflet qui permet d’appeler Torrent.",
    "aliases": [
      "Spectral Steed Whistle"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Spectral Steed Whistle",
        "url": "https://eldenring.wiki.gg/wiki/Spectral_Steed_Whistle",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.spectral-steed-whistle.melina",
        "method": "npc_dialogue",
        "regionId": "limgrave",
        "location": "À une grâce où Melina propose son accord",
        "description": "Accepter l’accord de Melina.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Spectral Steed Whistle",
            "url": "https://eldenring.wiki.gg/wiki/Spectral_Steed_Whistle",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.melina",
        "relatedQuestId": "quest.melina"
      }
    ]
  },
  {
    "id": "item.dectus-left",
    "name": "Médaillon de Dectus (gauche)",
    "category": "key_item",
    "summary": "Moitié nécessaire à l’utilisation du grand ascenseur de Dectus.",
    "aliases": [
      "Dectus Medallion (Left)"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Dectus Medallion (Left)",
        "url": "https://eldenring.wiki.gg/wiki/Dectus_Medallion_%28Left%29",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.dectus-left.fort",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Tour du fort Haight",
        "description": "Monter l’échelle de la tour et ouvrir le coffre.",
        "conditions": [
          "La moitié droite, non publiée dans cette sélection, est aussi nécessaire à l’ascenseur."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Dectus Medallion (Left)",
            "url": "https://eldenring.wiki.gg/wiki/Dectus_Medallion_%28Left%29",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.fort-haight-west"
      }
    ]
  },
  {
    "id": "item.remembrance-grafted",
    "name": "Souvenir du Greffé",
    "category": "key_item",
    "summary": "Objet de progression échangeable malgré sa consommation possible.",
    "aliases": [
      "Remembrance of the Grafted"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
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
        "id": "acquisition.remembrance-grafted.godrick",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Château de Voilorage, arène de Godrick",
        "description": "Vaincre Godrick le Greffé.",
        "conditions": [
          "Chez Enia : choisir la hache de Godrick ou le dragon greffé.",
          "Une coche de collection reste « déjà obtenu », même après échange."
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
        "sourceEntityId": "boss.godrick.stormveil",
        "graceId": "grace.secluded-cell"
      }
    ]
  }
];
