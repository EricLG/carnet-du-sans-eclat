# Carnet du sans éclat

Un carnet de voyage en français, sous Expo + React Native + TypeScript.

## Fonctionnalités disponibles

- Accueil sombre et doré, avec accès au carnet.
- Personnages et cycles NG+, avec historique conservé.
- Sauvegarde automatique IndexedDB et export/import JSON avec aperçu.
- Imports sous forme de copies : aucune partie existante n’est remplacée.
- 40 parcours PNJ du jeu de base : 32 quêtes, 7 rencontres courtes et l’histoire de Melina.
- Fiches réparties par région de départ, avec personnages et parcours associés.
- Recherche avec noms associés (Edgar, Gowry, Masque d’or…), filtres région/statut/type, étapes cochables et branches.
- Statut global des quêtes manuel et indépendant des étapes.
- Toutes les informations visibles, points de blocage et références documentaires par fiche.
- [Périmètre des parcours PNJ](docs/QUEST_COVERAGE.md), consultable aussi dans le carnet.
- Onglet **Collection** : 150 objets dans 10 catégories et 4 types d’améliorations, avec 190 sources d’obtention documentées.
- Recherche française/anglaise ; filtres par catégorie, région, méthode et statut.
- Collection « déjà obtenu » conservée par personnage ; 27 emplacements d’amélioration suivis par cycle.
- Prix, conditions, grâces de référence, taux sourcés, échanges de souvenir et liens vers les quêtes.
- [Catalogue d’objets explicitement partiel](docs/ITEM_COVERAGE.md), à enrichir par régions.

Les catalogues de boss et de grâces, MongoDB et le DLC sont décrits dans [la feuille de route](docs/ROADMAP.md).
Ils ne sont pas encore implémentés. Les adaptateurs de stockage et d’import/export natifs sont
présents ; Android et iOS ne sont pas encore validés sur appareil.

## Installation et démarrage

Utiliser Node.js 24 LTS et npm, puis :

```sh
npm ci
npm run web
```

La commande `web` conserve `expo start --web --lan --port 8081`.
Sur ce PC : `http://localhost:8081`. Sur un téléphone du même réseau :
`http://192.168.1.15:8081` (à adapter si l’IP du PC change).

Sur PowerShell, utiliser `npm.cmd` si la politique d’exécution bloque `npm.ps1`.
Arrêter le serveur avec `Ctrl+C`.

Dans Chrome ou Edge : `F12`, puis `Ctrl+Shift+M` pour émuler **390 × 844** et **360 × 800**.
Les essais navigateur ne remplacent pas les essais natifs.

## Sauvegardes

Ouvrir le carnet, l’onglet **Parties**, puis **Sauvegardes et transfert**.
Exporter un fichier JSON pour le transférer vers un autre appareil ou le futur domaine.
À l’import, vérifier l’aperçu et confirmer la création des copies.

La progression du navigateur dépend de l’origine (protocole, hôte et port) et du navigateur :
**localhost, l’IP du PC et le futur domaine ont des données distinctes**.
L’effacement des données du site et la navigation privée peuvent supprimer les sauvegardes.
Le stockage local n’est pas une synchronisation entre PC et téléphone.

Dans **Collection**, choisir **Objets du personnage** pour cocher les objets déjà obtenus,
ou **Améliorations du cycle** pour suivre les améliorations, regroupées par type avec une ligne
à cocher par emplacement. Elles apparaissent uniquement dans cette seconde vue. La collection reste commune
aux cycles du personnage, même si un objet a été utilisé, vendu ou échangé.
Les ramassages et quêtes appartiennent au cycle ; boss et grâces suivront la même règle. Aucun effet automatique entre rubriques : un statut « terminée » ne coche pas les étapes
et un changement de branche ne supprime pas les coches saisies. Les améliorations se cochent uniquement par emplacement et par cycle. Obtenir un objet
ne complète pas une quête.

Les écritures sont sérialisées ; une modification est présentée comme enregistrée seulement
après sa persistance. Un conflit avec un autre onglet ou une erreur de stockage est signalé.
Le stockage et le format des exports utilisent l’identifiant `carnet-du-sans-eclat`.
Une sauvegarde locale incompatible reste conservée. Les fichiers d’une version inconnue sont
refusés sans modifier les données existantes.

## Commandes et vérifications

