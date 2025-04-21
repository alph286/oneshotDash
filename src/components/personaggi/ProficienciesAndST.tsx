import React from 'react';
import { useCharacterStore } from '../../stores/characterStore';  // Add this import
import SavingThrow from './SavingThrow';
import Proficiencies from './Proficiencies';
import OtherProficiencies from './OtherProficiencies';

interface ProficienciesAndSTProps {
  characterId?: number;
  isEditing: boolean;
  onInputChange?: (field: string, value: any) => void;
  editedValue?: string;  // Add this prop
}

function ProficienciesAndST({ characterId, isEditing, onInputChange, editedValue }: ProficienciesAndSTProps) {
  const { characters } = useCharacterStore();
  const character = characterId ? characters.find(c => c.id === characterId) : null;
  
  return (
    <div className="bg-zinc-800 p-4 rounded-lg mt-4">
      <h3 className="text-lg text-left font-bold mb-4 text-amber-500">Tiri Salvezze e Competenze/Maestrie</h3>
      <div className="flex gap-4">
        <div className="w-1/6">
          <SavingThrow characterId={characterId} isEditing={isEditing} />
        </div>
        <div className="w-1/6">
          <OtherProficiencies 
            characterId={characterId} 
            isEditing={isEditing} 
            onInputChange={onInputChange}
            editedValue={editedValue}  // Use the prop directly
          />
        </div>
        <div className="w-2/3">
          <Proficiencies characterId={characterId} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
}

export default ProficienciesAndST;