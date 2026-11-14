// Inventaire éditorial indépendant des fiches publiées : modifier explicitement le périmètre.
export type QuestScopeEntry = {
  questId: string; startRegionId: string; kind: 'quest' | 'encounter' | 'story';
  characters: { id: string; name: string }[]; relatedQuestIds: string[];
};
export const questScope: QuestScopeEntry[] = [
  {
    "questId": "quest.roderika",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.roderika",
        "name": "Roderika"
      }
    ],
    "relatedQuestIds": [
      "quest.hewg"
    ]
  },
  {
    "questId": "quest.boc",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.boc",
        "name": "Boc le couturier"
      }
    ],
    "relatedQuestIds": []
  },
  {
    "questId": "quest.kenneth",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.kenneth",
        "name": "Kenneth Haight"
      }
    ],
    "relatedQuestIds": [
      "quest.nepheli",
      "quest.gostoc"
    ]
  },
  {
    "questId": "quest.ranni",
    "startRegionId": "liurnia",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.ranni",
        "name": "Ranni"
      }
    ],
    "relatedQuestIds": [
      "quest.blaidd",
      "quest.iji",
      "quest.seluvis",
      "quest.rogier",
      "quest.fia"
    ]
  },
  {
    "questId": "quest.sellen",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.sellen",
        "name": "Sellen"
      },
      {
        "id": "npc.jerren",
        "name": "Jerren"
      }
    ],
    "relatedQuestIds": [
      "quest.seluvis"
    ]
  },
  {
    "questId": "quest.alexander",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.alexander",
        "name": "Alexandre (Alexander)"
      }
    ],
    "relatedQuestIds": [
      "quest.jar-bairn"
    ]
  },
  {
    "questId": "quest.blaidd",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.blaidd",
        "name": "Blaidd"
      }
    ],
    "relatedQuestIds": [
      "quest.ranni",
      "quest.iji",
      "quest.sellen"
    ]
  },
  {
    "questId": "quest.yura",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.yura",
        "name": "Yura"
      }
    ],
    "relatedQuestIds": [
      "quest.shabriri"
    ]
  },
  {
    "questId": "quest.patches",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.patches",
        "name": "Pat (Patches)"
      }
    ],
    "relatedQuestIds": [
      "quest.tanith",
      "quest.rya"
    ]
  },
  {
    "questId": "quest.irina",
    "startRegionId": "weeping",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.irina",
        "name": "Irina"
      },
      {
        "id": "npc.edgar",
        "name": "Edgar"
      }
    ],
    "relatedQuestIds": [
      "quest.hyetta"
    ]
  },
  {
    "questId": "quest.varre",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.varre",
        "name": "Varré le Blême"
      }
    ],
    "relatedQuestIds": []
  },
  {
    "questId": "quest.nepheli",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.nepheli",
        "name": "Nepheli Loux"
      }
    ],
    "relatedQuestIds": [
      "quest.kenneth",
      "quest.gostoc",
      "quest.seluvis",
      "quest.gideon"
    ]
  },
  {
    "questId": "quest.rogier",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.rogier",
        "name": "Rogier"
      }
    ],
    "relatedQuestIds": [
      "quest.fia",
      "quest.ranni",
      "quest.d"
    ]
  },
  {
    "questId": "quest.bernahl",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.bernahl",
        "name": "Bernahl"
      }
    ],
    "relatedQuestIds": [
      "quest.tanith"
    ]
  },
  {
    "questId": "quest.gostoc",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.gostoc",
        "name": "Gostoc"
      }
    ],
    "relatedQuestIds": [
      "quest.nepheli",
      "quest.kenneth"
    ]
  },
  {
    "questId": "quest.d",
    "startRegionId": "limgrave",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.d",
        "name": "D, traqueur des non-morts"
      },
      {
        "id": "npc.d-twin",
        "name": "Le frère jumeau de D"
      }
    ],
    "relatedQuestIds": [
      "quest.fia",
      "quest.gurranq",
      "quest.rogier"
    ]
  },
  {
    "questId": "quest.rya",
    "startRegionId": "liurnia",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.rya",
        "name": "Rya / Zorayas"
      }
    ],
    "relatedQuestIds": [
      "quest.boggart",
      "quest.tanith",
      "quest.patches"
    ]
  },
  {
    "questId": "quest.boggart",
    "startRegionId": "liurnia",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.boggart",
        "name": "Malfrat (Boggart)"
      }
    ],
    "relatedQuestIds": [
      "quest.rya",
      "quest.dung-eater"
    ]
  },
  {
    "questId": "quest.hyetta",
    "startRegionId": "liurnia",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.hyetta",
        "name": "Hyetta"
      }
    ],
    "relatedQuestIds": [
      "quest.irina",
      "quest.shabriri",
      "quest.melina"
    ]
  },
  {
    "questId": "quest.thops",
    "startRegionId": "liurnia",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.thops",
        "name": "Thops"
      }
    ],
    "relatedQuestIds": []
  },
  {
    "questId": "quest.latenna",
    "startRegionId": "liurnia",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.latenna",
        "name": "Latenna"
      }
    ],
    "relatedQuestIds": [
      "quest.albus",
      "quest.gideon"
    ]
  },
  {
    "questId": "quest.jar-bairn",
    "startRegionId": "liurnia",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.jar-bairn",
        "name": "Jarre-enfant (Jar-Bairn)"
      }
    ],
    "relatedQuestIds": [
      "quest.alexander",
      "quest.diallos"
    ]
  },
  {
    "questId": "quest.seluvis",
    "startRegionId": "liurnia",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.seluvis",
        "name": "Seluvis"
      }
    ],
    "relatedQuestIds": [
      "quest.ranni",
      "quest.nepheli",
      "quest.dung-eater",
      "quest.pidia"
    ]
  },
  {
    "questId": "quest.diallos",
    "startRegionId": "roundtable",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.diallos",
        "name": "Diallos"
      }
    ],
    "relatedQuestIds": [
      "quest.jar-bairn",
      "quest.tanith"
    ]
  },
  {
    "questId": "quest.fia",
    "startRegionId": "roundtable",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.fia",
        "name": "Fia"
      }
    ],
    "relatedQuestIds": [
      "quest.d",
      "quest.rogier",
      "quest.ranni"
    ]
  },
  {
    "questId": "quest.corhyn",
    "startRegionId": "roundtable",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.corhyn",
        "name": "Frère Corhyn"
      },
      {
        "id": "npc.goldmask",
        "name": "Masque d’or (Goldmask)"
      }
    ],
    "relatedQuestIds": []
  },
  {
    "questId": "quest.dung-eater",
    "startRegionId": "roundtable",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.dung-eater",
        "name": "Coprophage (Dung Eater)"
      }
    ],
    "relatedQuestIds": [
      "quest.boggart",
      "quest.seluvis"
    ]
  },
  {
    "questId": "quest.gideon",
    "startRegionId": "roundtable",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.gideon",
        "name": "Gideon Ofnir"
      }
    ],
    "relatedQuestIds": [
      "quest.nepheli",
      "quest.albus",
      "quest.ensha",
      "quest.latenna"
    ]
  },
  {
    "questId": "quest.millicent",
    "startRegionId": "caelid",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.millicent",
        "name": "Millicent"
      },
      {
        "id": "npc.gowry",
        "name": "Gowry"
      }
    ],
    "relatedQuestIds": [
      "quest.shabriri"
    ]
  },
  {
    "questId": "quest.gurranq",
    "startRegionId": "caelid",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.gurranq",
        "name": "Gurranq"
      }
    ],
    "relatedQuestIds": [
      "quest.d"
    ]
  },
  {
    "questId": "quest.tanith",
    "startRegionId": "gelmir",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.tanith",
        "name": "Tanith"
      }
    ],
    "relatedQuestIds": [
      "quest.rya",
      "quest.patches",
      "quest.bernahl",
      "quest.diallos"
    ]
  },
  {
    "questId": "quest.shabriri",
    "startRegionId": "mountaintops",
    "kind": "quest",
    "characters": [
      {
        "id": "npc.shabriri",
        "name": "Shabriri"
      }
    ],
    "relatedQuestIds": [
      "quest.yura",
      "quest.hyetta",
      "quest.melina",
      "quest.millicent"
    ]
  },
  {
    "questId": "quest.albus",
    "startRegionId": "liurnia",
    "kind": "encounter",
    "characters": [
      {
        "id": "npc.albus",
        "name": "Albus"
      }
    ],
    "relatedQuestIds": [
      "quest.latenna",
      "quest.ensha",
      "quest.gideon"
    ]
  },
  {
    "questId": "quest.ensha",
    "startRegionId": "roundtable",
    "kind": "encounter",
    "characters": [
      {
        "id": "npc.ensha",
        "name": "Ensha"
      }
    ],
    "relatedQuestIds": [
      "quest.albus",
      "quest.gideon"
    ]
  },
  {
    "questId": "quest.hewg",
    "startRegionId": "roundtable",
    "kind": "encounter",
    "characters": [
      {
        "id": "npc.hewg",
        "name": "Hewg"
      }
    ],
    "relatedQuestIds": [
      "quest.roderika"
    ]
  },
  {
    "questId": "quest.iji",
    "startRegionId": "liurnia",
    "kind": "encounter",
    "characters": [
      {
        "id": "npc.iji",
        "name": "Iji"
      }
    ],
    "relatedQuestIds": [
      "quest.blaidd",
      "quest.ranni"
    ]
  },
  {
    "questId": "quest.miriel",
    "startRegionId": "liurnia",
    "kind": "encounter",
    "characters": [
      {
        "id": "npc.miriel",
        "name": "Miriel"
      }
    ],
    "relatedQuestIds": []
  },
  {
    "questId": "quest.pidia",
    "startRegionId": "liurnia",
    "kind": "encounter",
    "characters": [
      {
        "id": "npc.pidia",
        "name": "Pidia"
      }
    ],
    "relatedQuestIds": [
      "quest.seluvis",
      "quest.nepheli"
    ]
  },
  {
    "questId": "quest.great-jar",
    "startRegionId": "caelid",
    "kind": "encounter",
    "characters": [
      {
        "id": "npc.great-jar",
        "name": "Grande jarre"
      }
    ],
    "relatedQuestIds": []
  },
  {
    "questId": "quest.melina",
    "startRegionId": "limgrave",
    "kind": "story",
    "characters": [
      {
        "id": "npc.melina",
        "name": "Melina"
      }
    ],
    "relatedQuestIds": [
      "quest.shabriri",
      "quest.hyetta",
      "quest.millicent"
    ]
  }
];
export const scopeSource = { label: 'Roundtable Hold — inventaire des parcours PNJ', url: 'https://roundtablehold.net/checklists/npc_questlines.html', verifiedAt: '2026-11-14' };
export const scopeDescription = 'Parcours PNJ du jeu de base : quêtes, rencontres courtes et histoire de Melina. Les dialogues isolés, boutiques ordinaires et contenus supprimés ne sont pas recensés. DLC exclu.';
