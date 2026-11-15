# Couverture des parcours PNJ — jeu de base

Catalogue `2026.11.14.2`, revue documentaire du 14 novembre 2026.

## Périmètre retenu

L’inventaire indépendant `src/catalog/questScope.ts` retient **40 parcours pour 45 personnages** :
**32 quêtes, 7 rencontres courtes et 1 parcours principal (Melina)**.
Les tests comparent cet inventaire aux fiches effectivement publiées : supprimer une fiche
ne réduit pas le nombre attendu.

L’inventaire part des 42 rubriques de [Roundtable Hold — NPC Questlines](https://roundtablehold.net/checklists/npc_questlines.html).
Irina et Edgar sont réunis, ainsi que D et son frère. Corhyn/Masque d’or, Millicent/Gowry
et Sellen/Jerren partagent chacun une fiche. Les parcours Blaidd, Iji et Seluvis restent
séparés de Ranni, avec des liens de consultation sans progression automatique.

Les rencontres courtes sont Albus, Ensha, Hewg, Iji, Miriel, Pidia et la Grande jarre.
Ce choix distingue les services et petits dénouements des longues quêtes.
Les boutiques ordinaires, répliques isolées, contenus supprimés et PNJ du DLC sont exclus.
L’histoire de Melina est un repère du récit principal, pas un guide de tous les boss ou de
toutes les fins. « 40/40 » désigne ce périmètre, pas l’exhaustivité du jeu.

## Répartition par région de départ

Une fiche apparaît une seule fois dans la liste. Son filtre régional couvre tous les lieux
qu’elle visite : Alexandre peut ainsi être trouvé avec Farum Azula tout en restant classé
dans son groupe de départ, Nécrolimbe.

| Départ | Parcours | Personnages |
| --- | ---: | --- |
| Nécrolimbe | 15 | Roderika, Boc le couturier, Kenneth Haight, Sellen / Jerren, Alexandre (Alexander), Blaidd, Yura, Pat (Patches), Varré le Blême, Nepheli Loux, Rogier, Bernahl, Gostoc, D, traqueur des non-morts / Le frère jumeau de D, Melina |
| Péninsule larmoyante | 1 | Irina / Edgar |
| Liurnia | 12 | Ranni, Rya / Zorayas, Malfrat (Boggart), Hyetta, Thops, Latenna, Jarre-enfant (Jar-Bairn), Seluvis, Albus, Iji, Miriel, Pidia |
| Table ronde | 7 | Diallos, Fia, Frère Corhyn / Masque d’or (Goldmask), Coprophage (Dung Eater), Gideon Ofnir, Ensha, Hewg |
| Caelid | 3 | Millicent / Gowry, Gurranq, Grande jarre |
| Mont Gelmir | 1 | Tanith |
| Cimes des Géants | 1 | Shabriri |

Les autres régions (Altus, Leyndell, régions souterraines, Champs enneigés, Arbre-Sacré,
Farum Azula) servent de lieux visités et de filtres. Elles n’ont pas de groupe vide à l’écran.

## Production et vérification

Les fiches sont des synthèses originales en français, écrites à partir des références
propres à chaque parcours : Eldenpedia, guides PC Gamer, eXputer et références
complémentaires indiquées dans les fiches. Roundtable sert d’inventaire de couverture.
Aucune API communautaire n’est nécessaire pendant l’utilisation.

La date `verifiedAt` signifie **revue documentaire**, pas validation en jeu.
Aucune version précise du jeu n’a été testée. Les cinq premières fiches ont été relues
et validées par l’utilisateur avant ce lot ; leurs identifiants de quêtes, d’étapes et de
branches sont conservés. Des régions et liens associés ont été ajoutés.

Les étapes décrivent un itinéraire conseillé, avec les embranchements utiles et les
grands points de blocage. Elles ne reproduisent pas chaque dialogue ni toutes les variantes
d’un itinéraire. Les rencontres précoces facultatives sont indiquées quand elles peuvent
être sautées. Les récompenses sont informatives, sans créer de coches de collection.

Points examinés en particulier : fin des contrats à la mort de Rykard, disparition de la
Leyndell royale après Maliketh, potion de Seluvis, conclusion de Nepheli, recrutement de
Latenna, fins alternatives de Millicent et purification de la Flamme exaltée.
Les conditions apparaissent dans les fiches concernées. Les liens ne déclenchent aucune
action sur une autre quête.

## Contrôles techniques

- Validation du schéma, identifiants uniques et références de régions/PNJ/branches.
- Présence exacte des 40 entrées attendues, classement et personnages groupés cohérents.
- Liens de quêtes existants, sans auto-référence ni doublon.
- Recherche sans accents et par noms associés ; regroupement sans doublons.
- Compatibilité des cinq parcours initiaux, export/import et isolation des cycles.
- Parcours navigateur : couverture, filtres, liens, nouvelle quête cochée puis rechargée.
- Présentation à 390 × 844 et 360 × 800, avec défilement et contrôle des erreurs.

Ces contrôles vérifient l’intégrité technique et le comportement de l’application.
Ils ne prouvent pas l’exactitude de chaque détail du jeu. Le [lot 6](CONSOLIDATION.md) ajoute
l’audit transversal des liens, des sources et de la publication. La couverture compte les
fiches réellement présentes ; les identifiants des étapes et branches sont protégés par
une référence historique. Toute correction future doit préserver les identifiants
existants pour conserver les coches, y compris celles d’entrées inconnues d’un export.
