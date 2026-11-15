# Talismans, incantations et cendres du jeu de base

Publication `2026.11.15.4`, revue du 15 novembre 2026. Cet enrichissement poursuit
la [complétion des armes, boucliers, armures et sorcelleries](ITEM_COMPLETION.md).

| Catégorie | Types publiés | Types ajoutés |
| --- | ---: | ---: |
| Talismans permanents, variantes comprises | 114 | 105 |
| Incantations | 101 | 95 |
| Cendres de guerre | 91 | 78 |
| Cendres d’invocation | 64 | 58 |
| **Total** | **370** | **336** |

Chaque type possède une fiche française, un nom anglais de recherche et au moins
une obtention sourcée. Les versions +1 et +2 des talismans sont distinctes ; les
niveaux des invocations et les affinités des armes ne créent pas de types.
La Brindille sacrificielle, consommable, est exclue. Le DLC et les ajouts de
versions ultérieures sont exclus de cet inventaire du jeu de base d’origine.

Onze objets de progression complètent les prérequis : huit bréviaires ou grimoires,
le Souvenir du dragon-liche, la Lumière stellaire ambrée et les Entrailles d’Alexander.
Le catalogue atteint **1 418 types, 1 414 objets de collection, 1 454 acquisitions,
27 ramassages d’amélioration, 134 boss et 40 grâces**. Les 41 nouvelles rencontres
servent aux récompenses ajoutées ; la liste des boss et des grâces reste partielle.
Les huit catégories d’équipement et de magie chiffrées atteignent **1 376/1 376 types**.
Les outils, objets de progression, améliorations et obtentions alternatives restent
partiels : ce sous-total ne mesure pas la totalité des objets du jeu.

## Provenance et adaptation

Les inventaires viennent des feuilles d’[Elden Ring Completion Sheets](https://github.com/rdmaw/elden-ring-completion-sheets/tree/151490b721e05fc7138aee9264c2e171fca10c0f/sheets),
figées à une révision précise, puis rapprochées des [textes français extraits du jeu](https://github.com/elden-ring-data/msg/blob/4bbba478e478e9018d0293e0b18cd8cf706199e9/frafr/item.msgbnd.dcx.json).
Le rapprochement respecte les tables : `AccessoryName.fmg` pour les talismans,
`GoodsName.fmg` pour les incantations, invocations et prérequis, `GemName.fmg` pour
les cendres de guerre. Un même nom anglais peut désigner un sort et une compétence :
« Serment doré » conserve deux identifiants et deux coches indépendantes. Les noms
anglais des cendres utilisent le préfixe `Ash of War:` pour éviter ces collisions.

Les obtentions sont recoupées avec les listes [Roundtable des talismans](https://roundtablehold.net/checklists/talismans.html),
[incantations](https://roundtablehold.net/checklists/incantations.html),
[cendres de guerre](https://roundtablehold.net/checklists/ashesof_war.html),
[invocations](https://roundtablehold.net/checklists/spirit_ashes.html) et
[grimoires](https://roundtablehold.net/checklists/scrollsand_prayerbooks.html),
ainsi qu’avec [Tarnished](https://tarnished.app/spells),
[PowerPyx](https://www.powerpyx.com/elden-ring-all-incantation-locations/) et les
références précises portées par chaque acquisition. Le détail des recoupements
figure dans [les notes des talismans](TALISMAN_SOURCE_NOTES.md) et
[les notes des cendres](ASH_SOURCE_NOTES.md).

Les données sont embarquées dans le catalogue : aucune API externe n’est appelée
par l’application. L’API FanAPI n’est pas utilisée comme preuve d’exhaustivité ou
de séparation du DLC. La transformation produit des identifiants stables, une région,
une méthode, des conditions, une garantie et des références documentaires.

## Conditions conservées

- Les deux issues de Millicent, les récompenses d’Alexander et les limites du
  parcours de Seluvis restent explicites. La Lumière stellaire ambrée et les
  Entrailles d’Alexander ont leurs propres fiches liées.
- Le Talisman de la graine pourpre se ramasse derrière un sceau de la tombe du
  héros sanctifié ; il n’est pas une récompense de son boss.
- Danse des lames vient d’un scarabée en Liurnia. Les cendres de mercenaire de
  Kaiden viennent des catacombes au pied des falaises, en Liurnia.
- Les marionnettes précisent le destinataire de la potion, les prix en éclats de
  lumière stellaire et la limite de la mort de Seluvis. Dolores peut être achetée
  avant cette limite dans la branche où Nepheli reçoit la potion.
- Les incantations enseignées après remise d’un livre pointent vers ce livre.
  Fortissax pointe vers son souvenir ; sa victoire reste distincte de l’échange.
  La communion draconique utilise la méthode « autre » et un prix en cœurs,
  sans créer de faux marchand ni d’échange de souvenir.

Aucun taux de butin n’est inventé. Les coches restent manuelles : posséder une
récompense ne coche ni boss ni quête. Les objets appartiennent au personnage et
restent obtenus en NG+ ; les rencontres appartiennent au cycle.

## Compatibilité et vérification

La comparaison avec le catalogue précédent confirme que ses 1 071 fiches d’objet,
ses 93 boss et toutes ses anciennes références sont inchangés. Les nouvelles routes
n’écrasent pas les définitions déjà publiées. Les anciennes fixtures restent intactes ;
`tests/fixtures/secondary-item-completion-ids.json` protège les 347 nouveaux objets,
leurs acquisitions et les 41 nouvelles rencontres.

L’audit local contrôle les références, l’inventaire publié, les identifiants et les
conditions structurelles. Les tests métier couvrent notamment les quatre inventaires,
les homonymes, les prérequis, les branches, l’indépendance des coches, le NG+ et
l’import en copie. Le parcours navigateur dédié contrôle les quatre catégories,
leurs liens et les formats 390 × 844 et 360 × 800. Ces contrôles web ne valident pas
Android ou iOS sur appareil.

Le contrôle HTTP des **27 nouvelles URL** a trouvé **23 pages accessibles, aucune
absence confirmée et quatre accès non vérifiés** : une erreur 500 pour la page
d’Alexander et trois refus 403 de Neoseeker. Leur contenu a été recoupé lors de la
revue documentaire ; un accès HTTP réussi ne constitue pas à lui seul une validation
du contenu. Les dates de revue ne sont pas changées automatiquement par ce contrôle.
Le [rapport consolidé](CATALOG_AUDIT.md) décrit l’état courant du catalogue.

Contrôles de livraison : **64 tests métier réussis**, ESLint sans avertissement,
TypeScript strict, export web et audit local sans erreur. Les sept parcours navigateur
(parties, quêtes, collection, exploration, première complétion, complétion secondaire,
sauvegardes) passent dans Edge aux deux formats mobiles, sans erreur navigateur ni
débordement horizontal. Les captures des quatre catégories ont été relues. Aucun essai
en jeu ni sur appareil Android/iOS n’a été effectué.
