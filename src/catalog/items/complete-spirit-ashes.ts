import { bossReward as b, completionSource, dialogue, explore as e, puzzle as p, reward as q, shop as s, type CompletionRoute } from './completion-model';

const exploration: [string, string, string, string][] = [
  ['Wandering Noble Ashes', 'limgrave', 'Catacombes orageuses', 'Monter à l’échelle du parcours des diablotins et fouiller le cadavre appuyé contre un cercueil.'],
  ['Godrick Soldier Ashes', 'limgrave', 'Cimetière de l’extrémité occidentale de Valorage', 'Fouiller le corps près des grandes tombes, au milieu des méduses spirituelles.'],
  ['Stormhawk Deenh', 'limgrave', 'Chapelle de l’anticipation · étage du hall', 'Revenir par le portail des Quatre Beffrois et ouvrir le coffre à l’étage de la chapelle.'],
  ['Albinauric Ashes', 'liurnia', 'Cimetière à l’est du manoir de Caria', 'Après Loretta, rejoindre le cimetière extérieur et fouiller le cadavre.'],
  ['Avionette Soldier Ashes', 'liurnia', 'Raya Lucaria · roue élévatrice', 'Descendre sur la roue et sauter sur le rebord avant le niveau inférieur pour fouiller le cadavre.'],
  ['Land Squirt Ashes', 'liurnia', 'Rive orientale du lac au nord du pont de la porte du village', 'Fouiller la tombe entourée d’ascidies terrestres.'],
  ['Marionette Soldier Ashes', 'liurnia', 'Raya Lucaria · chemin inférieur du cimetière', 'Après le pont, descendre sur le chemin inférieur et fouiller le corps suspendu au bord.'],
  ['Page Ashes', 'liurnia', 'Catacombes au pied des falaises · salle finale', 'Fouiller la tombe dans la salle surveillée par le Réprouvé, près du parcours vers le levier.'],
  ['Raya Lucaria Soldier Ashes', 'liurnia', 'Catacombes de l’impasse', 'Frapper les murs illusoires de la partie basse et ouvrir le coffre du passage caché.'],
  ['Crystalian Ashes', 'caelid', 'Antre de Sellia · cristaux en hauteur', 'Grimper sur les grands cristaux violets et rejoindre le coffre gardé par les sorciers.'],
  ['Miranda Sprout Ashes', 'caelid', 'Catacombes de Caelid · sous les escaliers', 'Frapper le mur illusoire sous l’escalier de la première grande salle et récupérer les cendres.'],
  ['Radahn Soldier Ashes', 'caelid', 'Catacombes des défunts valeureux', 'Prendre les couloirs supérieurs depuis la grande salle puis passer par la fenêtre vers la salle du fond.'],
  ['Rotten Stray Ashes', 'caelid', 'Bâtiment en ruine à l’ouest de Sellia', 'Fouiller le cadavre au bord nord du marais, au nord de la grâce Sellia, sous l’escalier.'],
  ['Giant Rat Ashes', 'altus', 'Village aux moulins de l’ouest', 'Fouiller l’étable remplie de rats et son grand rat.'],
  ['Leyndell Soldier Ashes', 'altus', 'Tombe du héros canonisé', 'Après l’effondrement du sol, reprendre le passage qui remonte et fouiller le corps.'],
  ['Winged Misbegotten Ashes', 'altus', 'Catacombes disgracieuses', 'Descendre dans la fosse entourée de chimères près de la fin du donjon et fouiller le cadavre.'],
  ['Depraved Perfumer Carmaan', 'gelmir', 'Manoir du volcan · passage derrière le mur illusoire', 'Explorer les couloirs secrets derrière une chambre du manoir et fouiller le corps.'],
  ['Man-Serpent Ashes', 'gelmir', 'Manoir du volcan · bâtiment à plusieurs étages avant le téléporteur de Rykard', 'Rejoindre l’autel entouré d’hommes-serpents et ramasser les cendres.'],
  ['Nomad Ashes', 'capital', 'Prison souterraine des parias · conduites profondes', 'Suivre le parcours des conduites et fouiller le cadavre qui pend sur un rebord.'],
  ['Vulgar Militia Ashes', 'altus', 'Tombe des héros d’Auriza · fosse des basilics', 'Descendre par les poutres sous les couloirs des chars et fouiller le corps près des basilics.'],
  ['Fire Monk Ashes', 'mountaintops', 'Catacombes des Cimes des Géants', 'Descendre sous le premier ascenseur et franchir le parcours du second piège de givre pour ouvrir le coffre.'],
  ['Cleanrot Knight Finlay', 'haligtree', 'Elphael · petite salle voisine du belvédère', 'Depuis la salle de prière, descendre les escaliers et traverser le contrefort vers le belvédère ; ouvrir le coffre de la pièce adjacente gardée par un chevalier.'],
  ['Haligtree Soldier Ashes', 'haligtree', 'Elphael · extrémité nord des remparts', 'Rejoindre le grand calice décoratif au bord nord de la zone et fouiller l’espace à sa base.'],
  ['Oracle Envoy Ashes', 'haligtree', 'Canopée de l’Arbre-Sacré', 'Suivre la grande branche latérale à droite du début de la zone, au-delà de l’émissaire géant.'],
  ['Azula Beastman Ashes', 'farum', 'Sous le temple des dragons', 'Descendre sur les sarcophages sous la grâce Temple des dragons et fouiller le cadavre.'],
  ['Greatshield Soldier Ashes', 'underground', 'Nokron · cimetière', 'Fouiller le corps dans le cimetière surveillé par un soldat faucon déchu.'],
  ['Mimic Tear Ashes', 'underground', 'Nokron · Terres sacrées de la nuit', 'Ouvrir le passage scellé par une statue de diablotin et prendre le coffre derrière le garde.',],
  ['Clayman Ashes', 'underground', 'Ainsel principale · au sud des ruines du palais d’Uhl', 'Depuis le point d’arrivée du portail de la tour de Renna, descendre vers le sud et fouiller le corps près des hommes d’argile.'],
  ['Archer Ashes', 'underground', 'Nokstella · derrière un bâtiment des escaliers supérieurs', 'Monter le parcours des larmes argentées explosives et contourner le bâtiment sur la gauche.'],
  ['Nightmaiden & Swordstress Puppets', 'underground', 'Nokstella · salle scellée', 'Ouvrir le sceau de diablotin et prendre le coffre gardé par les deux épéistes.'],
  ['Mausoleum Soldier Ashes', 'underground', 'Profondeurs de Fonderacine · falaise au nord du mausolée ambulant', 'Fouiller la base du petit arbre mort au bord de la falaise.'],
];
const bosses: CompletionRoute[] = [
  b('Noble Sorcerer Ashes', 'limgrave', 'Catacombes orageuses', 'boss.watchdog.stormfoot', 'Chat de garde funéraire', 'Erdtree Burial Watchdog'),
  b('Skeletal Militiaman Ashes', 'limgrave', 'Village des eaux nécromantes', 'boss.tibia-mariner.summonwater', 'Nocher diaphane', 'Tibia Mariner'),
  b('Demi-Human Ashes', 'weeping', 'Catacombes de l’Empaleur', 'boss.watchdog.impalers', 'Chat de garde funéraire', 'Erdtree Burial Watchdog'),
  b('Lhutel the Headless', 'weeping', 'Catacombes du Val-aux-Tombes', 'boss.cemetery-shade.tombsward', 'Ombre du cimetière', 'Cemetery Shade'),
  b('Banished Knight Engvall', 'limgrave', 'Catacombes des eaux noires', 'boss.grave-warden.murkwater', 'Duelliste gardien du tombeau', 'Grave Warden Duelist'),
  b('Banished Knight Oleg', 'limgrave', 'Tombe des héros des confins', 'boss.tree-spirit.fringefolk', 'Esprit d’arbre ulcéreux', 'Ulcerated Tree Spirit', ['Ouvrir l’entrée du donjon avec les clés-lames de pierre demandées.']),
  b('Black Knife Tiche', 'liurnia', 'Geôle éternelle de la meneuse des Couteaux noirs', 'boss.alecto.ringleader', 'Alecto, meneuse des Couteaux noirs', 'Alecto, Black Knife Ringleader', ['Atteindre l’autel lunaire dans le parcours de Ranni.']),
  b('Glintstone Sorcerer Ashes', 'liurnia', 'Catacombes de l’impasse', 'boss.spirit-caller-snail.roads-end', 'Escargot mande-esprit', 'Spirit-Caller Snail'),
  b('Kaiden Sellsword Ashes', 'liurnia', 'Catacombes au pied des falaises', 'boss.watchdog.cliffbottom', 'Chat de garde funéraire', 'Erdtree Burial Watchdog'),
  b('Skeletal Bandit Ashes', 'liurnia', 'Étang au sud de la salle d’étude de Caria', 'boss.tibia-mariner.liurnia', 'Nocher diaphane', 'Tibia Mariner'),
  b('Twinsage Sorcerer Ashes', 'liurnia', 'Catacombes des Couteaux noirs · boss principal', 'boss.cemetery-shade.black-knife', 'Ombre du cimetière', 'Cemetery Shade'),
  b('Battlemage Hugues', 'caelid', 'Geôle éternelle de Sellia', 'boss.hugues.sellia-evergaol', 'Hugues le mage de bataille', 'Battlemage Hugues'),
  b('Kindred of Rot Ashes', 'caelid', 'Catacombes de Caelid', 'boss.cemetery-shade.caelid', 'Ombre du cimetière', 'Cemetery Shade'),
  b('Mad Pumpkin Head Ashes', 'caelid', 'Catacombes de l’Arbre-Monde mineur', 'boss.watchdogs.minor-erdtree', 'Chats de garde funéraires (duo)', 'Erdtree Burial Watchdogs'),
  b('Putrid Corpse Ashes', 'caelid', 'Caverne des geôles', 'boss.frenzied-duelist.gaol-cave', 'Duelliste frénétique', 'Frenzied Duelist'),
  b('Redmane Knight Ogha', 'caelid', 'Catacombes des défunts valeureux', 'boss.putrid-tree-spirit.war-dead', 'Esprit d’arbre putréfié', 'Putrid Tree Spirit', ['Vaincre Radahn pour accéder aux catacombes au nord-est de son champ de bataille.']),
  b('Ancient Dragon Knight Kristoff', 'altus', 'Tombe du héros canonisé', 'boss.ancient-hero.sainted-hero', 'Ancien héros de Zamor', 'Ancient Hero of Zamor'),
  b('Bloodhound Knight Floh', 'gelmir', 'Tombe des héros de Gelmir', 'boss.red-wolf.gelmir-hero', 'Loup cramoisi du champion', 'Red Wolf of the Champion'),
  b('Perfumer Tricia', 'altus', 'Catacombes disgracieuses', 'boss.tricia-misbegotten.unsightly', 'Parfumeuse Tricia et Guerrier chimérique', 'Perfumer Tricia and Misbegotten Warrior'),
  b('Omenkiller Rollo', 'capital', 'Pont vers la tour divine d’Altus-Est', 'boss.fell-twins.east-altus', 'Jumeaux maléfiques', 'Fell Twins', ['Rejoindre le pont à pied depuis le secteur de l’ascenseur vers les Terres interdites pour déclencher la rencontre.']),
  b('Soldjars of Fortune Ashes', 'altus', 'Tombe annexe d’Auriza', 'boss.grave-warden.auriza-side', 'Duelliste gardien du tombeau', 'Grave Warden Duelist'),
  b('Blackflame Monk Amon', 'mountaintops', 'Chemin secret de l’Arbre-Sacré', 'boss.stray-mimic.hidden-path', 'Larme imitatrice égarée', 'Stray Mimic Tear', ['Accéder au chemin avec le médaillon secret de l’Arbre-Sacré et découvrir le passage inférieur invisible.']),
  b('Ancestral Follower Ashes', 'underground', 'Siofra · terres du repos des cornes', 'boss.ancestor-spirit.siofra', 'Esprit ancestral', 'Ancestor Spirit', ['Allumer les huit brasiers de Siofra puis interagir avec la dépouille ; ne pas confondre avec l’Esprit ancestral royal de Nokron.']),
];

