import React, { useState } from 'react';
import SpellLevel from './SpellLevel';

function Spells() {
  const [isEditing, setIsEditing] = useState(false);
  const [spells, setSpells] = useState({
    cantrips: ['', '', ''],
    level1: ['', '', ''],
    level2: ['', '', ''],
    level3: ['', '', ''],
    level4: ['', '', ''],
    level5: ['', '', ''],
    level6: ['', '', ''],
    level7: ['', '', ''],
    level8: ['', '', ''],
    level9: ['', '', '']
  });

  return (
    <div className="bg-zinc-800 p-4 rounded-lg mt-4">
      <h3 className="text-lg text-left font-bold mb-2 text-amber-500">Spells</h3>
      <div className="grid grid-cols-4 gap-4">
        <SpellLevel level="Cantrips" spells={spells.cantrips} />
        <SpellLevel level="Level 1" spells={spells.level1} />
        <SpellLevel level="Level 2" spells={spells.level2} />
        <SpellLevel level="Level 3" spells={spells.level3} />
        <SpellLevel level="Level 4" spells={spells.level4} />
        <SpellLevel level="Level 5" spells={spells.level5} />
        <SpellLevel level="Level 6" spells={spells.level6} />
        <SpellLevel level="Level 7" spells={spells.level7} />
        <SpellLevel level="Level 8" spells={spells.level8} />
        <SpellLevel level="Level 9" spells={spells.level9} />
      </div>
    </div>
  );
}

export default Spells;