# Couverture des objets — première sélection du lot 4

Catalogue `2026.11.14.1`, revue documentaire du 14 novembre 2026.

## État de publication

Les fonctions de collection et d’obtention sont disponibles dans le navigateur.
Le contenu reste **partiel** : **45 types d’objets, 63 sources et 13 emplacements
d’amélioration** : 41 objets sont affichés dans la collection du personnage et 4 types
d’améliorations sont réservés au suivi par cycle. Aucun de ces nombres ne désigne la totalité du jeu ni d’une région.

L’inventaire de publication `src/catalog/items/scope.ts` conserve les identifiants attendus.
Les contrôles détectent une fiche ou un emplacement manquant, ajouté hors inventaire ou dupliqué.
Il ne s’agit pas encore d’un inventaire exhaustif des objets à produire.

| Catégorie | Types publiés |
| --- | ---: |
| Armes | 12 |
| Boucliers | 2 |
| Pièces d’armure | 4 |
| Talismans | 4 |
| Sorcelleries | 2 |
| Incantations | 2 |
| Cendres de guerre | 3 |
| Cendres d’invocation | 3 |
| Outils permanents | 7 |
| Objets de progression | 2 |
| Améliorations importantes | 4 |

Chaque pièce d’armure a sa propre fiche, sa place (tête, torse, mains ou jambes) et sa coche.
Le souvenir du Greffé est un objet de progression, même s’il peut être consommé ou échangé.
La torche est classée comme arme. La fiole réutilisable et la lanterne sont des outils.
Les consommables ordinaires, munitions, matériaux de fabrication et pierres/muguets
ordinaires d’amélioration ne sont pas publiés.

## Régions et acquisitions

| Région | Sources publiées | État |
| --- | ---: | --- |
| Nécrolimbe, dont Voilorage | 42 | Sélection partielle |
| Péninsule larmoyante | 8 | Sélection partielle |
| Table ronde | 10 | Boutiques, rattrapages et échanges sélectionnés |
| Liurnia | 3 | Alternatives de boutique uniquement |
| Autres régions et DLC | 0 | Non publiés |

Les sources d’un objet ne sont pas nécessairement toutes répertoriées. Par exemple,
un parcours PNJ peut mentionner une récompense encore absente du catalogue d’objets.
Un résultat vide signifie « absent de la sélection ou des filtres », pas « absent du jeu ».

Les neuf méthodes sont prises en charge : marchand, boss, ennemi, exploration, dialogue,
quête, échange de souvenir, énigme et autre (notamment équipement initial).
La région et la méthode d’un filtre doivent correspondre à **la même acquisition**.
La recherche accepte les noms français, les noms anglais, les intervenants et les lieux.

La garantie est distincte de la méthode. Le butin d’un ennemi peut être garanti ;
un butin aléatoire conserve son taux documenté et ses conditions de lecture.
Les deux taux chiffrés de cette sélection proviennent d’Eldenpedia ; ils ne sont pas
calculés à partir d’essais et ne garantissent aucun nombre de tentatives.
L’affichage d’un taux inconnu est également implémenté et testé : il ne devient jamais 0 %.
La version exacte du jeu n’a pas été contrôlée.

## Collection et améliorations

**Objets du personnage** : la coche signifie « déjà obtenu », même si l’objet a été vendu,
utilisé ou échangé. Elle reste commune aux cycles ; aucune quantité n’est gérée.
Les améliorations importantes sont exclues de cette liste, de ses filtres de catégorie et de ses compteurs.

**Améliorations du cycle** : 6 sources de graines dorées, 4 larmes de vie, 2 pierres de mémoire
et 1 larme de cristal pourpre sont suivies par acquisition et par cycle. Ces nombres
concernent cette sélection seulement. Les autres emplacements restent à publier. Chaque type
est présenté une seule fois, suivi d’une liste compacte de ses emplacements cochables.
Cliquer sur un emplacement ouvre la fiche complète ; sa case modifie uniquement sa progression.

Un nouvel emplacement doit correspondre à une acquisition garantie d’un objet de catégorie
`upgrade`. Une acquisition ne peut pas créer plusieurs coches d’emplacement.
Si plusieurs itinéraires futurs donnent accès à la même récompense unique, les regrouper
sur une seule coche ; ne pas les compter comme deux ramassages indépendants.

Les améliorations n’ont plus de coche « déjà obtenu » dans leur fiche. Les éventuelles
anciennes coches de collection restent conservées dans les sauvegardes et exports, sans
être affichées ni comptées ; elles ne sont pas converties en ramassages.
Obtenir une arme ne coche aucun boss, ne termine aucune quête et ne consomme pas la coche
du souvenir requis. Les liens vers les objets et parcours servent à consulter les fiches.

Le format des sauvegardes reste en version 1 : les rubriques `collection` et `pickups`
existaient déjà. Les exports/imports les conservent, y compris les identifiants inconnus
d’un catalogue futur. Aucune migration ni réinitialisation n’est nécessaire.

## Provenance et organisation

Les descriptions sont des synthèses françaises rédigées à partir des références propres
aux acquisitions, principalement Eldenpedia. Elles sont livrées avec l’application ;
aucune API communautaire n’est nécessaire pendant l’utilisation. ERDB n’a pas été importé
pour cette première sélection. Les noms anglais sont conservés comme alias de recherche.

- `src/domain/items.ts` : schémas, taux et validation des références.
- `src/catalog/items/gear.ts`, `magic.ts`, `tools.ts`, `upgrades.ts` : fiches et acquisitions.
- `pickups.ts` : emplacements suivis par cycle ; `scope.ts` : inventaire de publication.
- `references.ts` : intervenants et grâces nécessaires aux acquisitions.
- `query.ts` : filtres et contrôle de couverture ; `index.ts` : catalogue agrégé.
- `ItemsScreen` et `ItemScreen` : présentation ; les écritures passent par le service existant.

Les identifiants de rencontres et de grâces sont des références documentaires.
Ils ne constituent pas les listes complètes prévues au lot 5. Réutiliser ces identifiants
lorsque les fiches de ces catalogues seront ajoutées.

`verifiedAt` indique la date de revue documentaire, sans validation en jeu.
Les références et dates sont consultables dans les fiches d’obtention.

## Validation et suite

Les tests métier couvrent le schéma, les doublons, références, prix, souvenirs requis,
taux invalides/inconnus, catégories, filtres corrélés, indépendance des rubriques,
coches rapides, erreurs de stockage, NG+, export/import et compatibilité des anciennes données.

Les parcours navigateur vérifient les fiches et filtres, les liens, la persistance,
les personnages, le NG+, l’export/import réel, les formats 390 × 844 et 360 × 800,
le défilement et les trois onglets avec des libellés agrandis.
Les essais Android/iOS et Firefox sur téléphone restent à effectuer.

La suite du contenu doit compléter les sélections régionales puis publier les autres régions,
avec leurs sources et emplacements. Garder l’état « partiel » tant que l’inventaire complet
n’est pas établi et contrôlé. La consolidation entre objets, quêtes, boss et grâces reste
prévue au lot 6.
