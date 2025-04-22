import React from 'react';
import { Bell } from 'lucide-react';

interface ReminderEventProps {
  title: string;
  description: string;
  onEdit?: () => void;
}

const ReminderEvent: React.FC<ReminderEventProps> = ({ title, description, onEdit }) => {
  return (
    <div className="bg-zinc-800/50 p-4 rounded-lg mb-4 border-l-4 border-purple-500">
      <div className="flex items-center mb-2">
        <Bell size={20} className="text-purple-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        {onEdit && (
          <button 
            onClick={onEdit}
            className="ml-auto text-gray-400 hover:text-purple-500"
          >
            Modifica
          </button>
        )}
      </div>
      <p className="text-gray-300 whitespace-pre-wrap">{description}</p>
    </div>
  );
};

export default ReminderEvent;