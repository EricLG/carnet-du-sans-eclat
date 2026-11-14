import type { Quest } from '../../domain/catalog';

export const lateQuests: Quest[] = [
  {
    "id": "quest.millicent",
    "npcId": "npc.millicent",
    "name": "Millicent et Gowry",
    "content": "base",
    "regionIds": [
      "caelid",
      "altus",
      "mountaintops",
      "haligtree",
      "farum"
    ],
    "summary": "Soigner Millicent puis choisir son dernier combat.",
    "requirements": [],
    "warnings": [
      "Le choix final donne des talismans différents. Aider Millicent conserve la voie de l’aiguille de Miquella. Ne pas la frapper après l’assistance."
    ],
    "rewards": [
      "Insigne d’épée ailée putréfiée ou prothèse de Millicent ; aiguille de Miquella sur la voie d’assistance."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/millicent-s-quest",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "PC Gamer — Millicent",
        "url": "https://www.pcgamer.com/elden-ring-millicent-quest/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "millicent.needle",
        "title": "Faire réparer l’aiguille",
        "location": "Marais d’Ivoine → cabane de Gowry",
        "detail": "Vaincre O’Neil, donner l’aiguille à Gowry puis revenir après repos."
      },
      {
        "id": "millicent.cure",
        "title": "Soigner Millicent",
        "location": "Église de la peste",
        "detail": "Donner l’aiguille, se reposer, reparler puis la revoir dans la cabane de Gowry."
      },
      {
        "id": "millicent.prosthesis",
        "title": "Donner la prothèse de Valkyrie",
        "location": "Colline face à l’Arbre-Monde, Altus",
        "detail": "Prendre la prothèse dans Bastiombre et la remettre à Millicent."
      },
      {
        "id": "millicent.windmill",
        "title": "Reparler après l’apôtre",
        "location": "Village des moulins",
        "detail": "Vaincre l’Apôtre sanctechair puis lui parler sur les hauteurs."
      },
      {
        "id": "millicent.snow",
        "title": "La retrouver aux Cimes",
        "location": "Ruines de l’ancienne vallée des neiges",
        "detail": "Épuiser ses dialogues."
      },
      {
        "id": "millicent.prayer",
        "title": "L’écouter à Elphael",
        "location": "Salle de prière",
        "detail": "Traverser l’Arbre-Sacré jusqu’à Millicent."
      },
      {
        "id": "millicent.spirit",
        "title": "Vaincre l’esprit près du canal",
        "location": "Elphael, avant le canal d’évacuation",
        "detail": "Éliminer l’Esprit d’arbre ulcéreux dans le bassin de putréfaction puis recharger."
      },
      {
        "id": "millicent.assist",
        "title": "L’aider contre ses sœurs",
        "location": "Bassin d’Elphael",
        "detail": "Marque dorée : vaincre les quatre sœurs puis parler à Millicent et récupérer l’aiguille après repos.",
        "branch": {
          "groupId": "millicent.fate",
          "optionId": "assist"
        }
      },
      {
        "id": "millicent.challenge",
        "title": "Défier Millicent",
        "location": "Bassin d’Elphael",
        "detail": "Marque rouge : la vaincre pour sa prothèse.",
        "branch": {
          "groupId": "millicent.fate",
          "optionId": "challenge"
        }
      },
      {
        "id": "millicent.miquella",
        "title": "Transformer l’aiguille",
        "location": "Fleur de Malenia",
        "detail": "Après Malenia, utiliser l’aiguille d’or pur sur sa fleur ; l’aiguille de Miquella purifie la Flamme dans l’arène de Placidusax.",
        "optional": true,
        "branch": {
          "groupId": "millicent.fate",
          "optionId": "assist"
        }
      },
      {
        "id": "millicent.gowry",
        "title": "Revenir auprès de Gowry",
        "location": "Cabane de Gowry",
        "detail": "Écouter sa réaction au sort de Millicent.",
        "optional": true
      }
    ],
    "branches": [
      {
        "id": "millicent.fate",
        "label": "Le dernier combat",
        "options": [
          {
            "id": "assist",
            "label": "Aider Millicent",
            "consequence": "Préserve son choix et permet l’aiguille de Miquella."
          },
          {
            "id": "challenge",
            "label": "Défier Millicent",
            "consequence": "Obtient sa prothèse, sans l’aiguille de cette voie."
          }
        ]
      }
    ]
  },
  {
    "id": "quest.gurranq",
    "npcId": "npc.gurranq",
    "name": "Gurranq, clerc bestial",
    "content": "base",
    "regionIds": [
      "caelid",
      "limgrave",
      "liurnia",
      "altus",
      "gelmir",
      "mountaintops",
      "snowfield"
    ],
    "summary": "Remettre les neuf mortefleurs au clerc bestial.",
    "requirements": [],
    "warnings": [
      "Après la quatrième mortefleur, le calmer en le blessant sans le tuer puis recharger. La défaite de Maliketh ne bloque pas ces échanges."
    ],
    "rewards": [
      "Sceau, incantations et arme bestiales ; pierre de forge des dragons anciens à la neuvième remise."
    ],
    "sources": [
      {
        "label": "Eldenpedia — parcours du personnage",
        "url": "https://eldenring.wiki.gg/wiki/Gurranq",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/gurranq-s-deathroot-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "gurranq.meet",
        "title": "Rencontrer le clerc",
        "location": "Sanctuaire bestial",
        "detail": "Le portail près de la troisième église de Marika conduit au sanctuaire."
      },
      {
        "id": "gurranq.village",
        "title": "Rapporter la mortefleur du village",
        "location": "Village des eaux nécromantes",
        "detail": "Vaincre le Nocher diaphane."
      },
      {
        "id": "gurranq.catacombs",
        "title": "Rapporter celle des catacombes funestes",
        "location": "Nécrolimbe",
        "detail": "Ouvrir le coffre après l’Assassin des Couteaux noirs."
      },
      {
        "id": "gurranq.liurnia",
        "title": "Rapporter celle du Nocher de Liurnia",
        "location": "Est de Liurnia",
        "detail": "Vaincre le Nocher diaphane près de la salle d’étude."
      },
      {
        "id": "gurranq.blackknife",
        "title": "Rapporter celle des Couteaux noirs",
        "location": "Catacombes des Couteaux noirs",
        "detail": "Prendre le coffre du boss Ombre du cimetière."
      },
      {
        "id": "gurranq.calm",
        "title": "Calmer sa crise",
        "location": "Sanctuaire bestial",
        "detail": "Après quatre remises, le blesser jusqu’à son apaisement, parler puis recharger."
      },
      {
        "id": "gurranq.wyndham",
        "title": "Rapporter celle de Wyndham",
        "location": "Ruines de Wyndham",
        "detail": "Vaincre le Nocher diaphane."
      },
      {
        "id": "gurranq.gelmir",
        "title": "Rapporter celle de Gelmir",
        "location": "Tombe des héros de Gelmir",
        "detail": "Prendre le coffre après le Loup rouge du champion."
      },
      {
        "id": "gurranq.giants",
        "title": "Rapporter celle des catacombes des Cimes",
        "location": "Catacombes des Cimes des Géants",
        "detail": "Ouvrir le coffre après l’Esprit d’arbre ulcéreux."
      },
      {
        "id": "gurranq.mariner",
        "title": "Rapporter celle du Nocher des Cimes",
        "location": "Près des ruines de l’astronome",
        "detail": "Vaincre le Nocher sur le rebord."
      },
      {
        "id": "gurranq.hidden",
        "title": "Rapporter celle du chemin secret",
        "location": "Chemin secret vers l’Arbre-Sacré",
        "detail": "Traverser le sol invisible vers le donjon caché et son coffre de boss."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.tanith",
    "npcId": "npc.tanith",
    "name": "Tanith et le Manoir du Volcan",
    "content": "base",
    "regionIds": [
      "gelmir",
      "limgrave",
      "altus",
      "mountaintops"
    ],
    "summary": "Accomplir les contrats du manoir avant Rykard.",
    "requirements": [
      "Accéder aux Cimes des Géants pour le contrat de Juno Hoslow."
    ],
    "warnings": [
      "Vaincre Rykard arrête les contrats inachevés. Faire aussi les demandes de Pat et Bernahl avant ce combat."
    ],
    "rewards": [
      "Récompenses des contrats ; accès à Rykard ; équipement de Tanith et incantation de son chevalier si affrontés."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/volcano-manor-contracts",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "tanith.join",
        "title": "Rejoindre le manoir",
        "location": "Manoir du Volcan",
        "detail": "Accepter la proposition de Tanith et ouvrir les salons avec sa clé."
      },
      {
        "id": "tanith.istvan",
        "title": "Exécuter le premier contrat",
        "location": "Nécrolimbe",
        "detail": "Prendre la lettre du salon, utiliser la marque d’Istvan et rendre compte à Tanith."
      },
      {
        "id": "tanith.rileigh",
        "title": "Exécuter le deuxième contrat",
        "location": "Plateau Altus",
        "detail": "Prendre la deuxième lettre, vaincre Rileigh puis revenir voir Tanith."
      },
      {
        "id": "tanith.juno",
        "title": "Exécuter le dernier contrat",
        "location": "Cimes des Géants",
        "detail": "Prendre la lettre rouge, vaincre Juno Hoslow puis faire son rapport."
      },
      {
        "id": "tanith.rykard",
        "title": "Accepter l’audience",
        "location": "Manoir du Volcan",
        "detail": "Accepter le transport de Tanith vers Rykard ou rejoindre son arène par le donjon, puis le vaincre."
      },
      {
        "id": "tanith.aftermath",
        "title": "Écouter Tanith après Rykard",
        "location": "Manoir puis arène de Rykard",
        "detail": "Épuiser ses dialogues et la retrouver auprès du corps."
      },
      {
        "id": "tanith.knight",
        "title": "Affronter son chevalier",
        "location": "Arène de Rykard",
        "detail": "Tuer Tanith provoque l’invasion de son chevalier ; choix irréversible.",
        "optional": true
      }
    ],
    "branches": []
  },
  {
    "id": "quest.shabriri",
    "npcId": "npc.shabriri",
    "name": "Shabriri et la Flamme exaltée",
    "content": "base",
    "regionIds": [
      "mountaintops",
      "capital",
      "haligtree",
      "farum"
    ],
    "summary": "Décider si l’on suit l’appel des Trois Doigts.",
    "requirements": [],
    "warnings": [
      "Rencontrer Shabriri met fin au parcours de Yura. La Flamme verrouille les autres fins ; Melina part définitivement si elle est encore présente."
    ],
    "rewards": [
      "Équipement de ronin laissé après le départ de Shabriri ; accès à la fin de la Flamme exaltée."
    ],
    "sources": [
      {
        "label": "Eldenpedia — parcours du personnage",
        "url": "https://eldenring.wiki.gg/wiki/Shabriri",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "Eldenpedia — parcours du personnage",
        "url": "https://eldenring.wiki.gg/wiki/Melina",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "shabriri.zamor",
        "title": "Écouter Shabriri",
        "location": "Ruines de Zamor",
        "detail": "Parler à celui qui occupe le corps de Yura."
      },
      {
        "id": "shabriri.sewers",
        "title": "Ouvrir le passage souterrain",
        "location": "Égouts de Leyndell",
        "detail": "Vaincre Mohg le Réprouvé puis frapper l’autel derrière le coffre. Morgott doit être vaincu pour lever le sceau."
      },
      {
        "id": "shabriri.door",
        "title": "Accepter les Trois Doigts",
        "location": "Proscription de la Flamme exaltée",
        "detail": "Descendre les plateformes puis retirer toutes les pièces d’armure devant la porte."
      },
      {
        "id": "shabriri.keep",
        "title": "Conserver la Flamme",
        "location": "Arbre-Monde",
        "detail": "Poursuivre jusqu’à la conclusion en portant la Flamme.",
        "branch": {
          "groupId": "shabriri.flame",
          "optionId": "keep"
        }
      },
      {
        "id": "shabriri.cure",
        "title": "Se purifier avec l’aiguille",
        "location": "Arène de Placidusax",
        "detail": "Aider Millicent, transformer son aiguille sur la fleur de Malenia puis utiliser l’aiguille de Miquella dans l’arène.",
        "branch": {
          "groupId": "shabriri.flame",
          "optionId": "cure"
        }
      }
    ],
    "branches": [
      {
        "id": "shabriri.flame",
        "label": "Le destin de la Flamme",
        "options": [
          {
            "id": "keep",
            "label": "Conserver la Flamme",
            "consequence": "Impose sa fin."
          },
          {
            "id": "cure",
            "label": "Utiliser l’aiguille de Miquella",
            "consequence": "Rouvre les autres fins ; Melina ne revient pas."
          }
        ]
      }
    ]
  }
];
