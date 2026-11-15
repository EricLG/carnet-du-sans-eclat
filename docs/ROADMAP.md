# Feuille de route

Le projet est livré en plusieurs fois. Les lots 1 à 3 sont disponibles dans le navigateur. Le lot 4 fournit les fonctions
de collection et une première sélection de contenu, à enrichir par régions. Le lot 5 ajoute
le suivi des boss et des sites de grâce avec un premier catalogue régional.
Le lot 6 fournit l’audit transversal et les contrôles de compatibilité de cette publication.
Une fonctionnalité disponible ne signifie pas que son catalogue est exhaustif.
La publication courante est `2026.11.15.4` : huit catégories d’objets sont recensées par type.

| Lot | État | Livraison et critère |
| --- | --- | --- |
| 1 — Parties et sauvegarde | Livré web | Personnages/cycles, IndexedDB, export/import avec aperçu et copies. Persistance et erreurs testées. |
| 2 — Premier suivi de quêtes | Livré web | Roderika, Boc, Kenneth Haight, Ranni et Sellen ; recherche, régions, statut manuel, étapes et branches. |
| 3 — Quêtes du jeu de base | Livré web | 40 parcours du périmètre PNJ, regroupement régional, liens entre personnages/quêtes, points de blocage et couverture contrôlée. Vérification documentaire ; pas de test en jeu. |
| 4 — Collection et obtention | Fonctions livrées web ; huit catégories recensées | 1 418 types, dont 1 414 dans la collection, 11 catégories, 1 454 acquisitions, 27 emplacements. Armes 308, boucliers 69, armures 559, sorcelleries 70, talismans 114, incantations 101, cendres de guerre 91 et d’invocation 64 : 1 376/1 376 types du jeu de base d’origine, chacun avec au moins une obtention. Outils, progression, améliorations et obtentions alternatives à poursuivre. |
| 5 — Boss et grâces | Fonctions livrées web ; contenu partiel | Onglet Exploration, 134 rencontres non réapparaissantes et 40 sites de grâce ; ajout des rencontres liées aux objets publiés. Coches par cycle, recherche/filtres, accès, régions et liens aux objets/quêtes. Catalogue à poursuivre. |
| 6 — Consolidation | Contrôles livrés ; contenu encore partiel | Audit reproductible des périmètres, références, doublons, liens, compteurs et anciens identifiants ; rapport régional et dénominateurs sourcés. Enrichissement du jeu de base et revue des accès documentaires refusés à poursuivre. |
| 7 — Comptes privés / MongoDB | À réaliser | API Node.js/TypeScript avec Fastify et pilote MongoDB, invitations, sessions et synchronisation par personnage. |
| 8 — Shadow of the Erdtree | À réaliser | Catalogues et filtres DLC, progression conservée et remplissage régional. |
| 9 — Natif | Adaptateurs présents, validation à réaliser | Tester stockage, import/export, ergonomie et futures sessions sur Android puis iOS. |

## Invariants retenus

- Tout est visible : aucun masquage de spoilers.
- Collection « déjà obtenu » par personnage, sans quantités ; quêtes/boss/grâces/ramassages par cycle.
- Nouveau cycle vide, collection et historique conservés ; coches réversibles et indépendantes.
- Les améliorations importantes sont suivies par emplacement ; les autres sources d’obtention restent informatives.
- Statut global des quêtes manuel et indépendant des étapes ; choix de branches sans suppression des coches.
- Catalogue distinct de la progression, identifiants stables, références et dates de vérification.
- Navigation web d’abord, compatibilité native conservée. Aucun dépôt Git sans demande explicite.

## Contenu à poursuivre

L’[audit du catalogue](CATALOG_AUDIT.md) est le document de référence pour les chiffres,
le périmètre des quêtes, objets, boss et grâces, les sources et les commandes de contrôle.
Son tableau régional compte les fiches et les obtentions présentes dans le carnet ;
il ne mesure pas la progression personnelle ni l’exhaustivité des régions du jeu.

Les prochains enrichissements doivent :

1. Établir les inventaires attendus des outils permanents, objets de progression et améliorations.
2. Compléter les obtentions alternatives des objets et les emplacements d’amélioration encore partiels.
3. Ajouter les rencontres de boss et sites de grâce manquants, au-delà des rencontres déjà liées aux récompenses.
4. Revoir les sources dont l’accès réseau n’a pas pu être vérifié et recouper les conditions documentaires.

Publier de petits ensembles sourcés, garder les identifiants existants et actualiser l’audit
après chaque ajout. Une couverture de 100 % des types d’une catégorie ne signifie pas que
toutes leurs obtentions sont répertoriées. Le DLC et les ajouts ultérieurs hors inventaire
restent exclus du périmètre actuel.

Une carte interactive, les builds, les quantités d’inventaire et l’analyse des sauvegardes
du jeu sont hors périmètre.

## Sauvegarde distante prévue

MongoDB restera derrière une API HTTPS, sur le même domaine que le web. Identifiant/mot de
passe avec invitations uniquement, sans inscription publique ni service d’e-mail obligatoire.
Chaque accès doit contrôler le propriétaire. Aucun secret MongoDB ne doit parvenir au client.

La sauvegarde locale continuera à fonctionner sans serveur. Une sauvegarde versionnée par
personnage conservera les modifications en attente. En cas de conflit entre appareils,
conserver les deux versions et proposer un choix ; aucun écrasement silencieux. Le premier
rattachement proposera explicitement de transférer les parties locales.

Le lot 7 nécessitera l’environnement serveur, la configuration MongoDB et les essais HTTPS.
Les détails de déploiement ne sont pas présents dans le projet ; ne pas prétendre qu’une
synchronisation existe avant ces essais. Les migrations doivent préserver les progressions
et les entrées inconnues d’un catalogue plus récent.
