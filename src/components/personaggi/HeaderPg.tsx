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
    <div className={`grid ${isEditing ? 'grid-cols-[150px_minmax(400px,1fr)_150px]' : 'grid-cols-[min-content_min-content_min-content]'} gap-6 mb-6 pb-4 border-b border-gray-700 whitespace-nowrap`}>
      {/* Level Section */}
      <div className={`text-center ${isEditing ? 'w-full' : 'w-min'}`}>
        {isEditing ? (
          <div className="space-y-3">
            <label className="block text-sm text-gray-400 mb-1">Level</label>
            <input
              type="number"
              value={character.level}
              onChange={(e) => onInputChange('level', parseInt(e.target.value))}
              className="bg-zinc-700 rounded px-2 py-1 w-20"
            />
          </div>
        ) : (
          <>
            <p className="text-gray-400">Level</p>
            <p className="text-3xl font-bold text-amber-500">{character.level}</p>
          </>
        )}
      </div>

      {/* Name, Race, Class Section */}
      <div className={`text-left ${isEditing ? 'w-full' : 'w-min'}`}>
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={character.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                onKeyDown={onKeyPress}
                className="text-3xl font-bold bg-zinc-700 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-400 mb-1">Race</label>
              <input
                type="text"
                value={character.race}
                onChange={(e) => onInputChange('race', e.target.value)}
                className="bg-zinc-700 rounded px-2 py-1 w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-400 mb-1">Class</label>
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
            <p className="text-gray-400 truncate">{character.race} - {character.class}</p>
            <h1 className="text-3xl font-bold text-amber-500 truncate">{character.name}</h1>
          </>
        )}
      </div>

      {/* Proficiency Bonus Section */}
      <div className={`text-left ${isEditing ? 'w-full' : 'w-min'}`}>
        {isEditing ? (
          <div className="space-y-3">
            <label className="block text-sm text-gray-400 mb-1">Proficiency Bonus</label>
            <input
              type="number"
              value={character.proficiencyBonus}
              onChange={(e) => onInputChange('proficiencyBonus', parseInt(e.target.value))}
              className="bg-zinc-700 rounded px-2 py-1 w-20"
            />
          </div>
        ) : (
          <>
            <p className="text-gray-400">Proficiency Bonus</p>
            <p className="text-3xl text-amber-500">+{character.proficiencyBonus}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderPg;