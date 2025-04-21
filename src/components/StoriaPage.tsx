import React, { useState } from 'react';
import ToolbarStoria from './storia/ToolbarStoria';
import { useStoriaStore } from '../stores/storiaStore';
import { Phase } from '../stores/storiaStore';
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
      setEditedFase({...currentFase});
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
      <div className="bg-zinc-900/50 p-6 rounded-lg">
        <h1 className="text-4xl font-bold text-amber-500 mb-6 text-left">
          {isEditing ? (
            <input
              value={editedFase?.title || ''}
              onChange={(e) => setEditedFase({...editedFase!, title: e.target.value})}
              className="bg-zinc-800 text-amber-500 p-2 rounded-lg w-full"
            />
          ) : (
            currentFase.title
          )}
        </h1>
        <p className="text-gray-300 text-left">
          {isEditing ? (
            <input
              value={editedFase?.estimatedTime || ''}
              onChange={(e) => setEditedFase({...editedFase!, estimatedTime: e.target.value})}
              className="bg-zinc-800 text-gray-300 p-2 rounded-lg w-full"
            />
          ) : (
            currentFase.estimatedTime
          )}
        </p>
      </div>
    </div>
  );
}

export default StoriaPage;