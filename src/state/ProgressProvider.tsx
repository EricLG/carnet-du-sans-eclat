import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { progressStorage } from '../storage/progressStorage';
import { ProgressService } from './ProgressService';

const service = new ProgressService(progressStorage);
const Context = createContext(service);
export function ProgressProvider({ children }: { children: ReactNode }) {
  useEffect(() => { void service.load(); }, []);
  return <Context.Provider value={service}>{children}</Context.Provider>;
}
export function useProgress() {
  const service = useContext(Context);
  return { ...useSyncExternalStore(service.subscribe, service.getSnapshot, service.getSnapshot), service };
}
