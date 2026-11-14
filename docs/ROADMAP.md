# Feuille de route

Le projet est livré en plusieurs fois. Les lots 1 à 3 sont disponibles dans le navigateur.
Une fonctionnalité disponible ne signifie pas que son catalogue est exhaustif.

| Lot | État | Livraison et critère |
| --- | --- | --- |
| 1 — Parties et sauvegarde | Livré web | Personnages/cycles, IndexedDB, export/import avec aperçu et copies. Persistance et erreurs testées. |
| 2 — Premier suivi de quêtes | Livré web | Roderika, Boc, Kenneth Haight, Ranni et Sellen ; recherche, régions, statut manuel, étapes et branches. |
| 3 — Quêtes du jeu de base | Livré web | 40 parcours du périmètre PNJ, regroupement régional, liens entre personnages/quêtes, points de blocage et couverture contrôlée. Vérification documentaire ; pas de test en jeu. |
| 4 — Collection et obtention | À réaliser | Équipement, sorts, cendres, outils, progression et améliorations importantes ; sources multiples et filtres. |
| 5 — Boss et grâces | À réaliser | Rencontres non réapparaissantes distinctes et grâces activées par cycle ; accès, régions et liens aux objets/quêtes. |
| 6 — Consolidation | À réaliser | Couverture contrôlée du jeu de base, références, doublons, liens et compteurs sans fausse exhaustivité. |
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

## Lots de contenu

Publier de petits ensembles vérifiés ; les catalogues restent signalés comme partiels jusqu’au
contrôle de leur couverture. Le lot 2 fournit un parcours synthétique pour cinq personnages,
pas un relevé de tous leurs dialogues. Le lot 3 couvre les 40 parcours retenus dans
[le manifeste de couverture](QUEST_COVERAGE.md), avec sept rencontres courtes et le récit de
Melina distingués des 32 quêtes. Les cinq parcours validés conservent leurs identifiants.
Les catalogues d’objets, de boss et de grâces ne sont pas encore livrés. Les noms et identifiants pourront être rapprochés
d’[ERDB](https://github.com/EldenRingDatabase/erdb) sans dépendre d’une API pendant l’utilisation.

Pour les objets : marchand, boss, ennemi, exploration, dialogue PNJ, quête, échange de souvenir,
énigme et autre. Conserver lieu, conditions, prix éventuel, PNJ/ennemi/boss associé et grâce
de référence. Séparer la méthode de l’obtention garantie, aléatoire avec taux sourcé, ou inconnue.
Ne jamais inventer de pourcentage. Exclure consommables ordinaires, munitions, matériaux de
fabrication et ressources ordinaires d’amélioration ; inclure les souvenirs comme progression.

Pour les boss : une fiche par rencontre, même pour les homonymes ; exclure invasions et ennemis
uniques ordinaires. Une carte interactive, les builds, les quantités d’inventaire et l’analyse des
sauvegardes du jeu sont hors périmètre.

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
