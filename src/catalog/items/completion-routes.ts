import type { Boss } from '../../domain/world';
import { completeArmorRoutes } from './complete-armor';
import { completeEquipmentRoutes } from './complete-equipment';
import { completeKeyRoutes } from './complete-key-items';
import { completeShieldRoutes } from './complete-shields';
import { completeSorceryRoutes } from './complete-sorceries';
import { completeTalismanRoutes } from './complete-talismans';
import { completeIncantationRoutes } from './complete-incantations';
import { completeWarAshRoutes } from './complete-war-ashes';
import { completeSpiritAshRoutes } from './complete-spirit-ashes';
import { completeIncantationPrerequisiteRoutes } from './complete-incantation-prerequisites';
import { completeExtendedPrerequisiteRoutes } from './complete-extended-prerequisites';
import type { CompletionRoute } from './completion-model';

const legacyRoutes = [...completeArmorRoutes, ...completeEquipmentRoutes, ...completeShieldRoutes, ...completeSorceryRoutes, ...completeKeyRoutes];
const secondaryRoutes = [...completeTalismanRoutes, ...completeIncantationRoutes, ...completeWarAshRoutes, ...completeSpiritAshRoutes,
  ...completeIncantationPrerequisiteRoutes, ...completeExtendedPrerequisiteRoutes];
export const completionRoutes = [...legacyRoutes, ...secondaryRoutes];
const actors = (routes: CompletionRoute[]) => [...new Map(routes.flatMap(route => route.actor ? [route.actor] : []).map(actor => [actor.id, actor])).values()];
const legacyActors = actors(legacyRoutes);
export const completionActors = [...legacyActors, ...actors(secondaryRoutes).filter(actor => !legacyActors.some(previous => previous.id === actor.id))];
// Les rencontres nécessaires aux récompenses ont une fiche canonique d’exploration.
// Aucune grâce n’est créée ou cochée implicitement.
const bosses = (routes: CompletionRoute[]): Boss[] => [...new Map(routes.filter(route => route.actor?.kind === 'boss').map(route => [route.actor!.id, {
  id: route.actor!.id, name: route.actor!.name, aliases: [route.bossAlias!], content: 'base' as const,
  kind: 'boss' as const, respawns: false as const, regionIds: [route.region], location: route.location,
  access: `Rejoindre ${route.location}.`, conditions: route.conditions, relatedQuestIds: [], graceIds: [], sources: route.sources!,
}])).values()];
// Une nouvelle obtention ne réécrit pas une fiche de rencontre déjà publiée.
const legacyBosses = bosses(legacyRoutes);
export const completionBosses: Boss[] = [...legacyBosses, ...bosses(secondaryRoutes).filter(boss => !legacyBosses.some(previous => previous.id === boss.id))];
