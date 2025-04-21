import React from 'react';
import { useCharacterStore } from '../../stores/characterStore';

interface OtherProficienciesProps {
  characterId?: number;
  isEditing: boolean;
  onInputChange?: (field: string, value: string) => void;
  editedValue?: string;  // Add this prop
}

function OtherProficiencies({ characterId, isEditing, onInputChange, editedValue }: OtherProficienciesProps) {
  const { characters } = useCharacterStore();
  const character = characterId ? characters.find(c => c.id === characterId) : null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!character || !isEditing || !onInputChange) return;
    onInputChange('otherProficiencies', e.target.value);
  };

  if (!character) return null;

  return (
    <div className="bg-zinc-700/50 p-3 rounded-lg h-full">
      <h4 className="text-sm font-semibold mb-2 text-amber-400 text-left">Altre Competenze</h4>
      <textarea
        className="w-full h-[calc(100%-2rem)] bg-zinc-800/50 text-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-1 focus:ring-amber-500"
        value={isEditing ? (editedValue || '') : (character.otherProficiencies || '')}
        onChange={handleChange}
        placeholder="Lingue, strumenti, armi, armature..."
        disabled={!isEditing}
      />
    </div>
  );
}

export default OtherProficiencies;