import React, { useState } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { SpellChooseModal } from './SpellChooseModal';
import { Spell } from '../../stores/spellStore';
import { loadSpells } from '../../utils/loadSpells';
import { Trash2 } from 'lucide-react';
import { Check } from 'lucide-react';

interface SpellWithPrepared {
  name: string;
  prepared: boolean;
}

interface SpellLevelProps {
  level: string;
  spells: SpellWithPrepared[];
  onSpellsChange?: (spells: SpellWithPrepared[]) => void;
}

function SpellLevel({ level, spells, onSpellsChange }: SpellLevelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSpellModal, setShowSpellModal] = useState(false);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const levelNumber = parseInt(level.replace(/\D/g, '') || '0');

  const handleSave = () => {
    setIsEditing(false);
    // Removed redundant onSpellsChange call
  };

  const handleAddSpell = (spell: Spell) => {
    if (onSpellsChange && !spells.some(s => s.name === spell.name)) {
      // Set cantrips to always be prepared
      const isPrepared = level === "Cantrips" ? true : false;
      const newSpells = [...spells, { name: spell.name, prepared: isPrepared }];
      onSpellsChange(newSpells);
      console.log('Added spell:', spell.name);
    }
    setShowSpellModal(false);
  };

  const handleTogglePrepared = (index: number) => {
    if (onSpellsChange && level !== "Cantrips") {
      const newSpells = spells.map((spell, i) => 
        i === index ? { ...spell, prepared: !spell.prepared } : spell
      );
      onSpellsChange(newSpells);
    }
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
            onClick={handleSave}
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
      
      {/* Headers */}
      <div className="flex items-center mb-2 px-1">
        <div className="w-10 text-xs font-bold text-amber-400 text-center">P</div>
        <div className="flex-1 text-xs font-bold text-amber-400 pl-2">Spell</div>
        <div className="w-8"></div>
      </div>

      {spells.map((spell, index) => (
        <div key={index} className="flex items-center mb-2 gap-2">
          <div className="w-10 flex justify-center">
            <button
              onClick={() => isEditing && level !== "Cantrips" && handleTogglePrepared(index)}
              className={`w-5 h-5 rounded border ${
                spell.prepared || level === "Cantrips"
                  ? 'bg-amber-500 border-amber-500' + (isEditing && level !== "Cantrips" ? ' hover:bg-amber-600' : '')
                  : 'bg-transparent border-gray-500' + (isEditing ? ' hover:border-amber-500' : '')
              } flex items-center justify-center transition-colors focus:outline-none focus:ring-0 ${
                isEditing && level !== "Cantrips" ? 'cursor-pointer' : 'cursor-default'
              }`}
              disabled={!isEditing || level === "Cantrips"}
            >
              {(spell.prepared || level === "Cantrips") && <Check size={14} className="text-zinc-900" />}
            </button>
          </div>
          <button
            onClick={() => handleSpellClick(spell.name)}
            className="flex-1 text-gray-300 hover:text-amber-400 text-left pl-2"
          >
            {spell.name}
          </button>
          <div className={`w-8 flex justify-center ${isEditing ? 'visible' : 'invisible'}`}>
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
          existingSpells={spells.map(spell => spell.name)}
        />
      )}
    </div>
  );
}

export default SpellLevel;