| Commande | Utilisation |
| --- | --- |
| `npm start` | Serveur Expo |
| `npm run web` | Serveur web sur le réseau local, port 8081 |
| `npm run lint` | Analyse ESLint ; aucun avertissement accepté |
| `npm run lint:fix` | Corrections automatiques disponibles, puis analyse |
| `npm run typecheck` | Vérification TypeScript stricte |
| `npm run build:web` | Export web dans `dist/` |
| `npm test` | Tests métier et intégrité du catalogue |
| `npm run test:browser` | Parcours web réels, prérequis ci-dessous |
| `npm run android` | Appareil ou émulateur Android configuré |
| `npm run ios` | Simulateur iOS sur macOS avec Xcode |

Les tests métier couvrent l’isolation des parties, le NG+, les coches rapides, les erreurs de
stockage, les exports/imports, les versions incompatibles, les branches de quêtes, la couverture du catalogue, les liens croisés
et la compatibilité des identifiants des cinq parcours initiaux. Ils couvrent aussi les objets à
sources multiples, les taux inconnus/invalides, les filtres région-méthode, les emplacements,
les coches indépendantes et leur conservation à l’export.

Pour les parcours navigateur, laisser Expo démarré et lancer une **instance Edge dédiée aux tests**
depuis PowerShell, dans le dossier du projet :

```powershell
Start-Process -FilePath 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -WindowStyle Hidden -ArgumentList '--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port=9222','--user-data-dir=C:\workspace\carnet-du-sans-eclat\.browser-check\edge-profile','about:blank'
npm.cmd run test:browser
```

Les parcours créent des personnages de test sur `http://127.0.0.1:8081` dans ce profil dédié.
Ils contrôlent les formats mobiles, la persistance, les choix de quêtes, l’import d’un vrai
fichier et le téléchargement d’un export. Ils vérifient aussi les recherches par PNJ associé,
les filtres de type, les liens entre fiches et la persistance d’une nouvelle quête régionale.
Le parcours de collection ajoute les filtres, les acquisitions, les coches, le NG+, l’isolation
des personnages, le défilement et des libellés d’onglets agrandis. Les captures et fichiers sont dans `.browser-check/`.
Le débogage Edge reste limité à la boucle locale ; fermer cette instance après les essais.
Ne pas utiliser son profil personnel.

### ESLint

La configuration `eslint.config.js` utilise le [preset officiel Expo](https://docs.expo.dev/guides/using-eslint/)
au format flat config. Il fournit les contrôles pour React, les Hooks, TypeScript, les imports
et Expo. Les tests et la configuration disposent aussi des variables globales Node.js.
Les dépendances, exports web, caches de test et projets natifs générés sont exclus de l’analyse.

`npm run lint` analyse le projet sans modifier les fichiers. `npm run lint:fix` applique les
corrections automatiques disponibles. Les deux commandes échouent s’il reste des erreurs
ou des avertissements. Le contrôle des types reste assuré par `npm run typecheck`.

Compatibilité actuelle : le SDK Expo 58 et ses plugins React/import utilisent ESLint 9.
Cette branche est [en fin de support](https://eslint.org/version-support/) ; passer à ESLint 10
nécessitera une combinaison de preset et de plugins compatible, sans forcer leurs dépendances.

## Organisation

```text
index.ts             Enregistrement Expo
src/App.tsx          Navigation et fournisseurs de contexte
src/screens/         Écrans
src/components/      Composants visuels partagés
src/domain/          Types, validation et transformations métier
src/catalog/         Fiches versionnées et sourcées
src/state/           Service de progression et accès React
src/storage/         IndexedDB web / AsyncStorage natif
src/platform/        Import/export web / natif
src/theme.ts         Couleurs et polices
tests/               Tests métier et parcours navigateur
docs/ROADMAP.md      Lots livrés et restants
docs/QUEST_COVERAGE.md Périmètre et provenance des parcours PNJ
docs/ITEM_COVERAGE.md Périmètre et provenance des objets publiés
AGENTS.md            Consignes pour les agents
```

Les textes des quêtes sont des synthèses documentaires en français. Les références et dates
de consultation sont disponibles dans chaque fiche ; aucun test en jeu ni vérification sur
une version précise du jeu n’est revendiqué. Conserver les identifiants pour préserver les coches.

Trois alertes npm modérées sont signalées dans la chaîne Expo → `@expo/fingerprint` →
`minimatch`. La correction automatique proposée rétrograde le SDK : elle n’a pas été appliquée.

Le dépôt Git est initialisé sur la branche `master`. Aucun backend ni compte n’est créé. Le modèle initial provient du paquet officiel
`expo-template-blank-typescript` ; sa licence est conservée dans `LICENSE`. Les icônes du modèle
sont provisoires. Compagnon non officiel, sans affiliation avec FromSoftware ou Bandai Namco.
