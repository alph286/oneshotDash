import React, { useState, useEffect, useRef } from 'react';

interface VariousStatProps {
  initiative: number;
  speed: number;
  darkvision: number;
  inspiration: number;
  isEditing: boolean;
  useMetric: boolean; // Add this prop
  onSpeedChange: (value: number) => void;
  onDarkvisionChange: (value: number) => void;
  onInspirationChange: (value: number) => void;
}

const VariousStat: React.FC<VariousStatProps> = ({
  initiative,
  speed,
  darkvision,
  inspiration,
  isEditing,
  useMetric,
  onSpeedChange,
  onDarkvisionChange,
  onInspirationChange,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isInitialMount = useRef(true);
  const prevUseMetric = useRef(useMetric); // Add this ref

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevUseMetric.current = useMetric; // Store initial value
    } else {
      // Only trigger animation if value actually changed
      if (prevUseMetric.current !== useMetric) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 1000);
        prevUseMetric.current = useMetric; // Update stored value
        return () => clearTimeout(timer);
      }
    }
  }, [useMetric]);

  const formatDistance = (value: number) => {
    return `${value} ${useMetric ? 'm' : 'ft'}`;
  };

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
        {/* Remove the key prop, apply animate-glow based on isAnimating state */}
        <div className={`bg-zinc-700 p-2 rounded-lg ${isAnimating ? 'animate-glow' : ''}`}>
          <div className="text-sm text-gray-400 text-center mb-1">Speed</div>
          {isEditing ? (
            <input
              type="number"
              step="0.1"
              value={speed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-600 text-center rounded px-2 py-1"
            />
          ) : (
            <div className="text-xl font-bold text-amber-500 text-center">
              {formatDistance(speed)}
            </div>
          )}
        </div>
        
        {/* Darkvision */}
         {/* Remove the key prop, apply animate-glow based on isAnimating state */}
        <div className={`bg-zinc-700 p-2 rounded-lg ${isAnimating ? 'animate-glow' : ''}`}>
          <div className="text-sm text-gray-400 text-center mb-1">Darkvision</div>
          {isEditing ? (
            <input
              type="number"
              step="0.1"
              value={darkvision}
              onChange={(e) => onDarkvisionChange(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-600 text-center rounded px-2 py-1"
            />
          ) : (
            <div className="text-xl font-bold text-amber-500 text-center">
              {darkvision > 0 ? formatDistance(darkvision) : "None"}
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