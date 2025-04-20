import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';

export interface Character {
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
  equipment: string; // New field for equipment details

  // Sezione 3: Caratteristiche
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencyBonus: number;
  
  // Additional Bonus per caratteristica
  strengthAdditionalBonus: number;
  dexterityAdditionalBonus: number;
  constitutionAdditionalBonus: number;
  intelligenceAdditionalBonus: number;
  wisdomAdditionalBonus: number;
  charismaAdditionalBonus: number;
  
  // Sezione 6: Note
  notes: string;
  
  // Calcolati
  strengthBonus: number;
  dexterityBonus: number;
  constitutionBonus: number;
  intelligenceBonus: number;
  wisdomBonus: number;
  charismaBonus: number;
  
  // Add darkvision and inspiration fields
  darkvision: number;
  inspiration: number;
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
    notes: 'Ottimo arciere, diffidente con i nani',
    strengthAdditionalBonus: 0,
    dexterityAdditionalBonus: 0,
    constitutionAdditionalBonus: 0,
    intelligenceAdditionalBonus: 0,
    wisdomAdditionalBonus: 0,
    charismaAdditionalBonus: 0,
    equipment: '',
    darkvision: 0,
    inspiration: 0
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
    ,



    level: 0,
    alignment: '',
    initiative: 0,
    speed: 0,
    conditions: [],
    customState: '',
    strengthAdditionalBonus: 0,
    dexterityAdditionalBonus: 0,
    constitutionAdditionalBonus: 0,
    intelligenceAdditionalBonus: 0,
    wisdomAdditionalBonus: 0,
    charismaAdditionalBonus: 0,
    equipment: '',
    darkvision: 0,
    inspiration: 0
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
    ,



    level: 0,
    alignment: '',
    initiative: 0,
    speed: 0,
    conditions: [],
    customState: '',
    strengthAdditionalBonus: 0,
    dexterityAdditionalBonus: 0,
    constitutionAdditionalBonus: 0,
    intelligenceAdditionalBonus: 0,
    wisdomAdditionalBonus: 0,
    charismaAdditionalBonus: 0,
    equipment: '',
    darkvision: 0,
    inspiration: 0
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
    ,



    level: 0,
    alignment: '',
    initiative: 0,
    speed: 0,
    conditions: [],
    customState: '',
    strengthAdditionalBonus: 0,
    dexterityAdditionalBonus: 0,
    constitutionAdditionalBonus: 0,
    intelligenceAdditionalBonus: 0,
    wisdomAdditionalBonus: 0,
    charismaAdditionalBonus: 0,
    equipment: '',
    darkvision: 0,
    inspiration: 0
  }
];

// Add helper function to calculate bonus
const calculateBonus = (stat: number): number => {
  return Math.floor((stat - 10) / 2);
};

// Modify the calculateTotalBonus function to include additional bonus
const calculateTotalBonus = (stat: number, additionalBonus: number = 0): number => {
  return Math.floor((stat - 10) / 2) + additionalBonus;
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
        strengthBonus: calculateTotalBonus(char.strength, char.strengthAdditionalBonus),
        dexterityBonus: calculateTotalBonus(char.dexterity, char.dexterityAdditionalBonus),
        constitutionBonus: calculateTotalBonus(char.constitution, char.constitutionAdditionalBonus),
        intelligenceBonus: calculateTotalBonus(char.intelligence, char.intelligenceAdditionalBonus),
        wisdomBonus: calculateTotalBonus(char.wisdom, char.wisdomAdditionalBonus),
        charismaBonus: calculateTotalBonus(char.charisma, char.charismaAdditionalBonus)
      })),
      updateCharacter: (id, updatedData) => set((state) => {
        const updatedCharacters = state.characters.map(char => {
          if (char.id === id) {
            const updatedChar = { ...char, ...updatedData };
            // Recalculate bonuses when stats change, including additional bonuses
            return {
              ...updatedChar,
              strengthBonus: calculateTotalBonus(updatedChar.strength, updatedChar.strengthAdditionalBonus),
              dexterityBonus: calculateTotalBonus(updatedChar.dexterity, updatedChar.dexterityAdditionalBonus),
              constitutionBonus: calculateTotalBonus(updatedChar.constitution, updatedChar.constitutionAdditionalBonus),
              intelligenceBonus: calculateTotalBonus(updatedChar.intelligence, updatedChar.intelligenceAdditionalBonus),
              wisdomBonus: calculateTotalBonus(updatedChar.wisdom, updatedChar.wisdomAdditionalBonus),
              charismaBonus: calculateTotalBonus(updatedChar.charisma, updatedChar.charismaAdditionalBonus)
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