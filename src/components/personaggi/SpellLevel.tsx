import React, { useState } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { SpellChooseModal } from './SpellChooseModal';
import { Spell } from '../../stores/spellStore';
import { loadSpells } from '../../utils/loadSpells';
import { Trash2 } from 'lucide-react';

interface SpellLevelProps {
  level: string;
  spells: string[];
  onSpellsChange?: (spells: string[]) => void;
}

function SpellLevel({ level, spells, onSpellsChange }: SpellLevelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSpellModal, setShowSpellModal] = useState(false);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const levelNumber = parseInt(level.replace(/\D/g, '') || '0');

  const handleAddSpell = (spell: Spell) => {
    if (onSpellsChange && !spells.includes(spell.name)) {
      const newSpells = [...spells, spell.name];
      onSpellsChange(newSpells);
      console.log('Added spell:', spell.name); // Debug log
    }
    setShowSpellModal(false);
  };

  const handleRemoveSpell = (index: number) => {
    if (onSpellsChange) {
      const newSpells = spells.filter((_, i) => i !== index);
      onSpellsChange(newSpells);
    }
  };

  const handleSpellClick = (spellName: string) => {
    const spell = loadSpells().find(s => s.name === spellName);
    if (spell) {
      setSelectedSpell(spell);
    }
  };

  console.log('Current spells:', spells); // Debug log

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
      {spells.map((spell, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <button
            onClick={() => handleSpellClick(spell)}
            className="text-gray-300 hover:text-amber-400 text-left"
          >
            {spell}
          </button>
          <div className={isEditing ? 'visible' : 'invisible'}>
            <button
              onClick={() => handleRemoveSpell(index)}
              className="p-1 rounded hover:bg-zinc-600 transition-colors"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        </div>
      ))}

      {/* Spell Image Modal */}
      {selectedSpell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-500">{selectedSpell.name}</h2>
              <button
                onClick={() => setSelectedSpell(null)}
                className="p-1 rounded hover:bg-zinc-700"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            {selectedSpell.imageUrl && (
              <img 
                src={selectedSpell.imageUrl} 
                alt={selectedSpell.name} 
                className="max-h-[80vh] max-w-full rounded-lg"
              />
            )}
          </div>
        </div>
      )}

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