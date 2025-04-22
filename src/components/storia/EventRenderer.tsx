import React from 'react';
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
}

const EventRenderer: React.FC<EventRendererProps> = ({ event, onEdit }) => {
  switch (event.type) {
    case 'narrative':
      return (
        <NarrativeEvent 
          title={event.title} 
          description={event.description} 
          onEdit={onEdit} 
        />
      );
    case 'action':
      return (
        <ActionEvent 
          title={event.title} 
          onEdit={onEdit} 
        />
      );
    case 'descriptive':
      return (
        <DescriptiveEvent 
          title={event.title} 
          description={event.description} 
          onEdit={onEdit} 
        />
      );
    case 'reminder':
      return (
        <ReminderEvent 
          title={event.title} 
          description={event.description} 
          onEdit={onEdit} 
        />
      );
    case 'loot':
      return (
        <LootEvent 
          title={event.title} 
          description={event.description} 
          onEdit={onEdit} 
        />
      );
    default:
      return null;
  }
};

export default EventRenderer;