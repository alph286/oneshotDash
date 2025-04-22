import React from 'react';
import { BookOpen, Sword, FileText, Bell, Gem } from 'lucide-react';

interface EventSelectorProps {
  onSelect: (eventType: 'narrative' | 'action' | 'descriptive' | 'reminder' | 'loot') => void;
  onCancel: () => void;
}

const EventSelector: React.FC<EventSelectorProps> = ({ onSelect, onCancel }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">Seleziona tipo di evento</h3>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => onSelect('narrative')}
          className="flex flex-col items-center p-4 bg-zinc-700 hover:bg-amber-500/20 rounded-lg transition-colors"
        >
          <BookOpen size={32} className="mb-2 text-amber-500" />
          <span className="text-gray-200">Evento Narrativo</span>
        </button>
        <button
          onClick={() => onSelect('action')}
          className="flex flex-col items-center p-4 bg-zinc-700 hover:bg-amber-500/20 rounded-lg transition-colors"
        >
          <Sword size={32} className="mb-2 text-red-500" />
          <span className="text-gray-200">Evento d'Azione</span>
        </button>
        <button
          onClick={() => onSelect('descriptive')}
          className="flex flex-col items-center p-4 bg-zinc-700 hover:bg-amber-500/20 rounded-lg transition-colors"
        >
          <FileText size={32} className="mb-2 text-blue-500" />
          <span className="text-gray-200">Evento Descrittivo</span>
        </button>
        <button
          onClick={() => onSelect('reminder')}
          className="flex flex-col items-center p-4 bg-zinc-700 hover:bg-amber-500/20 rounded-lg transition-colors"
        >
          <Bell size={32} className="mb-2 text-purple-500" />
          <span className="text-gray-200">Evento Reminder</span>
        </button>
        <button
          onClick={() => onSelect('loot')}
          className="flex flex-col items-center p-4 bg-zinc-700 hover:bg-amber-500/20 rounded-lg transition-colors"
        >
          <Gem size={32} className="mb-2 text-green-500" />
          <span className="text-gray-200">Evento Loot</span>
        </button>
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-gray-200"
        >
          Annulla
        </button>
      </div>
    </div>
  );
};

export default EventSelector;