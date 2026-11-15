# Complétion de l’équipement et des sorcelleries

Publication `2026.11.15.3`, revue documentaire du 15 novembre 2026.
Le périmètre demandé est celui des **armes, armures, boucliers et sorcelleries du jeu de base
d’origine**, sans Shadow of the Erdtree ni ajouts de versions ultérieures.

Ce document décrit la première complétion de quatre catégories. La publication
[`2026.11.15.4`](SECONDARY_ITEM_COMPLETION.md) complète ensuite les 114 talismans,
101 incantations, 91 cendres de guerre et 64 cendres d’invocation. Les huit catégories
représentent désormais **1 376 types sur 1 376 recensés**. Le catalogue actuel contient
**1 418 types**, **1 414 objets de collection**, **1 454 acquisitions** et conserve les
**27 ramassages** ; les outils, objets de progression, améliorations et obtentions alternatives
restent partiels. Les chiffres de livraison ci-dessous restent ceux de `2026.11.15.3`.

| Catégorie | Types présents | Types recensés | Couverture des types |
| --- | ---: | ---: | ---: |
| Armes, dont arcs, bâtons, sceaux et torches | 308 | 308 | 100 % |
| Boucliers | 69 | 69 | 100 % |
| Pièces d’armure, dont variantes retouchées | 559 | 559 | 100 % |
| Sorcelleries | 70 | 70 | 100 % |
| **Périmètre demandé** | **1 006** | **1 006** | **100 %** |

Chaque type a un nom français, un alias anglais, une catégorie, des références et au moins
une obtention. Les armures ont leur emplacement tête/torse/mains/jambes et une coche par
pièce. Les niveaux d’amélioration et affinités ne créent pas d’objets supplémentaires :
la rapière de Rogier reçue en +8 reste un seul type.

## Évolution du catalogue

Ajout de **902 fiches** dans les quatre catégories : 262 armes, 54 boucliers, 535 pièces
d’armure et 51 sorcelleries. Les échanges et enseignements nécessitent aussi **15 objets
de progression** : 13 souvenirs et les parchemins de l’Académie et du Conspectus.

Le catalogue passe donc de **154 à 1 071 types**, de **190 à 1 107 acquisitions** et conserve
ses **27 ramassages**. La collection du personnage contient 1 067 objets ; les quatre types
d’amélioration restent uniquement dans le suivi du cycle. Les anciennes 154 fiches, leurs
acquisitions et les ramassages sont inchangés, comme les quêtes, PNJ et grâces précédents.
Aucun identifiant existant n’est renommé et le format de sauvegarde reste en version 1.

Les récompenses demandent **61 rencontres supplémentaires** dans Exploration, soit
**93 boss** au total. Les rencontres de la première sélection sont conservées et les grâces
restent au nombre de **40**. Ces listes restent partielles : les nouvelles rencontres
servent à consulter les obtentions, sans revendiquer tous les boss ou toutes les grâces.
Une victoire ne coche jamais une récompense, un souvenir, une grâce ou une quête.

## Sources et adaptation

