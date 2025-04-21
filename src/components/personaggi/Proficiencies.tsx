import React from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import { Check } from 'lucide-react';

interface ProficienciesProps {
  characterId?: number;
  isEditing: boolean;
}

function Proficiencies({ characterId, isEditing }: ProficienciesProps) {
  const { characters, updateCharacter } = useCharacterStore();
  const character = characterId ? characters.find(c => c.id === characterId) : null;

  const skills = [
    { name: 'Acrobazia', ability: 'dexterity', field: 'acrobatics' },
    { name: 'Addestrare Animali', ability: 'wisdom', field: 'animalHandling' },
    { name: 'Arcano', ability: 'intelligence', field: 'arcana' },
    { name: 'Atletica', ability: 'strength', field: 'athletics' },
    { name: 'Furtività', ability: 'dexterity', field: 'stealth' },
    { name: 'Indagare', ability: 'intelligence', field: 'investigation' },
    { name: 'Inganno', ability: 'charisma', field: 'deception' },
    { name: 'Intimidire', ability: 'charisma', field: 'intimidation' },
    { name: 'Intrattenere', ability: 'charisma', field: 'performance' },
    { name: 'Intuizione', ability: 'wisdom', field: 'insight' },
    { name: 'Medicina', ability: 'wisdom', field: 'medicine' },
    { name: 'Natura', ability: 'intelligence', field: 'nature' },
    { name: 'Percezione', ability: 'wisdom', field: 'perception' },
    { name: 'Persuasione', ability: 'charisma', field: 'persuasion' },
    { name: 'Rapidità di Mano', ability: 'dexterity', field: 'sleightOfHand' },
    { name: 'Religione', ability: 'intelligence', field: 'religion' },
    { name: 'Sopravvivenza', ability: 'wisdom', field: 'survival' },
    { name: 'Storia', ability: 'intelligence', field: 'history' }
  ];

  const abilityShortNames: Record<string, string> = {
    'strength': 'For',
    'dexterity': 'Des',
    'constitution': 'Cos',
    'intelligence': 'Int',
    'wisdom': 'Sag',
    'charisma': 'Car'
  };

  const getModifier = (abilityField: string): number => {
    if (!character) return 0;
    
    const abilityScore = character[abilityField as keyof typeof character] as number || 10;
    const baseModifier = Math.floor((abilityScore - 10) / 2);
    const additionalBonusField = `${abilityField}AdditionalBonus` as keyof typeof character;
    const additionalBonus = (character[additionalBonusField] as number) || 0;
    
    return baseModifier + additionalBonus;
  };

  const getSkillModifier = (skill: typeof skills[0]): string => {
    if (!character) return '+0';
    
    const baseModifier = getModifier(skill.ability);
    const proficiencyBonus = character.proficiencyBonus || 2;
    
    const proficiencyField = `${skill.field}Proficiency` as keyof typeof character;
    const masteryField = `${skill.field}Mastery` as keyof typeof character;
    
    const isProficient = character[proficiencyField] as boolean || false;
    const hasMastery = character[masteryField] as boolean || false;
    
    let totalModifier = baseModifier;
    if (isProficient) totalModifier += proficiencyBonus;
    if (hasMastery) totalModifier += proficiencyBonus;
    
    return totalModifier >= 0 ? `+${totalModifier}` : totalModifier.toString();
  };

  const handleToggleProficiency = (field: string, type: 'proficiency' | 'mastery') => {
    if (!character || !isEditing) return;
    
    const toggleField = `${field}${type === 'mastery' ? 'Mastery' : 'Proficiency'}` as keyof typeof character;
    const currentValue = character[toggleField] as boolean || false;
    
    // Log the current state before update
    console.log('Character before update:', character);
    console.log(`Current value of ${toggleField}:`, currentValue);
    
    // Create a new object for updates
    const updates: any = {};
    updates[toggleField as string] = !currentValue;

    if (type === 'mastery' && !currentValue) {
      const proficiencyField = `${field}Proficiency` as keyof typeof character;
      updates[proficiencyField as string] = true;
    }
    
    // Log the updates to verify they're correct
    console.log(`Updating ${field} ${type}:`, updates);
    
    updateCharacter(character.id, {
      ...character,
      ...updates
    });
    
    // Verify the update was applied correctly after a short delay
    setTimeout(() => {
      const updatedCharacter = characters.find(c => c.id === character.id);
      console.log('Character after update:', updatedCharacter);
      console.log(`New value of ${toggleField}:`, updatedCharacter?.[toggleField as keyof typeof updatedCharacter]);
    }, 100);
  };

  if (!character) return null;

  return (
    <div className="bg-zinc-700/50 p-3 rounded-lg">
      <h4 className="text-sm font-semibold mb-2 text-amber-400 text-left">Abilità</h4>
      <div className="grid grid-cols-3 gap-x-2 gap-y-1">
        {skills.map((skill) => {
          const isProficient = character[`${skill.field}Proficiency` as keyof typeof character] as boolean || false;
          const hasMastery = character[`${skill.field}Mastery` as keyof typeof character] as boolean || false;
          
          return (
            <div key={skill.field} className="flex items-center text-sm">
              {/* Mastery Checkbox */}
              <button
                onClick={() => handleToggleProficiency(skill.field, 'mastery')}
                className={`w-5 h-5 rounded border ${
                  hasMastery 
                    ? 'bg-amber-500 border-amber-500' + (isEditing ? ' hover:bg-amber-600' : '')
                    : 'bg-transparent border-gray-500' + (isEditing ? ' hover:border-amber-500' : '')
                } flex items-center justify-center mr-1 transition-colors focus:outline-none focus:ring-0 ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                }`}
                disabled={!isEditing}
              >
                {hasMastery && <span className="text-zinc-900 text-xs font-bold">M</span>}
              </button>
              
              {/* Proficiency Checkbox */}
              <button
                onClick={() => handleToggleProficiency(skill.field, 'proficiency')}
                className={`w-5 h-5 rounded border ${
                  isProficient 
                    ? 'bg-amber-500 border-amber-500' + (isEditing ? ' hover:bg-amber-600' : '')
                    : 'bg-transparent border-gray-500' + (isEditing ? ' hover:border-amber-500' : '')
                } flex items-center justify-center mr-2 transition-colors focus:outline-none focus:ring-0 ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                }`}
                disabled={!isEditing || hasMastery}
              >
                {isProficient && <span className="text-zinc-900 text-xs font-bold">C</span>}
              </button>
              
              <span className={`${isProficient || hasMastery ? 'text-amber-400' : 'text-gray-300'} truncate`}>
                {skill.name} ({abilityShortNames[skill.ability]}) ({getSkillModifier(skill)})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Proficiencies;