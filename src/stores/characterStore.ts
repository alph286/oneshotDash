import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';

interface Character {
  id: number;
  // Sezione 1: Intestazione
  name: string;
  class: string;
  level: number;
  race: string;
  alignment: string;
  avatar?: string;
  
  // Sezione 2: Stato attuale
  armorClass: number;
  totalHP: number;
  currentHP: number;
  temporaryHP: number;
  initiative: number;
  speed: number;
  conditions: string[];
  customState: string;

  // Sezione 3: Caratteristiche
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencyBonus: number;
  
  // Sezione 6: Note
  notes: string;
  
  // Calcolati
  strengthBonus: number;
  dexterityBonus: number;
  constitutionBonus: number;
  intelligenceBonus: number;
  wisdomBonus: number;
  charismaBonus: number;
}

// Update default characters with new fields
const defaultCharacters: Character[] = [
  { 
    id: 1,
    name: 'Legolas',
    class: 'Archer',
    level: 12,
    race: 'Elf',
    alignment: 'Caotico Buono',
    armorClass: 15,
    totalHP: 75,
    currentHP: 75,
    temporaryHP: 0,
    initiative: 3,
    speed: 30,
    conditions: [],
    customState: '',
    strength: 10,
    dexterity: 18,
    constitution: 14,
    intelligence: 12,
    wisdom: 14,
    charisma: 16,
    proficiencyBonus: 2,
    strengthBonus: 0,
    dexterityBonus: 0,
    constitutionBonus: 0,
    intelligenceBonus: 0,
    wisdomBonus: 0,
    charismaBonus: 0,
    notes: 'Ottimo arciere, diffidente con i nani'
  },
  { 
    id: 2, 
    name: 'Gimli', 
    class: 'Warrior', 
    race: 'Dwarf',
    armorClass: 18,
    totalHP: 100,
    currentHP: 100,
    temporaryHP: 0,
    strength: 16,
    dexterity: 10,
    constitution: 18,
    intelligence: 10,
    wisdom: 12,
    charisma: 14,
    proficiencyBonus: 2,
    strengthBonus: 0,
    dexterityBonus: 0,
    constitutionBonus: 0,
    intelligenceBonus: 0,
    wisdomBonus: 0,
    charismaBonus: 0,
    notes: '' // Add missing notes field
  },
  { 
    id: 3, 
    name: 'Gandalf', 
    class: 'Wizard', 
    race: 'Maia',
    armorClass: 12,
    totalHP: 90,
    currentHP: 90,
    temporaryHP: 0,
    strength: 10,
    dexterity: 12,
    constitution: 14,
    intelligence: 20,
    wisdom: 18,
    charisma: 16,
    proficiencyBonus: 6,
    strengthBonus: 0,
    dexterityBonus: 0,
    constitutionBonus: 0,
    intelligenceBonus: 0,
    wisdomBonus: 0,
    charismaBonus: 0,
    notes: '' // Add missing notes field
  },
  { 
    id: 4, 
    name: 'Aragorn', 
    class: 'Ranger', 
    race: 'Human',
    armorClass: 16,
    totalHP: 85,
    currentHP: 85,
    temporaryHP: 0,
    strength: 16,
    dexterity: 14,
    constitution: 14,
    intelligence: 12,
    wisdom: 14,
    charisma: 16,
    proficiencyBonus: 3,
    strengthBonus: 0,
    dexterityBonus: 0,
    constitutionBonus: 0,
    intelligenceBonus: 0,
    wisdomBonus: 0,
    charismaBonus: 0,
    notes: '' // Add missing notes field
  }
];

// Add helper function to calculate bonus
const calculateBonus = (stat: number): number => {
  return Math.floor((stat - 10) / 2);
};

interface CharacterState {
  characters: Character[];
  updateCharacter: (id: number, updatedData: Partial<Character>) => void;
  initializeCharacters: (characters: Character[]) => void;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      characters: defaultCharacters.map(char => ({
        ...char,
        strengthBonus: calculateBonus(char.strength),
        dexterityBonus: calculateBonus(char.dexterity),
        constitutionBonus: calculateBonus(char.constitution),
        intelligenceBonus: calculateBonus(char.intelligence),
        wisdomBonus: calculateBonus(char.wisdom),
        charismaBonus: calculateBonus(char.charisma)
      })),
      updateCharacter: (id, updatedData) => set((state) => {
        const updatedCharacters = state.characters.map(char => {
          if (char.id === id) {
            const updatedChar = { ...char, ...updatedData };
            // Recalculate bonuses when stats change
            return {
              ...updatedChar,
              strengthBonus: calculateBonus(updatedChar.strength),
              dexterityBonus: calculateBonus(updatedChar.dexterity),
              constitutionBonus: calculateBonus(updatedChar.constitution),
              intelligenceBonus: calculateBonus(updatedChar.intelligence),
              wisdomBonus: calculateBonus(updatedChar.wisdom),
              charismaBonus: calculateBonus(updatedChar.charisma)
            };
          }
          return char;
        });
        return { characters: updatedCharacters };
      }),
      initializeCharacters: (characters) => set({ characters })
    }),
    {
      name: 'character-storage',
      storage: createJSONStorage(() => localforage),
    }
  )
);