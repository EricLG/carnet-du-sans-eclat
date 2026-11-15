# Couverture de l’exploration — catalogue partiel du lot 5

Catalogue `2026.11.15.1`, vérification documentaire du 15 novembre 2026.

## Publication

Le lot 5 fournit les fonctions de suivi dans le navigateur : **32 rencontres de boss**
et **40 sites de grâce** du jeu de base. Ce sont des sélections régionales, sans prétention
d’exhaustivité d’une région ou du jeu. Aucun pourcentage global n’est annoncé.

| Région | Rencontres publiées | Sites de grâce publiés |
| --- | ---: | ---: |
| Nécrolimbe, dont Valorage et Voilorage | 18 | 23 |
| Péninsule larmoyante | 10 | 11 |
| Liurnia | 3 | 4 |
| Mont Gelmir | 1 | 1 |
| Table ronde | 0 | 1 |
| Autres régions et DLC | 0 | 0 |
| **Total** | **32** | **40** |

L’inventaire indépendant `src/catalog/world/scope.ts` liste les identifiants attendus.
Les tests contrôlent les fiches manquantes, les ajouts hors inventaire et les doublons.
Une recherche vide signifie « absent de la sélection ou des filtres », et non « absent du jeu ».

## Rencontres retenues

- Nécrolimbe : Sentinelle de l’Arbre, Agheel, Homme-bête de la grotte du bosquet,
  Chat de garde des catacombes orageuses, Chefs semi-humains de la grotte littorale,
  Troll fouisseur, Darriwil, Tête de citrouille des ruines du relais, Duelliste des eaux
  noires, Assassin des catacombes funestes, Chevalier du Creuset de la geôle de Valorage,
  Cavalier crépusculaire, Rapace funeste, Chasseur de perles de la cabane du maître
  de guerre, Nocher du village des eaux nécromantes, Esprit d’arbre de la tombe des
  héros des confins, Margit et Godrick.
- Péninsule : Chimère léonine, Chat de garde des catacombes de l’Empaleur, Ours runique
  des cavernes insondables, Chimère écailleuse, Ombre du cimetière du Val-aux-Tombes,
  Miranda, Cavalier crépusculaire, Rapace funeste, Avatar de l’Arbre-Monde et Ancien
  héros de Zamor de la geôle des lamentations.
- Liurnia : Loup cramoisi de Radagon de Raya Lucaria, Loretta du manoir de Caria
  et Seigneur d’albâtre de la geôle de la tombe royale.
- Mont Gelmir : Maggie près du village des ermites.

Une fiche correspond à **une rencontre non réapparaissante**, avec le lieu dans son nom
et un identifiant stable. Les deux Chefs semi-humains forment une seule rencontre.
Les deux Chats de garde, les Cavaliers crépusculaires et les Rapaces funestes gardent
des fiches et des coches distinctes selon leur lieu. Les conditions nocturnes et les
clés nécessaires aux geôles ou au donjon sont décrites dans les fiches.

Les invasions, les PNJ hostiles ordinaires et les ennemis uniques sans rencontre de boss
ne sont pas inclus. Moongrum, Miriam, la reine semi-humaine des ruines sylvestres et
l’esprit d’arbre des sous-sols de Voilorage conservent leurs références d’ennemis dans
les acquisitions. Ils ne sont pas transformés en boss. Le catalogue omet aussi des
rencontres du début du jeu : cette sélection ne constitue pas leur inventaire complet.

## Sites de grâce et liens

Les **20 références de grâces** et **16 références de boss** déjà utilisées par les objets
sont toutes reprises, avec leurs identifiants et leurs noms. Les 154 fiches d’objets,
190 acquisitions et 27 ramassages n’ont pas été modifiés.

Chaque grâce a un lieu, un accès, un alias anglais et des références. Les grâces d’arène
de Margit, Godrick, la Tête de citrouille, la Chimère léonine et du Loup cramoisi précisent
la victoire nécessaire à leur apparition. Une grâce associée à un boss peut être un
point de repère avant le combat ou une grâce de l’arène après la victoire.

Les liens sont consultables dans les deux sens :

