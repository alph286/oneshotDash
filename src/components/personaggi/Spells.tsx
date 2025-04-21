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

function Spells() {
  const { updateCharacter, characters } = useCharacterStore();
  const [currentCharacterId] = useState(characters[0]?.id);
  const currentCharacter = characters.find(c => c.id === currentCharacterId);

  // Initialize spells from character data or with empty arrays
  const [spells, setSpells] = useState<SpellLevels>(() => {
    return currentCharacter?.spells || {
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
  });

  // Update spells when character changes
  useEffect(() => {
    if (currentCharacter?.spells) {
      setSpells(currentCharacter.spells);
    }
  }, [currentCharacter]);

  const handleSpellsChange = (level: string, newSpells: SpellWithPrepared[]) => {
    setSpells(prev => {
      const updatedSpells = {
        ...prev,
        [level]: newSpells
      };
      
      if (currentCharacterId) {
        updateCharacter(currentCharacterId, { 
          spells: updatedSpells
        });
      }
      return updatedSpells;
    });
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg mt-4">
      <h3 className="text-lg text-left font-bold mb-2 text-amber-500">Spells</h3>
      <div className="grid grid-cols-4 gap-4">
        <SpellLevel 
          level="Cantrips" 
          spells={spells.cantrips} 
          onSpellsChange={(newSpells) => handleSpellsChange('cantrips', newSpells)} 
        />
        <SpellLevel 
          level="Level 1" 
          spells={spells.level1} 
          onSpellsChange={(newSpells) => handleSpellsChange('level1', newSpells)} 
        />
        <SpellLevel 
          level="Level 2" 
          spells={spells.level2} 
          onSpellsChange={(newSpells) => handleSpellsChange('level2', newSpells)} 
        />
        <SpellLevel 
          level="Level 3" 
          spells={spells.level3} 
          onSpellsChange={(newSpells) => handleSpellsChange('level3', newSpells)} 
        />
        <SpellLevel 
          level="Level 4" 
          spells={spells.level4} 
          onSpellsChange={(newSpells) => handleSpellsChange('level4', newSpells)} 
        />
        <SpellLevel 
          level="Level 5" 
          spells={spells.level5} 
          onSpellsChange={(newSpells) => handleSpellsChange('level5', newSpells)} 
        />
        <SpellLevel 
          level="Level 6" 
          spells={spells.level6} 
          onSpellsChange={(newSpells) => handleSpellsChange('level6', newSpells)} 
        />
        <SpellLevel 
          level="Level 7" 
          spells={spells.level7} 
          onSpellsChange={(newSpells) => handleSpellsChange('level7', newSpells)} 
        />
        <SpellLevel 
          level="Level 8" 
          spells={spells.level8} 
          onSpellsChange={(newSpells) => handleSpellsChange('level8', newSpells)} 
        />
        <SpellLevel 
          level="Level 9" 
          spells={spells.level9} 
          onSpellsChange={(newSpells) => handleSpellsChange('level9', newSpells)} 
        />
      </div>
    </div>
  );
}

export default Spells;