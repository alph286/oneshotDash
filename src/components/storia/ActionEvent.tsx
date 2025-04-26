import React from 'react';
import { Sword, Trash2, GripVertical } from 'lucide-react';
// Import the new components
import InitiativeTracker from './InitiativeTracker';
import EnemyParty from './EnemyParty';
import { useState } from 'react';

// Aggiungi l'interfaccia Enemy
interface Enemy {
  id: string;
  name: string;
  ac: number;
  hp: number;
  hpm: number;  // Aggiunta la proprietà hpm (HP massimi)
  hpt: number;
  initiative: number;
}

interface ActionEventProps {
  title: string;
  description: string;
  editIcon?: React.ReactNode; // This icon will trigger the parent to show EventEditor
  dragHandle?: React.ReactNode;
  onDelete?: () => void;
  isEditing?: boolean; // Aggiungi la prop isEditing
  // Aggiungi una prop per i dati dell'evento
  eventData?: {
    enemies?: Enemy[];
  };
  // Aggiungi una callback per salvare i dati
  onEventDataChange?: (data: any) => void;
}

const ActionEvent: React.FC<ActionEventProps> = ({
  title,
  description,
  editIcon,
  dragHandle,
  onDelete,
  isEditing = false, // Valore di default per isEditing
  eventData = {},
  onEventDataChange,
}) => {
  // Stato locale per i dati del party nemico
  const [enemyPartyData, setEnemyPartyData] = useState<Enemy[]>(eventData.enemies || []);

  // Funzione per salvare i dati del party nemico
  // Nel componente ActionEvent
  const handleSaveEnemyParty = (enemies: Enemy[]) => {
    // Aggiorna lo stato locale
    setEnemyPartyData(enemies);
    
    // Passa i dati aggiornati al componente padre
    if (onEventDataChange) {
      onEventDataChange({
        ...eventData,
        enemies
      });
    }
  };

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
     
        {/* Two-column layout with 1/3 and 2/3 proportions */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column: Initiative Tracker (1/3) */}
          <div className="col-span-1">
            <InitiativeTracker isEditing={isEditing} />
          </div>

          {/* Right Column: Enemy Party (2/3) */}
          <div className="col-span-2">
            <EnemyParty 
              isEditing={isEditing} 
              enemies={eventData.enemies || []}
              onSave={handleSaveEnemyParty}
            />
          
        </div>
      </div>
    </div>
  );
};

export default ActionEvent;