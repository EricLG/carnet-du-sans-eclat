# Consolidation — lot 6

Les contrôles de consolidation sont livrés pour le catalogue actuellement publié.
Ils ne rendent pas les sélections d’objets, de boss ou de grâces exhaustives.
Le [rapport reproductible](CATALOG_AUDIT.md) distingue les fiches publiées de la couverture
du jeu de base ; la [feuille de route](ROADMAP.md) conserve les enrichissements à poursuivre.

## Catalogue et couverture

Lors de la consolidation initiale, la publication conservait 40 parcours PNJ, 154 types
d’objets (150 dans la collection), 190 acquisitions, 27 ramassages, 32 rencontres de boss
et 40 sites de grâce.
Aucune fiche de jeu n’est ajoutée dans ce lot. Les données et identifiants précédents
sont conservés ; seuls les contrôles et la construction des références sont consolidés.
La [complétion ultérieure des quatre catégories prioritaires](ITEM_COMPLETION.md) porte
le catalogue à 1 071 types et 1 107 acquisitions ; le rapport d’audit décrit cet état actuel.

Les totaux documentaires des objets sont centralisés dans `src/catalog/itemCoverage.ts`.
Ils concernent huit catégories du jeu de base d’origine : 138 types publiés sur 1 376 recensés
lors de la consolidation initiale, puis 1 040 après la complétion de l’équipement et des sorcelleries.
Les outils, objets de progression et améliorations ont un dénominateur inconnu, sans
pourcentage. Aucun pourcentage global du jeu, des boss ou des grâces n’est déduit de ce sous-total.
Les variantes nommées et armures altérées sont distinctes ; les niveaux d’amélioration et
affinités ne créent pas de types supplémentaires. Le DLC reste exclu de la publication.

Le rapport affiche les régions sans sélection, au lieu de laisser croire qu’elles sont
complètes. Les 40 parcours PNJ correspondent au périmètre éditorial du lot 3, sans inventaire
de tous les dialogues. L’exactitude de chaque détail reste une vérification documentaire,
sans essai en jeu ni version du jeu garantie.

## Contrôles reproductibles

```sh
npm run catalog:check
npm run catalog:check -- --json
npm run catalog:check -- --write-report
npm run catalog:links
npm run catalog:links -- --json
```

`catalog:check` fonctionne sans réseau et sans données personnelles. Il vérifie les schémas,
les trois manifestes de publication, les identifiants entre catalogues, les doublons probables,
les liens, les sources, les dates et les dénominateurs. Un doublon probable demande une revue ;
aucune fusion automatique ne modifie les fiches. Le code de sortie vaut 1 en cas d’erreur,
0 sinon. `--write-report` régénère uniquement `docs/CATALOG_AUDIT.md`.

`catalog:links` vérifie séparément la disponibilité HTTP, avec trois requêtes simultanées
au maximum et huit secondes par requête. Un refus HEAD ou une absence est confirmé par GET.
Les codes de sortie sont 0 si toutes les pages sont accessibles, 1 pour une absence confirmée
(404/410) ou une erreur d’audit, 2 si des accès restent non vérifiés. Les refus 403/429,
erreurs serveur et délais dépassés ne deviennent pas des liens déclarés cassés ou validés.
Le script utilise les certificats système de Node.js 24, sans désactiver TLS.
Il ne modifie jamais les dates de revue documentaire. Une réponse HTTP réussie ne prouve
ni la pertinence du contenu ni l’exactitude des conditions du jeu.

Contrôle HTTP du 15 novembre 2026 : **119 URL accessibles sur 184**, aucune absence confirmée,
**65 accès non vérifiés** (57 réponses 429 et 8 réponses 403). Ces accès devront être revus
ultérieurement ; le lot ne revendique pas une validation en ligne complète.

## Références, compteurs et sauvegardes

Les 16 références de boss et les 20 références de grâces des acquisitions reprennent
désormais leurs noms et régions depuis le catalogue d’exploration. Les identifiants et les
valeurs publiées restent identiques. Les liens boss/grâce d’arène sont contrôlés dans les
deux sens. Une récompense liée à un boss exige la méthode `boss_reward`.

La couverture PNJ compte les fiches réellement présentes, plutôt que les fiches prévues
dans le manifeste. Les compteurs de collection, ramassages et exploration partagent une
fonction qui compte les identifiants publiés distincts. Les coches inconnues et les anciennes
coches d’amélioration dans la collection ne gonflent pas ces compteurs.

Le format de sauvegarde reste en version 1. Aucun transfert automatique de coches entre
rubriques, aucun nettoyage des entrées inconnues et aucune migration ne sont effectués.
Les imports restent des copies après aperçu. Le fichier `tests/fixtures/catalog-ids.v1.json`
fige les identifiants publiés et leurs propriétaires (étapes, branches, acquisitions et
ramassages). Les ajouts futurs sont permis ; ne pas régénérer cette référence pour masquer
une suppression ou une réaffectation qui casserait une ancienne sauvegarde.

## Vérification et travail restant

Les tests métier couvrent les défauts injectés dans l’audit, les compteurs, les anciens
identifiants, la conservation des coches inconnues à l’export/import et les résultats HTTP
simulés. La validation web couvre les parcours existants aux formats 390 × 844 et 360 × 800.

Contrôles exécutés le 15 novembre 2026 : **52 tests métier réussis**, ESLint sans avertissement,
TypeScript strict, export web et audit local sans erreur. Les parcours navigateur complets
(parties, quêtes, collection, exploration, sauvegardes) passent dans Edge aux deux formats,
avec défilement, persistance, import/export et libellés d’onglets agrandis, sans débordement
horizontal ni erreur navigateur. La comparaison à l’instantané avant consolidation confirme
que les données de jeu et leurs identifiants n’ont pas changé.

Les prochaines publications doivent compléter les acquisitions et régions, établir les
inventaires encore inconnus puis revoir les références inaccessibles. Le serveur privé,
le DLC et la validation sur appareils Android/iOS restent les lots suivants ; ce contrôle
web ne les valide pas.
