import { z } from 'zod';
import { APP_ID } from '../config/identity';

const flags = z.record(z.string(), z.boolean());
export const questProgressSchema = z.object({
  status: z.enum(['in_progress', 'completed', 'failed']),
  steps: flags,
  branches: z.record(z.string(), z.string()),
});
const runSchema = z.object({
  id: z.string().min(1),
  cycle: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  quests: z.record(z.string(), questProgressSchema),
  bosses: flags,
  graces: flags,
  pickups: flags,
});
export const characterSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1).max(60),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  collection: flags,
  runs: z.array(runSchema).min(1),
}).superRefine((character, context) => {
  if (new Set(character.runs.map(run => run.id)).size !== character.runs.length ||
      new Set(character.runs.map(run => run.cycle)).size !== character.runs.length) {
    context.addIssue({ code: 'custom', message: 'Cycles dupliqués.' });
  }
});
export const saveSchema = z.object({
  schemaVersion: z.literal(1),
  revision: z.number().int().nonnegative(),
  selected: z.object({ characterId: z.string(), runId: z.string() }).nullable(),
  characters: z.array(characterSchema),
}).superRefine((save, context) => {
  if (new Set(save.characters.map(character => character.id)).size !== save.characters.length) {
    context.addIssue({ code: 'custom', message: 'Personnages dupliqués.' });
  }
  if (save.selected && !save.characters.some(character => character.id === save.selected?.characterId &&
    character.runs.some(run => run.id === save.selected?.runId))) {
    context.addIssue({ code: 'custom', message: 'Partie sélectionnée introuvable.' });
  }
});
export const exportSchema = z.object({
  format: z.literal(APP_ID),
  schemaVersion: z.literal(1),
  exportedAt: z.string().datetime(),
  data: saveSchema,
});

export type SaveData = z.infer<typeof saveSchema>;
export type Character = z.infer<typeof characterSchema>;
export type Run = Character['runs'][number];
export type QuestProgress = z.infer<typeof questProgressSchema>;
export type Backup = z.infer<typeof exportSchema>;

export const emptySave = (): SaveData => ({ schemaVersion: 1, revision: 0, selected: null, characters: [] });

// getRandomValues fonctionne aussi sur le réseau local en HTTP, contrairement à randomUUID.
export function newId(): string {
  const bytes = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
  else for (let index = 0; index < bytes.length; index++) bytes[index] = Math.floor(Math.random() * 256);
  return `${Date.now().toString(36)}-${Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')}`;
}

export const cycleLabel = (cycle: number) => cycle === 0 ? 'Première partie' : cycle === 1 ? 'NG+' : `NG+${cycle}`;
export function currentPart(save: SaveData) {
  const character = save.characters.find(entry => entry.id === save.selected?.characterId);
  return { character, run: character?.runs.find(entry => entry.id === save.selected?.runId) };
}
function blankRun(cycle: number): Run {
  return { id: newId(), cycle, createdAt: new Date().toISOString(), quests: {}, bosses: {}, graces: {}, pickups: {} };
}
export function addCharacter(save: SaveData, name: string): SaveData {
  const run = blankRun(0);
  const character = characterSchema.parse({ id: newId(), name, createdAt: run.createdAt,
    updatedAt: run.createdAt, collection: {}, runs: [run] });
  return { ...save, characters: [...save.characters, character], selected: { characterId: character.id, runId: run.id } };
}
export function selectRun(save: SaveData, characterId: string, runId: string): SaveData {
  return saveSchema.parse({ ...save, selected: { characterId, runId } });
}
export function updateCharacter(save: SaveData, id: string, update: (character: Character) => Character): SaveData {
  if (!save.characters.some(character => character.id === id)) throw new Error('Personnage introuvable.');
  return { ...save, characters: save.characters.map(character => character.id === id ?
    { ...update(character), updatedAt: new Date().toISOString() } : character) };
}
export function addCycle(save: SaveData, characterId: string): SaveData {
  const character = save.characters.find(entry => entry.id === characterId);
  if (!character) throw new Error('Personnage introuvable.');
  const run = blankRun(Math.max(...character.runs.map(entry => entry.cycle)) + 1);
  return { ...updateCharacter(save, characterId, entry => ({ ...entry, runs: [...entry.runs, run] })),
    selected: { characterId, runId: run.id } };
}
export function updateSelectedRun(save: SaveData, update: (run: Run) => Run): SaveData {
  const { character, run } = currentPart(save);
  if (!character || !run) throw new Error('Sélectionnez un personnage et un cycle.');
  return updateCharacter(save, character.id, entry => ({ ...entry,
    runs: entry.runs.map(candidate => candidate.id === run.id ? update(candidate) : candidate) }));
}
export function toggleFlag(save: SaveData, kind: 'collection' | 'bosses' | 'graces' | 'pickups', id: string): SaveData {
  const { character } = currentPart(save);
  if (!character) throw new Error('Sélectionnez un personnage.');
  if (kind === 'collection') return updateCharacter(save, character.id, entry => ({ ...entry,
    collection: { ...entry.collection, [id]: !entry.collection[id] } }));
  return updateSelectedRun(save, run => ({ ...run, [kind]: { ...run[kind], [id]: !run[kind][id] } }));
}
export function updateQuest(save: SaveData, id: string, update: (quest: QuestProgress) => QuestProgress): SaveData {
  return updateSelectedRun(save, run => ({ ...run, quests: { ...run.quests,
    [id]: update(run.quests[id] ?? { status: 'in_progress', steps: {}, branches: {} }) } }));
}
export function exportSave(save: SaveData): string {
  return JSON.stringify(exportSchema.parse({ format: APP_ID, schemaVersion: 1,
    exportedAt: new Date().toISOString(), data: save }), null, 2);
}
export function parseBackup(text: string): Backup {
  if (text.length > 10_000_000) throw new Error('Le fichier dépasse 10 Mo.');
  let input: unknown;
  try { input = JSON.parse(text); } catch { throw new Error('Le fichier ne contient pas un JSON valide.'); }
  const parsed = exportSchema.safeParse(input);
  if (!parsed.success) throw new Error('Sauvegarde invalide ou version non prise en charge. Aucune donnée n’a été modifiée.');
  return parsed.data;
}
export function importCopies(save: SaveData, backup: Backup): SaveData {
  const imported = backup.data.characters.map(input => {
    const character = characterSchema.parse(input);
    return { ...character, id: newId(), name: `${character.name.slice(0, 51)} (import)`,
      runs: character.runs.map(run => ({ ...run, id: newId() })) };
  });
  const first = imported[0];
  return { ...save, characters: [...save.characters, ...imported],
    selected: save.selected ?? (first ? { characterId: first.id, runId: first.runs[0].id } : null) };
}
