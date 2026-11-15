import { bossReward as b, completionSource, drop as d, explore as e, type CompletionRoute } from './completion-model';

const books = completionSource('Roundtable Guides — emplacement des bréviaires', 'https://roundtablehold.net/checklists/scrollsand_prayerbooks.html');
const remembrance = completionSource('Eldenpedia — souvenir de la Liche draconique', 'https://eldenring.wiki.gg/wiki/Remembrance_of_the_Lichdragon');
const beforeAsh = ['Ramasser avant de vaincre Maliketh : la transformation de Leyndell rend ce lieu inaccessible.'];

export const completeIncantationPrerequisiteRoutes: CompletionRoute[] = [
  e("Assassin's Prayerbook", 'roundtable', 'Sous-sol de la Table ronde · derrière les deux sceaux de diablotin', 'Ouvrir les deux portes de diablotin successives puis fouiller le coffre du bréviaire.', ['Prévoir trois clés-lames de pierre au total pour les deux sceaux.']),
  e('Godskin Prayerbook', 'limgrave', 'Voilorage · pièce scellée sous la cour', 'Depuis la cour, longer le mur puis descendre l’escalier vers les rats ; ouvrir le sceau de diablotin et prendre le coffre.', ['Utiliser la clé-lame de pierre demandée par le sceau.']),
  e("Fire Monks' Prayerbook", 'liurnia', 'Liurnia méridionale · camp des moines de feu', 'Fouiller le cadavre du camp où se trouve aussi le geste La flamme m’habite.'),
  d('Dragon Cult Prayerbook', 'liurnia', 'Chemin au sud de la cabane de l’artiste', 'Chevalier de Leyndell du bréviaire draconique', 'Vaincre le chevalier de Leyndell en patrouille pour son butin unique ; il ne s’agit pas d’un boss.', true),
  e("Two Fingers' Prayerbook", 'capital', 'Manoir fortifié de Leyndell · pièce de la cheminée', 'Depuis le premier étage, rejoindre la pièce au sud et fouiller le cadavre près de la cheminée.', beforeAsh),
  e('Golden Order Principia', 'capital', 'Étage du sanctuaire de l’Arbre-Monde', 'Sortir à l’est, grimper sur la racine, passer par le toit et la fenêtre brisée, puis rejoindre le fauteuil suspendu au plafond.', beforeAsh),
  e("Giant's Prayerbook", 'mountaintops', 'Garnison des gardiens · tour supérieure', 'Vaincre Arghanthy, monter à l’échelle derrière lui puis ouvrir le coffre du bréviaire.'),
  e('Ancient Dragon Prayerbook', 'farum', 'Farum Azula · grand hall après la tombe de la bête', 'Fouiller le sol au milieu du grand hall sur le trajet entre les profondeurs de la tombe de la bête et le balcon face à la tempête.'),
  { ...b('Remembrance of the Lichdragon', 'underground', 'Profondeurs de Fonderacine · rêve de Fia', 'boss.fortissax.fias-dream', 'Fortissax, la Liche draconique', 'Lichdragon Fortissax',
    ['Poursuivre le parcours de Fia au trône du prince de la Mort, lui remettre la Marque maudite de Mort, puis entrer dans son rêve.']), questId: 'quest.fia', sources: [remembrance] },
].map(route => ({ ...route, sources: route.sources ?? [books] }));
