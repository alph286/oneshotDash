import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, Check, Minus } from 'lucide-react';
import { useEnemyStore } from '../../stores/enemyStore';

// Aggiorna l'interfaccia Enemy per riflettere il significato corretto dei campi
// Add export keyword before the interface
export interface Enemy {
  id: string;
  name: string;
  ac: number;
  hp: number;   // HP attuali
  hpm: number;  // HP massimi
  hpt: number;  // HP temporanei
  initiative: number;
  info?: string;  // Add this new field
}

interface EnemyPartyProps {
  isEditing?: boolean;
  phaseId: string;
  eventId: string;
  enemies?: Enemy[]; // Move inside the interface
  onSave?: (enemies: Enemy[]) => void; // Move inside the interface

 
}

const EnemyParty: React.FC<EnemyPartyProps> = ({ 
  isEditing = false,
  enemies: savedEnemies = [],
  onSave,
  phaseId,
  eventId
}) => {
  const [enemies, setEnemies] = useState<Enemy[]>(savedEnemies);
  const prevSavedEnemiesRef = useRef<Enemy[]>(savedEnemies);

  // Add this useEffect to ensure state is updated when savedEnemies changes
  useEffect(() => {
    if (JSON.stringify(prevSavedEnemiesRef.current) !== JSON.stringify(savedEnemies)) {
      prevSavedEnemiesRef.current = savedEnemies;
      setEnemies(savedEnemies);
    }
  }, [savedEnemies]);

  // Ensure state is reset when exiting edit mode
  useEffect(() => {
    if (!isEditing) {
      setEnemies(savedEnemies);
    }
  }, [isEditing, savedEnemies]);


  const handleAddEnemy = () => {
    const newEnemy: Enemy = {
      id: crypto.randomUUID(),
      name: '',
      ac: 10,
      hp: 10,     // HP attuali iniziali
      hpm: 10,    // HP massimi iniziali
      hpt: 0,     // HP temporanei iniziali
      initiative: 0
    };
    setEnemies(prevEnemies => [...prevEnemies, newEnemy]);
  };

  const handleRemoveEnemy = (id: string) => {
    setEnemies(prevEnemies => prevEnemies.filter(enemy => enemy.id !== id));
  };

  const handleEnemyChange = (id: string, field: keyof Enemy, value: string | number) => {
    setEnemies(prevEnemies => prevEnemies.map(enemy => {
      if (enemy.id === id) {
        return { ...enemy, [field]: value };
      }
      return enemy;
    }));
  };
  
  // Add functions for HP and HPT changes in view mode
  const handleHpChange = (id: string, amount: number) => {
    setEnemies(prevEnemies => {
      const updatedEnemies = prevEnemies.map(enemy => {
        if (enemy.id === id) {
          // Ensure HP doesn't go below 0
          const newHp = Math.max(0, enemy.hp + amount);
          return { ...enemy, hp: newHp };
        }
        return enemy;
      });
      
      // Auto-save when HP changes
      if (onSave) {
        onSave(updatedEnemies);
      }
      
      return updatedEnemies;
    });
  };

  const handleHptChange = (id: string, amount: number) => {
    setEnemies(prevEnemies => {
      const updatedEnemies = prevEnemies.map(enemy => {
        if (enemy.id === id) {
          // Ensure HPT doesn't go below 0
          const newHpt = Math.max(0, enemy.hpt + amount);
          return { ...enemy, hpt: newHpt };
        }
        return enemy;
      });
      
      // Auto-save when HPT changes
      if (onSave) {
        onSave(updatedEnemies);
      }
      
      return updatedEnemies;
    });
  };
  
  // Add state for showing confirmation message
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleSaveParty = () => {
    console.log('handleSaveParty chiamato, nemici:', enemies);
    if (onSave) {
      console.log('Chiamando onSave con:', enemies);
      onSave(enemies);
      
      // Show confirmation message and hide it after 3 seconds
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } else {
      console.log('onSave non è definito');
    }
  };

  // Function to restore all enemies' HP to their max HP
  const handleRestoreEnemyHp = () => {
    setEnemies(prevEnemies => {
      const restoredEnemies = prevEnemies.map(enemy => ({
        ...enemy,
        hp: enemy.hpm // Reset HP to HPM value
      }));
      
      // Save the restored state
      if (onSave) {
        onSave(restoredEnemies);
      }
      
      return restoredEnemies;
    });
  };

  return (
    <div className="p-4 bg-zinc-700/50 rounded-lg h-full">
      <h4 className="text-lg font-semibold text-gray-300 mb-2">Enemy Party</h4>
      
      {enemies.length > 0 ? (
        <div className="mb-3">
          {/* Updated grid headers */}
          <div className="grid grid-cols-[2fr,1fr,2fr,1fr,auto] gap-2 mb-1 px-2 text-xs font-medium text-gray-400 text-left">
            <div>Enemy Name</div>
            <div className="text-center">AC</div>
            <div>Max HP</div>
            <div className="text-center">Initiative</div>
            {isEditing && <div></div>}
          </div>
      
          {/* Enemy rows */}
          <div className="space-y-2">
            {enemies.map(enemy => (
              <div key={enemy.id}>
                <div className={`grid grid-cols-[2fr,1fr,2fr,1fr,auto] gap-2 ${enemy.hp <= 0 ? 'bg-zinc-900/90' : 'bg-zinc-800/70'} p-2 rounded items-center`}>
                  {isEditing ? (
                    // Edit mode
                    <>
                      <input
                        type="text"
                        value={enemy.name}
                        onChange={(e) => handleEnemyChange(enemy.id, 'name', e.target.value)}
                        placeholder="Name"
                        className="bg-zinc-900 text-gray-200 p-1 rounded text-sm w-full"
                      />
                      <input
                        type="number"
                        value={enemy.ac}
                        onChange={(e) => handleEnemyChange(enemy.id, 'ac', parseInt(e.target.value) || 0)}
                        placeholder="AC"
                        className="bg-zinc-900 text-gray-200 p-1 rounded text-sm w-full"
                      />
                      <input
                        type="number"
                        value={enemy.hpm}
                        onChange={(e) => {
                          const newHpm = parseInt(e.target.value) || 0;
                          handleEnemyChange(enemy.id, 'hpm', newHpm);
                          handleEnemyChange(enemy.id, 'hp', newHpm);
                        }}
                        placeholder="Max HP"
                        className="bg-zinc-900 text-gray-200 p-1 rounded text-sm w-full"
                      />
                      <input
                        type="number"
                        value={enemy.initiative}
                        onChange={(e) => handleEnemyChange(enemy.id, 'initiative', parseInt(e.target.value) || 0)}
                        placeholder="Init"
                        className="bg-zinc-900 text-gray-200 p-1 rounded text-sm w-full"
                      />
                      <button
                        onClick={() => handleRemoveEnemy(enemy.id)}
                        className="p-1 bg-red-500/70 text-white rounded hover:bg-red-600 h-8 w-8 flex items-center justify-center"
                        title="Remove enemy"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    // View mode
                    <>
                      <div className="flex items-center text-gray-200 text-sm truncate">
                      
                        {enemy.name || "Unnamed"}
                      </div>
                      <div className="text-gray-200 text-sm text-center">{enemy.ac}</div>
                      <div className="text-left px-2 py-1 rounded flex-shrink-0">
                        <span className="text-sm text-gray-200">
                          {enemy.hpm}
                        </span>
                      </div>
                      <div className="text-gray-200 text-sm text-center">+{enemy.initiative}</div>
                    </>
                  )}
                </div>
             
            </div>))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic mb-3">No enemies added yet.</p>
      )}
      
      {/* Edit mode buttons remain unchanged */}
      {isEditing && (
        <div className="flex gap-2 items-center">
          <button
            onClick={handleAddEnemy}
            className="flex items-center gap-1 px-2 py-1 bg-red-500/70 text-white rounded hover:bg-red-600"
          >
            <Plus size={16} />
            <span>Add Enemy</span>
          </button>
          
          <button
            onClick={handleRestoreEnemyHp}
            className="flex items-center gap-1 px-2 py-1 bg-blue-500/70 text-white rounded hover:bg-blue-600"
          >
            <Minus size={16} className="rotate-90" />
            <span>Restore Enemy HP</span>
          </button>
          
          <button
            onClick={handleSaveParty}
            className="flex items-center gap-1 px-2 py-1 bg-green-600/70 text-white rounded hover:bg-green-700"
          >
            <Save size={16} />
            <span>Save Enemy Party</span>
          </button>
          
          {showConfirmation && (
            <div className="flex items-center text-green-500 ml-2 animate-fadeIn">
              <Check size={16} className="mr-1" />
              <span>Saved!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnemyParty;