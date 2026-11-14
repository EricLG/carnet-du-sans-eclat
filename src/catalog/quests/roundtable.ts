import type { Quest } from '../../domain/catalog';

export const roundtableQuests: Quest[] = [
  {
    "id": "quest.diallos",
    "npcId": "npc.diallos",
    "name": "Diallos Hoslow",
    "content": "base",
    "regionIds": [
      "roundtable",
      "liurnia",
      "gelmir"
    ],
    "summary": "Suivre sa recherche de Lanya jusqu’à Jarrebourg.",
    "requirements": [],
    "warnings": [
      "Ne pas le tuer pour obtenir son masque : sa dernière rencontre et Jarre-enfant seraient compromis."
    ],
    "rewards": [
      "Masque de Diallos et fouet de Hoslow après son dénouement."
    ],
    "sources": [
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-diallos-quest/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "diallos.lanya",
        "title": "Écouter sa demande",
        "location": "Table ronde",
        "detail": "Parler de sa servante Lanya."
      },
      {
        "id": "diallos.lake",
        "title": "Retrouver Lanya",
        "location": "Faubourg de l’académie, Liurnia",
        "detail": "Parler à Diallos près de son corps puis le revoir à la Table ronde."
      },
      {
        "id": "diallos.manor",
        "title": "Le retrouver au manoir",
        "location": "Manoir du Volcan",
        "detail": "Rejoindre Tanith et épuiser ses dialogues au fil des contrats, jusqu’à son départ."
      },
      {
        "id": "diallos.village",
        "title": "Parler au nouveau potentat",
        "location": "Jarrebourg",
        "detail": "Revenir après des repos et parler aussi à Jarre-enfant."
      },
      {
        "id": "diallos.raid",
        "title": "Écouter son dernier souhait",
        "location": "Jarrebourg",
        "detail": "Après l’attaque des braconniers, répondre à sa question sur les jarres."
      },
      {
        "id": "diallos.legacy",
        "title": "Revenir au village",
        "location": "Jarrebourg",
        "detail": "Parler à Jarre-enfant près du corps, recharger et récupérer les affaires de Diallos."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.fia",
    "npcId": "npc.fia",
    "name": "Fia, la Compagne mortuaire",
    "content": "base",
    "regionIds": [
      "roundtable",
      "liurnia",
      "underground"
    ],
    "summary": "Accompagner Fia et obtenir la rune du Prince de la Mort.",
    "requirements": [],
    "warnings": [
      "Ne pas tuer Fia à Fonderacine. Son étreinte réduit temporairement la vie maximale tant que sa bénédiction reste dans l’inventaire."
    ],
    "rewards": [
      "Rune de restauration du Prince de la Mort ; souvenir de Fortissax."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/fia-s-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "fia.hug",
        "title": "Écouter ses confidences",
        "location": "Table ronde",
        "detail": "Accepter ses étreintes et revenir après avoir atteint Altus."
      },
      {
        "id": "fia.dagger",
        "title": "Rendre la dague à D",
        "location": "Table ronde",
        "detail": "Recevoir la dague patinée de Fia, la donner à D puis recharger et visiter la pièce près de Hewg."
      },
      {
        "id": "fia.depths",
        "title": "Rejoindre Fia à Fonderacine",
        "location": "Profondeurs de Fonderacine",
        "detail": "Atteindre son arène et vaincre ses champions."
      },
      {
        "id": "fia.embrace",
        "title": "Demander son étreinte",
        "location": "Au pied du Prince de la Mort",
        "detail": "Choisir d’être tenu plutôt que de la combattre."
      },
      {
        "id": "fia.cursemark",
        "title": "Rapporter la marque maudite",
        "location": "Tour divine de Liurnia",
        "detail": "Obtenir la statue inversée via Ranni, traverser la salle d’étude et prendre la marque."
      },
      {
        "id": "fia.dream",
        "title": "Entrer dans son rêve",
        "location": "Profondeurs de Fonderacine",
        "detail": "Donner la marque, épuiser les dialogues et recharger jusqu’à son sommeil."
      },
      {
        "id": "fia.fortissax",
        "title": "Vaincre Fortissax",
        "location": "Rêve de Fia",
        "detail": "Revenir ensuite prendre la rune sur Fia."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.corhyn",
    "npcId": "npc.corhyn",
    "name": "Frère Corhyn et Masque d’or",
    "content": "base",
    "regionIds": [
      "roundtable",
      "altus",
      "capital",
      "mountaintops"
    ],
    "summary": "Résoudre le secret de l’Ordre d’or.",
    "requirements": [],
    "warnings": [
      "Révéler le secret de Leyndell avant Maliketh. Après la transformation de la capitale, cette étape est perdue."
    ],
    "rewards": [
      "Rune de restauration de l’Ordre parfait ; équipement de Masque d’or après rechargement."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/brother-corhyn-and-goldmask-s-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "corhyn.hold",
        "title": "Écouter Corhyn",
        "location": "Table ronde",
        "detail": "Lui parler puis le retrouver à Altus après son départ."
      },
      {
        "id": "corhyn.altus",
        "title": "Indiquer Masque d’or",
        "location": "Route d’Altus et grand pont de la forêt",
        "detail": "Trouver le maître sur la partie nord du pont, prévenir Corhyn puis leur reparler."
      },
      {
        "id": "corhyn.capital",
        "title": "Les retrouver à Leyndell",
        "location": "Près du colisée",
        "detail": "Écouter leur problème concernant Radagon."
      },
      {
        "id": "corhyn.regression",
        "title": "Révéler le secret",
        "location": "Statue de Radagon, Leyndell",
        "detail": "Obtenir les Principes de l’Ordre d’or au sanctuaire, apprendre Loi de régression et la lancer devant la statue : 37 Intelligence nécessaires, bonus temporaires possibles."
      },
      {
        "id": "corhyn.report",
        "title": "Partager la révélation",
        "location": "Colisée de Leyndell",
        "detail": "Lire le message révélé puis informer Masque d’or et Corhyn."
      },
      {
        "id": "corhyn.bridge",
        "title": "Leur reparler aux Cimes",
        "location": "Pont au sud des ruines de l’astronome",
        "detail": "Épuiser les dialogues."
      },
      {
        "id": "corhyn.rune",
        "title": "Récupérer la rune",
        "location": "Leyndell, capitale des cendres",
        "detail": "Après Maliketh, rejoindre le corps de Masque d’or sous le colisée."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.dung-eater",
    "npcId": "npc.dung-eater",
    "name": "Le Coprophage",
    "content": "base",
    "regionIds": [
      "roundtable",
      "capital",
      "haligtree"
    ],
    "summary": "Choisir entre sa malédiction et le projet de Seluvis.",
    "requirements": [],
    "warnings": [
      "Récupérer les malédictions de Leyndell avant Maliketh. Cinq suffisent ; la mort de Malfrat n’est pas nécessaire."
    ],
    "rewards": [
      "Rune de la malédiction ou pantin du Coprophage ; équipement selon le dénouement."
    ],
    "sources": [
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-dung-eater-quest/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "dung-eater.curse",
        "title": "Montrer une malédiction du semis",
        "location": "Table ronde, après Altus",
        "detail": "En trouver une, notamment à Leyndell, puis parler à son apparition pour la clé."
      },
      {
        "id": "dung-eater.cell",
        "title": "Libérer son vrai corps",
        "location": "Prison des égouts de Leyndell",
        "detail": "Descendre dans les égouts et ouvrir sa cellule."
      },
      {
        "id": "dung-eater.moat",
        "title": "Survivre à son invasion",
        "location": "Douves extérieures de Leyndell",
        "detail": "Lire son message à la Table ronde, puis rejoindre les douves."
      },
      {
        "id": "dung-eater.return",
        "title": "Recevoir ses instructions",
        "location": "Table ronde",
        "detail": "Reparler à son apparition après la victoire."
      },
      {
        "id": "dung-eater.five",
        "title": "Lui donner cinq malédictions",
        "location": "Prison des égouts",
        "detail": "Retrouver son corps attaché et lui remettre cinq malédictions.",
        "branch": {
          "groupId": "dung-eater.fate",
          "optionId": "rune"
        }
      },
      {
        "id": "dung-eater.potion",
        "title": "Lui donner la potion de Seluvis",
        "location": "Prison des égouts",
        "detail": "Utiliser la potion sur son corps attaché au lieu de poursuivre la rune.",
        "branch": {
          "groupId": "dung-eater.fate",
          "optionId": "puppet"
        }
      }
    ],
    "branches": [
      {
        "id": "dung-eater.fate",
        "label": "Le sort du Coprophage",
        "options": [
          {
            "id": "rune",
            "label": "Poursuivre sa malédiction",
            "consequence": "Obtient sa rune de fin."
          },
          {
            "id": "puppet",
            "label": "En faire un pantin",
            "consequence": "Abandonne sa rune ; acheter ensuite son pantin à Seluvis."
          }
        ]
      }
    ]
  },
  {
    "id": "quest.gideon",
    "npcId": "npc.gideon",
    "name": "Gideon Ofnir, l’Omniscient",
    "content": "base",
    "regionIds": [
      "roundtable",
      "liurnia",
      "snowfield",
      "haligtree",
      "underground",
      "capital"
    ],
    "summary": "Partager ses découvertes avec l’Omniscient.",
    "requirements": [],
    "warnings": [
      "Faire les rapports avant Maliketh : Gideon quitte alors la Table ronde. Le retrouver ensuite mène à un combat obligatoire du récit principal."
    ],
    "rewards": [
      "Incantations récompensant les renseignements ; équipement de l’Omniscient."
    ],
    "sources": [
      {
        "label": "Eldenpedia — Gideon",
        "url": "https://eldenring.wiki.gg/wiki/Gideon_Ofnir",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "gideon.audience",
        "title": "Obtenir une audience",
        "location": "Table ronde",
        "detail": "Revenir après une rune majeure et l’entretien avec les Deux Doigts."
      },
      {
        "id": "gideon.medallion",
        "title": "Questionner Gideon sur le médaillon",
        "location": "Table ronde",
        "detail": "Après Albus et l’attaque d’Ensha, demander des explications et la piste de Latenna.",
        "optional": true
      },
      {
        "id": "gideon.nepheli",
        "title": "Parler de Nepheli",
        "location": "Table ronde",
        "detail": "Interroger Gideon après le village des Albinauriques.",
        "optional": true
      },
      {
        "id": "gideon.haligtree",
        "title": "Signaler l’Arbre-Sacré",
        "location": "Table ronde",
        "detail": "Activer une grâce de l’Arbre-Sacré puis lui en faire part.",
        "optional": true
      },
      {
        "id": "gideon.malenia",
        "title": "Rapporter la défaite de Malenia",
        "location": "Table ronde",
        "detail": "Revenir avant Maliketh pour sa récompense.",
        "optional": true
      },
      {
        "id": "gideon.mohg",
        "title": "Rapporter la découverte puis la défaite de Mohg",
        "location": "Table ronde",
        "detail": "Revenir après le palais de Mohgwyn, puis après Mohg, avant Maliketh.",
        "optional": true
      },
      {
        "id": "gideon.final",
        "title": "Retrouver Gideon dans la capitale",
        "location": "Leyndell, capitale des cendres",
        "detail": "Affronter Gideon au sanctuaire de l’Arbre-Monde."
      }
    ],
    "branches": []
  }
];
