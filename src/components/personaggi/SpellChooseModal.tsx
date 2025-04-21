import { X } from 'lucide-react';
import { Spell } from '../../stores/spellStore';
import { loadSpells } from '../../utils/loadSpells';

interface SpellChooseModalProps {
  level: number;
  onSelect: (spell: Spell) => void;
  onClose: () => void;
  existingSpells?: string[]; // Add this prop to receive existing spells
}

export function SpellChooseModal({ level, onSelect, onClose, existingSpells = [] }: SpellChooseModalProps) {
  // Filter spells by level and exclude already added spells
  const allSpells = loadSpells()
    .filter(spell => spell.level === level)
    .filter(spell => !existingSpells.includes(spell.name));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-amber-500">Select a Spell</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-700"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {allSpells.length > 0 ? (
            allSpells.map((spell) => (
              <div
                key={spell.id}
                onClick={() => onSelect(spell)}
                className="cursor-pointer p-2 hover:bg-zinc-700 rounded-lg mb-1"
              >
                <p className="text-gray-300">{spell.name}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">No additional spells available</p>
          )}
        </div>
      </div>
    </div>
  );
}