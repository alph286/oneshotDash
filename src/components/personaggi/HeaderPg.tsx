import React from 'react';
import type { Character } from '../../stores/characterStore';

interface HeaderPgProps {
  character: Character;
  isEditing: boolean;
  onInputChange: (field: keyof Character, value: any) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function HeaderPg({ character, isEditing, onInputChange, onKeyPress }: HeaderPgProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-gray-700">
      <div>
        {isEditing ? (
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input
                type="text"
                value={character.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                onKeyDown={onKeyPress}
                className="text-3xl font-bold bg-zinc-700 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Race</label>
              <input
                type="text"
                value={character.race}
                onChange={(e) => onInputChange('race', e.target.value)}
                className="bg-zinc-700 rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Class</label>
              <input
                type="text"
                value={character.class}
                onChange={(e) => onInputChange('class', e.target.value)}
                className="bg-zinc-700 rounded px-2 py-1 w-full"
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-amber-500">{character.name}</h1>
            <p className="text-gray-400">{character.race} {character.class}</p>
          </>
        )}
      </div>
      <div className="text-center">
        {isEditing ? (
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-400">Level</label>
              <input
                type="number"
                value={character.level}
                onChange={(e) => onInputChange('level', parseInt(e.target.value))}
                className="bg-zinc-700 rounded px-2 py-1 w-full text-center"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Alignment</label>
              <input
                type="text"
                value={character.alignment}
                onChange={(e) => onInputChange('alignment', e.target.value)}
                className="bg-zinc-700 rounded px-2 py-1 w-full text-center"
              />
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-400">Level {character.level}</p>
            <p className="text-gray-400">{character.alignment}</p>
          </>
        )}
      </div>
      <div className="text-right">
        {isEditing ? (
          <div>
            <label className="text-sm text-gray-400">Proficiency Bonus</label>
            <input
              type="number"
              value={character.proficiencyBonus}
              onChange={(e) => onInputChange('proficiencyBonus', parseInt(e.target.value))}
              className="bg-zinc-700 rounded px-2 py-1 w-full text-right"
            />
          </div>
        ) : (
          <>
            <p className="text-gray-400">Proficiency Bonus</p>
            <p className="text-xl text-amber-500">+{character.proficiencyBonus}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderPg;