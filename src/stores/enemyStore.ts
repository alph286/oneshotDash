import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Enemy } from '../components/storia/EnemyParty';

interface EnemyState {
  enemyParties: Record<string, Enemy[]>;
  updateEnemyParty: (phaseId: string, eventId: string, enemies: Enemy[]) => void;
  getEnemyParty: (phaseId: string, eventId: string) => Enemy[];
}

export const useEnemyStore = create<EnemyState>()(
  persist(
    (set, get) => ({
      enemyParties: {},
      updateEnemyParty: (phaseId, eventId, enemies) => set({
        enemyParties: {
          ...get().enemyParties,
          [`${phaseId}-${eventId}`]: enemies
        }
      }),
      getEnemyParty: (phaseId, eventId) => 
        get().enemyParties[`${phaseId}-${eventId}`] || []
    }),
    {
      name: 'enemy-store',
      storage: {
        getItem: (name) => JSON.parse(localStorage.getItem(name) || 'null'),
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);