import React from 'react';

interface HitPointsProps {
  currentHP: number;
  totalHP: number;
  temporaryHP: number;
  isEditing: boolean;
  onCurrentHPChange: (value: number) => void;
  onTotalHPChange: (value: number) => void;
  onTemporaryHPChange: (value: number) => void;
}

const HitPoints: React.FC<HitPointsProps> = ({
  currentHP,
  totalHP,
  temporaryHP,
  isEditing,
  onCurrentHPChange,
  onTotalHPChange,
  onTemporaryHPChange,
}) => {
  return (
    <div className="bg-zinc-800 p-3 rounded-lg flex flex-col">
      <div className="text-lg font-bold text-amber-500 mb-3">Hit Points</div>
      
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-sm text-gray-400 block">Current HP</label>
              <input
                type="number"
                value={currentHP}
                onChange={(e) => onCurrentHPChange(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-700 text-center rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block">Max HP</label>
              <input
                type="number"
                value={totalHP}
                onChange={(e) => onTotalHPChange(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-700 text-center rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block">Temp HP</label>
              <input
                type="number"
                value={temporaryHP}
                onChange={(e) => onTemporaryHPChange(parseInt(e.target.value) || 0)}
                className="w-full bg-zinc-700 text-center rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="text-sm text-gray-400">Current</div>
            <div className="text-sm text-gray-400">Max</div>
            <div className="text-sm text-gray-400">Temp</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="text-2xl font-bold text-amber-500">{currentHP}</div>
            <div className="text-2xl font-bold text-white">{totalHP}</div>
            <div className="text-2xl font-bold text-green-500">{temporaryHP > 0 ? `+${temporaryHP}` : temporaryHP}</div>
          </div>
          <div className="mt-2 bg-zinc-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full" 
              style={{ width: `${Math.min(100, (currentHP / totalHP) * 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HitPoints;