import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import EventSelector from './EventSelector';
import { useStoriaStore } from '../../stores/storiaStore';

interface AddEventButtonProps {
  phaseId: string;
}

const AddEventButton: React.FC<AddEventButtonProps> = ({ phaseId }) => {
  const [showSelector, setShowSelector] = useState(false);
  const addEvent = useStoriaStore(state => state.addEvent);

  const handleSelectEventType = (eventType: 'narrative' | 'action' | 'descriptive' | 'reminder' | 'loot') => {
    // Create default titles based on event type
    let defaultTitle = '';
    switch (eventType) {
      case 'narrative':
        defaultTitle = 'Nuovo Evento Narrativo';
        break;
      case 'action':
        defaultTitle = 'Nuovo Evento d\'Azione';
        break;
      case 'descriptive':
        defaultTitle = 'Nuovo Evento Descrittivo';
        break;
      case 'reminder':
        defaultTitle = 'Nuovo Reminder';
        break;
      case 'loot':
        defaultTitle = 'Nuovo Loot';
        break;
    }
    
    // Create a new event with the selected type
    const newEvent = {
      type: eventType,
      title: defaultTitle,
      description: '',
      timestamp: new Date(),
      position: 0 // This will be set by the store
    };
    
    addEvent(phaseId, newEvent);
    setShowSelector(false);
  };

  return (
    <div className="my-4 relative">
      {!showSelector ? (
        <button
          onClick={() => setShowSelector(true)}
          className="flex items-center justify-center w-full p-3 border-2 border-dashed border-zinc-700 rounded-lg hover:border-amber-500 text-gray-400 hover:text-amber-500 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Aggiungi Evento
        </button>
      ) : (
        <div className="absolute z-10 w-full">
          <EventSelector 
            onSelect={handleSelectEventType} 
            onCancel={() => setShowSelector(false)} 
          />
        </div>
      )}
    </div>
  );
};

export default AddEventButton;