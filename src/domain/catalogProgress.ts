// Compter uniquement les identifiants publiés, sans perdre les coches inconnues de la sauvegarde.
export function catalogProgress(entries: readonly { id: string }[], flags: Record<string, boolean> = {}) {
  const ids = new Set(entries.map(entry => entry.id));
  return { done: [...ids].filter(id => flags[id] === true).length, total: ids.size };
}
