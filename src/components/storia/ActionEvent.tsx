import React from 'react';
import { Sword, Trash2 } from 'lucide-react';
// Import the new components
import InitiativeTracker from './InitiativeTracker';
import EnemyParty from './EnemyParty';

interface ActionEventProps {
  title: string;
  description: string;
  editIcon?: React.ReactNode; // This icon will trigger the parent to show EventEditor
  dragHandle?: React.ReactNode;
  onDelete?: () => void;
  // isEditing prop is no longer needed here for description editing
  // onDescriptionChange prop is no longer needed here
}

const ActionEvent: React.FC<ActionEventProps> = ({
  title,
  description,
  editIcon,
  dragHandle,
  onDelete,
}) => {
  return (
    <div className="bg-zinc-800/50 p-4 rounded-lg mb-4 border-l-4 border-red-500">
      <div className="flex items-center mb-2">
        <Sword size={20} className="text-red-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <div className="ml-auto flex items-center gap-2">
          {dragHandle}
          {editIcon} {/* The parent component handles the click on this */}
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
      {/* Always display the description, editing is handled by EventEditor */}
      <div className="text-gray-200 text-left mb-4">
        <div
          className="bg-stone-800 p-2 rounded prose prose-invert max-w-none" // Added prose classes for basic styling
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Initiative Tracker */}
        <InitiativeTracker />

        {/* Right Column: Enemy Party */}
        <EnemyParty />
      </div>
    </div>
  );
};

export default ActionEvent;