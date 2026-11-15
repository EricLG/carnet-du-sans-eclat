import type { Item } from '../../domain/items';

export const upgradesItems: Item[] = [
  {
    "id": "item.golden-seed",
    "name": "Graine dorée",
    "category": "upgrade",
    "summary": "Améliore le nombre de charges des fioles. Chaque lieu est suivi séparément.",
    "aliases": [
      "Golden Seed"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "weeping"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Golden Seed",
        "url": "https://eldenring.wiki.gg/wiki/Golden_Seed",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Eldenpedia — Fringefolk Hero's Grave",
        "url": "https://eldenring.wiki.gg/wiki/Fringefolk_Hero%27s_Grave",
        "verifiedAt": "2026-11-14"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.golden-seed.stormhill",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Route de Valorage",
        "description": "Ramasser la graine sous l’arbre doré au-delà de Portorage.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Golden Seed",
            "url": "https://eldenring.wiki.gg/wiki/Golden_Seed",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.gatefront"
      },
      {
        "id": "acquisition.golden-seed.fort-haight",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Devant le fort Haight",
        "description": "Ramasser la graine au pied de l’arbre doré.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Golden Seed",
            "url": "https://eldenring.wiki.gg/wiki/Golden_Seed",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.fort-haight-west"
      },
      {
        "id": "acquisition.golden-seed.stormveil",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Cour de Voilorage, près de la cellule isolée",
        "description": "Ramasser la graine sous l’arbre doré près de la salle de Nepheli.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Golden Seed",
            "url": "https://eldenring.wiki.gg/wiki/Golden_Seed",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.secluded-cell"
      },
      {
        "id": "acquisition.golden-seed.morne",
        "method": "exploration",
        "regionId": "weeping",
        "location": "Route du château de Vent-Hurlant",
        "description": "Ramasser la graine sous l’arbre doré au bord de la route.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Golden Seed",
            "url": "https://eldenring.wiki.gg/wiki/Golden_Seed",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.morne-rampart"
      },
      {
        "id": "acquisition.golden-seed.fringefolk",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Tombe des héros des confins",
        "description": "Vaincre l’Esprit d’arbre ulcéreux du donjon.",
        "conditions": [
          "Ouvrir le donjon avec deux clés-lames de pierre."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Fringefolk Hero's Grave",
            "url": "https://eldenring.wiki.gg/wiki/Fringefolk_Hero%27s_Grave",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "boss.tree-spirit.fringefolk",
        "graceId": "grace.stranded"
      },
      {
        "id": "acquisition.golden-seed.stormveil-spirit",
        "method": "enemy_drop",
        "regionId": "limgrave",
        "location": "Sous-sols de Voilorage",
        "description": "Vaincre l’Esprit d’arbre ulcéreux sous le château.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Golden Seed",
            "url": "https://eldenring.wiki.gg/wiki/Golden_Seed",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "enemy.tree-spirit.stormveil"
      }
    ]
  },
  {
    "id": "item.sacred-tear",
    "name": "Larme de vie",
    "category": "upgrade",
    "summary": "Améliore la restauration des fioles ; une coche distincte pour chaque église.",
    "aliases": [
      "Sacred Tear"
    ],
    "content": "base",
    "regionIds": [
      "limgrave",
      "weeping",
      "liurnia",
      "caelid",
      "altus",
      "mountaintops"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Sacred Tear",
        "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.sacred-tear.third-marika",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Troisième église de Marika",
        "description": "Prendre la larme au pied de la statue.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.third-marika"
      },
      {
        "id": "acquisition.sacred-tear.pilgrimage",
        "method": "exploration",
        "regionId": "weeping",
        "location": "Église des pèlerinages",
        "description": "Prendre la larme au pied de la statue.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.pilgrimage"
      },
      {
        "id": "acquisition.sacred-tear.fourth-marika",
        "method": "exploration",
        "regionId": "weeping",
        "location": "Quatrième église de Marika",
        "description": "Prendre la larme au pied de la statue.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.fourth-marika"
      },
      {
        "id": "acquisition.sacred-tear.callu",
        "method": "exploration",
        "regionId": "weeping",
        "location": "Église baptismale de Callu",
        "description": "Prendre la larme dans l’église près du village morne.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-14"
          }
        ]
      },
      {
        "id": "acquisition.sacred-tear.irith",
        "method": "exploration",
        "regionId": "liurnia",
        "location": "Église d’Irith",
        "description": "Ramasser la larme au pied de la statue dans l’église.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.sacred-tear.bellum",
        "method": "exploration",
        "regionId": "liurnia",
        "location": "Église de Bellum",
        "description": "Ramasser la larme au pied de la statue dans l’église.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.sacred-tear.inhibition",
        "method": "exploration",
        "regionId": "liurnia",
        "location": "Église de l’Inhibition",
        "description": "Ramasser la larme au pied de la statue dans l’église.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.sacred-tear.plague",
        "method": "exploration",
        "regionId": "caelid",
        "location": "Église de la putréfaction",
        "description": "Ramasser la larme au pied de la statue dans l’église.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.sacred-tear.second-marika",
        "method": "exploration",
        "regionId": "altus",
        "location": "Deuxième église de Marika",
        "description": "Ramasser la larme au pied de la statue dans l’église.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.sacred-tear.stormcaller",
        "method": "exploration",
        "regionId": "altus",
        "location": "Église de l’orage",
        "description": "Ramasser la larme au pied de la statue dans l’église.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.sacred-tear.repose",
        "method": "exploration",
        "regionId": "mountaintops",
        "location": "Église du repos",
        "description": "Ramasser la larme au pied de la statue dans l’église.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.sacred-tear.first-marika",
        "method": "exploration",
        "regionId": "mountaintops",
        "location": "Première église de Marika",
        "description": "Ramasser la larme au pied de la statue dans l’église.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Sacred Tear",
            "url": "https://eldenring.wiki.gg/wiki/Sacred_Tear",
            "verifiedAt": "2026-11-15"
          }
        ]
      }
    ]
  },
  {
    "id": "item.memory-stone",
    "name": "Pierre de mémoire",
    "category": "upgrade",
    "summary": "Ajoute un emplacement de sort ; chaque acquisition reste suivie par cycle.",
    "aliases": [
      "Memory Stone"
    ],
    "content": "base",
    "regionIds": [
      "weeping",
      "roundtable",
      "liurnia",
      "caelid",
      "gelmir"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Memory Stone",
        "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.memory-stone.oridys",
        "method": "puzzle",
        "regionId": "weeping",
        "location": "Tour d’Oridys",
        "description": "Lire le livre de la statue, trouver les trois tortues spectrales puis ouvrir le coffre au sommet.",
        "conditions": [
          "Une tortue est dans l’escalier, une dans les buissons près de l’entrée et la dernière est invisible dans le bassin."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Memory Stone",
            "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
            "verifiedAt": "2026-11-14"
          }
        ],
        "graceId": "grace.morne-rampart"
      },
      {
        "id": "acquisition.memory-stone.husks",
        "method": "merchant",
        "regionId": "roundtable",
        "location": "Boutique des Servantes jumelles",
        "description": "Acheter la pierre, disponible en un exemplaire par cycle.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Memory Stone",
            "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
            "verifiedAt": "2026-11-14"
          }
        ],
        "sourceEntityId": "npc.twin-maidens",
        "price": "3 000 runes"
      },
      {
        "id": "acquisition.memory-stone.testu",
        "method": "puzzle",
        "regionId": "liurnia",
        "location": "Tour de Testu",
        "description": "Lire l’énigme à l’entrée, puis trouver et frapper les trois tortues spectrales pour ouvrir la tour et son coffre.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Memory Stone",
            "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.memory-stone.converted",
        "method": "exploration",
        "regionId": "liurnia",
        "location": "Tour du converti",
        "description": "Atteindre le coffre à l’étage en escaladant les murs extérieurs avec Torrent ; l’émote Érudition offre un autre accès.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Memory Stone",
            "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.memory-stone.seluvis",
        "method": "exploration",
        "regionId": "liurnia",
        "location": "Tour de Seluvis",
        "description": "Ouvrir le coffre au sommet de la tour.",
        "conditions": [
          "Entrer au service de Ranni pour accéder à cette partie des Trois Sœurs."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Memory Stone",
            "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.memory-stone.lenne",
        "method": "exploration",
        "regionId": "caelid",
        "location": "Tour de Lenne",
        "description": "Utiliser la source spirituelle avec Torrent pour atteindre le balcon puis le coffre de la tour.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Memory Stone",
            "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
            "verifiedAt": "2026-11-15"
          }
        ]
      },
      {
        "id": "acquisition.memory-stone.red-wolf",
        "method": "boss_reward",
        "regionId": "liurnia",
        "location": "Académie de Raya Lucaria · salon de débat",
        "description": "Vaincre le Loup cramoisi de Radagon.",
        "conditions": [
          "La Clé de pierre d’éclat de l’Académie permet d’entrer dans Raya Lucaria."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Memory Stone",
            "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
            "verifiedAt": "2026-11-15"
          }
        ],
        "sourceEntityId": "boss.red-wolf.raya-lucaria"
      },
      {
        "id": "acquisition.memory-stone.maggie",
        "method": "boss_reward",
        "regionId": "gelmir",
        "location": "Au nord-est du village des ermites",
        "description": "Vaincre Maggie, reine des semi-humains.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Memory Stone",
            "url": "https://eldenring.wiki.gg/wiki/Memory_Stone",
            "verifiedAt": "2026-11-15"
          }
        ],
        "sourceEntityId": "boss.maggie.gelmir"
      }
    ]
  },
  {
    "id": "item.crimson-crystal-tear",
    "name": "Larme de cristal pourpre",
    "category": "upgrade",
    "summary": "Larme de cristal réutilisable dans la fiole de salut miraculeux.",
    "aliases": [
      "Crimson Crystal Tear"
    ],
    "content": "base",
    "regionIds": [
      "limgrave"
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
        "id": "acquisition.crimson-crystal-tear.third-marika",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Bassin de la troisième église de Marika",
        "description": "Prendre la larme avec la fiole de salut miraculeux.",
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
      }
    ]
  }
];
