import React, { useState } from 'react';
import ToolbarStoria from './storia/ToolbarStoria';
import { useStoriaStore } from '../stores/storiaStore';
import { Phase } from '../stores/storiaStore';
import HeaderStoria from './storia/HeaderStoria';
import AddEventButton from './storia/AddEventButton';
import EventRenderer from './storia/EventRenderer';

interface StoriaPageProps {
  selectedFaseId?: string;
  setCurrentPage: (page: string) => void;
}

function StoriaPage({ selectedFaseId, setCurrentPage }: StoriaPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const fasi = useStoriaStore(state => state.phases);
  const currentFase = fasi.find(fase => fase.id === selectedFaseId);
  const removePhase = useStoriaStore(state => state.removePhase);
  const updatePhase = useStoriaStore(state => state.updatePhase);
  const [editedFase, setEditedFase] = useState<Phase | null>(null);

  const handleEdit = () => {
    if (currentFase) {
      setEditedFase({
        ...currentFase,
        title: currentFase.title || 'Titolo' // Set default title if empty
      });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editedFase && currentFase) {
      updatePhase(currentFase.id, editedFase);
      setIsEditing(false);
    }
  };
  const handleExport = () => console.log('Exporting storia...');
  const handleDelete = () => {
    if (currentFase && window.confirm(`Delete fase "${currentFase.title}"?`)) {
      removePhase(currentFase.id);
      setCurrentPage('storia'); // Redirect back to main storia page
    }
  };

  const handleEditChange = (field: keyof Phase, value: string | number) => {
    if (editedFase) {
      setEditedFase({...editedFase, [field]: value});
    }
  };

  if (!currentFase) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 ">Storia Page</h1>
        <p>Select a fase from the sidebar</p>
      </div>
    );
  }

  // Sort events by position
  const sortedEvents = [...(currentFase.events || [])].sort((a, b) => a.position - b.position);

  return (
    <div>
      <ToolbarStoria
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onExport={handleExport}
        onDelete={handleDelete}
      />
      <HeaderStoria
        fase={currentFase}
        isEditing={isEditing}
        editedFase={editedFase}
        onEditChange={handleEditChange}
        allFasi={fasi}
      />
      
      {/* Add Event Button */}
      <div className="px-6 mt-6">
        <AddEventButton phaseId={currentFase.id} />
        
        {/* Render Events */}
        <div className="mt-6">
          {sortedEvents.length === 0 ? (
            <p className="text-gray-400 italic">Nessun evento. Aggiungi un evento per iniziare.</p>
          ) : (
            sortedEvents.map(event => (
              <EventRenderer 
                key={event.id} 
                event={event} 
                onEdit={() => {
                  // Handle edit functionality here
                  console.log('Edit event', event.id);
                }} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default StoriaPage;