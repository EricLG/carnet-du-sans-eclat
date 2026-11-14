import { emptySave, saveSchema, type SaveData } from '../domain/save';
import type { ProgressStorage } from '../storage/types';

type Snapshot = { data: SaveData; loading: boolean; ready: boolean; pending: number; error: string | null };
export class ProgressService {
  private snapshot: Snapshot = { data: emptySave(), loading: true, ready: false, pending: 0, error: null };
  private listeners = new Set<() => void>();
  private queue: Promise<unknown> = Promise.resolve();
  constructor(private storage: ProgressStorage) {}
  getSnapshot = () => this.snapshot;
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private publish(next: Partial<Snapshot>) {
    this.snapshot = { ...this.snapshot, ...next };
    this.listeners.forEach(listener => listener());
  }
  load = async () => {
    if (this.snapshot.pending) return;
    this.publish({ loading: true, error: null });
    try { this.publish({ data: await this.storage.read() ?? emptySave(), loading: false, ready: true }); }
    catch (error) { this.publish({ loading: false, ready: false, error: error instanceof Error ? error.message : 'Lecture impossible.' }); }
  };
  mutate = (change: (data: SaveData) => SaveData): Promise<boolean> => {
    this.publish({ pending: this.snapshot.pending + 1 });
    const operation = this.queue.then(async () => {
      if (this.snapshot.loading) throw new Error('Chargement de la sauvegarde en cours.');
      if (!this.snapshot.ready || this.snapshot.error) throw new Error(this.snapshot.error ?? 'Rechargez la sauvegarde avant de la modifier.');
      const previous = this.snapshot.data;
      const data = saveSchema.parse({ ...change(previous), revision: previous.revision + 1 });
      await this.storage.write(data, previous.revision);
      this.publish({ data, error: null });
      return true;
    }).catch(error => {
      this.publish({ error: error instanceof Error ? error.message : 'Sauvegarde impossible.' });
      return false;
    }).finally(() => this.publish({ pending: this.snapshot.pending - 1 }));
    this.queue = operation;
    return operation;
  };
}
