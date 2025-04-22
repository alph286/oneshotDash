import { create } from 'zustand';

import { persist } from 'zustand/middleware';

// Export the Event interface
export interface Event {
  id: string;
  type: 'narrative' | 'action' | 'descriptive' | 'reminder' | 'loot';
  title: string;
  description: string;
  timestamp: Date;
  position: number;
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  estimatedTime: number; // Changed to number to match the type
  events: Event[];
}

interface StoriaState {
  phases: Phase[];
  addPhase: (phase: Omit<Phase, 'id' | 'events'>) => void;
  removePhase: (id: string) => void;
  addEvent: (phaseId: string, event: Omit<Event, 'id'>) => void;
  removeEvent: (phaseId: string, eventId: string) => void;
  updatePhase: (id: string, update: Partial<Omit<Phase, 'id'>>) => void;
  updateEvent: (phaseId: string, eventId: string, update: Partial<Omit<Event, 'id'>>) => void;
}

export const useStoriaStore = create<StoriaState>()(
  persist(
    (set) => ({
      phases: [],
      addPhase: (phase) => set((state) => ({
        phases: [...state.phases, {
          ...phase,
          id: crypto.randomUUID(),
          events: []
        }]
      })),
      removePhase: (id) => set((state) => ({
        phases: state.phases.filter(phase => phase.id !== id)
      })),
      addEvent: (phaseId: string, event: Omit<Event, 'id'>) => set((state) => {
        const phase = state.phases.find(p => p.id === phaseId);
        const position = phase?.events.length || 0;
        
        return {
          phases: state.phases.map(phase => phase.id === phaseId ? {
            ...phase,
            events: [...phase.events, {
              ...event,
              position: position, // Set the position based on current events length
              id: crypto.randomUUID()
            }]
          } : phase)
        };
      }),
      removeEvent: (phaseId, eventId) => set((state) => ({
        phases: state.phases.map(phase => phase.id === phaseId ? {
          ...phase,
          events: phase.events.filter(event => event.id !== eventId)
        } : phase)
      })),
      updatePhase: (id, update) => set((state) => ({
        phases: state.phases.map(phase => phase.id === id ? {
          ...phase,
          ...update
        } : phase)
      })),
      updateEvent: (phaseId, eventId, update) => set((state) => ({
        phases: state.phases.map(phase => phase.id === phaseId ? {
          ...phase,
          events: phase.events.map(event => event.id === eventId ? {
            ...event,
            ...update
          } : event)
        } : phase)
      }))
    }),
    {
      name: 'storia-store',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);