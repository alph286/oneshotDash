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
  };
  onEdit?: () => void;
  dragHandleProps?: any;
}

const EventRenderer: React.FC<EventRendererProps> = ({ event, onEdit, dragHandleProps }) => {
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
    dragHandle
  };

  switch (event.type) {
    case 'narrative':
      return (
        <NarrativeEvent 
          title={event.title} 
          description={event.description} 
          editIcon={editIcon}
          dragHandle={dragHandle}
        />
      );
    case 'action':
      return (
        <ActionEvent 
          title={event.title} 
          description={event.description}
          editIcon={editIcon}
          dragHandle={dragHandle}
        />
      );
    case 'descriptive':
      return (
        <DescriptiveEvent 
          title={event.title} 
          description={event.description} 
          editIcon={editIcon}
          dragHandle={dragHandle}
        />
      );
    case 'reminder':
      return (
        <ReminderEvent 
          title={event.title} 
          description={event.description} 
          editIcon={editIcon}
          dragHandle={dragHandle}
        />
      );
    case 'loot':
      return (
        <LootEvent 
          title={event.title} 
          description={event.description} 
          editIcon={editIcon}
          dragHandle={dragHandle}
        />
      );
    default:
      return null;
  }
};

export default EventRenderer;