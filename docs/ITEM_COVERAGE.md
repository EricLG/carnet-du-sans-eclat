# Couverture des objets — catalogue partiel du lot 4

Catalogue `2026.11.15.2`, revues documentaires des 14 et 15 novembre 2026.

## État de publication

Les fonctions de collection et d’obtention sont disponibles dans le navigateur.
Le contenu reste **partiel** : **154 types d’objets, 190 sources et 27 emplacements
d’amélioration** : 150 objets sont affichés dans la collection du personnage et 4 types
d’améliorations sont réservés au suivi par cycle. Aucun de ces nombres ne désigne la totalité du jeu ni d’une région.

L’inventaire de publication `src/catalog/items/scope.ts` conserve les identifiants attendus.
Les contrôles détectent une fiche ou un emplacement manquant, ajouté hors inventaire ou dupliqué.
Il ne s’agit pas encore d’un inventaire exhaustif des objets à produire.

| Catégorie | Types publiés | Total connu — jeu de base | Couverture |
| --- | ---: | ---: | ---: |
| Armes | 46 | 308 | 14,94 % |
| Boucliers | 15 | 69 | 21,74 % |
| Pièces d’armure | 24 | 559 | 4,29 % |
| Talismans | 9 | 114 | 7,89 % |
| Sorcelleries | 19 | 70 | 27,14 % |
| Incantations | 6 | 101 | 5,94 % |
| Cendres de guerre | 13 | 91 | 14,29 % |
| Cendres d’invocation | 6 | 64 | 9,38 % |
| Outils permanents | 8 | À recenser | — |
| Objets de progression | 4 | À recenser | — |
| Améliorations importantes | 4 | À recenser | — |
| **Sous-total des catégories chiffrées** | **138** | **1 376** | **10,03 %** |
| **Total du catalogue publié** | **154** | **À établir** | **—** |

Les totaux portent sur les **types du jeu de base d’origine**, hors DLC et ajouts de versions
ultérieures. La couverture est calculée par `types publiés / total connu × 100`, arrondie à
deux décimales. Elle mesure la présence de fiches, pas l’exhaustivité des acquisitions ou des
emplacements.

Les armes comprennent les bâtons, sceaux, arcs et torches ; les boucliers sont comptés
séparément. Les niveaux d’amélioration et affinités d’une même arme ne créent pas de types
supplémentaires. Les pièces d’armure retouchées et les variantes nommées de talismans
(+1, +2…) sont des types distincts.

**Sources des totaux, consultées le 15 novembre 2026 :**

