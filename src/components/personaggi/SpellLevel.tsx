import React from 'react';

interface SpellLevelProps {
  level: string;
  spells: string[];
  isEditing: boolean;
  onSpellsChange?: (spells: string[]) => void;
}

function SpellLevel({ level, spells, isEditing, onSpellsChange }: SpellLevelProps) {
  const handleSpellChange = (index: number, value: string) => {
    if (isEditing && onSpellsChange) {
      const newSpells = [...spells];
      newSpells[index] = value;
      onSpellsChange(newSpells);
    }
  };

  return (
    <div className="bg-zinc-700 p-4 rounded-lg shadow-md">
      <h4 className="text-md text-left font-bold text-amber-400 mb-2">{level}</h4>
      {spells.map((spell, index) => (
        <div key={index} className="mb-2">
          {isEditing ? (
            <input
              type="text"
              value={spell}
              onChange={(e) => handleSpellChange(index, e.target.value)}
              className="w-full bg-zinc-600 rounded px-2 py-1"
            />
          ) : (
            <p className="text-gray-300">{spell}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default SpellLevel;