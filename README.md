# Carnet du sans éclat

Un carnet de voyage en français, sous Expo + React Native + TypeScript.

## Première livraison : lots 1 et 2

- Accueil sombre et doré, avec accès au carnet.
- Personnages et cycles NG+, avec historique conservé.
- Sauvegarde automatique IndexedDB et export/import JSON avec aperçu.
- Imports sous forme de copies : aucune partie existante n’est remplacée.
- Cinq parcours : Roderika, Boc, Kenneth Haight, Ranni et Sellen.
- Recherche, filtres par région/statut, étapes cochables et choix de branches.
- Statut global des quêtes manuel et indépendant des étapes.
- Toutes les informations visibles, catalogue explicitement **partiel**.

Les autres catalogues, MongoDB et le DLC sont décrits dans [la feuille de route](docs/ROADMAP.md).
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

La collection est conservée par personnage. Quêtes, boss, grâces et ramassages sont prévus par
cycle. Aucun effet automatique entre rubriques : un statut « terminée » ne coche pas les étapes
et un changement de branche ne supprime pas les coches saisies.

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
| `npm run typecheck` | Vérification TypeScript stricte |
| `npm run build:web` | Export web dans `dist/` |
| `npm test` | Tests métier et intégrité du catalogue |
| `npm run test:browser` | Parcours web réels, prérequis ci-dessous |
| `npm run android` | Appareil ou émulateur Android configuré |
| `npm run ios` | Simulateur iOS sur macOS avec Xcode |

Les tests métier couvrent l’isolation des parties, le NG+, les coches rapides, les erreurs de
stockage, les exports/imports, les versions incompatibles et les branches de quêtes.

Pour les parcours navigateur, laisser Expo démarré et lancer une **instance Edge dédiée aux tests**
depuis PowerShell, dans le dossier du projet :

```powershell
Start-Process -FilePath 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -WindowStyle Hidden -ArgumentList '--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-address=127.0.0.1','--remote-debugging-port=9222','--user-data-dir=C:\workspace\carnet-du-sans-eclat\.browser-check\edge-profile','about:blank'
npm.cmd run test:browser
```

Les parcours créent des personnages de test sur `http://127.0.0.1:8081` dans ce profil dédié.
Ils contrôlent les formats mobiles, la persistance, les choix de quêtes, l’import d’un vrai
fichier et le téléchargement d’un export. Les captures et fichiers sont dans `.browser-check/`.
Le débogage Edge reste limité à la boucle locale ; fermer cette instance après les essais.
Ne pas utiliser son profil personnel.

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
