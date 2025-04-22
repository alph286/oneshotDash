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

  switch (event.type) {
    case 'narrative':
      return <NarrativeEvent {...commonProps} />;
    case 'action':
      return <ActionEvent {...commonProps} />;
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