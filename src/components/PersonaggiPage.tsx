import React from 'react';
import { useCharacterStore } from '../stores/characterStore';

interface PersonaggiPageProps {
  selectedCharacterId?: string;
}

function PersonaggiPage({ selectedCharacterId }: PersonaggiPageProps) {
  const characters = useCharacterStore(state => state.characters);
  
  // Find the selected character based on the ID
  const selectedCharacter = selectedCharacterId 
    ? characters.find(char => `character-${char.id}` === selectedCharacterId)
    : null;

  return (
    <div className="p-6">
      {selectedCharacter ? (
        // Character details view
        <div>
          <h1 className="text-3xl font-bold mb-6">{selectedCharacter.name}</h1>
          {/* We'll add more character details here in the next iteration */}
        </div>
      ) : (
        // Default view when no character is selected
        <div>
          <h1 className="text-3xl font-bold mb-6">Personaggi</h1>
          <p className="text-gray-400">Seleziona un personaggio dalla barra laterale</p>
        </div>
      )}
    </div>
  );
}

export default PersonaggiPage;