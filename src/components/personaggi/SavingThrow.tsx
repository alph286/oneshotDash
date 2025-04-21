import React from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import { Check } from 'lucide-react';

interface SavingThrowProps {
  characterId?: number;
  isEditing: boolean;  // Add this prop
}

function SavingThrow({ characterId, isEditing }: SavingThrowProps) {  // Add isEditing to props
  const { characters, updateCharacter } = useCharacterStore();
  const character = characterId ? characters.find(c => c.id === characterId) : null;
  // Remove this line as we'll use the prop instead
  // const isEditing = useCharacterStore(state => state.isEditing);

  const abilities = [
    { name: 'Forza', field: 'strength' },
    { name: 'Destrezza', field: 'dexterity' },
    { name: 'Costituzione', field: 'constitution' },
    { name: 'Intelligenza', field: 'intelligence' },
    { name: 'Saggezza', field: 'wisdom' },
    { name: 'Carisma', field: 'charisma' }
  ];

  const getModifier = (abilityField: string) => {
    if (!character) return '+0';
    
    // Get the base ability score
    const abilityScore = character[abilityField as keyof typeof character] as number || 10;
    
    // Calculate base modifier
    const baseModifier = Math.floor((abilityScore - 10) / 2);
    
    // Get additional bonus if any
    const additionalBonusField = `${abilityField}AdditionalBonus` as keyof typeof character;
    const additionalBonus = (character[additionalBonusField] as number) || 0;
    
    // Get proficiency bonus if this saving throw is proficient
    const proficiencyField = `${abilityField}SavingThrowProficiency` as keyof typeof character;
    const isProficient = character[proficiencyField] as boolean || false;
    const proficiencyBonus = isProficient ? (character.proficiencyBonus || 2) : 0;
    
    // Calculate total modifier
    const totalModifier = baseModifier + additionalBonus + proficiencyBonus;
    
    return totalModifier >= 0 ? `+${totalModifier}` : totalModifier.toString();
  };

  const handleToggleProficiency = (abilityField: string) => {
    if (!character || !isEditing) return;
    
    const proficiencyField = `${abilityField}SavingThrowProficiency` as keyof typeof character;
    const currentValue = character[proficiencyField] as boolean || false;
    
    updateCharacter(character.id, {
      ...character,
      [proficiencyField]: !currentValue
    });
  };

  if (!character) return null;

  return (
    <div className="bg-zinc-700/50 p-3 rounded-lg">
      <h4 className="text-sm font-semibold mb-2 text-amber-400 text-left">Tiri Salvezza</h4>
      <ul className="space-y-1">
        {abilities.map((ability) => {
          const proficiencyField = `${ability.field}SavingThrowProficiency` as keyof typeof character;
          const isProficient = character[proficiencyField] as boolean || false;
          
          return (
            <li key={ability.field} className="flex items-center text-sm">
              <button
                onClick={() => handleToggleProficiency(ability.field)}
                className={`w-5 h-5 rounded border ${
                  isProficient 
                    ? 'bg-amber-500 border-amber-500' + (isEditing ? ' hover:bg-amber-600' : '')
                    : 'bg-transparent border-gray-500' + (isEditing ? ' hover:border-amber-500' : '')
                } flex items-center justify-center mr-2 transition-colors focus:outline-none focus:ring-0 ${
                  isEditing ? 'cursor-pointer' : 'cursor-default'
                }`}
                disabled={!isEditing}
              >
                {isProficient ? (
                  <span className="text-zinc-900 text-xs font-bold">C</span>
                ) : null}
              </button>
              <span className={isProficient ? 'text-amber-400' : 'text-gray-300'}>
                {ability.name} ({getModifier(ability.field)})
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SavingThrow;