import { create } from 'zustand';

export interface Spell {
  id: string;
  name: string;
  level: number;
  imageUrl?: string;
}

interface SpellStore {
  spells: Spell[];
  addSpell: (spell: Spell) => void;
  removeSpell: (id: string) => void;
  updateSpell: (id: string, updatedSpell: Partial<Spell>) => void;
  getSpellsByLevel: (level: number) => Spell[];
}

const useSpellStore = create<SpellStore>((set, get) => ({
  spells: [],
  
  addSpell: (spell) => 
    set((state) => ({ spells: [...state.spells, spell] })),
  
  removeSpell: (id) => 
    set((state) => ({ spells: state.spells.filter(spell => spell.id !== id) })),
  
  updateSpell: (id, updatedSpell) =>
    set((state) => ({
      spells: state.spells.map(spell => 
        spell.id === id ? { ...spell, ...updatedSpell } : spell
      )
    })),
    
  getSpellsByLevel: (level) => 
    get().spells.filter(spell => spell.level === level)
}));

export default useSpellStore;