import React, { useState, KeyboardEvent as ReactKeyboardEvent } from 'react'; 
import { useCharacterStore } from '../stores/characterStore';
import { Pencil, Save } from 'lucide-react';
import type { Character } from '../stores/characterStore';
import CardCaratteristica from './personaggi/CardCaratteristica';

interface PersonaggiPageProps {
  selectedCharacterId?: string;
}

function PersonaggiPage({ selectedCharacterId }: PersonaggiPageProps) {
  const characters = useCharacterStore(state => state.characters);
  const updateCharacter = useCharacterStore(state => state.updateCharacter);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<Character | null>(null);
  const [bonuses, setBonuses] = useState<Record<string, number>>({});
  
  // Define stats array at the top of the component
  const stats = [
    { name: 'STR', field: 'strength' as const },
    { name: 'DEX', field: 'dexterity' as const },
    { name: 'CON', field: 'constitution' as const },
    { name: 'INT', field: 'intelligence' as const },
    { name: 'WIS', field: 'wisdom' as const },
    { name: 'CHA', field: 'charisma' as const }
  ] as const;
  
  const selectedCharacter = selectedCharacterId 
    ? characters.find(char => `character-${char.id}` === selectedCharacterId)
    : null;

  const handleEdit = () => {
    if (selectedCharacter) {
      // Crea una copia profonda dell'oggetto character
      setEditedCharacter({...selectedCharacter});
      
      // Inizializza i bonus con i valori attuali
      const initialBonuses: Record<string, number> = {};
      stats.forEach(stat => {
        initialBonuses[stat.field] = 0; // Inizializza a zero
      });
      setBonuses(initialBonuses);
      
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editedCharacter && selectedCharacter) {
      // Crea una copia dell'oggetto editedCharacter
      const updatedCharacter = { ...editedCharacter };
      
      // Aggiorna i bonus per ogni caratteristica
      stats.forEach(stat => {
        const field = stat.field;
        const bonusField = `${field}Bonus` as keyof Character;
        
        // Calcola il bonus base dalla formula (valore - 10) / 2 arrotondato per difetto
        const abilityScore = updatedCharacter[field] as number;
        const calculatedBonus = Math.floor((abilityScore - 10) / 2);
        
        // Imposta il bonus calcolato
        (updatedCharacter as any)[bonusField] = calculatedBonus;
      });
      
      // Salva il personaggio aggiornato
      updateCharacter(selectedCharacter.id, updatedCharacter);
      setIsEditing(false);
      setBonuses({});
    }
  };

  const handleInputChange = (field: keyof Character, value: any) => {
    if (editedCharacter) {
      setEditedCharacter({ ...editedCharacter, [field]: value });
    }
  };
  
  const handleKeyPress = (e: ReactKeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior
      handleSave();
    }
  };
  
  return (
    <div className="p-6">
      {selectedCharacter ? (
        <>
          {/* Edit/Save Buttons moved outside the character sheet */}
          <div className="flex justify-end mb-4">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <Pencil size={20} className="text-amber-500" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <Save size={20} className="text-green-500" />
              </button>
            )}
          </div>

          <div className="bg-zinc-900/50 p-6 rounded-lg">
            {/* Header Section */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-gray-700">
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-400">Name</label>
                      <input
                        type="text"
                        value={editedCharacter?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="text-3xl font-bold bg-zinc-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Race</label>
                      <input
                        type="text"
                        value={editedCharacter?.race || ''}
                        onChange={(e) => handleInputChange('race', e.target.value)}
                        className="bg-zinc-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Class</label>
                      <input
                        type="text"
                        value={editedCharacter?.class || ''}
                        onChange={(e) => handleInputChange('class', e.target.value)}
                        className="bg-zinc-700 rounded px-2 py-1 w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-amber-500">{selectedCharacter.name}</h1>
                    <p className="text-gray-400">{selectedCharacter.race} {selectedCharacter.class}</p>
                  </>
                )}
              </div>
              <div className="text-center">
                {isEditing ? (
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-400">Level</label>
                      <input
                        type="number"
                        value={editedCharacter?.level || 0}
                        onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
                        className="bg-zinc-700 rounded px-2 py-1 w-full text-center"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Alignment</label>
                      <input
                        type="text"
                        value={editedCharacter?.alignment || ''}
                        onChange={(e) => handleInputChange('alignment', e.target.value)}
                        className="bg-zinc-700 rounded px-2 py-1 w-full text-center"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-400">Level {selectedCharacter.level}</p>
                    <p className="text-gray-400">{selectedCharacter.alignment}</p>
                  </>
                )}
              </div>
              <div className="text-right">
                {isEditing ? (
                  <div>
                    <label className="text-sm text-gray-400">Proficiency Bonus</label>
                    <input
                      type="number"
                      value={editedCharacter?.proficiencyBonus || 0}
                      onChange={(e) => handleInputChange('proficiencyBonus', parseInt(e.target.value))}
                      className="bg-zinc-700 rounded px-2 py-1 w-full text-right"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-gray-400">Proficiency Bonus</p>
                    <p className="text-xl text-amber-500">+{selectedCharacter.proficiencyBonus}</p>
                  </>
                )}
              </div>
            </div>

            {/* Character Stats Section */}
            <div className="grid grid-cols-6 gap-4 mb-6">
              <div className="col-span-2 grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <CardCaratteristica
                    key={stat.name}
                    name={stat.name}
                    field={stat.field}
                    value={isEditing ? (editedCharacter?.[stat.field] as number) : selectedCharacter[stat.field]}
                    baseBonus={isEditing 
                      ? (editedCharacter?.[`${stat.field}Bonus` as keyof Character] as number) 
                      : selectedCharacter[`${stat.field}Bonus` as keyof Character] as number}
                    additionalBonus={bonuses[stat.field]}
                    isEditing={isEditing}
                    onValueChange={(value) => handleInputChange(stat.field, value)}
                    onBonusChange={(value) => {
                      const newBonuses = { ...bonuses, [stat.field]: value };
                      setBonuses(newBonuses);
                    }}
                    onKeyDown={handleKeyPress}
                  />
                ))}
              </div>

              {/* Combat Stats */}
              <div className="col-span-4 grid grid-cols-4 gap-4">
                {[
                  { name: 'Armor Class', field: 'armorClass' as keyof Character, value: selectedCharacter.armorClass },
                  { name: 'Initiative', field: 'initiative' as keyof Character, value: selectedCharacter.initiative, showPlus: true },
                  { name: 'Speed', field: 'speed' as keyof Character, value: selectedCharacter.speed },
                  { name: 'HP', field: 'currentHP' as keyof Character, value: selectedCharacter.currentHP, totalField: 'totalHP' as keyof Character, total: selectedCharacter.totalHP }
                ].map((stat) => (
                  <div key={stat.name} className="bg-zinc-800 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400">{stat.name}</div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm text-gray-400">Current {stat.name}</label>
                          <input
                            type="number"
                            value={editedCharacter?.[stat.field] || 0}
                            onChange={(e) => handleInputChange(stat.field, parseInt(e.target.value))}
                            className="bg-zinc-700 rounded px-2 py-1 w-full text-center"
                          />
                        </div>
                        {stat.totalField && (
                          <div>
                            <label className="text-sm text-gray-400">Total {stat.name}</label>
                            <input
                              type="number"
                              value={editedCharacter?.[stat.totalField] || 0}
                              onChange={(e) => handleInputChange(stat.totalField, parseInt(e.target.value))}
                              className="bg-zinc-700 rounded px-2 py-1 w-full text-center"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-amber-500">
                        {stat.showPlus && '+'}
                        {stat.totalField ? `${stat.value}/${stat.total}` : stat.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-amber-500">Notes</h3>
              {isEditing ? (
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Character Notes</label>
                  <textarea
                    value={editedCharacter?.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full bg-zinc-700 rounded px-2 py-1 min-h-[100px]"
                  />
                </div>
              ) : (
                <p className="text-gray-300">{selectedCharacter.notes || 'No notes available.'}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6">Personaggi</h1>
          <p className="text-gray-400">Seleziona un personaggio dalla barra laterale</p>
        </div>
      )}
    </div>
  );
}

export default PersonaggiPage;