import React from 'react';

interface VariousStatProps {
  // Remove dexterityTotalBonus
  initiative: number; // This now represents the total dexterity bonus
  speed: number;
  darkvision: number;
  inspiration: number;
  isEditing: boolean;
  // Remove onInitiativeChange
  onSpeedChange: (value: number) => void;
  onDarkvisionChange: (value: number) => void;
  onInspirationChange: (value: number) => void;
}

const VariousStat: React.FC<VariousStatProps> = ({
  initiative, // Use initiative directly
  speed,
  darkvision,
  inspiration,
  isEditing,
  onSpeedChange,
  onDarkvisionChange,
  onInspirationChange,
}) => {
  // Remove internal initiative calculation
  // const totalInitiative = dexterityTotalBonus + initiative; 
  
  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold text-amber-500 mb-3">Character Stats</h3>
      
      <div className="grid grid-cols-4 gap-3">
        {/* Initiative */}
        <div className="bg-zinc-700 p-2 rounded-lg">
          <div className="text-sm text-gray-400 text-center mb-1">Initiative</div>
          {/* Display initiative directly. No editing needed here as it's derived. */}
          <div className="text-xl font-bold text-amber-500 text-center">
            {initiative >= 0 ? `+${initiative}` : initiative}
          </div>
        </div>
        
        {/* Speed */}
        <div className="bg-zinc-700 p-2 rounded-lg">
          <div className="text-sm text-gray-400 text-center mb-1">Speed</div>
          {isEditing ? (
            <input
              type="number"
              value={speed}
              onChange={(e) => onSpeedChange(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-600 text-center rounded px-2 py-1"
            />
          ) : (
            <div className="text-xl font-bold text-amber-500 text-center">
              {speed} ft
            </div>
          )}
        </div>
        
        {/* Darkvision */}
        <div className="bg-zinc-700 p-2 rounded-lg">
          <div className="text-sm text-gray-400 text-center mb-1">Darkvision</div>
          {isEditing ? (
            <input
              type="number"
              value={darkvision}
              onChange={(e) => onDarkvisionChange(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-600 text-center rounded px-2 py-1"
            />
          ) : (
            <div className="text-xl font-bold text-amber-500 text-center">
              {darkvision > 0 ? `${darkvision} ft` : "None"}
            </div>
          )}
        </div>
        
        {/* Inspiration */}
        <div className="bg-zinc-700 p-2 rounded-lg">
          <div className="text-sm text-gray-400 text-center mb-1">Inspiration</div>
          {isEditing ? (
            <input
              type="number"
              value={inspiration}
              onChange={(e) => onInspirationChange(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-600 text-center rounded px-2 py-1"
            />
          ) : (
            <div className="text-xl font-bold text-amber-500 text-center">
              {inspiration}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariousStat;