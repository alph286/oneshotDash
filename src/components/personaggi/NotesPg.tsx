import React from 'react';
import type { Character } from '../../stores/characterStore';

interface NotesPgProps {
  character: Character;
  isEditing: boolean;
  onInputChange: (field: keyof Character, value: any) => void;
}

function NotesPg({ character, isEditing, onInputChange }: NotesPgProps) {
  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <h3 className="text-lg text-left font-bold mb-2 text-amber-500">Notes</h3>
      {isEditing ? (
        <div>
          <label className="text-sm text-gray-400 block mb-1">Character Notes</label>
          <textarea
            value={character.notes || ''}
            onChange={(e) => onInputChange('notes', e.target.value)}
            className="w-full bg-zinc-700 rounded px-2 py-1 min-h-[400px]"
          />
        </div>
      ) : (
        <div className="columns-2 gap-8">
          <p className="text-gray-300 whitespace-pre-line text-left break-words">
            {character.notes || 'No notes available.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default NotesPg;