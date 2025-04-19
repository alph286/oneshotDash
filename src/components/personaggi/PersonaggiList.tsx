import React from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import Personaggio from './Personaggio';

function PersonaggiList() {
  const characters = useCharacterStore((state) => state.characters);

  if (characters.length === 0) {
    return <div>No characters available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {characters.map(character => (
        <Personaggio key={character.id} {...character} />
      ))}
    </div>
  );
}

export default PersonaggiList;