import type { Item } from '../../domain/items';

export const earlyRewardItems: Item[] = [
  {
    "id": "item.arsenal-charm",
    "name": "Charme d’arsenal",
    "category": "talisman",
    "content": "base",
    "regionIds": [
      "roundtable"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Arsenal Charm"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Nepheli Loux, Warrior",
        "url": "https://eldenring.wiki.gg/wiki/Nepheli_Loux%2C_Warrior",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.arsenal-charm.reward",
        "method": "quest_reward",
        "regionId": "roundtable",
        "location": "Table ronde · Nepheli Loux",
        "description": "Parler à Nepheli à la Table ronde après la victoire sur Godrick.",
        "conditions": [
          "Rencontrer Nepheli à Voilorage avant de vaincre Godrick ; sans cette rencontre préalable, cette récompense est manquée.",
          "Vaincre Godrick puis retrouver Nepheli à la Table ronde."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Nepheli Loux, Warrior",
            "url": "https://eldenring.wiki.gg/wiki/Nepheli_Loux%2C_Warrior",
            "verifiedAt": "2026-11-15"
          }
        ],
        "sourceEntityId": "npc.nepheli",
        "relatedQuestId": "quest.nepheli"
      }
    ]
  },
  {
    "id": "item.erdtree-favor",
    "name": "Faveur de l’Arbre-Monde",
    "category": "talisman",
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Erdtree’s Favor"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Erdtree's Favor",
        "url": "https://eldenring.wiki.gg/wiki/Erdtree%27s_Favor",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.erdtree-favor.reward",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Tombe des héros des confins · autel du passage secret",
        "description": "Quitter le pont étroit en descendant sur le chemin caché ; passer le piège de feu puis le pont gardé par deux Rejetons greffés pour atteindre l’autel.",
        "conditions": [
          "Ouvrir l’entrée avec deux Clés-lames de pierre.",
          "Les ennemis proches peuvent être contournés ; l’objet se ramasse sur l’autel."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Erdtree's Favor",
            "url": "https://eldenring.wiki.gg/wiki/Erdtree%27s_Favor",
            "verifiedAt": "2026-11-15"
          }
        ],
        "graceId": "grace.stranded"
      }
    ]
  },
  {
    "id": "item.claw-talisman",
    "name": "Talisman de la griffe",
    "category": "talisman",
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Claw Talisman"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Claw Talisman",
        "url": "https://eldenring.wiki.gg/wiki/Claw_Talisman",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.claw-talisman.reward",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Voilorage · tour de guet sur les toits",
        "description": "Depuis la tour du rempart, gagner les toits, monter par le pilier brisé puis l’échelle de la tour pour ramasser le talisman.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Claw Talisman",
            "url": "https://eldenring.wiki.gg/wiki/Claw_Talisman",
            "verifiedAt": "2026-11-15"
          }
        ]
      }
    ]
  },
  {
    "id": "item.axe-talisman",
    "name": "Talisman de la hache",
    "category": "talisman",
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Axe Talisman"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Axe Talisman",
        "url": "https://eldenring.wiki.gg/wiki/Axe_Talisman",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.axe-talisman.reward",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Ruines des bois brumeux · coffre de la cave",
        "description": "Descendre dans la cave des ruines et ouvrir le coffre près de l’ours runique.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Axe Talisman",
            "url": "https://eldenring.wiki.gg/wiki/Axe_Talisman",
            "verifiedAt": "2026-11-15"
          }
        ]
      }
    ]
  },
  {
    "id": "item.blessed-dew",
    "name": "Talisman de la rosée bénie",
    "category": "talisman",
    "content": "base",
    "regionIds": [
      "capital"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Blessed Dew Talisman"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Blessed Dew Talisman",
        "url": "https://eldenring.wiki.gg/wiki/Blessed_Dew_Talisman",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.blessed-dew.reward",
        "method": "exploration",
        "regionId": "capital",
        "location": "Leyndell · coffre à l’ouest du pont divin",
        "description": "Depuis le point d’arrivée du téléporteur, gagner le coffre à l’ouest du pont divin en évitant le golem.",
        "conditions": [
          "La tour du Retour, dans la Péninsule larmoyante, contient un coffre-piège qui transporte au pont divin.",
          "Le talisman est à Leyndell, même si cet itinéraire commence dans la Péninsule."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Blessed Dew Talisman",
            "url": "https://eldenring.wiki.gg/wiki/Blessed_Dew_Talisman",
            "verifiedAt": "2026-11-15"
          }
        ]
      }
    ]
  },
  {
    "id": "item.wandering-noble-ashes",
    "name": "Cendres de nobles errants",
    "category": "spirit_ash",
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Wandering Noble Ashes"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Wandering Noble Ashes",
        "url": "https://eldenring.wiki.gg/wiki/Wandering_Noble_Ashes",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.wandering-noble-ashes.reward",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Catacombes orageuses · salle en cul-de-sac",
        "description": "Ramasser les cendres sur le corps dans la salle gardée par les diablotins.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Wandering Noble Ashes",
            "url": "https://eldenring.wiki.gg/wiki/Wandering_Noble_Ashes",
            "verifiedAt": "2026-11-15"
          }
        ],
        "graceId": "grace.stormfoot"
      }
    ]
  },
  {
    "id": "item.lhutel-headless",
    "name": "Lhutel l’Acéphale",
    "category": "spirit_ash",
    "content": "base",
    "regionIds": [
      "weeping"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Lhutel the Headless"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Lhutel the Headless",
        "url": "https://eldenring.wiki.gg/wiki/Lhutel_the_Headless",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.lhutel-headless.reward",
        "method": "boss_reward",
        "regionId": "weeping",
        "location": "Catacombes du Val-aux-Tombes · boss",
        "description": "Vaincre l’Ombre du cimetière au fond des catacombes.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Lhutel the Headless",
            "url": "https://eldenring.wiki.gg/wiki/Lhutel_the_Headless",
            "verifiedAt": "2026-11-15"
          }
        ],
        "sourceEntityId": "boss.cemetery-shade.tombsward"
      }
    ]
  },
  {
    "id": "item.demi-human-ashes",
    "name": "Cendres de semi-humains",
    "category": "spirit_ash",
    "content": "base",
    "regionIds": [
      "weeping"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Demi-Human Ashes"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Demi-Human Ashes",
        "url": "https://eldenring.wiki.gg/wiki/Demi-Human_Ashes",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.demi-human-ashes.reward",
        "method": "boss_reward",
        "regionId": "weeping",
        "location": "Catacombes de l’Empaleur · boss",
        "description": "Vaincre le Chat de garde funéraire accompagné de diablotins.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Demi-Human Ashes",
            "url": "https://eldenring.wiki.gg/wiki/Demi-Human_Ashes",
            "verifiedAt": "2026-11-15"
          }
        ],
        "sourceEntityId": "boss.watchdog.impalers"
      }
    ]
  },
  {
    "id": "item.tailoring-tools",
    "name": "Nécessaire de couture",
    "category": "tool",
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "summary": "Outil permanent permettant les retouches disponibles aux sites de grâce.",
    "aliases": [
      "Tailoring Tools"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Demi-Human Chief",
        "url": "https://eldenring.wiki.gg/wiki/Demi-Human_Chief",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.tailoring-tools.reward",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Grotte littorale · Chefs semi-humains",
        "description": "Vaincre les deux Chefs semi-humains de la grotte.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Demi-Human Chief",
            "url": "https://eldenring.wiki.gg/wiki/Demi-Human_Chief",
            "verifiedAt": "2026-11-15"
          }
        ],
        "sourceEntityId": "boss.demi-human-chiefs.coastal-cave",
        "relatedQuestId": "quest.boc"
      }
    ]
  },
  {
    "id": "item.royal-house-scroll",
    "name": "Parchemin de la maison royale",
    "category": "key_item",
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "summary": "À remettre à Sellen, Miriel ou Seluvis pour débloquer des sorcelleries.",
    "aliases": [
      "Royal House Scroll"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Elden Ring Guide",
        "url": "https://eldenring.wiki.gg/wiki/Elden_Ring_Guide",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.royal-house-scroll.reward",
        "method": "exploration",
        "regionId": "limgrave",
        "location": "Campement à l’est du lac d’Agheel, sud",
        "description": "Ramasser le parchemin sur le corps au sommet des ruines du campement, près du sorcier.",
        "conditions": [],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Elden Ring Guide",
            "url": "https://eldenring.wiki.gg/wiki/Elden_Ring_Guide",
            "verifiedAt": "2026-11-15"
          }
        ],
        "graceId": "grace.agheel-south"
      }
    ]
  },
  {
    "id": "item.godrick-great-rune",
    "name": "Rune majeure de Godrick",
    "category": "key_item",
    "content": "base",
    "regionIds": [
      "limgrave"
    ],
    "summary": "Objet obtenu au lieu indiqué.",
    "aliases": [
      "Godrick’s Great Rune"
    ],
    "sources": [
      {
        "label": "Eldenpedia — Godrick's Great Rune",
        "url": "https://eldenring.wiki.gg/wiki/Godrick%27s_Great_Rune",
        "verifiedAt": "2026-11-15"
      }
    ],
    "acquisitions": [
      {
        "id": "acquisition.godrick-great-rune.reward",
        "method": "boss_reward",
        "regionId": "limgrave",
        "location": "Voilorage · Godrick le Greffé",
        "description": "Vaincre Godrick pour recevoir sa rune majeure ; la restaurer ensuite au sommet de la tour divine de Nécrolimbe.",
        "conditions": [
          "La restauration est une étape d’utilisation, pas une seconde récompense.",
          "La rune est perdue au cycle suivant ; la coche du carnet signifie seulement « déjà obtenu »."
        ],
        "probability": {
          "kind": "guaranteed"
        },
        "sources": [
          {
            "label": "Eldenpedia — Godrick's Great Rune",
            "url": "https://eldenring.wiki.gg/wiki/Godrick%27s_Great_Rune",
            "verifiedAt": "2026-11-15"
          }
        ],
        "sourceEntityId": "boss.godrick.stormveil"
      }
    ]
  }
];