- [Roundtable Hold — armes et boucliers](https://roundtablehold.net/checklists/weapons.html) :
  décompte des entrées du jeu de base, soit 377 types répartis entre 308 armes et 69 boucliers.
- [Lore Armory — décompte par contenu](https://lorearmory.com/eldenring/) :
  559 pièces d’armure, 115 talismans, 91 cendres de guerre et 64 cendres d’invocation dans le
  jeu de base. Le total retenu ici est **114 talismans** après exclusion de la
  [brindille sacrificielle, consommable](https://eldenring.wiki.gg/wiki/Sacrificial_Twig),
  conformément au périmètre du carnet.
- [Elden Ring Cheat Sheet — listes des sorts](https://barcodebunny.github.io/elden-ring-cheat-sheet/) :
  70 sorcelleries et 101 incantations.

**À recenser** : les catégories « outils permanents », « objets de progression » et
« améliorations importantes » sont propres au périmètre du carnet. Leur liste complète
n’est pas encore établie ; les inventaires génériques mélangent notamment outils,
consommables, objets de quête et matériaux. Aucun dénominateur ni pourcentage n’est avancé
pour ces trois lignes. Le sous-total chiffré les exclut ; le pourcentage global du catalogue
reste donc à établir.


Chaque pièce d’armure a sa propre fiche, sa place (tête, torse, mains ou jambes) et sa coche.
Le souvenir du Greffé est un objet de progression, même s’il peut être consommé ou échangé.
La torche est classée comme arme. La fiole réutilisable et la lanterne sont des outils.
Les consommables ordinaires, munitions, matériaux de fabrication et pierres/muguets
ordinaires d’amélioration ne sont pas publiés.

## Régions et acquisitions

| Région | Sources publiées | État |
| --- | ---: | --- |
| Nécrolimbe, dont Voilorage | 83 | Sélection partielle |
| Péninsule larmoyante | 28 | Sélection partielle |
| Table ronde | 27 | Boutiques, rattrapages, récompenses et échanges sélectionnés |
| Liurnia | 41 | Boutiques, trois tenues, équipement, sorcelleries et améliorations sélectionnés |
| Caelid | 5 | Bâton météorique, Fronde, Perce-roche, une larme de vie et une pierre de mémoire |
| Plateau Altus | 2 | Deux larmes de vie |
| Cimes des Géants | 2 | Deux larmes de vie |
| Mont Gelmir | 1 | Pierre de mémoire de Maggie |
| Leyndell | 1 | Talisman de la rosée bénie, au pont divin |
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

**Améliorations du cycle** : 6 sources de graines dorées, les 12 larmes de vie et les 8 pierres de mémoire
du jeu de base, ainsi que 1 larme de cristal pourpre, sont suivies par acquisition et par cycle.
Les graines dorées et les larmes de cristal restent partielles. Chaque type
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
pour ces sélections. Les noms anglais sont conservés comme alias de recherche.

- `src/domain/items.ts` : schémas, taux et validation des références.
- `src/catalog/items/gear.ts`, `magic.ts`, `tools.ts`, `upgrades.ts` : premières fiches et améliorations.
- `merchants.ts`, `teachings.ts`, `early-rewards.ts` : boutiques, enseignements et récompenses ajoutés le 15 novembre.
- `exploration-equipment.ts`, `liurnia-armor.ts`, `regional-sorceries.ts` : nouvel équipement et sorcelleries du jeu de base.
- `pickups.ts` : emplacements suivis par cycle ; `scope.ts` : inventaire de publication.
- `references.ts` : intervenants et grâces nécessaires aux acquisitions.
- `query.ts` : filtres et contrôle de couverture ; `index.ts` : catalogue agrégé.
- `ItemsScreen` et `ItemScreen` : présentation ; les écritures passent par le service existant.

Les identifiants de rencontres et de grâces sont des références documentaires.
Ils ne constituent pas les listes complètes prévues au lot 5. Réutiliser ces identifiants
lorsque les fiches de ces catalogues seront ajoutées.

`verifiedAt` indique la date de revue documentaire, sans validation en jeu.
Les références et dates sont consultables dans les fiches d’obtention.

## Enrichissement du 15 novembre 2026 — boutiques et améliorations

Ajout de **61 types d’objets**, de **77 acquisitions** et de **14 emplacements d’amélioration**.
Les 45 types, 63 acquisitions et 13 emplacements précédents gardent leurs identifiants :
aucune migration de sauvegarde n’est nécessaire.

- Équipement des marchands nomades de Nécrolimbe et de la Péninsule, et des Servantes jumelles.
- Sorcelleries de Sellen, incantations de Corhyn et dix cendres de guerre de Bernahl.
- Trancheuse de Caria avec ses trois enseignants possibles et le parchemin requis.
- Cinq talismans, trois invocations, le nécessaire de couture et la rune majeure de Godrick.
- Huit nouvelles larmes de vie et six pierres de mémoire : toutes les récompenses de ces
  deux types du jeu de base sont désormais répertoriées, une fois par emplacement.

Les acquisitions restent des itinéraires documentés sélectionnés : les équipements initiaux,
les boutiques après remise de perles cinéraires et les autres alternatives ne sont pas tous
décrits. Les trois enseignants de la Trancheuse de Caria sont des alternatives : remettre
le parchemin à l’un d’eux ne le remet pas automatiquement aux autres.
Les fiches indiquent notamment la rencontre préalable de Nepheli nécessaire au Charme
d’arsenal et la différence entre l’obtention et la restauration de la rune de Godrick.

Principales références de ce lot, consultées le 15 novembre 2026 :

- [Eldenpedia — inventaires liés aux perles cinéraires](https://eldenring.wiki.gg/wiki/Bell_Bearing)
  et [marchand de la Péninsule](https://eldenring.wiki.gg/wiki/Nomadic_Merchant_%28Weeping_Peninsula%29).
- [Neoseeker — boutique des Servantes jumelles](https://www.neoseeker.com/elden-ring/NPCs/Twin_Maiden_Husks).
- [Eldenpedia — Sellen](https://eldenring.wiki.gg/wiki/Sorceress_Sellen),
  [Corhyn](https://eldenring.wiki.gg/wiki/Scribe_Corhyn) et
  [Bernahl](https://eldenring.wiki.gg/wiki/Bernahl).
- [Eldenpedia — Larmes de vie](https://eldenring.wiki.gg/wiki/Sacred_Tear)
  et [Pierres de mémoire](https://eldenring.wiki.gg/wiki/Memory_Stone).
- Les acquisitions d’exploration et récompenses conservent leurs références individuelles
  dans chaque fiche ; les descriptions ne sont pas une copie des guides.

## Enrichissement du 15 novembre 2026 — équipement et sorcelleries

Ajout de **48 types d’objets** et de **50 acquisitions** : **18 armes**, **11 pièces
d’armure**, **7 boucliers** et **12 sorcelleries**, tous du jeu de base d’origine.
Le catalogue passe de 106 à 154 types, et de 140 à 190 acquisitions. Les 106 fiches
précédentes et les 27 emplacements conservent leurs identifiants et leurs données.

- Armes d’exploration et récompenses en Nécrolimbe, à Voilorage et dans la Péninsule :
  Grande rapière, Grande hache, Lance de cavalerie, Morgenstern, Ancre rouillée,
  Espadon fusionné, Fouet, Griffes, Hache des montagnes et Miséricorde.
- Équipement de Liurnia : Épée de la nuit ardente, Épée de chevalier de Caria,
  Hachette auréolée de glace, Épée de cristal, Estoc, Bâton d’astrologue et Rempart.
- Tenues d’astrologue (4 pièces), de chevalier de Caria (4) et de sage (3).
  Les pièces restent cochables séparément, même lorsqu’elles se ramassent ensemble.
  Les variantes retouchées ne sont pas publiées dans cette sélection.
- Écu bestial, Grande carapace, Bouclier de culpabilité, Bouclier en bois aquilin,
  Bouclier de chevalier de Caria et Bouclier de la méduse.
- Sorcelleries de Miriel et de Thops, Phalange de laméclats chez les trois enseignants
  possibles du parchemin royal, Empaleuse de Caria, Grand arc de Loretta, Météorite,
  Déluge magique, Volée de cristal et Éclat pernicieux.
- Bâton météorique et Fronde aux ruines de la rue des sages ; Perce-roche dans la
  galerie cristalline de Sellia ; Bâton de la reine semi-humaine dans la Péninsule.

La reine semi-humaine des ruines sylvestres, Moongrum et Miriam sont référencés comme
ennemis, avec un butin garanti, distincts des rencontres de boss. Le scarabée d’Empaleuse
de Caria est également garanti. Aucun nouveau taux aléatoire n’est inventé.
Déluge magique concerne la salle d’étude non inversée ; le don de 10 runes ouvrant la
boutique de Thops est séparé du prix de Lumière stellaire. La remise du parchemin à
un enseignant ne débloque pas automatiquement les boutiques des deux autres.

Principales références de ce lot, consultées le 15 novembre 2026 :

- [SuperSoluce — Voilorage](https://www.supersoluce.com/soluce/elden-ring/chateau-de-voilorage-partie-2),
  [Vent-Hurlant](https://www.supersoluce.com/soluce/elden-ring/chateau-de-vent-hurlant),
  [manoir de Caria](https://www.supersoluce.com/soluce/elden-ring/manoir-de-caria)
  et fiches des familles d’armes et de boucliers.
- [GAMEWAVE — tenue d’astrologue et prix](https://gamewave.fr/elden-ring/elden-ring-ou-trouver-le-set-d-armure-de-la-classe-astrologue/),
  [Jeuxvideo.com — pièces d’armure](https://www.jeuxvideo.com/wikis-soluce-astuces/1540622/localisation-des-armures-uniques-legendaires-pnj-boss.htm)
  et [SuperSoluce — grotte aux eaux stagnantes](https://www.supersoluce.com/soluce/elden-ring/grotte-aux-eaux-stagnantes).
- [Eldenpedia — Phalange de laméclats](https://eldenring.wiki.gg/wiki/Glintblade_Phalanx),
  [PowerPyx — prix et emplacements des sorcelleries](https://www.powerpyx.com/elden-ring-all-spell-locations/)
  et guides régionaux associés aux acquisitions.
- [ActuGaming — Bâton météorique](https://www.actugaming.net/baton-meteorique-elden-ring-489143/).

L’API FanAPI a été évaluée pour le recensement ; ses données brutes n’ont pas été
importées dans ce lot. Les fiches sont des synthèses documentaires françaises et
conservent les alias anglais. Les autres acquisitions possibles, les catalogues complets
des quatre catégories et le DLC restent à produire. Aucune API n’est appelée à l’usage.

Contrôles de ce lot : ESLint sans avertissement, TypeScript, export web et 35 tests métier
réussis. La comparaison à un instantané confirme la préservation des 106 anciennes fiches
et des 27 ramassages. Le parcours navigateur de collection et quatre nouvelles fiches
(une par catégorie) ont été contrôlés dans Edge à 390 × 844 et 360 × 800, sans débordement
horizontal ni erreur navigateur. La vérification reste documentaire, sans essai en jeu
ni validation sur appareil Android/iOS.

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
