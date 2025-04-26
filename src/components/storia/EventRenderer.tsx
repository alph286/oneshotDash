import React from 'react';
import { Edit, GripVertical } from 'lucide-react';
import NarrativeEvent from './NarrativeEvent';
import ActionEvent from './ActionEvent';
import DescriptiveEvent from './DescriptiveEvent';
import ReminderEvent from './ReminderEvent';
import LootEvent from './LootEvent';

interface EventRendererProps {
  event: {
    id: string;
    type: 'narrative' | 'action' | 'descriptive' | 'reminder' | 'loot';
    title: string;
    description: string;
    data?: any; // Add the data property as optional
  };
  onEdit?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
  dragHandleProps?: any;
}

const EventRenderer: React.FC<EventRendererProps> = ({ 
  event, 
  onEdit, 
  onDelete,
  isEditing,
  dragHandleProps 
}) => {
  // Create edit icon
  const editIcon = onEdit ? (
    <button 
      onClick={onEdit}
      className="ml-2 text-gray-400 hover:text-amber-500"
      title="Modifica"
    >
      <Edit size={16} />
    </button>
  ) : null;

  // Create drag handle
  const dragHandle = dragHandleProps ? (
    <div 
      {...dragHandleProps} 
      className="ml-2 text-gray-400 hover:text-gray-200 cursor-grab"
      title="Trascina per riordinare"
    >
      <GripVertical size={16} />
    </div>
  ) : null;

  // Common props for all event types
  const commonProps = {
    title: event.title,
    description: event.description,
    editIcon,
    dragHandle,
    onDelete,
    isEditing
  };

  // Modifica solo la parte che riguarda ActionEvent nel componente EventRenderer
  switch (event.type) {
    // In the EventRenderer component, modify the case for 'action':
    case 'action':
      return <ActionEvent
        title={event.title}
        description={event.description}
        editIcon={editIcon}
        dragHandle={
          dragHandleProps ? (
            <div 
              {...dragHandleProps} 
              className="text-gray-400 hover:text-gray-200 cursor-grab"
              title="Trascina per riordinare"
            >
              <GripVertical size={16} />
            </div>
          ) : null
        }
        onDelete={onDelete}
        isEditing={isEditing}
        eventData={event.data || {}}
        onEventDataChange={(data) => {
          console.log('Salvando i dati dell\'evento:', data);
          
          // Aggiorna l'evento con i nuovi dati
          const updatedEvent = {
            ...event,
            data: data
          };
          
        
          
          // Qui dovresti chiamare una funzione per aggiornare l'evento nel tuo stato globale
          // Per ora, possiamo solo loggare l'evento aggiornato
          console.log('Evento aggiornato:', updatedEvent);
        }}
      />;
    case 'descriptive':
      return <DescriptiveEvent {...commonProps} />;
    case 'reminder':
      return <ReminderEvent {...commonProps} />;
    case 'loot':
      return <LootEvent {...commonProps} />;
    default:
      return null;
  }
};

export default EventRenderer;