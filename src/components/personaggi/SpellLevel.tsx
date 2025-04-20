import React, { useState } from 'react';
import { Pencil, Save } from 'lucide-react';
import { SpellChooseModal } from './SpellChooseModal';
import { Spell } from '../../stores/spellStore';
import { loadSpells } from '../../utils/loadSpells';

interface SpellLevelProps {
  level: string;
  spells: string[];
  onSpellsChange?: (spells: string[]) => void;
}

function SpellLevel({ level, spells, onSpellsChange }: SpellLevelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSpellModal, setShowSpellModal] = useState(false);
  const levelNumber = parseInt(level.replace(/\D/g, '') || '0');

  const handleAddSpell = (spell: Spell) => {
    if (onSpellsChange) {
      const newSpells = [...spells, spell.name];
      onSpellsChange(newSpells);
    }
    setShowSpellModal(false);
  };

  return (
    <div className="bg-zinc-700 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-md font-bold text-amber-400">{level}</h4>
        {isEditing ? (
          <button
            onClick={() => setIsEditing(false)}
            className="p-1 rounded hover:bg-zinc-600 transition-colors"
          >
            <Save size={16} className="text-green-500" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 rounded hover:bg-zinc-600 transition-colors"
          >
            <Pencil size={16} className="text-amber-500" />
          </button>
        )}
      </div>
      {!isEditing && spells.map((spell, index) => (
        <div key={index} className="mb-2">
          <p className="text-gray-300">{spell}</p>
        </div>
      ))}

      {isEditing && (
        <button
          onClick={() => setShowSpellModal(true)}
          className="w-full bg-zinc-600 hover:bg-zinc-500 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-0"
        >
          + Add Spell
        </button>
      )}

      {/* Spell Selection Modal */}
      {showSpellModal && (
        <SpellChooseModal
          level={levelNumber}
          onSelect={handleAddSpell}
          onClose={() => setShowSpellModal(false)}
        />
      )}
    </div>
  );
}

export default SpellLevel;