const puppetConditions = ['Découvrir la cave secrète des marionnettes près de la tour de Ranni et en parler à Seluvis.', 'Traiter sa demande de potion et débloquer son inventaire de marionnettes ; les choix de potion sont des alternatives.'];
const routes: CompletionRoute[] = [
  ...exploration.map(([names, region, location, description]) => e(names, region, location, description,
    ['Mimic Tear Ashes', 'Nightmaiden & Swordstress Puppets'].includes(names) ? ['Posséder les clés-lames de pierre demandées par le sceau.'] : [])),
  ...bosses,
  dialogue('Lone Wolf Ashes', 'limgrave', 'Église d’Elleh', 'npc.ranni', 'Ranni', 'Rencontrer Renna de nuit après avoir obtenu Torrent et accepter la cloche d’invocation.'),
  dialogue('Spirit Jellyfish Ashes', 'limgrave', 'Cabane de Valorage', 'npc.roderika', 'Roderika', 'Épuiser les dialogues de Roderika pour recevoir les cendres.'),
  p('Warhawk Ashes', 'weeping', 'Falaise au nord de l’église des pèlerins', 'Examiner le tableau Prophétie à Voilorage puis rejoindre le peintre fantomatique sur la falaise.'),
  s('Fanged Imp Ashes', 'liurnia', 'Marchand ascétique près de la porte principale de l’Académie', 'npc.isolated.raya-lucaria', 'Marchand ascétique de l’Académie', '2 000 runes'),
  q('Latenna the Albinauric', 'liurnia', 'Cabane du loup endormi, après la grotte cristalline du lac', 'npc.latenna', 'Latenna', 'quest.latenna', 'Parler à Latenna et accepter de l’aider pendant qu’elle est encore vivante.', ['Posséder la moitié droite du médaillon secret obtenue auprès d’Albus.', 'La rencontrer et accepter sa demande avant de récupérer la moitié gauche du médaillon au château Sol.']),
  s('Finger Maiden Therolina Puppet', 'liurnia', 'Tour de Seluvis · inventaire des marionnettes', 'npc.seluvis', 'Seluvis', '2 éclats de lumière stellaire', puppetConditions),
  s('Jarwight Puppet', 'liurnia', 'Tour de Seluvis · inventaire des marionnettes', 'npc.seluvis', 'Seluvis', '3 éclats de lumière stellaire', puppetConditions),
  s('Dung Eater Puppet', 'liurnia', 'Tour de Seluvis · inventaire des marionnettes', 'npc.seluvis', 'Seluvis', '5 éclats de lumière stellaire', [...puppetConditions,
    'Après son invasion aux douves, retrouver le Coprophage attaché dans sa cellule et lui administrer la potion de Seluvis, avant de lui remettre les cinq malédictions.',
    'Débloquer cette marionnette avant la mort de Seluvis ; attendre avant de remettre la Lame digicide à Ranni.',
    'Cette branche interrompt la fin normale du Coprophage et utilise la même potion que la branche de Nepheli.']),
  q('Nepheli Loux Puppet', 'liurnia', 'Manoir de Caria · galerie de Pidia', 'npc.pidia', 'Pidia', 'quest.seluvis', 'Donner la potion de Seluvis à Nepheli puis, après la mort de Seluvis, rejoindre Pidia et récupérer la marionnette sur son corps.',
    ['Administrer la potion à Nepheli avant la mort de Seluvis ; cette décision interrompt sa branche normale.', 'Pidia donne cette marionnette à la place de Dolores. Les deux branches demandent des cycles distincts si l’on veut ce butin de Pidia.']),
  q('Dolores the Sleeping Arrow Puppet', 'liurnia', 'Manoir de Caria · galerie de Pidia', 'npc.pidia', 'Pidia', 'quest.seluvis', 'Après la mort de Seluvis, revenir à la galerie de Pidia et ramasser Dolores sur son corps.',
    ['Ne pas avoir donné la potion à Nepheli : la remettre à Gideon ou au Coprophage donne cette issue de Pidia.', 'Si Nepheli a bu la potion, Pidia laisse sa marionnette à la place ; Dolores peut alors être achetée dans la boutique de Seluvis pour cinq éclats de lumière stellaire.']),
];

const source = completionSource('Roundtable Guides — obtentions des cendres d’invocation', 'https://roundtablehold.net/checklists/spirit_ashes.html');
const crosscheck = completionSource('Tarnished — invocations, boss et prix', 'https://tarnished.app/spirit-ash');
const pidia = completionSource('Neoseeker — marionnettes alternatives sur Pidia', 'https://www.neoseeker.com/elden-ring/NPCs/Pidia');
const seluvis = completionSource('Neoseeker — conditions et prix des marionnettes de Seluvis', 'https://www.neoseeker.com/elden-ring/NPCs/Preceptor_Seluvis');
const puppetShop = completionSource('Eldenpedia — inventaire des marionnettes de Seluvis', 'https://eldenring.wiki.gg/wiki/Seluvis');
export const completeSpiritAshRoutes: CompletionRoute[] = routes.map(route => ({ ...route,
  sources: route.names.some(name => name === 'Nepheli Loux Puppet' || name === 'Dolores the Sleeping Arrow Puppet') ? [pidia, seluvis, puppetShop]
    : route.names.some(name => ['Finger Maiden Therolina Puppet', 'Jarwight Puppet', 'Dung Eater Puppet'].includes(name)) ? [seluvis, puppetShop]
      : [source, crosscheck],
}));
