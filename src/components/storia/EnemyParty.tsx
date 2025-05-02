import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, Check, Info } from 'lucide-react';
import { useEnemyStore } from '../../stores/enemyStore';

export interface Enemy {
  id: string;
  name: string;
  ac: number;
  initiative: number;
  maxHp?: number;
  info?: string;
}

interface EnemyPartyProps {
  isEditing?: boolean;
  phaseId: string;
  eventId: string;
  enemies?: Enemy[];
  onSave?: (enemies: Enemy[]) => void;
  showInfoField?: boolean;
}

const EnemyParty: React.FC<EnemyPartyProps> = ({ 
  isEditing = false,
  enemies: savedEnemies = [],
  onSave,
  phaseId,
  eventId,
  showInfoField = false
}) => {
  const [enemies, setEnemies] = useState<Enemy[]>(savedEnemies);
  const prevSavedEnemiesRef = useRef<Enemy[]>(savedEnemies);

  useEffect(() => {
    if (JSON.stringify(prevSavedEnemiesRef.current) !== JSON.stringify(savedEnemies)) {
      prevSavedEnemiesRef.current = savedEnemies;
      setEnemies(savedEnemies);
    }
  }, [savedEnemies]);

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
      initiative: 0,
      maxHp: 0,
      info: ''
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
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleSaveParty = () => {
    if (onSave) {
      onSave(enemies);
      
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
  };

  return (
    <div className="p-4 bg-zinc-700/50 rounded-lg h-full">
      <h4 className="text-lg font-semibold text-gray-300 mb-2">Enemy Party</h4>
      
      {enemies.length > 0 ? (
        <div className="mb-3">
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-2 mb-1 px-2 text-xs font-medium text-gray-400 text-left">
            <div>Enemy Name</div>
            <div className="text-center">AC</div>
            <div className="text-center">Initiative</div>
            <div className="text-center">HP Max</div>
            {isEditing && <div></div>}
          </div>
      
          <div className="space-y-2">
            {enemies.map(enemy => (
              <div key={enemy.id}>
                <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-2 bg-zinc-800/70 p-2 rounded items-center">
                  {isEditing ? (
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
                        value={enemy.initiative}
                        onChange={(e) => handleEnemyChange(enemy.id, 'initiative', parseInt(e.target.value) || 0)}
                        placeholder="Init"
                        className="bg-zinc-900 text-gray-200 p-1 rounded text-sm w-full"
                      />
                      <input
                        type="number"
                        value={enemy.maxHp || 0}
                        onChange={(e) => handleEnemyChange(enemy.id, 'maxHp', parseInt(e.target.value) || 0)}
                        placeholder="HP Max"
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
                    <>
                      <div className="flex items-center text-gray-200 text-sm truncate">
                        {enemy.name || "Unnamed"}
                      </div>
                      <div className="text-gray-200 text-sm text-center">{enemy.ac}</div>
                      <div className="text-gray-200 text-sm text-center">+{enemy.initiative}</div>
                      <div className="text-gray-200 text-sm text-center">{enemy.maxHp || 0}</div>
                    </>
                  )}
                </div>
                {showInfoField && isEditing && (
                  <div className="mt-1 mb-2">
                    <textarea
                      value={enemy.info || ''}
                      onChange={(e) => handleEnemyChange(enemy.id, 'info', e.target.value)}
                      placeholder="Note sul nemico"
                      className="bg-zinc-900 text-gray-200 p-2 rounded text-sm w-full min-h-[60px] resize-y"
                    />
                  </div>
                )}
                {showInfoField && !isEditing && enemy.info && (
                  <div className="mt-1 mb-2 bg-zinc-900/50 p-2 rounded text-left">
                    <div className="text-xs text-gray-400 mb-1">Note:</div>
                    <div className="text-sm text-gray-200">{enemy.info}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic mb-3">No enemies added yet.</p>
      )}
      
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