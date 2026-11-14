import type { Quest } from '../../domain/catalog';

export const liurniaQuests: Quest[] = [
  {
    "id": "quest.rya",
    "npcId": "npc.rya",
    "name": "Rya / Zorayas",
    "content": "base",
    "regionIds": [
      "liurnia",
      "altus",
      "gelmir"
    ],
    "summary": "Découvrir les origines de l’éclaireuse du manoir.",
    "requirements": [],
    "warnings": [
      "Avancer ses confidences et obtenir l’amnios avant Rykard. Le tonique et sa mise à mort changent son dénouement."
    ],
    "rewards": [
      "Malheur de Daedicar ; lettre de Zorayas sur la voie sans tonique."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/rya-s-quest",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Gamer Guides — Rya",
        "url": "https://www.gamerguides.com/elden-ring/guide/npcs/rya",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "rya.necklace",
        "title": "Rendre le collier",
        "location": "Liurnia, près des ruines de Laskyar",
        "detail": "Acheter le collier à Malfrat, à la cabane des crevettes, puis le rendre."
      },
      {
        "id": "rya.invitation",
        "title": "Accepter son invitation",
        "location": "Plateau Altus",
        "detail": "Retrouver Rya près du grand ascenseur de Dectus ou des ruines de Lux selon l’accès."
      },
      {
        "id": "rya.snake",
        "title": "Écouter Zorayas",
        "location": "Manoir du Volcan",
        "detail": "Avancer les contrats et parler de sa forme serpentine, puis questionner Tanith."
      },
      {
        "id": "rya.amnion",
        "title": "Rapporter l’amnios de serpent",
        "location": "Temple d’Eiglay",
        "detail": "Explorer le passage secret du manoir, vaincre le Noble sanctechair et lui rapporter l’amnios."
      },
      {
        "id": "rya.spare",
        "title": "La laisser vivre sans tonique",
        "location": "Cachette au-delà du temple d’Eiglay",
        "detail": "Refuser de la tuer ; après Rykard, lui reparler puis recharger pour sa lettre.",
        "branch": {
          "groupId": "rya.fate",
          "optionId": "spare"
        }
      },
      {
        "id": "rya.tonic",
        "title": "Lui donner le tonique",
        "location": "Cachette du manoir",
        "detail": "Employer le tonique de Tanith ; après Rykard, revoir Rya au manoir.",
        "branch": {
          "groupId": "rya.fate",
          "optionId": "tonic"
        }
      },
      {
        "id": "rya.kill",
        "title": "Accéder à sa demande",
        "location": "Cachette du manoir",
        "detail": "La tuer clôt son histoire.",
        "branch": {
          "groupId": "rya.fate",
          "optionId": "kill"
        }
      }
    ],
    "branches": [
      {
        "id": "rya.fate",
        "label": "Le souhait de Zorayas",
        "options": [
          {
            "id": "spare",
            "label": "Épargner sans tonique",
            "consequence": "Elle part librement."
          },
          {
            "id": "tonic",
            "label": "Effacer ses souvenirs",
            "consequence": "Elle oublie ses origines."
          },
          {
            "id": "kill",
            "label": "La tuer",
            "consequence": "Son histoire s’arrête."
          }
        ]
      }
    ]
  },
  {
    "id": "quest.boggart",
    "npcId": "npc.boggart",
    "name": "Malfrat (Boggart)",
    "content": "base",
    "regionIds": [
      "liurnia",
      "altus",
      "capital"
    ],
    "summary": "Se lier au vendeur de crevettes et choisir son sort.",
    "requirements": [],
    "warnings": [
      "Acheter ses crevettes avant que Rya rejoigne le manoir. Libérer le Coprophage peut ensuite provoquer sa mort aux douves."
    ],
    "rewards": [
      "Boutique de crabes ; équipement et malédiction du semis si son histoire finit tragiquement."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/blackguard-big-boggart-s-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "boggart.necklace",
        "title": "Acheter le collier de Rya",
        "location": "Cabane des crevettes",
        "detail": "Ne pas l’attaquer ; acheter le collier pour 1 000 runes."
      },
      {
        "id": "boggart.shrimp",
        "title": "Acheter des crevettes",
        "location": "Cabane des crevettes",
        "detail": "Faire un achat puis épuiser ses dialogues pour devenir son ami."
      },
      {
        "id": "boggart.crab",
        "title": "Retrouver son commerce",
        "location": "Douves extérieures de Leyndell",
        "detail": "Lui parler pour acheter ses crabes."
      },
      {
        "id": "boggart.safe",
        "title": "Conserver son amitié",
        "location": "Douves extérieures",
        "detail": "Éviter la séquence du Coprophage aux douves lorsqu’il s’y trouve.",
        "branch": {
          "groupId": "boggart.fate",
          "optionId": "alive"
        }
      },
      {
        "id": "boggart.curse",
        "title": "Constater son destin tragique",
        "location": "Douves extérieures",
        "detail": "Après la libération du Coprophage, parler à Malfrat puis revenir pour la suite et l’invasion.",
        "branch": {
          "groupId": "boggart.fate",
          "optionId": "curse"
        }
      }
    ],
    "branches": [
      {
        "id": "boggart.fate",
        "label": "Le sort de Malfrat",
        "options": [
          {
            "id": "alive",
            "label": "Préserver Malfrat",
            "consequence": "Sa boutique reste disponible."
          },
          {
            "id": "curse",
            "label": "Poursuivre le récit du Coprophage",
            "consequence": "Malfrat en devient une victime ; sa mort n’est pas obligatoire pour les cinq malédictions."
          }
        ]
      }
    ]
  },
  {
    "id": "quest.hyetta",
    "npcId": "npc.hyetta",
    "name": "Hyetta",
    "content": "base",
    "regionIds": [
      "liurnia",
      "capital"
    ],
    "summary": "Guider Hyetta jusqu’aux Trois Doigts.",
    "requirements": [],
    "warnings": [
      "Accepter la Flamme exaltée verrouille les autres fins, sauf purification avec l’aiguille de Miquella."
    ],
    "rewards": [
      "Sceau de la Flamme exaltée."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/hyetta-s-quest",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-hyetta-quest-shabriri-grape/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "hyetta.irina",
        "title": "Avancer Irina et Edgar",
        "location": "Péninsule larmoyante",
        "detail": "Atteindre le dénouement d’Irina pour rencontrer Hyetta."
      },
      {
        "id": "hyetta.cliffs",
        "title": "Donner le premier raisin",
        "location": "Falaises surplombant le lac",
        "detail": "Trouver un raisin de Shabriri dans la sortie de Voilorage."
      },
      {
        "id": "hyetta.ruins",
        "title": "Donner le deuxième raisin",
        "location": "Ruines purifiées",
        "detail": "Prendre le raisin dans la cave cachée des ruines."
      },
      {
        "id": "hyetta.bridge",
        "title": "Dire ce que sont les raisins",
        "location": "Pont de la porte de l’académie",
        "detail": "Donner le raisin d’Edgar, révéler sa nature puis se reposer et reparler."
      },
      {
        "id": "hyetta.fingerprint",
        "title": "Donner le raisin de Vyke",
        "location": "Église de Bellum",
        "detail": "Vaincre Vyke près de l’église de l’inhibition et donner son raisin de l’empreinte."
      },
      {
        "id": "hyetta.flame",
        "title": "Recevoir la Flamme puis toucher Hyetta",
        "location": "Proscription de la Flamme exaltée",
        "detail": "Atteindre les Trois Doigts sous Leyndell, accepter la Flamme puis épuiser ses dialogues."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.thops",
    "npcId": "npc.thops",
    "name": "Thops",
    "content": "base",
    "regionIds": [
      "liurnia"
    ],
    "summary": "Trouver une seconde clé pour le sorcier.",
    "requirements": [],
    "warnings": [
      "La première clé de pierre d’éclat sert à entrer dans l’académie ; Thops attend un second exemplaire. Son retour conduit à sa mort."
    ],
    "rewards": [
      "Geste Érudition ; barrière de Thops, bâton et perle cinéraire à sa conclusion."
    ],
    "sources": [
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-thops-quest-key/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "thops.church",
        "title": "Parler à Thops",
        "location": "Église d’Irith",
        "detail": "Lui offrir dix runes et écouter sa demande."
      },
      {
        "id": "thops.first",
        "title": "Entrer dans l’académie",
        "location": "Lac de Liurnia → Raya Lucaria",
        "detail": "Récupérer la clé derrière le dragon Smarag."
      },
      {
        "id": "thops.second",
        "title": "Trouver la seconde clé",
        "location": "Toits de Raya Lucaria",
        "detail": "Depuis la cour après le loup cramoisi, rejoindre les toits puis le lustre de l’église du Coucou."
      },
      {
        "id": "thops.give",
        "title": "Donner la seconde clé",
        "location": "Église d’Irith",
        "detail": "Recevoir le geste Érudition."
      },
      {
        "id": "thops.desk",
        "title": "Retrouver son bureau",
        "location": "Extérieur de la salle de classe, Raya Lucaria",
        "detail": "Sortir près de la grâce de la salle de classe pour récupérer ses affaires."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.latenna",
    "npcId": "npc.latenna",
    "name": "Latenna l’Albinaurique",
    "content": "base",
    "regionIds": [
      "liurnia",
      "mountaintops",
      "snowfield"
    ],
    "summary": "Accompagner Latenna jusqu’à l’église apostate.",
    "requirements": [],
    "warnings": [
      "La recruter avant de prendre la moitié gauche du médaillon secret au château Sol. Sinon, elle meurt et seules ses cendres restent disponibles."
    ],
    "rewards": [
      "Invocation de Latenna ; pierre de forge sombre des dragons anciens à destination."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/latenna-s-quest",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Neoseeker — Latenna et son recrutement",
        "url": "https://www.neoseeker.com/elden-ring/NPCs/Latenna",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "latenna.albus",
        "title": "Obtenir la moitié droite",
        "location": "Village des Albinauriques",
        "detail": "Parler à Albus dissimulé dans un pot."
      },
      {
        "id": "latenna.cave",
        "title": "Traverser la grotte",
        "location": "Grotte cristalline du lac",
        "detail": "Vaincre le chevalier limier et sortir vers la cabane, sans revenir à l’entrée."
      },
      {
        "id": "latenna.recruit",
        "title": "Promettre son aide",
        "location": "Cabane du loup endormi",
        "detail": "Montrer le médaillon à Latenna et accepter sa demande."
      },
      {
        "id": "latenna.sol",
        "title": "Récupérer la moitié gauche",
        "location": "Château Sol",
        "detail": "Vaincre le commandant Niall puis monter au-delà de son arène."
      },
      {
        "id": "latenna.secret",
        "title": "Utiliser le passage secret",
        "location": "Grand ascenseur de Rold",
        "detail": "Brandir le médaillon secret pour les Champs enneigés."
      },
      {
        "id": "latenna.summon",
        "title": "Accomplir sa demande",
        "location": "Église apostate",
        "detail": "Utiliser l’interaction d’invocation près de la grande Albinaurique, puis parler à Latenna."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.jar-bairn",
    "npcId": "npc.jar-bairn",
    "name": "Jarre-enfant",
    "content": "base",
    "regionIds": [
      "liurnia",
      "gelmir",
      "farum"
    ],
    "summary": "Préparer le départ de la petite jarre.",
    "requirements": [],
    "warnings": [
      "Ne pas attaquer les jarres de Jarrebourg. Les entrailles demandent le duel final d’Alexandre, pas sa mise à mort précoce."
    ],
    "rewards": [
      "Talisman de la jarre d’amitié."
    ],
    "sources": [
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-jar-bairn-quest/",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Eldenpedia — Jarre-enfant",
        "url": "https://eldenring.wiki.gg/wiki/Jar_Bairn",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "jar-bairn.meet",
        "title": "Parler à la petite jarre",
        "location": "Jarrebourg",
        "detail": "Descendre les pierres tombales depuis la falaise de Liurnia ; écouter sa demande de potentat."
      },
      {
        "id": "jar-bairn.talk",
        "title": "Revenir après chaque dialogue",
        "location": "Jarrebourg",
        "detail": "Se reposer entre ses propos sur les fleurs, Alexandre et les braconniers."
      },
      {
        "id": "jar-bairn.diallos",
        "title": "Retrouver Diallos au village",
        "location": "Jarrebourg",
        "detail": "Avancer son départ du Manoir du Volcan, puis alterner repos et dialogues avec les deux habitants."
      },
      {
        "id": "jar-bairn.raid",
        "title": "Écouter les survivants",
        "location": "Jarrebourg",
        "detail": "Après l’attaque, parler à Diallos puis à Jarre-enfant et recharger."
      },
      {
        "id": "jar-bairn.innards",
        "title": "Donner les entrailles d’Alexandre",
        "location": "Jarrebourg",
        "detail": "Revenir après le duel d’Alexandre à Farum Azula et lui donner ses entrailles."
      },
      {
        "id": "jar-bairn.departure",
        "title": "Récupérer son talisman",
        "location": "Jarrebourg",
        "detail": "Épuiser ses adieux puis recharger."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.seluvis",
    "npcId": "npc.seluvis",
    "name": "Précepteur Seluvis",
    "content": "base",
    "regionIds": [
      "liurnia",
      "altus",
      "roundtable",
      "capital"
    ],
    "summary": "Choisir le destin de sa potion et enquêter sur ses pantins.",
    "requirements": [],
    "warnings": [
      "Finir ses demandes avant de donner la lame digicide à Ranni. La potion condamne Nepheli ou le Coprophage si elle leur est donnée."
    ],
    "rewards": [
      "Pantins selon les choix ; talisman du scorpion magique avant la mort de Seluvis."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/preceptor-seluvis-s-quest",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-seluvis-quest-guide/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "seluvis.receive-potion",
        "title": "Recevoir sa potion",
        "location": "Tour de Seluvis",
        "detail": "Entrer au service de Ranni puis visiter le précepteur."
      },
      {
        "id": "seluvis.gideon",
        "title": "Confier la potion à Gideon",
        "location": "Table ronde",
        "detail": "Lui demander de s’en débarrasser, puis prétendre avoir obéi à Seluvis.",
        "branch": {
          "groupId": "seluvis.potion",
          "optionId": "gideon"
        }
      },
      {
        "id": "seluvis.nepheli",
        "title": "Donner la potion à Nepheli",
        "location": "Table ronde",
        "detail": "Ce choix interrompt sa conclusion à Voilorage.",
        "branch": {
          "groupId": "seluvis.potion",
          "optionId": "nepheli"
        }
      },
      {
        "id": "seluvis.dung",
        "title": "Donner la potion au Coprophage",
        "location": "Prison des égouts",
        "detail": "Le libérer, survivre à son invasion puis lui donner la potion lorsqu’il est attaché.",
        "branch": {
          "groupId": "seluvis.potion",
          "optionId": "dung"
        }
      },
      {
        "id": "seluvis.cellar",
        "title": "Découvrir son sous-sol",
        "location": "Ruines des Trois sœurs",
        "detail": "Révéler le sol illusoire, questionner Seluvis et choisir un pantin."
      },
      {
        "id": "seluvis.scheme",
        "title": "Avancer son projet",
        "location": "Tour de Seluvis",
        "detail": "Acheter tous ses sorts et les pantins proposés, avec les éclats de lumière stellaire requis, puis écouter son plan."
      },
      {
        "id": "seluvis.amber",
        "title": "Rapporter la lumière stellaire ambrée",
        "location": "Plateau Altus",
        "detail": "Chercher au pied de la statue dans le vallon au nord-est de la jonction de la chaussée. Recevoir le talisman."
      },
      {
        "id": "seluvis.betray",
        "title": "Décider du breuvage ambré",
        "location": "Tour de Ranni",
        "detail": "L’administrer provoque sa colère ; l’absolution peut réparer cette hostilité.",
        "optional": true
      }
    ],
    "branches": [
      {
        "id": "seluvis.potion",
        "label": "Destination de la potion",
        "options": [
          {
            "id": "gideon",
            "label": "La remettre à Gideon",
            "consequence": "Préserve les deux destinataires."
          },
          {
            "id": "nepheli",
            "label": "La donner à Nepheli",
            "consequence": "Sacrifie son parcours pour un pantin ultérieur."
          },
          {
            "id": "dung",
            "label": "La donner au Coprophage",
            "consequence": "Permet son pantin et abandonne sa rune de fin."
          }
        ]
      }
    ]
  }
];
