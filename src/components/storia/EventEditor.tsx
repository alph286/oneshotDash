import React, { useState } from 'react';
import { BookOpen, Sword, FileText, Bell, Gem, Save, X } from 'lucide-react';

interface Event {
  id: string;
  type: 'narrative' | 'action' | 'descriptive' | 'reminder' | 'loot';
  title: string;
  description: string;
}

interface EventEditorProps {
  event: Event;
  onSave: (updatedEvent: Partial<Event>) => void;
  onCancel: () => void;
}

const EventEditor: React.FC<EventEditorProps> = ({ event, onSave, onCancel }) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description || '');

  const handleSave = () => {
    onSave({ title, description });
  };

  // Get icon and color based on event type
  const getEventTypeInfo = () => {
    switch (event.type) {
      case 'narrative':
        return { icon: <BookOpen size={20} className="text-amber-500 mr-2" />, color: 'border-amber-500' };
      case 'action':
        return { icon: <Sword size={20} className="text-red-500 mr-2" />, color: 'border-red-500' };
      case 'descriptive':
        return { icon: <FileText size={20} className="text-blue-500 mr-2" />, color: 'border-blue-500' };
      case 'reminder':
        return { icon: <Bell size={20} className="text-purple-500 mr-2" />, color: 'border-purple-500' };
      case 'loot':
        return { icon: <Gem size={20} className="text-green-500 mr-2" />, color: 'border-green-500' };
      default:
        return { icon: <FileText size={20} className="text-gray-500 mr-2" />, color: 'border-gray-500' };
    }
  };

  const { icon, color } = getEventTypeInfo();

  return (
    <div className={`bg-zinc-800/50 p-4 rounded-lg mb-4 border-l-4 ${color}`}>
      <div className="flex items-center mb-4">
        {icon}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow bg-zinc-700 text-gray-200 p-2 rounded-lg"
          placeholder="Titolo evento"
        />
        <button 
          onClick={handleSave}
          className="ml-2 p-2 bg-amber-500 text-zinc-900 rounded-lg hover:bg-amber-600"
        >
          <Save size={16} />
        </button>
        <button 
          onClick={onCancel}
          className="ml-2 p-2 bg-zinc-700 text-gray-400 rounded-lg hover:bg-zinc-600"
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Only show description field for events that need it */}
      {event.type !== 'action' && (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-zinc-700 text-gray-200 p-3 rounded-lg min-h-[100px]"
          placeholder="Descrizione evento"
        />
      )}
    </div>
  );
};

export default EventEditor;