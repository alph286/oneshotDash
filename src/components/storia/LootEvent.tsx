import React from 'react';
import { Gem } from 'lucide-react';

interface LootEventProps {
  title: string;
  description: string;
  editIcon?: React.ReactNode;
  dragHandle?: React.ReactNode;
}

const LootEvent: React.FC<LootEventProps> = ({ 
  title, 
  description, 
  editIcon, 
  dragHandle 
}) => {
  return (
    <div className="bg-zinc-800/50 p-4 rounded-lg mb-4 border-l-4 border-green-500">
      <div className="flex items-center mb-2">
        <Gem size={20} className="text-green-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <div className="ml-auto flex items-center">
          {editIcon}
          {dragHandle}
        </div>
      </div>
      <p className="text-gray-300 whitespace-pre-wrap">{description}</p>
    </div>
  );
};

export default LootEvent;