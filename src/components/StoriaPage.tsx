import React, { useState } from 'react';
import ToolbarStoria from './storia/ToolbarStoria';
import { useStoriaStore } from '../stores/storiaStore';
import { Phase } from '../stores/storiaStore';
import HeaderStoria from './storia/HeaderStoria';
interface StoriaPageProps {
  selectedFaseId?: string;
  setCurrentPage: (page: string) => void; // Add this
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
        allFasi={fasi} // Add this
      />
    </div>
  );
}

export default StoriaPage;