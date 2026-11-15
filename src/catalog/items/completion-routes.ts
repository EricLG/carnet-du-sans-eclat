import type { Boss } from '../../domain/world';
import { completeArmorRoutes } from './complete-armor';
import { completeEquipmentRoutes } from './complete-equipment';
import { completeKeyRoutes } from './complete-key-items';
import { completeShieldRoutes } from './complete-shields';
import { completeSorceryRoutes } from './complete-sorceries';

export const completionRoutes = [...completeArmorRoutes, ...completeEquipmentRoutes, ...completeShieldRoutes, ...completeSorceryRoutes, ...completeKeyRoutes];
export const completionActors = [...new Map(completionRoutes.flatMap(route => route.actor ? [route.actor] : []).map(actor => [actor.id, actor])).values()];
// Les rencontres nécessaires aux récompenses ont une fiche canonique d’exploration.
// Aucune grâce n’est créée ou cochée implicitement.
export const completionBosses: Boss[] = [...new Map(completionRoutes.filter(route => route.actor?.kind === 'boss').map(route => [route.actor!.id, {
  id: route.actor!.id, name: route.actor!.name, aliases: [route.bossAlias!], content: 'base' as const,
  kind: 'boss' as const, respawns: false as const, regionIds: [route.region], location: route.location,
  access: `Rejoindre ${route.location}.`, conditions: route.conditions, relatedQuestIds: [], graceIds: [], sources: route.sources!,
}])).values()];