- boss → grâces, objets déjà publiés et parcours PNJ associés ;
- grâce → rencontres associées, objets dont une acquisition utilise ce repère et parcours ;
- objet → rencontre donnant la récompense et grâce de référence ;
- quête → boss et grâces documentés pour ce parcours.

Les objets sont reliés à partir de la **même acquisition**, sans déduire de récompense
supplémentaire. Par exemple, Godrick mène au Souvenir du Greffé ; la Hache de Godrick
reste un échange de souvenir auprès d’Enia. Ces liens et récompenses restent partiels.

## Progression et interface

L’onglet **Exploration** propose les vues **Boss** et **Sites de grâce**, regroupées par
région, avec recherche française/anglaise/par lieu et filtres de région et de progression.
Les compteurs portent uniquement sur les entrées publiées, sans compter les coches
d’identifiants inconnus conservées dans les sauvegardes.

**Vaincu** et **Activée** sont des coches manuelles, réversibles, propres au personnage
et au cycle sélectionnés. Elles sont accessibles dans les listes et dans les fiches.
Cocher un boss ne coche ni sa grâce, ni ses objets, ni une étape de quête. Cocher une
grâce ne modifie pas le boss, même si le jeu exige cette victoire pour l’activer.
Les conditions d’accès sont informatives ; l’application ne bloque pas la saisie.

Un nouveau cycle vide les boss et les grâces, tout en conservant les anciens cycles et
la collection du personnage. Le format de sauvegarde reste en version 1 : ses rubriques
`bosses` et `graces` existaient déjà. Les imports créent des copies après aperçu et
conservent les coches inconnues. Aucune migration, conversion ou réinitialisation.

## Sources et organisation

Les textes sont des synthèses françaises, avec alias anglais et dates de consultation.
Les données sont livrées localement ; aucune API n’est requise pendant l’utilisation.

- [SuperSoluce — guide des boss](https://www.supersoluce.com/soluce/elden-ring/soluce-elden-ring) :
  fiches individuelles des rencontres, zones et conditions d’accès.
- [PowerPyx — sites de grâce](https://www.powerpyx.com/elden-ring-all-sites-of-grace-locations/) :
  inventaire des sites et noms anglais ; les emplacements nommés qui ne sont pas des
  grâces ne deviennent pas des entrées.
- Guides régionaux de [Voilorage](https://www.supersoluce.com/soluce/elden-ring/chateau-de-voilorage-partie-1),
  [Vent-Hurlant](https://www.supersoluce.com/soluce/elden-ring/chateau-de-vent-hurlant),
  [Liurnia](https://www.supersoluce.com/soluce/elden-ring/liurnia-contree-lacustre)
  et du [village des ermites](https://www.supersoluce.com/soluce/elden-ring/village-des-ermites).
- Références individuelles supplémentaires dans les fiches : Eldenpedia, Jeuxvideo.com
  et JVFrance. La version exacte du jeu n’a pas été contrôlée ; aucun essai en jeu revendiqué.

`src/domain/world.ts` définit les schémas et la validation des références.
`src/catalog/world/` contient les deux catalogues, le manifeste et les requêtes.
`WorldScreen` et `WorldEntryScreen` utilisent le service de progression existant.
Les références du catalogue d’objets restent contrôlées pour éviter toute divergence.

## Contrôles et suite

Les tests métier vérifient schémas, doublons, références, périmètre de publication,
homonymes, filtres, compteurs, liens d’acquisition, indépendance des rubriques,
coches rapides, NG+, import/export en copie et erreurs d’écriture.
Les parcours navigateur vérifient les nouveaux liens, les coches, le rechargement,
les personnages et cycles, le défilement et les formats 390 × 844 et 360 × 800.

Contrôles exécutés le 15 novembre 2026 : ESLint sans avertissement, TypeScript,
43 tests métier, export web et parcours navigateur complets réussis. Les quatre onglets
restent lisibles avec des libellés agrandis ; aucun débordement horizontal ni erreur
navigateur observé aux deux formats mobiles. La comparaison à l’instantané avant lot 5
confirme la préservation du catalogue d’objets et de ses références.

Les prochains ensembles doivent enrichir les régions puis la couverture du jeu de base.
La consolidation du lot 6, le DLC du lot 8 et la validation sur appareils Android/iOS
restent à réaliser.
