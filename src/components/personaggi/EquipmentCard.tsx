import React from 'react';
import type { Character } from '../../stores/characterStore';

interface EquipmentCardProps {
  armorClass: number;
  equipment: string;
  isEditing: boolean;
  onArmorClassChange: (value: number) => void;
  onEquipmentChange: (value: string) => void;
  className?: string; // Add optional className prop
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  armorClass,
  equipment,
  isEditing,
  onArmorClassChange,
  onEquipmentChange,
  className = '', // Default to empty string
}) => {
  return (
    <div className={`bg-zinc-800 p-4 rounded-lg flex flex-col ${className} equipaggiamento h-full`}>
      <h3 className="text-lg font-bold mb-3 text-amber-500">Equipment</h3>
      
      <div className="mb-3">
        <div className="text-sm text-gray-400">Armor Class</div>
        {isEditing ? (
          <input
            type="number"
            value={armorClass}
            onChange={(e) => onArmorClassChange(parseInt(e.target.value) || 0)}
            className="bg-zinc-700 rounded px-2 py-1 w-full text-center mt-1"
          />
        ) : (
          <div className="text-2xl font-bold text-amber-500 mb-2">{armorClass}</div>
        )}
      </div>
      
      <div className="flex-grow flex flex-col"> 
        <div className="text-sm text-gray-400 mb-1">Equipment Details</div>
        {isEditing ? (
          <textarea
            value={equipment}
            onChange={(e) => onEquipmentChange(e.target.value)}
            className="w-full bg-zinc-700 rounded px-2 py-1 flex-grow"
            placeholder="List your equipment here..."
          />
        ) : (
          <p className="text-gray-300 whitespace-pre-line">
            {equipment || 'No equipment details available.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default EquipmentCard;