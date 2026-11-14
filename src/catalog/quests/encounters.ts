import type { Quest } from '../../domain/catalog';

export const encountersQuests: Quest[] = [
  {
    "id": "quest.albus",
    "npcId": "npc.albus",
    "name": "Albus le vieil Albinaurique",
    "content": "base",
    "regionIds": [
      "liurnia"
    ],
    "summary": "Recueillir le secret du médaillon.",
    "requirements": [],
    "warnings": [
      "L’obtention du médaillon prépare l’attaque d’Ensha à la Table ronde."
    ],
    "rewards": [
      "Moitié droite du médaillon secret de l’Arbre-Sacré."
    ],
    "sources": [
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/Old_Albus",
        "verifiedAt": "2026-11-14"
      }
    ],
    "branches": [],
    "steps": [
      {
        "id": "albus.pot",
        "title": "Dissiper son déguisement",
        "location": "Village des Albinauriques",
        "detail": "Monter la pente derrière le village et rouler contre le pot isolé."
      },
      {
        "id": "albus.medallion",
        "title": "Écouter Albus",
        "location": "Village des Albinauriques",
        "detail": "Épuiser ses dialogues et recevoir le médaillon."
      },
      {
        "id": "albus.latenna",
        "title": "Retenir la piste de Latenna",
        "location": "Liurnia",
        "detail": "Garder le médaillon pour la rencontre à la cabane du loup endormi."
      }
    ]
  },
  {
    "id": "quest.ensha",
    "npcId": "npc.ensha",
    "name": "Ensha des vestiges royaux",
    "content": "base",
    "regionIds": [
      "roundtable",
      "liurnia"
    ],
    "summary": "Survivre à l’embuscade de la Table ronde.",
    "requirements": [],
    "warnings": [
      "Cette rencontre dépend de la moitié droite du médaillon d’Albus. Elle ne coche aucune étape d’Albus automatiquement."
    ],
    "rewards": [
      "Main osseuse et ensemble des vestiges royaux."
    ],
    "sources": [
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/Ensha",
        "verifiedAt": "2026-11-14"
      }
    ],
    "branches": [],
    "steps": [
      {
        "id": "ensha.silent",
        "title": "Rencontrer le garde silencieux",
        "location": "Table ronde",
        "detail": "Interagir avec Ensha devant le bureau de Gideon.",
        "optional": true
      },
      {
        "id": "ensha.medallion",
        "title": "Rapporter le médaillon d’Albus",
        "location": "Village des Albinauriques",
        "detail": "Obtenir la moitié droite."
      },
      {
        "id": "ensha.invasion",
        "title": "Vaincre Ensha",
        "location": "Table ronde",
        "detail": "Revenir à la Table ronde et survivre à son invasion."
      },
      {
        "id": "ensha.armor",
        "title": "Récupérer son armure",
        "location": "Devant le bureau de Gideon",
        "detail": "Après le retour au lieu normal, prendre les objets à son ancien emplacement."
      }
    ]
  },
  {
    "id": "quest.hewg",
    "npcId": "npc.hewg",
    "name": "Hewg le maître forgeron",
    "content": "base",
    "regionIds": [
      "roundtable"
    ],
    "summary": "Accompagner le forgeron et l’apprentissage de Roderika.",
    "requirements": [],
    "warnings": [
      "Rencontre et service durable : pas de récompense de quête distincte. Les dialogues évoluent après l’incendie de l’Arbre-Monde."
    ],
    "rewards": [
      "Accès aux améliorations d’armes ; apprentissage de Roderika suivi dans sa propre fiche."
    ],
    "sources": [
      {
        "label": "eXputer — Hewg",
        "url": "https://eldenring.exputer.com/quests/smithing-master-hewg-s-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "branches": [],
    "steps": [
      {
        "id": "hewg.meet",
        "title": "Rencontrer le forgeron",
        "location": "Table ronde",
        "detail": "Parler à Hewg et utiliser sa forge."
      },
      {
        "id": "hewg.roderika",
        "title": "Parler de Roderika",
        "location": "Table ronde",
        "detail": "Lorsqu’elle arrive, échanger leurs propos pour lancer son apprentissage."
      },
      {
        "id": "hewg.prayer",
        "title": "Écouter sa prière",
        "location": "Table ronde",
        "detail": "Revenir au fil du récit et le questionner sur son travail.",
        "optional": true
      },
      {
        "id": "hewg.ending",
        "title": "Revenir après l’incendie",
        "location": "Table ronde",
        "detail": "Écouter Hewg et Roderika après la Forge des Géants puis Maliketh.",
        "optional": true
      }
    ]
  },
  {
    "id": "quest.iji",
    "npcId": "npc.iji",
    "name": "Iji le conseiller de guerre",
    "content": "base",
    "regionIds": [
      "liurnia"
    ],
    "summary": "Écouter le conseiller de Ranni et lui annoncer le sort de Blaidd.",
    "requirements": [],
    "warnings": [
      "Sa conclusion dépend de Ranni et du retour hostile de Blaidd."
    ],
    "rewards": [
      "Services de forge ; cimier filigrané de Caria selon les dialogues ; casque-miroir et perle à sa conclusion."
    ],
    "sources": [
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/War_Counselor_Iji",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Neoseeker — Iji",
        "url": "https://www.neoseeker.com/elden-ring/NPCs/War_Counselor_Iji",
        "verifiedAt": "2026-11-14"
      }
    ],
    "branches": [],
    "steps": [
      {
        "id": "iji.meet",
        "title": "Rencontrer Iji",
        "location": "Route du manoir de Caria",
        "detail": "Traverser le mur illusoire des ruines royales et parler au forgeron."
      },
      {
        "id": "iji.blaidd",
        "title": "Mentionner Blaidd",
        "location": "Route du manoir",
        "detail": "Après la recommandation de Blaidd, choisir le dialogue correspondant.",
        "optional": true
      },
      {
        "id": "iji.service",
        "title": "Écouter son rôle auprès de Ranni",
        "location": "Trois sœurs",
        "detail": "Parler à sa projection puis le revoir à la forge."
      },
      {
        "id": "iji.news",
        "title": "Annoncer la mort de Blaidd",
        "location": "Route du manoir",
        "detail": "Après la conclusion de Ranni et Blaidd, informer Iji."
      },
      {
        "id": "iji.remains",
        "title": "Revenir à la forge",
        "location": "Route du manoir",
        "detail": "Recharger et récupérer le casque ainsi que la perle."
      }
    ]
  },
  {
    "id": "quest.miriel",
    "npcId": "npc.miriel",
    "name": "Miriel, pasteur des vœux",
    "content": "base",
    "regionIds": [
      "liurnia"
    ],
    "summary": "Découvrir les enseignements de l’église des vœux.",
    "requirements": [],
    "warnings": [
      "L’absolution peut réparer une hostilité ; elle ne ressuscite pas les PNJ tués. Miriel est un enseignant, sans longue quête à embranchements."
    ],
    "rewards": [
      "Apprentissage de sorcelleries et d’incantations ; explications sur l’absolution."
    ],
    "sources": [
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/Miriel",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/Church_of_Vows",
        "verifiedAt": "2026-11-14"
      }
    ],
    "branches": [],
    "steps": [
      {
        "id": "miriel.church",
        "title": "Rencontrer Miriel",
        "location": "Église des vœux",
        "detail": "Écouter son histoire de Radagon et Rennala."
      },
      {
        "id": "miriel.books",
        "title": "Confier un livre de prières ou parchemin",
        "location": "Église des vœux",
        "detail": "Lui remettre un ouvrage pour étendre ses enseignements.",
        "optional": true
      },
      {
        "id": "miriel.dew",
        "title": "Comprendre l’absolution",
        "location": "Bassin de l’église",
        "detail": "Si une faute peut être absoute, utiliser une rosée céleste au bassin.",
        "optional": true
      }
    ]
  },
  {
    "id": "quest.pidia",
    "npcId": "npc.pidia",
    "name": "Pidia, serviteur de Caria",
    "content": "base",
    "regionIds": [
      "liurnia"
    ],
    "summary": "Trouver le marchand caché du manoir de Caria.",
    "requirements": [],
    "warnings": [
      "Son dernier butin dépend de la potion de Seluvis. Le garder vivant permet de consulter sa boutique avant la conclusion."
    ],
    "rewards": [
      "Perle de Pidia ; pantin de Dolores ou de Nepheli selon le choix de potion."
    ],
    "sources": [
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/Pidia",
        "verifiedAt": "2026-11-14"
      }
    ],
    "branches": [],
    "steps": [
      {
        "id": "pidia.roof",
        "title": "Atteindre son balcon",
        "location": "Manoir de Caria",
        "detail": "Depuis les Trois sœurs, descendre sur les toits puis emprunter l’échelle vers son balcon."
      },
      {
        "id": "pidia.shop",
        "title": "Parler au marchand",
        "location": "Balcon du manoir",
        "detail": "Épuiser ses dialogues et consulter sa boutique."
      },
      {
        "id": "pidia.puppets",
        "title": "Revenir après la mort de Seluvis",
        "location": "Balcon du manoir",
        "detail": "Écouter les voix, puis récupérer sa perle et son pantin."
      }
    ]
  },
  {
    "id": "quest.great-jar",
    "npcId": "npc.great-jar",
    "name": "La Grande jarre",
    "content": "base",
    "regionIds": [
      "caelid",
      "underground"
    ],
    "summary": "Réussir le défi devant le colisée de Caelid.",
    "requirements": [],
    "warnings": [
      "Vaincre les trois adversaires dans la même tentative. Ne pas attaquer la Grande jarre."
    ],
    "rewards": [
      "Talisman Arsenal de la Grande jarre."
    ],
    "sources": [
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/Great_Jar",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/Great-Jar%27s_Arsenal",
        "verifiedAt": "2026-11-14"
      }
    ],
    "branches": [],
    "steps": [
      {
        "id": "great-jar.well",
        "title": "Emprunter le puits profond",
        "location": "Siofra → Tertre draconique",
        "detail": "Utiliser les clés-lames de pierre à l’ascenseur du nord de Siofra pour atteindre le chemin du colisée."
      },
      {
        "id": "great-jar.talk",
        "title": "Interagir avec la Grande jarre",
        "location": "Devant le colisée de Caelid",
        "detail": "Faire apparaître les trois marques rouges."
      },
      {
        "id": "great-jar.trial",
        "title": "Vaincre les trois duellistes",
        "location": "Chemin devant le colisée",
        "detail": "Enchaîner les trois combats sans mourir ni réinitialiser la zone. Le défi fonctionne hors ligne."
      },
      {
        "id": "great-jar.reward",
        "title": "Reparler à la jarre",
        "location": "Devant le colisée",
        "detail": "Recevoir son talisman après la troisième victoire."
      }
    ]
  },
  {
    "id": "quest.melina",
    "npcId": "npc.melina",
    "name": "Melina — parcours principal",
    "content": "base",
    "regionIds": [
      "limgrave",
      "capital",
      "mountaintops",
      "farum"
    ],
    "summary": "Suivre l’accord de Melina jusqu’à la Forge des Géants.",
    "requirements": [],
    "warnings": [
      "Recevoir la Flamme avant la forge évite son sacrifice, mais provoque son départ définitif. Se purifier ensuite ne la fait pas revenir."
    ],
    "rewards": [
      "Torrent ; accès à la Table ronde ; médaillon de Rold."
    ],
    "sources": [
      {
        "label": "Eldenpedia — personnage et rencontres",
        "url": "https://eldenring.wiki.gg/wiki/Melina",
        "verifiedAt": "2026-11-14"
      }
    ],
    "branches": [
      {
        "id": "melina.forge",
        "label": "Le choix à la forge",
        "options": [
          {
            "id": "sacrifice",
            "label": "Accepter son sacrifice",
            "consequence": "Melina embrase l’Arbre-Monde."
          },
          {
            "id": "flame",
            "label": "Porter la Flamme",
            "consequence": "Le joueur embrase l’Arbre ; Melina est partie."
          }
        ]
      }
    ],
    "steps": [
      {
        "id": "melina.accord",
        "title": "Accepter son accord",
        "location": "Grâce de Nécrolimbe",
        "detail": "Se reposer aux grâces jusqu’à sa proposition pour obtenir Torrent."
      },
      {
        "id": "melina.hold",
        "title": "Rejoindre la Table ronde",
        "location": "À une grâce",
        "detail": "Accepter son invitation lorsqu’elle la propose."
      },
      {
        "id": "melina.churches",
        "title": "Écouter ses paroles aux églises",
        "location": "Églises de l’Entre-Terre",
        "detail": "Choisir « Parler à Melina » lorsqu’il est proposé.",
        "optional": true
      },
      {
        "id": "melina.thorns",
        "title": "Examiner les ronces après Morgott",
        "location": "Trône d’Elden",
        "detail": "Constater l’accès fermé à l’Arbre-Monde, puis se reposer pour recevoir le médaillon de Rold."
      },
      {
        "id": "melina.reach-forge",
        "title": "Atteindre la Forge",
        "location": "Cimes des Géants",
        "detail": "Vaincre le Géant de feu et monter à la grâce de la forge."
      },
      {
        "id": "melina.decision",
        "title": "Renseigner le choix de la forge",
        "location": "Forge des Géants",
        "detail": "Sans la Flamme, accepter le sacrifice de Melina ; avec la Flamme, accomplir soi-même l’embrasement."
      }
    ]
  }
];
