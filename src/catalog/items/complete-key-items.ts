import { bossReward as b, completionSource, explore as e, type CompletionRoute } from './completion-model';

const source = completionSource('Roundtable Guides — souvenirs et échanges', 'https://roundtablehold.net/checklists/remembrances_mausoleums.html');
export const completeKeyRoutes: CompletionRoute[] = [
  e('Academy Scroll', 'liurnia', 'Cimetière près de la falaise surplombant le lac', 'Ramasser le parchemin sur le cadavre près de la grande tombe à l’ouest de la première grâce de Liurnia.'),
  e('Conspectus Scroll', 'liurnia', 'Raya Lucaria · salle de classe', 'Depuis la salle de classe, entrer dans la petite pièce latérale et fouiller le cadavre.'),
  b('Remembrance of the Full Moon Queen', 'liurnia', 'Grande bibliothèque de Raya Lucaria', 'boss.rennala.raya-lucaria', 'Rennala, reine de la pleine lune', 'Rennala, Queen of the Full Moon'),
  b('Remembrance of the Starscourge', 'caelid', 'Dunes gémissantes', 'boss.radahn.wailing-dunes', 'Radahn, le Fléau des astres', 'Starscourge Radahn', ['Déclencher le festival du château du Lion rouge.']),
  b('Remembrance of the Regal Ancestor', 'underground', 'Nokron · terres du repos des cornes', 'boss.regal-ancestor.nokron', 'Esprit ancestral royal', 'Regal Ancestor Spirit', ['Allumer les six brasiers des Bois ancestraux puis interagir avec la dépouille.']),
  b('Remembrance of the Naturalborn', 'underground', 'Au-delà du grand cloître du lac putréfié', 'boss.astel.naturalborn', 'Astel, le rejeton du vide', 'Astel, Naturalborn of the Void', ['Utiliser le cercueil au bout du grand cloître.']),
  b('Remembrance of the Omen King', 'capital', 'Trône d’Elden · capitale royale', 'boss.morgott.royal-capital', 'Morgott, roi des Réprouvés', 'Morgott, the Omen King'),
  b('Remembrance of the Blasphemous', 'gelmir', 'Manoir du volcan · voie de l’Audience', 'boss.rykard.volcano-manor', 'Rykard, seigneur du blasphème', 'Rykard, Lord of Blasphemy', ['Terminer la seconde phase du combat après le Serpent dévoreur de dieux.']),
  b('Remembrance of the Fire Giant', 'mountaintops', 'Pied de la forge', 'boss.fire-giant.forge', 'Géant de feu', 'Fire Giant'),
  b('Remembrance of the Black Blade', 'farum', 'Farum Azula · au-delà du grand pont', 'boss.maliketh.farum', 'Maliketh, la Lame d’ébène', 'Maliketh, the Black Blade', ['Vaincre aussi la seconde phase après le Clerc bestial. Sa mort transforme Leyndell.']),
  b('Remembrance of the Dragonlord', 'farum', 'Farum Azula · arène hors du temps', 'boss.placidusax.farum', 'Placidusax, seigneur draconique', 'Dragonlord Placidusax', ['Descendre sur les plateformes sous le grand pont et se coucher à l’emplacement proposé.']),
  b('Remembrance of Hoarah Loux', 'capital', 'Trône d’Elden · capitale des cendres', 'boss.hoarah-loux.ashen-capital', 'Godfrey puis Hoarah Loux', 'Hoarah Loux', ['Affrontement de fin de jeu après la transformation de la capitale ; le premier Godfrey doré est un autre combat.']),
  b('Elden Remembrance', 'capital', 'Arbre-Monde · affrontement final', 'boss.elden-beast.erdtree', 'Bête d’Elden', 'Elden Beast', ['Vaincre Radagon puis la Bête d’Elden dans la même succession de combats.']),
  b('Remembrance of the Rot Goddess', 'haligtree', 'Racines de l’Arbre-Sacré', 'boss.malenia.haligtree', 'Malenia, déesse de la putréfaction', 'Malenia, Goddess of Rot', ['Vaincre les deux phases de Malenia.']),
  b('Remembrance of the Blood Lord', 'underground', 'Palais Mohgwyn · mausolée de la dynastie', 'boss.mohg.mohgwyn', 'Mohg, seigneur du sang', 'Mohg, Lord of Blood', ['Le Mohg de la cathédrale des parias ne donne pas ce souvenir.']),
].map(route => ({ ...route, sources: route.method === 'exploration'
  ? [completionSource('PowerPyx — parchemins et enseignements', 'https://www.powerpyx.com/elden-ring-all-spell-locations/')]
  : [source] }));
