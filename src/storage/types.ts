import type { SaveData } from '../domain/save';

export interface ProgressStorage {
  read(): Promise<SaveData | null>;
  write(save: SaveData, expectedRevision: number): Promise<void>;
}
