import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SpellWithPrepared {
  name: string;
  prepared: boolean;
}

export interface Character {
  id: number;
  name: string;
  race: string;
  class: string;
  level: number;
  alignment: string;
  proficiencyBonus: number;
  strength: number;
  strengthBonus?: number; // Base bonus derived from strength
  strengthAdditionalBonus?: number; // User-added bonus
  dexterity: number;
  dexterityBonus?: number; // Base bonus derived from dexterity
  dexterityAdditionalBonus?: number; // User-added bonus
  constitution: number;
  constitutionBonus?: number; // Base bonus derived from constitution
  constitutionAdditionalBonus?: number; // User-added bonus
  intelligence: number;
  intelligenceBonus?: number; // Base bonus derived from intelligence
  intelligenceAdditionalBonus?: number; // User-added bonus
  wisdom: number;
  wisdomBonus?: number; // Base bonus derived from wisdom
  wisdomAdditionalBonus?: number; // User-added bonus
  charisma: number;
  charismaBonus?: number; // Base bonus derived from charisma
  charismaAdditionalBonus?: number; // User-added bonus
  armorClass: number;
  initiative: number; // This will now store the total dexterity bonus
  speed: number;
  currentHP: number;
  totalHP: number;
  temporaryHP?: number;
  hitDice?: string;
  deathSavesSuccesses?: number;
  deathSavesFailures?: number;
  equipment: string;
  notes?: string;
  darkvision?: number;
  inspiration?: number;
  showNotes?: boolean;
  showSpells?: boolean;
  otherProficiencies?: string;
  spells?: {
    cantrips: SpellWithPrepared[];
    level1: SpellWithPrepared[];
    level2: SpellWithPrepared[];
    level3: SpellWithPrepared[];
    level4: SpellWithPrepared[];
    level5: SpellWithPrepared[];
    level6: SpellWithPrepared[];
    level7: SpellWithPrepared[];
    level8: SpellWithPrepared[];
    level9: SpellWithPrepared[];
  };
  acrobaticsProficiency?: boolean;
  acrobaticsMastery?: boolean;
  animalHandlingProficiency?: boolean;
  animalHandlingMastery?: boolean;
  arcanaProficiency?: boolean;
  arcanaMastery?: boolean;
  athleticsProficiency?: boolean;
  athleticsMastery?: boolean;
  stealthProficiency?: boolean;
  stealthMastery?: boolean;
  investigationProficiency?: boolean;
  investigationMastery?: boolean;
  deceptionProficiency?: boolean;
  deceptionMastery?: boolean;
  intimidationProficiency?: boolean;
  intimidationMastery?: boolean;
  performanceProficiency?: boolean;
  performanceMastery?: boolean;
  insightProficiency?: boolean;
  insightMastery?: boolean;
  medicineProficiency?: boolean;
  medicineMastery?: boolean;
  natureProficiency?: boolean;
  natureMastery?: boolean;
  perceptionProficiency?: boolean;
  perceptionMastery?: boolean;
  persuasionProficiency?: boolean;
  persuasionMastery?: boolean;
  sleightOfHandProficiency?: boolean;
  sleightOfHandMastery?: boolean;
  religionProficiency?: boolean;
  religionMastery?: boolean;
  survivalProficiency?: boolean;
  survivalMastery?: boolean;
  historyProficiency?: boolean;
  historyMastery?: boolean;
}


interface CharacterStore {
  characters: Character[];
  addCharacter: (character: Omit<Character, 'id'>) => void;
  updateCharacter: (id: number, updatedData: Partial<Character>) => void;
  deleteCharacter: (id: number) => void;
}

// Helper function to calculate bonus
const calculateBonus = (value: number): number => Math.floor((value - 10) / 2);

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      characters: [],
      addCharacter: (characterData) => {
        const newId = get().characters.length > 0 ? Math.max(...get().characters.map(c => c.id)) + 1 : 1;
        
        // Calculate initial bonuses and initiative
        const dexterity = characterData.dexterity || 0;
        const dexBaseBonus = calculateBonus(dexterity);
        const dexAdditionalBonus = characterData.dexterityAdditionalBonus || 0;
        const initiative = dexBaseBonus + dexAdditionalBonus;

        const newCharacter: Character = {
          ...characterData,
          id: newId,
          strengthBonus: calculateBonus(characterData.strength || 0),
          dexterityBonus: dexBaseBonus,
          constitutionBonus: calculateBonus(characterData.constitution || 0),
          intelligenceBonus: calculateBonus(characterData.intelligence || 0),
          wisdomBonus: calculateBonus(characterData.wisdom || 0),
          charismaBonus: calculateBonus(characterData.charisma || 0),
          initiative: initiative, // Set calculated initiative
        };
        set((state) => ({ characters: [...state.characters, newCharacter] }));
      },
      updateCharacter: (id, updatedData) => {
        set((state) => {
          const characters = state.characters.map((char) => {
            if (char.id === id) {
              const mergedData = { ...char, ...updatedData };

              // Recalculate base bonuses based on updated values
              const strength = mergedData.strength || 0;
              const dexterity = mergedData.dexterity || 0;
              const constitution = mergedData.constitution || 0;
              const intelligence = mergedData.intelligence || 0;
              const wisdom = mergedData.wisdom || 0;
              const charisma = mergedData.charisma || 0;

              mergedData.strengthBonus = calculateBonus(strength);
              mergedData.dexterityBonus = calculateBonus(dexterity);
              mergedData.constitutionBonus = calculateBonus(constitution);
              mergedData.intelligenceBonus = calculateBonus(intelligence);
              mergedData.wisdomBonus = calculateBonus(wisdom);
              mergedData.charismaBonus = calculateBonus(charisma);

              // Recalculate initiative based on updated dexterity and its additional bonus
              const dexBaseBonus = mergedData.dexterityBonus;
              const dexAdditionalBonus = mergedData.dexterityAdditionalBonus || 0;
              mergedData.initiative = dexBaseBonus + dexAdditionalBonus;

              return mergedData;
            }
            return char;
          });
          return { characters };
        });
      },
      deleteCharacter: (id) => {
        set((state) => ({
          characters: state.characters.filter((char) => char.id !== id),
        }));
      },
    }),
    {
      name: 'character-storage', // name of the item in the storage (must be unique)
    }
  )
);
