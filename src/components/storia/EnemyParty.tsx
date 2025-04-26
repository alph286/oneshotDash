import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, Check, Minus } from 'lucide-react';

// Aggiorna l'interfaccia Enemy per riflettere il significato corretto dei campi
interface Enemy {
  id: string;
  name: string;
  ac: number;
  hp: number;   // HP attuali
  hpm: number;  // HP massimi
  hpt: number;  // HP temporanei
  initiative: number;
}

interface EnemyPartyProps {
  isEditing?: boolean;
  enemies?: Enemy[]; // Dati salvati del party nemico
  onSave?: (enemies: Enemy[]) => void; // Callback per salvare i dati
}

const EnemyParty: React.FC<EnemyPartyProps> = ({ 
  isEditing = false, 
  enemies: savedEnemies = [], 
  onSave 
}) => {
  // Initialize state with savedEnemies only once
  const [enemies, setEnemies] = useState<Enemy[]>(savedEnemies);
  const prevSavedEnemiesRef = useRef<Enemy[]>(savedEnemies);
  
  // Only update state when savedEnemies reference changes
  useEffect(() => {
    // Compare with previous savedEnemies to avoid infinite loops
    if (JSON.stringify(prevSavedEnemiesRef.current) !== JSON.stringify(savedEnemies)) {
      prevSavedEnemiesRef.current = savedEnemies;
      setEnemies(savedEnemies);
    }
  }, [savedEnemies]);

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
      
      {/* Add column headers when there are enemies */}
      {enemies.length > 0 && (
        <div className="flex justify-between gap-1 mb-1 px-2">
          <div className="w-32 text-xs font-medium text-gray-400 text-left pl-1">Enemy Name</div>
          <div className="w-6 text-xs font-medium text-gray-400 text-left pl-1">AC</div>
          <div className="w-64 text-xs font-medium text-gray-400 text-left pl-2">
            {isEditing ? "HPMAX" : "HP"}
          </div>
          <div className="w-32 text-xs font-medium text-gray-400 text-left pl-2">HPT</div>
          <div className="w-68 text-xs font-medium text-gray-400 text-left pl-1">I</div>
          {isEditing && <div className="w-6"></div>} {/* Spacer for delete button */}
        </div>
      )}
      
      {enemies.length > 0 ? (
        <div className="space-y-2 mb-3">
          {enemies.map(enemy => (
            <div 
              key={enemy.id} 
              className={`flex justify-between gap-1 ${enemy.hp <= 0 ? 'bg-zinc-900/90' : 'bg-zinc-800/70'} p-2 rounded relative`}
            >
              {isEditing ? (
                // Edit mode - show all fields as inputs with same layout as view mode
                <>
                  <input
                    type="text"
                    value={enemy.name}
                    onChange={(e) => handleEnemyChange(enemy.id, 'name', e.target.value)}
                    placeholder="Name"
                    className="w-32 bg-zinc-900 text-gray-200 p-1 rounded text-sm"
                  />
                  <input
                    type="number"
                    value={enemy.ac}
                    onChange={(e) => handleEnemyChange(enemy.id, 'ac', parseInt(e.target.value) || 0)}
                    placeholder="AC"
                    className="w-6 bg-zinc-900 text-gray-200 p-1 rounded text-sm"
                  />
                  <div className="w-32 flex items-center space-x-2">
                    <input
                      type="number"
                      value={enemy.hpm}
                      onChange={(e) => {
                        const newHpm = parseInt(e.target.value) || 0;
                        handleEnemyChange(enemy.id, 'hpm', newHpm);
                        // Also update current HP if HPMAX is changed
                        handleEnemyChange(enemy.id, 'hp', newHpm);
                      }}
                      placeholder="HPMAX"
                      className="bg-zinc-900 text-gray-200 p-1 rounded text-sm min-w-[30px]"
                    />
                  </div>
                  <div className="w-32 flex items-center space-x-2">
                    <input
                      type="number"
                      value={enemy.hpt}
                      onChange={(e) => handleEnemyChange(enemy.id, 'hpt', parseInt(e.target.value) || 0)}
                      placeholder="HPT"
                      className="bg-zinc-900 text-gray-200 p-1 rounded text-sm min-w-[30px]"
                    />
                  </div>
                  <input
                    type="number"
                    value={enemy.initiative}
                    onChange={(e) => handleEnemyChange(enemy.id, 'initiative', parseInt(e.target.value) || 0)}
                    placeholder="Init"
                    className="w-8 bg-zinc-900 text-gray-200 p-1 rounded text-sm"
                  />
                </>
              ) : (
                // View mode - aligned with column headers
                <>
                  <div className="w-32 flex items-center text-gray-200 p-1 text-sm text-left truncate">
                    {enemy.hp <= 0 && (
                      <img src="/images/skull.png" alt="Defeated" className="w-4 h-4 mr-1 inline-block" />
                    )}
                    {enemy.name || "Unnamed"}
                  </div>
                  <div className="w-4 text-gray-200 p-1 text-sm text-left">{enemy.ac}</div>
                  
                  {/* HP with buttons - mostra HP/HPM */}
                  <div className="w-64 flex items-center space-x-2">
                    <div className="flex items-center justify-start bg-zinc-900/60 px-2 py-1 rounded ">
                      <span className={`text-sm font-medium ${enemy.hp <= 0 ? 'text-red-500' : 'text-gray-200'}`}>
                      {enemy.hpm} / {enemy.hp}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => handleHpChange(enemy.id, 5)} 
                        className="w-7 h-7 flex items-center justify-center bg-green-700/70 text-white text-xs font-bold hover:bg-green-700"
                        title="+5 HP"
                      >
                        +5
                      </button>
                      <button 
                        onClick={() => handleHpChange(enemy.id, 1)} 
                        className="w-7 h-7 flex items-center justify-center bg-green-600/70 text-white text-xs font-bold hover:bg-green-600"
                        title="+1 HP"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => handleHpChange(enemy.id, -1)} 
                        className="w-7 h-7 flex items-center justify-center bg-red-500/70 text-white text-xs font-bold hover:bg-red-500"
                        title="-1 HP"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => handleHpChange(enemy.id, -5)} 
                        className="w-7 h-7 flex items-center justify-center bg-red-700/70 text-white text-xs font-bold hover:bg-red-700"
                        title="-5 HP"
                      >
                        -5
                      </button>
                    </div>
                  </div>
                  
                  {/* HPT with buttons */}
                  <div className="w-32 flex items-center space-x-2">
                    <div className="flex items-center justify-start bg-zinc-900/60 px-2 py-1 rounded min-w-[30px]">
                      <span className="text-gray-200 text-sm font-medium">
                        {enemy.hpt}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => handleHptChange(enemy.id, 5)} 
                        className="w-7 h-7 flex items-center justify-center bg-green-700/70 text-white text-xs font-bold hover:bg-green-700"
                        title="+5 HPT"
                      >
                        +5
                      </button>
                      <button 
                        onClick={() => handleHptChange(enemy.id, 1)} 
                        className="w-7 h-7 flex items-center justify-center bg-green-600/70 text-white text-xs font-bold hover:bg-green-600"
                        title="+1 HPT"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => handleHptChange(enemy.id, -1)} 
                        className="w-7 h-7 flex items-center justify-center bg-red-500/70 text-white text-xs font-bold hover:bg-red-500"
                        title="-1 HPT"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => handleHptChange(enemy.id, -5)} 
                        className="w-7 h-7 flex items-center justify-center bg-red-700/70 text-white text-xs font-bold hover:bg-red-700"
                        title="-5 HPT"
                      >
                        -5
                      </button>
                    </div>
                  </div>
                  
                  {/* Initiative */}
                  <div className="w-6 text-gray-200 p-1 text-sm text-left">+{enemy.initiative}</div>
                </>
              )}
              
              {isEditing && (
                <button
                  onClick={() => handleRemoveEnemy(enemy.id)}
                  className="p-1 bg-red-500/70 text-white rounded hover:bg-red-600"
                  title="Remove enemy"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic mb-3">No enemies added yet.</p>
      )}
      
      {/* Mostra i pulsanti solo in edit mode */}
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
          
          {/* Confirmation message */}
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