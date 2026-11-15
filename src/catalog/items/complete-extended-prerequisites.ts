import { completionSource, explore, reward, type CompletionRoute } from './completion-model';

export const completeExtendedPrerequisiteRoutes: CompletionRoute[] = [
  { ...explore('Amber Starlight', 'altus', 'Creux au nord-est de la grâce Croisement de la chaussée d’Altus',
    'Quitter la route avant le grand escalier vers Leyndell et entrer dans le petit creux entre les falaises. Ramasser la lumière au pied de la statue, parmi les petits poulpes.'),
  sources: [completionSource('Eldenpedia — lumière stellaire ambrée et parcours de Seluvis', 'https://eldenring.wiki.gg/wiki/Preceptor_Seluvis')] },
  { ...reward("Alexander's Innards", 'farum', 'Plateforme au-delà de l’ascenseur du temple des dragons', 'npc.alexander', 'Alexandre (Alexander)', 'quest.alexander',
    'Retrouver Alexandre à Farum Azula, lui parler puis accepter son duel et l’emporter. Récupérer ses entrailles après ses derniers dialogues.',
    ['Poursuivre le parcours d’Alexandre jusqu’à Farum Azula ; le tuer lors d’une rencontre antérieure ne donne pas ses entrailles.']),
  sources: [completionSource('Eldenpedia — entrailles d’Alexander', 'https://eldenring.wiki.gg/wiki/Alexander%27s_Innards')] },
];
