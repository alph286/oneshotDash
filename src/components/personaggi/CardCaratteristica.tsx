import React from 'react';
import type { Character } from '../../stores/characterStore';

interface CardCaratteristicaProps {
  name: string;
  field: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
  value: number;
  baseBonus: number;
  additionalBonus?: number;
  isEditing: boolean;
  onValueChange: (value: number) => void;
  onBonusChange: (value: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const CardCaratteristica: React.FC<CardCaratteristicaProps> = ({
  name,
  field,
  value,
  baseBonus,
  additionalBonus = 0,
  isEditing,
  onValueChange,
  onBonusChange,
  onKeyDown,
}) => {
  const totalBonus = baseBonus + additionalBonus;

  if (isEditing) {
    return (
      <div className="bg-zinc-800 p-3 rounded-lg text-center">
        <div className="text-lg font-bold text-amber-500 mb-2">{name}</div>
        <div className="space-y-2">
          <div>
            <label className="text-sm text-gray-400 block">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => onValueChange(parseInt(e.target.value) || 0)}
              onKeyDown={onKeyDown}
              onBlur={(e) => onValueChange(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-700 text-center rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block">Additional Bonus</label>
            <input
              type="number"
              value={additionalBonus}
              onChange={(e) => onBonusChange(parseInt(e.target.value) || 0)}
              onKeyDown={onKeyDown}
              onBlur={(e) => onBonusChange(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-700 text-center rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 p-3 rounded-lg text-center">
      <div className="text-lg font-bold text-amber-500 mb-2">{name}</div>
      <div className="text-xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-300">
        Base: {baseBonus >= 0 ? '+' : ''}{baseBonus}
      </div>
      {additionalBonus !== 0 && (
        <div className="text-sm text-amber-500">
          Bonus: {additionalBonus >= 0 ? '+' : ''}{additionalBonus}
        </div>
      )}
      <div className="text-lg font-bold text-green-500 mt-2">
        Total: {totalBonus >= 0 ? '+' : ''}{totalBonus}
      </div>
    </div>
  );
};

export default CardCaratteristica;