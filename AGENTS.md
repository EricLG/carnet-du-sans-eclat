# Carnet du sans éclat

## Objectif et périmètre

Application mobile de suivi des quêtes d’Elden Ring, conçue pour Android et iOS avec Expo,
React Native et TypeScript. Le navigateur en émulation mobile sert à valider l’interface.
Les lots 1 à 3 fournissent les personnages/cycles, la sauvegarde locale, l’import/export
et 40 parcours PNJ du jeu de base (32 quêtes, 7 rencontres, Melina). La couverture est définie
dans `docs/QUEST_COVERAGE.md`. Le lot 4 fournit la collection et 27 ramassages d’améliorations
avec 1 071 types dans 11 catégories : les 308 armes, 69 boucliers, 559 pièces d’armure et
70 sorcelleries du jeu de base d’origine sont répertoriés. Les autres catégories et les
acquisitions restent partielles ; voir `docs/ITEM_COVERAGE.md` et `docs/ITEM_COMPLETION.md`.
Le lot 5 fournit le suivi par cycle de 93 rencontres de boss et
40 sites de grâce, catalogue partiel détaillé dans `docs/WORLD_COVERAGE.md`.
Le lot 6 fournit l’audit transversal, les compteurs consolidés et la protection des anciens
identifiants ; voir `docs/CONSOLIDATION.md` et `docs/CATALOG_AUDIT.md`. Les catalogues restent partiels.
La suite est détaillée dans
`docs/ROADMAP.md` ; ne pas présenter les autres lots comme livrés.

## Organisation et commandes

- `index.ts` enregistre le composant racine ; conserver ce point d’entrée léger.
- `src/App.tsx` compose l’application ; `src/screens/` contient les écrans.
- `src/theme.ts` regroupe les couleurs et les polices partagées.
- `src/domain/` définit les données et règles métier ; `src/catalog/` contient le catalogue sourcé.
- `src/state/` gère la progression ; `src/storage/` et `src/platform/` isolent les adaptateurs web/natifs.
- IndexedDB stocke la progression web ; AsyncStorage est l’adaptateur natif (pas encore testé sur appareil).
- `app.json` contient la configuration Expo ; `assets/` contient les images du modèle officiel.
- Installer avec `npm ci` lorsque le fichier de verrouillage existe ; utiliser npm exclusivement.
- `npm start` : serveur Expo ; `npm run web` : aperçu navigateur.
- `npm run lint` : analyse ESLint sans avertissement ; `npm run lint:fix` : corrections automatiques.
- `npm run typecheck` : contrôle TypeScript ; `npm run build:web` : export web dans `dist/`.
- `npm run android` et `npm run ios` : lancement sur environnement natif configuré.
- `npm test` : tests métier ; `npm run test:browser` : parcours navigateur (serveur et Edge dédiés requis, voir README).
- `npm run catalog:check` : audit hors ligne ; `-- --write-report` régénère le rapport de couverture.
- `npm run catalog:links` : contrôle HTTP distinct ; un accès refusé reste non vérifié.

## Règles de développement

- Ne jamais initialiser Git, créer de commit ou configurer un dépôt distant sans demande explicite.
- Conserver TypeScript strict et privilégier des composants React Native compatibles avec le web.
- Garder les dépendances compatibles avec le SDK Expo installé ; utiliser `npx expo install`
  pour ajouter une dépendance gérée par Expo et conserver `package-lock.json` à jour.
- Écrire les textes de l’interface et la documentation en français ; garder les identifiants de code en anglais.
- Respecter le thème sombre, les accents dorés, les tailles de texte lisibles et les petits écrans.
- Prévoir le défilement et le retour à la ligne ; ne pas contraindre les écrans à une hauteur fixe.
- Aucun bouton sans action. Ne pas ajouter de fonctionnalités hors de la demande en cours.
- Le choix produit est « tout visible » : ne pas introduire de masquage des noms, étapes ou récompenses.
- Séparer le catalogue des quêtes de la progression personnelle ; vérifier les sources
  avant d’ajouter des données du jeu. Ne pas inventer de conditions de quête.
- Les coches d’objets appartiennent au personnage ; quêtes, boss, grâces et ramassages au cycle.
- `src/catalog/quests/` contient les fiches régionales et les rencontres ; `questScope.ts` est l’inventaire
  éditorial indépendant. Ajouter une fiche nécessite des références documentaires, des identifiants
  stables et un classement cohérent. Vérifier les liens et la couverture avec les tests métier.
- `src/domain/items.ts` valide les objets/acquisitions ; `src/catalog/items/` contient les fiches,
  emplacements, références et périmètre de publication. Les sources et le catalogue restent partiels :
  ajouter du contenu ne doit jamais changer les identifiants existants ou effacer des coches inconnues.
- Méthode d’obtention et garantie sont distinctes. Aucun taux inventé ; conserver les conditions
  et sources d’un pourcentage. Un taux inconnu reste absent, sans devenir 0 %.
- `src/catalog/world/` contient les boss, grâces et leur inventaire de publication indépendant.
  `src/domain/world.ts` valide leurs références. Les catalogues restent partiels ; conserver
  les identifiants de boss/grâces utilisés par les acquisitions et contrôler leur cohérence.
  Une fiche par rencontre non réapparaissante ; exclure invasions et ennemis uniques ordinaires.
  Cocher un boss ne coche jamais sa grâce, ses récompenses ou une étape de quête.
- Les améliorations importantes apparaissent uniquement dans « Améliorations du cycle »,
  regroupées par objet puis par emplacement. Chaque case concerne une acquisition et un cycle.
  Elles sont exclues de la collection du personnage et de ses compteurs. Conserver les éventuelles
  anciennes coches de collection dans les sauvegardes, sans les convertir en ramassages.
- Le statut global des quêtes est manuel. Aucun effet automatique entre les rubriques ni entre
  branches et coches. Conserver les identifiants pour préserver les sauvegardes.
- Les erreurs de stockage doivent être visibles. Ne jamais remplacer une sauvegarde illisible.
  Les imports validés créent des copies après aperçu ; ils ne remplacent aucune partie.
- Les comptes privés et MongoDB sont prévus dans un lot ultérieur : aucune connexion directe
  depuis le client, aucun identifiant serveur dans une variable `EXPO_PUBLIC_*`.

## Vérifications et compte rendu

- Après une modification du code : exécuter `npm run lint`, `npm run typecheck` et `npm run build:web`.
- Conserver le preset ESLint officiel Expo ; corriger les problèmes signalés plutôt que désactiver globalement les règles.
- Après une modification visuelle : contrôler les formats 390 × 844 et 360 × 800,
  le défilement, l’absence de débordement horizontal, la lisibilité et les erreurs navigateur.
- Pour préparer un commit, contrôler les fichiers indexés et exclure dépendances, fichiers générés et données locales.
- Exécuter `npm test` après une modification des règles métier, de la sauvegarde ou du catalogue.
- Après une modification du catalogue, exécuter `npm run catalog:check` et actualiser son rapport.
  Préserver les références historiques `tests/fixtures/catalog-ids.v1.json` et
  `tests/fixtures/item-completion-ids.json` : un ajout de contenu
  ne doit pas masquer la suppression ou la réaffectation d’un identifiant déjà publié.
- Ne pas écrire de tests qui reproduisent l’accueil statique. Tester les invariants métier,
  les échecs de sauvegarde, les imports et les références du catalogue.
- Indiquer les contrôles effectués, leurs résultats et ceux impossibles à exécuter.
  Un contrôle web ne vaut pas validation sur Android ou iOS.
