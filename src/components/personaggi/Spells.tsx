import React, { useState, useEffect } from 'react';
import SpellLevel from './SpellLevel';
import { useCharacterStore, SpellWithPrepared } from '../../stores/characterStore';

interface SpellLevels {
  cantrips: SpellWithPrepared[];
  level1: SpellWithPrepared[];
  level2: SpellWithPrepared[];
  level3: SpellWithPrepared[];
  level4: SpellWithPrepared[];
  level5: SpellWithPrepared[];
  level6: SpellWithPrepared[];
  level7: SpellWithPrepared[];
  level8: SpellWithPrepared[];
  level9: SpellWithPrepared[];
}

// Default empty spells structure
const emptySpells: SpellLevels = {
  cantrips: [],
  level1: [],
  level2: [],
  level3: [],
  level4: [],
  level5: [],
  level6: [],
  level7: [],
  level8: [],
  level9: []
};

interface SpellsProps {
  characterId?: number;
}

function Spells({ characterId }: SpellsProps) {
  const { updateCharacter, characters } = useCharacterStore();
  const currentCharacter = characterId 
    ? characters.find(c => c.id === characterId)
    : null;

  console.log("Current character:", currentCharacter);
  console.log("Character spells:", currentCharacter?.spells);

  // Initialize spells from character data or with empty arrays
  const [spells, setSpells] = useState<SpellLevels>(() => {
    return currentCharacter?.spells || {...emptySpells};
  });

  // Update spells when character changes
  useEffect(() => {
    if (currentCharacter) {
      // Ensure all spell levels exist by merging with emptySpells
      const characterSpells = currentCharacter.spells || {};
      setSpells({
        ...emptySpells,
        ...characterSpells
      });
    } else {
      setSpells({...emptySpells});
    }
  }, [currentCharacter]);

  const handleSpellsChange = (level: keyof SpellLevels, newSpells: SpellWithPrepared[]) => {
    if (!currentCharacter) return;
    
    setSpells(prev => {
      const updatedSpells = {
        ...prev,
        [level]: newSpells
      };
      
      // Update character in store
      updateCharacter(currentCharacter.id, { 
        spells: updatedSpells
      });
      
      return updatedSpells;
    });
  };

  if (!currentCharacter) {
    return <div className="bg-zinc-800 p-4 rounded-lg mt-4">No character selected</div>;
  }

  return (
    <div className="bg-zinc-800 p-4 rounded-lg mt-4">
      <h3 className="text-lg text-left font-bold mb-2 text-amber-500">Spells</h3>
      <div className="grid grid-cols-4 gap-4">
        <SpellLevel 
          level="Cantrips" 
          spells={spells.cantrips || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('cantrips', newSpells)} 
        />
        <SpellLevel 
          level="Level 1" 
          spells={spells.level1 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level1', newSpells)} 
        />
        <SpellLevel 
          level="Level 2" 
          spells={spells.level2 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level2', newSpells)} 
        />
        <SpellLevel 
          level="Level 3" 
          spells={spells.level3 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level3', newSpells)} 
        />
        <SpellLevel 
          level="Level 4" 
          spells={spells.level4 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level4', newSpells)} 
        />
        <SpellLevel 
          level="Level 5" 
          spells={spells.level5 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level5', newSpells)} 
        />
        <SpellLevel 
          level="Level 6" 
          spells={spells.level6 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level6', newSpells)} 
        />
        <SpellLevel 
          level="Level 7" 
          spells={spells.level7 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level7', newSpells)} 
        />
        <SpellLevel 
          level="Level 8" 
          spells={spells.level8 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level8', newSpells)} 
        />
        <SpellLevel 
          level="Level 9" 
          spells={spells.level9 || []} 
          onSpellsChange={(newSpells) => handleSpellsChange('level9', newSpells)} 
        />
      </div>
    </div>
  );
}

export default Spells;