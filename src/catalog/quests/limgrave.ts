import type { Quest } from '../../domain/catalog';

export const limgraveQuests: Quest[] = [
  {
    "id": "quest.alexander",
    "npcId": "npc.alexander",
    "name": "Alexandre, le Poing d’acier",
    "content": "base",
    "regionIds": [
      "limgrave",
      "caelid",
      "liurnia",
      "gelmir",
      "mountaintops",
      "farum"
    ],
    "summary": "Accompagner la jarre guerrière jusqu’à son dernier duel.",
    "requirements": [],
    "warnings": [
      "Le tuer prématurément empêche d’obtenir son fragment final et ses entrailles pour Jarre-enfant."
    ],
    "rewards": [
      "Fragment d’Alexandre et entrailles d’Alexandre."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/iron-fist-alexander-s-quest",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-pot-boy-alexander-quest/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "alexander.hole",
        "title": "Le dégager de son trou",
        "location": "Nord de Nécrolimbe",
        "detail": "Frapper son dos puis lui parler.",
        "optional": true
      },
      {
        "id": "alexander.tunnel",
        "title": "Le rencontrer dans la galerie",
        "location": "Galerie de Gael",
        "detail": "Lui parler derrière la porte du passage.",
        "optional": true
      },
      {
        "id": "alexander.radahn",
        "title": "Parler après Radahn",
        "location": "Château du Lion rouge → champ de bataille",
        "detail": "Participer au festival puis épuiser ses dialogues après le combat."
      },
      {
        "id": "alexander.oil",
        "title": "Le libérer en Liurnia",
        "location": "Au sud de la salle d’étude de Caria",
        "detail": "Utiliser un pot d’huile avant de le dégager.",
        "optional": true
      },
      {
        "id": "alexander.lava",
        "title": "Le retrouver dans la lave",
        "location": "Mont Gelmir, après le dragon de magma",
        "detail": "Parler à Alexandre au-delà du lac de lave."
      },
      {
        "id": "alexander.giant",
        "title": "L’invoquer contre le Géant",
        "location": "Forge des Géants",
        "detail": "Son invocation est facultative.",
        "optional": true
      },
      {
        "id": "alexander.duel",
        "title": "Accepter son duel",
        "location": "Farum Azula",
        "detail": "Depuis l’ascenseur du temple des Dragons, rejoindre les plateformes et vaincre Alexandre."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.blaidd",
    "npcId": "npc.blaidd",
    "name": "Blaidd le semi-loup",
    "content": "base",
    "regionIds": [
      "limgrave",
      "liurnia",
      "underground",
      "caelid"
    ],
    "summary": "Suivre l’allié de Ranni et comprendre son dernier retour.",
    "requirements": [],
    "warnings": [
      "Les premières rencontres peuvent être sautées en avançant Ranni. Les invocations de Blaidd ne sont pas obligatoires."
    ],
    "rewards": [
      "Pierre de forge sombre après Darriwil ; équipement de Blaidd à sa conclusion."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/blaidd-s-quest",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-blaidd-quest-armor-darriwil/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "blaidd.howl",
        "title": "Répondre au hurlement",
        "location": "Ruines des bois brumeux",
        "detail": "Interroger Kalé sur le hurlement puis utiliser son geste de claquement de doigts.",
        "optional": true
      },
      {
        "id": "blaidd.darriwil",
        "title": "Vaincre Darriwil",
        "location": "Geôle éternelle du limier",
        "detail": "Parler ensuite à Blaidd, qui recommande Iji.",
        "optional": true
      },
      {
        "id": "blaidd.ranni",
        "title": "Rejoindre Ranni",
        "location": "Trois sœurs → Siofra",
        "detail": "Accepter son service, parler aux projections puis retrouver Blaidd à Siofra."
      },
      {
        "id": "blaidd.radahn",
        "title": "Participer au festival",
        "location": "Château du Lion rouge",
        "detail": "Vaincre Radahn et parler à Blaidd sur le champ de bataille."
      },
      {
        "id": "blaidd.gaol",
        "title": "Écouter Blaidd emprisonné",
        "location": "Geôle éternelle du limier",
        "detail": "Le libérer et questionner Iji si souhaité.",
        "optional": true
      },
      {
        "id": "blaidd.return",
        "title": "Revenir après la quête de Ranni",
        "location": "Tour de Ranni",
        "detail": "Après l’anneau remis à Ranni, affronter Blaidd hostile."
      },
      {
        "id": "blaidd.iji",
        "title": "Prévenir Iji",
        "location": "Route du manoir",
        "detail": "Lui annoncer la mort de Blaidd.",
        "optional": true
      }
    ],
    "branches": []
  },
  {
    "id": "quest.yura",
    "npcId": "npc.yura",
    "name": "Yura, chasseur de Doigts sanglants",
    "content": "base",
    "regionIds": [
      "limgrave",
      "liurnia",
      "altus"
    ],
    "summary": "Aider le chasseur jusqu’à sa rencontre avec Eleonora.",
    "requirements": [],
    "warnings": [
      "L’arrivée de Shabriri aux Cimes clôt les rencontres de Yura. Terminer son parcours auparavant."
    ],
    "rewards": [
      "Nagakiba ; récompenses des invasions, dont la lame double d’Eleonora."
    ],
    "sources": [
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-yura-quest/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "yura.meet",
        "title": "Écouter son avertissement",
        "location": "Ruines du bord de mer",
        "detail": "Parler du dragon du lac d’Agheel.",
        "optional": true
      },
      {
        "id": "yura.nerijus",
        "title": "Vaincre Nerijus",
        "location": "Ravin devant la grotte des eaux noires",
        "detail": "Survivre à l’invasion ; Yura peut aider."
      },
      {
        "id": "yura.river",
        "title": "Lui reparler dans le ravin",
        "location": "Au nord de la grotte",
        "detail": "Épuiser ses dialogues."
      },
      {
        "id": "yura.academy",
        "title": "Répondre à sa marque rouge",
        "location": "Pont au nord de la porte principale de l’académie",
        "detail": "L’aider contre l’assassin puis lui parler sur le pont."
      },
      {
        "id": "yura.eleonora",
        "title": "Rejoindre la seconde église",
        "location": "Seconde église de Marika, Altus",
        "detail": "Parler à Yura mourant puis vaincre Eleonora."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.patches",
    "npcId": "npc.patches",
    "name": "Pat (Patches)",
    "content": "base",
    "regionIds": [
      "limgrave",
      "liurnia",
      "gelmir",
      "altus"
    ],
    "summary": "Épargner Pat et suivre ses marchandages.",
    "requirements": [],
    "warnings": [
      "Le tuer ferme sa suite. Faire son contrat et réclamer sa récompense avant de tuer Rykard."
    ],
    "rewards": [
      "Chandelier fouet de magma ; gestes et boutique."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/patches-s-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "patches.spare",
        "title": "Accepter sa reddition",
        "location": "Grotte des eaux noires",
        "detail": "Arrêter le combat quand Pat se rend, puis recharger la zone."
      },
      {
        "id": "patches.travel",
        "title": "Le recroiser sur la route",
        "location": "Île panoramique → Mont Gelmir",
        "detail": "Lui parler ; ses pièges sont des détours facultatifs.",
        "optional": true
      },
      {
        "id": "patches.manor",
        "title": "Accepter son contrat",
        "location": "Manoir du Volcan",
        "detail": "Rejoindre le manoir, avancer les demandes de Tanith puis prendre la lettre de Pat."
      },
      {
        "id": "patches.tragoth",
        "title": "Vaincre Tragoth",
        "location": "Arène de Makar, Ruines des galeries",
        "detail": "Utiliser sa marque d’invasion après avoir vaincu Makar."
      },
      {
        "id": "patches.reward",
        "title": "Réclamer le chandelier",
        "location": "Manoir du Volcan",
        "detail": "Revenir auprès de Pat et demander la récompense."
      },
      {
        "id": "patches.castanets",
        "title": "Recevoir les castagnettes",
        "location": "Bastiombre",
        "detail": "Après Rykard, parler à Pat avant la salle d’Elemer ; les proposer à Tanith est facultatif.",
        "optional": true
      },
      {
        "id": "patches.return",
        "title": "Accepter sa nouvelle reddition",
        "location": "Grotte des eaux noires",
        "detail": "Retrouver Pat et arrêter encore le combat."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.irina",
    "npcId": "npc.irina",
    "name": "Irina et Edgar",
    "content": "base",
    "regionIds": [
      "weeping",
      "liurnia"
    ],
    "summary": "Porter la lettre d’Irina puis suivre le destin de son père.",
    "requirements": [],
    "warnings": [
      "La mort d’Irina appartient au déroulement du récit. Tuer Edgar prématurément change ses rencontres ultérieures."
    ],
    "rewards": [
      "Espadon fusionné du boss ; raisin de Shabriri lors de l’invasion d’Edgar."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/irina-and-edgar-s-quest",
        "verifiedAt": "2026-11-14"
      },
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-irina-quest-castle-morne/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "irina.letter",
        "title": "Accepter la lettre",
        "location": "Après le pont du Sacrifice",
        "detail": "Parler à Irina au bord de la route."
      },
      {
        "id": "irina.edgar",
        "title": "Remettre la lettre",
        "location": "Château de Vent-Hurlant",
        "detail": "Trouver Edgar sur les remparts et épuiser ses dialogues."
      },
      {
        "id": "irina.boss",
        "title": "Vaincre la Chimère léonine",
        "location": "Plage derrière le château",
        "detail": "Récupérer l’espadon fusionné."
      },
      {
        "id": "irina.report",
        "title": "Retourner voir Edgar",
        "location": "Remparts du château",
        "detail": "L’informer de la victoire."
      },
      {
        "id": "irina.irina",
        "title": "Revenir auprès d’Irina",
        "location": "Pont du Sacrifice",
        "detail": "Parler à Edgar près de sa fille, puis recharger la zone."
      },
      {
        "id": "irina.revenge",
        "title": "Affronter Edgar le Vengeur",
        "location": "Cabane du vengeur, Liurnia",
        "detail": "Vaincre son invasion et récupérer le raisin pour Hyetta."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.varre",
    "npcId": "npc.varre",
    "name": "Varré le Blême",
    "content": "base",
    "regionIds": [
      "limgrave",
      "liurnia",
      "altus",
      "underground"
    ],
    "summary": "Obtenir l’accès anticipé au palais de Mohgwyn.",
    "requirements": [],
    "warnings": [
      "La voie hors ligne passe par Magnus. Les invasions en ligne demandent trois participations, sans victoire obligatoire."
    ],
    "rewards": [
      "Médaille de chevalier de sang pur ; bouquet de Varré à la conclusion."
    ],
    "sources": [
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-varre-quest-moghwyns-palace/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "varre.fingers",
        "title": "Rencontrer les Deux Doigts",
        "location": "Table ronde",
        "detail": "Après une rune majeure, écouter l’audience."
      },
      {
        "id": "varre.rose",
        "title": "Revoir Varré",
        "location": "Église de la rose",
        "detail": "Exprimer ses réserves sur les Deux Doigts."
      },
      {
        "id": "varre.invasions",
        "title": "Satisfaire sa demande d’invasions",
        "location": "En ligne ou ruines grouillantes de sang, Altus",
        "detail": "Participer à trois invasions de joueurs, ou vaincre Magnus via sa marque rouge hors ligne."
      },
      {
        "id": "varre.blood",
        "title": "Imprégner la faveur de sang",
        "location": "Église de l’inhibition ou chapelle de l’anticipation",
        "detail": "Utiliser le corps d’une servante."
      },
      {
        "id": "varre.medal",
        "title": "Recevoir la médaille",
        "location": "Église de la rose",
        "detail": "Revenir et poursuivre les dialogues après le rituel du doigt."
      },
      {
        "id": "varre.palace",
        "title": "Envahir Varré",
        "location": "Palais de Mohgwyn",
        "detail": "Utiliser sa marque près du mausolée, puis parler à Varré mourant. Mohg n’est pas requis."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.nepheli",
    "npcId": "npc.nepheli",
    "name": "Nepheli Loux",
    "content": "base",
    "regionIds": [
      "limgrave",
      "liurnia",
      "roundtable",
      "capital"
    ],
    "summary": "Aider Nepheli à reprendre confiance puis à diriger Voilorage.",
    "requirements": [
      "Débloquer l’harmonisation de Roderika avant de remettre le roi des faucons."
    ],
    "warnings": [
      "La potion de Seluvis compromet cette conclusion. Conserver Nepheli en vie et avancer ses dialogues avant les grands changements de fin de partie."
    ],
    "rewards": [
      "Pierre de forge des dragons anciens ; boutique finale de Gostoc s’il vit."
    ],
    "sources": [
      {
        "label": "PC Gamer — guide du parcours",
        "url": "https://www.pcgamer.com/elden-ring-nepheli-location-seluvis-potion-choice/",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "nepheli.stormveil",
        "title": "Rencontrer Nepheli",
        "location": "Voilorage, avant Godrick",
        "detail": "Lui parler puis la retrouver à la Table ronde après Godrick."
      },
      {
        "id": "nepheli.village",
        "title": "L’aider au village",
        "location": "Village des Albinauriques",
        "detail": "Lui parler sous le pont, vaincre le Tueur de Réprouvés puis poursuivre ses dialogues à la Table ronde."
      },
      {
        "id": "nepheli.gideon",
        "title": "Parler à Gideon",
        "location": "Table ronde",
        "detail": "Questionner Gideon sur son désespoir, puis reparler à Nepheli."
      },
      {
        "id": "nepheli.king",
        "title": "Récupérer le roi des faucons",
        "location": "Chapelle de l’anticipation",
        "detail": "Revenir par les Quatre beffrois et récupérer les cendres non invocables."
      },
      {
        "id": "nepheli.give",
        "title": "Lui remettre le roi",
        "location": "Sous-sol de la Table ronde",
        "detail": "Donner les cendres ; ne pas lui donner la potion."
      },
      {
        "id": "nepheli.throne",
        "title": "Rejoindre la salle du trône",
        "location": "Voilorage",
        "detail": "Terminer le fort de Kenneth, vaincre Morgott puis se reposer près de Godrick et revenir."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.rogier",
    "npcId": "npc.rogier",
    "name": "Rogier le sorcier",
    "content": "base",
    "regionIds": [
      "limgrave",
      "liurnia",
      "roundtable"
    ],
    "summary": "Enquêter sur la Nuit des Couteaux noirs avant son sommeil.",
    "requirements": [],
    "warnings": [
      "Entrer trop tôt au service de Ranni saute une partie de son enquête, sans bloquer les quêtes de Ranni ou Fia."
    ],
    "rewards": [
      "Rapière de Rogier ; équipement et lettre après son décès."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/sorcerer-rogier-s-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "rogier.chapel",
        "title": "Rencontrer Rogier",
        "location": "Chapelle de Voilorage",
        "detail": "Lui parler avant Godrick."
      },
      {
        "id": "rogier.hold",
        "title": "Recevoir sa rapière",
        "location": "Table ronde",
        "detail": "Lui reparler après Godrick."
      },
      {
        "id": "rogier.corpse",
        "title": "Examiner la trace sous le château",
        "location": "Sous-sols de Voilorage",
        "detail": "Observer la tache de sang près du visage géant puis questionner Rogier."
      },
      {
        "id": "rogier.imprint",
        "title": "Rapporter l’empreinte",
        "location": "Catacombes des Couteaux noirs",
        "detail": "Demander l’indice à Fia, vaincre l’assassin derrière le mur illusoire et rapporter l’empreinte."
      },
      {
        "id": "rogier.ranni",
        "title": "Interroger Ranni",
        "location": "Tour de Ranni → Table ronde",
        "detail": "Lui parler de la marque, rapporter son refus à Rogier puis proposer de la servir."
      },
      {
        "id": "rogier.sleep",
        "title": "Revenir après son sommeil",
        "location": "Table ronde",
        "detail": "Épuiser ses dialogues, recharger puis récupérer ses affaires."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.bernahl",
    "npcId": "npc.bernahl",
    "name": "Bernahl le Réfractaire",
    "content": "base",
    "regionIds": [
      "limgrave",
      "gelmir",
      "capital",
      "farum"
    ],
    "summary": "Accomplir son contrat puis affronter le Réfractaire.",
    "requirements": [],
    "warnings": [
      "Rykard met fin aux contrats du manoir. Le contrat de Leyndell doit être réalisé avant Maliketh et la capitale des cendres."
    ],
    "rewards": [
      "Fureur de Gelmir ; sceptre du Dévoreur, griffe blasphématoire et armure lors de l’invasion."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/recusant-bernahl-s-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "bernahl.shack",
        "title": "Rencontrer Bernahl",
        "location": "Cabane du maître de guerre",
        "detail": "Parler au marchand de cendres de guerre.",
        "optional": true
      },
      {
        "id": "bernahl.letter",
        "title": "Recevoir sa lettre",
        "location": "Manoir du Volcan",
        "detail": "Rejoindre le manoir et effectuer les deux premiers contrats de Tanith."
      },
      {
        "id": "bernahl.duo",
        "title": "Assister Bernahl",
        "location": "Manoir fortifié de Leyndell",
        "detail": "Utiliser la marque rouge pour vaincre Vargram et Wilhelm."
      },
      {
        "id": "bernahl.report",
        "title": "Réclamer sa récompense",
        "location": "Manoir du Volcan",
        "detail": "Reparler à Bernahl avant de clore les contrats avec Rykard."
      },
      {
        "id": "bernahl.rykard",
        "title": "Vaincre Rykard",
        "location": "Manoir du Volcan",
        "detail": "Épuiser ensuite les dialogues de Bernahl."
      },
      {
        "id": "bernahl.invasion",
        "title": "Vaincre son invasion",
        "location": "Farum Azula",
        "detail": "Depuis les Abords du grand pont, partir à l’opposé de Maliketh vers la tour et le coffre."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.gostoc",
    "npcId": "npc.gostoc",
    "name": "Gostoc le gardien",
    "content": "base",
    "regionIds": [
      "limgrave",
      "capital"
    ],
    "summary": "Retrouver le gardien à chaque changement de maître.",
    "requirements": [],
    "warnings": [
      "Le garder vivant permet son achat final. Sa mort ne bloque pas la conclusion de Nepheli."
    ],
    "rewards": [
      "Boutique ; pierre de forge des dragons anciens achetable à la conclusion."
    ],
    "sources": [
      {
        "label": "Eldenpedia — Gostoc",
        "url": "https://eldenring.wiki.gg/wiki/Gatekeeper_Gostoc",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "gostoc.gate",
        "title": "Parler au gardien",
        "location": "Entrée de Voilorage",
        "detail": "Choisir l’accès latéral ou lui demander d’ouvrir la grande porte."
      },
      {
        "id": "gostoc.godrick",
        "title": "Le retrouver après Godrick",
        "location": "Arène de Godrick",
        "detail": "Parler à Gostoc près du corps."
      },
      {
        "id": "gostoc.nepheli",
        "title": "Préparer le changement de souverain",
        "location": "Nécrolimbe et Table ronde",
        "detail": "Accomplir les demandes de Kenneth et remettre le roi des faucons à Nepheli."
      },
      {
        "id": "gostoc.throne",
        "title": "Visiter sa boutique finale",
        "location": "Salle du trône de Voilorage",
        "detail": "Après Morgott, recharger la zone et parler à Gostoc près de Nepheli."
      }
    ],
    "branches": []
  },
  {
    "id": "quest.d",
    "npcId": "npc.d",
    "name": "D et son frère jumeau",
    "content": "base",
    "regionIds": [
      "limgrave",
      "roundtable",
      "caelid",
      "underground"
    ],
    "summary": "Relier la chasse aux morts au destin de Fia.",
    "requirements": [],
    "warnings": [
      "Donner l’armure au jumeau prépare son intervention après la conclusion de Fia. La restitution se fait plus tard."
    ],
    "rewards": [
      "Accès à Gurranq ; armure jumelle et épée inséparable selon la suite."
    ],
    "sources": [
      {
        "label": "eXputer — parcours et étapes",
        "url": "https://eldenring.exputer.com/quests/d-hunter-of-the-dead-s-quest",
        "verifiedAt": "2026-11-14"
      }
    ],
    "steps": [
      {
        "id": "d.deathroot",
        "title": "Montrer une mortefleur à D",
        "location": "Nécrolimbe ou Table ronde",
        "detail": "Vaincre par exemple le Nocher diaphane du village des eaux nécromantes."
      },
      {
        "id": "d.gurranq",
        "title": "Suivre sa recommandation",
        "location": "Sanctuaire bestial",
        "detail": "Utiliser le portail près de la troisième église de Marika."
      },
      {
        "id": "d.dagger",
        "title": "Rendre la dague de Fia",
        "location": "Table ronde",
        "detail": "Après avoir reçu sa dague patinée, la donner à D puis recharger."
      },
      {
        "id": "d.armor",
        "title": "Récupérer l’armure jumelle",
        "location": "Table ronde",
        "detail": "Entrer dans la pièce ouverte près de Hewg et parler à Fia."
      },
      {
        "id": "d.twin",
        "title": "Remettre l’armure au frère",
        "location": "Aqueduc de Siofra",
        "detail": "Trouver le jumeau avant les Gargouilles vaillantes.",
        "optional": true
      },
      {
        "id": "d.fia",
        "title": "Conclure l’histoire de Fia",
        "location": "Profondeurs de Fonderacine",
        "detail": "Obtenir sa rune après Fortissax, puis revenir parler au jumeau s’il a reçu l’armure."
      },
      {
        "id": "d.return",
        "title": "Récupérer ses affaires",
        "location": "Profondeurs de Fonderacine",
        "detail": "Recharger après ses dialogues pour récupérer l’armure et l’épée.",
        "optional": true
      }
    ],
    "branches": []
  }
];
