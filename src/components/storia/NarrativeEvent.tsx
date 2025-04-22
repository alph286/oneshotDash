import React, { useEffect } from 'react';
import { BookOpen, Trash2 } from 'lucide-react';

interface NarrativeEventProps {
  title: string;
  description: string;
  editIcon?: React.ReactNode;
  dragHandle?: React.ReactNode;
  onDelete?: () => void;
  isEditing?: boolean;
}

const NarrativeEvent: React.FC<NarrativeEventProps> = ({ 
  title, 
  description, 
  editIcon, 
  dragHandle,
  onDelete,
  isEditing = false
}) => {
  // Add debug log to check if isEditing is true when expected
  useEffect(() => {
    console.log(`NarrativeEvent "${title}" - isEditing:`, isEditing);
    console.log(`NarrativeEvent "${title}" - onDelete:`, !!onDelete);
  }, [isEditing, title, onDelete]);

  return (
    <div className="bg-zinc-800/50 p-4 rounded-lg mb-4 border-l-4 border-amber-500">
      <div className="flex items-center mb-2">
        <BookOpen size={20} className="text-amber-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <div className="ml-auto flex items-center gap-2">
          {dragHandle}
          {editIcon}
          {onDelete && (
            <button 
              onClick={onDelete}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              title="Delete event"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
      <div className="text-gray-200 text-left">
        <div 
          className="bg-stone-800 p-2 rounded"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

export default NarrativeEvent;