- [Elden Ring Completion Sheets — armes et boucliers](https://eldenring.redmaw.dev/sheets/weapons),
  [armures](https://eldenring.redmaw.dev/sheets/armor) et [sorts](https://eldenring.redmaw.dev/sheets/spells) :
  inventaire des types, avec exclusion des balises SOTE et Tarnished Pack. Révision figée
  `151490b721e05fc7138aee9264c2e171fca10c0f` du dépôt `rdmaw/elden-ring-completion-sheets`.
- [Elden Ring Data — textes français](https://github.com/elden-ring-data/msg/blob/4bbba478e478e9018d0293e0b18cd8cf706199e9/frafr/item.msgbnd.dcx.json) :
  rapprochement des noms anglais et français par identifiant de texte, à la révision
  `4bbba478e478e9018d0293e0b18cd8cf706199e9`. Seuls les noms nécessaires sont retenus ;
  les longs textes narratifs et descriptions du jeu ne sont pas importés.
- [Roundtable — armes](https://roundtablehold.net/checklists/weapons.html),
  [sorcelleries](https://roundtablehold.net/checklists/sorceries.html) et
  [souvenirs](https://roundtablehold.net/checklists/remembrances_mausoleums.html) : lieux,
  sources et conditions. Les données ont été comparées à la révision
  `94e3d6db37b51db0b68665dda45b8f3d88d6c52b` du dépôt RoundtableHold.
- [Tarnished — armures](https://tarnished.app/armour) et [armes/boucliers](https://tarnished.app/weapons) :
  pièces, intervenants et prix. Les prix numériques conservés sont ceux relevés dans les
  boutiques documentées. Aucun taux de butin n’est déduit de ces listes.
- [PowerPyx — sorcelleries](https://www.powerpyx.com/elden-ring-all-spell-locations/) :
  prix, parchemins et obtentions, recoupés avec les inventaires.
- [Eldenpedia — retouches](https://eldenring.wiki.gg/wiki/Alter_Garments),
  [tenue du coupable](https://eldenring.wiki.gg/wiki/Guilty_Set),
  [tenue de voyageur parfumeur](https://eldenring.wiki.gg/wiki/Perfumer%27s_Traveling_Set),
  [diablotins](https://eldenring.wiki.gg/wiki/Imp) et
  [Gamer Guides — équipement de Leyndell](https://www.gamerguides.com/elden-ring/guide/leyndell-royal-capital/equipment) :
  recoupements des exceptions et localisations.

Les textes d’obtention sont des synthèses françaises de faits documentés. Les ensembles
partagent leur description d’obtention, tout en conservant une fiche et une coche par pièce.
Le fichier `base-inventory.json` fige les identifiants publics et ceux des textes sources ;
il distingue les types obtenables des variantes d’affinité, niveaux et entrées hors périmètre.
Les fichiers `complete-*.ts` décrivent les obtentions ; `completion.ts` les adapte au schéma
du carnet sans remplacer les fiches précédentes. Les manifestes de publication sont actualisés.

Aucune API n’est appelée dans l’application. FanAPI et ERDB ne sont pas importés dans cette
publication. Les nouveaux contenus restent disponibles hors ligne avec le reste du carnet.

## Cas traités et limites

- Les variantes retouchées indiquent leur pièce d’origine. Les variantes de casque/cuirasse
  de chevalier banni et la cuirasse retouchée du prélat de feu sont des butins distincts,
  sans fausse conversion par couture. La cuirasse de champion bestial reçue sans cape
  peut au contraire être retouchée pour ajouter la cape.
- Les vêtements en tissu sont dans le coffre de Pat ; ils ne demandent pas de le tuer.
  La tenue de cuir propose une obtention mortelle distincte, avec sa conséquence indiquée.
- Les souvenirs ont leur boss d’origine et chaque échange sa récompense propre. Un souvenir
  ne valide pas automatiquement les deux choix ni la victoire sur le boss.
- Les parchemins sont reliés aux achats concernés. La fiche publiée peut retenir un seul
  enseignant documenté ; elle ne prétend pas recenser toutes les boutiques alternatives.
- Les objets de Leyndell inaccessibles après Maliketh, les contrats du manoir avant Rykard,
  les Masques blancs avant Mohg et les rencontres nocturnes conservent leurs conditions.
- Une obtention aléatoire sans taux recoupé reste « taux non renseigné ». Les deux anciens
  taux chiffrés sont conservés ; aucun nouveau pourcentage n’est inventé.

**100 % concerne ici les types des quatre premières catégories demandées**, pas tous les
itinéraires, marchands, équipements initiaux, rattrapages ni toutes les acquisitions possibles.
La publication `2026.11.15.4` porte cette couverture à huit catégories ; les outils, objets
de progression, améliorations et catalogues d’exploration restent partiels. Le DLC demeure exclu.

Les 15 nouvelles URL documentaires sont accessibles au contrôle HTTP du 15 novembre 2026,
après correction de l’URL des souvenirs. Cela ne revalide pas les 65 accès 403/429 de l’audit
précédent et ne constitue pas un test en jeu. La version exacte du jeu n’est pas revendiquée.

## Vérifications

Les tests contrôlent les totaux indépendants, l’identité des types publiés, les exclusions
DLC/affinités/niveaux, les emplacements d’armure, les retouches, prérequis, références,
recherche bilingue, taux inconnus et anciennes coches. Le parcours navigateur spécifique
ouvre une nouvelle fiche de chacune des quatre catégories, suit les liens de boss,
parchemin et souvenir, vérifie les variantes et le NG+ aux deux formats mobiles.

La référence `tests/fixtures/item-completion-ids.json` protège les 917 nouveaux identifiants
d’objets, leurs acquisitions et les 61 rencontres ajoutées. Elle complète la référence
historique du lot 6, qui reste inchangée.

Contrôles de livraison de `2026.11.15.3` : **58 tests métier réussis**, ESLint sans avertissement, TypeScript,
audit local sans erreur et export web réussis. Les six parcours navigateur (parties, quêtes,
collection, exploration, complétion et sauvegardes) passent dans Edge à **390 × 844** et
**360 × 800**, avec défilement, import/export, persistance et indépendance des coches.
Aucun débordement horizontal ni erreur navigateur n’a été observé. La comparaison avec
l’instantané antérieur confirme la préservation de toutes les fiches et références déjà publiées.

Le rapport actuel est régénéré par `npm run catalog:check -- --write-report` dans
[CATALOG_AUDIT.md](CATALOG_AUDIT.md). Les tests natifs Android/iOS et les essais en jeu restent
à effectuer.
