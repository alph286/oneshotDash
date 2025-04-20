import React, { useState, KeyboardEvent as ReactKeyboardEvent } from 'react'; 
import { useCharacterStore } from '../stores/characterStore';
import { Pencil, Save } from 'lucide-react';
import type { Character } from '../stores/characterStore';
import CardCaratteristica from './personaggi/CardCaratteristica';
import EquipmentCard from './personaggi/EquipmentCard';
import HitPoints from './personaggi/HitPoints';
import VariousStat from './personaggi/VariousStat';

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
      setEditedCharacter({...selectedCharacter});
      
      // Initialize bonuses with existing additional bonus values
      const initialBonuses: Record<string, number> = {};
      stats.forEach(stat => {
        const additionalBonusField = `${stat.field}AdditionalBonus` as keyof Character;
        initialBonuses[stat.field] = (selectedCharacter[additionalBonusField] as number) || 0;
      });
      setBonuses(initialBonuses);
      
      setIsEditing(true);
    }
  };

  // In the handleSave function, update how we handle the additional bonuses
  const handleSave = () => {
    if (editedCharacter && selectedCharacter) {
      // Create a copy of the edited character
      const updatedCharacter = { ...editedCharacter };
      
      // Save the additional bonuses to their respective fields in the character
      stats.forEach(stat => {
        const field = stat.field;
        const additionalBonusField = `${field}AdditionalBonus` as keyof Character;
        
        // Set the additional bonus value from our bonuses state
        if (bonuses[field] !== undefined) {
          (updatedCharacter as any)[additionalBonusField] = bonuses[field];
        }
      });
      
      // Save the character with the updated additional bonuses
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
                    additionalBonus={isEditing 
                      ? bonuses[stat.field] 
                      : (selectedCharacter[`${stat.field}AdditionalBonus` as keyof Character] as number) || 0}
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

              {/* Equipment Card */}
              <div className="col-span-2">
                <EquipmentCard
                  armorClass={isEditing ? (editedCharacter?.armorClass || 0) : selectedCharacter.armorClass}
                  equipment={isEditing ? (editedCharacter?.equipment || '') : selectedCharacter.equipment}
                  isEditing={isEditing}
                  onArmorClassChange={(value) => handleInputChange('armorClass', value)}
                  onEquipmentChange={(value) => handleInputChange('equipment', value)}
                />
              </div>

              {/* HP component */}
              <div className="col-span-2 grid gap-4">
                <HitPoints
                  currentHP={isEditing ? (editedCharacter?.currentHP || 0) : selectedCharacter.currentHP}
                  totalHP={isEditing ? (editedCharacter?.totalHP || 0) : selectedCharacter.totalHP}
                  temporaryHP={isEditing ? (editedCharacter?.temporaryHP || 0) : selectedCharacter.temporaryHP}
                  isEditing={isEditing}
                  onCurrentHPChange={(value) => handleInputChange('currentHP', value)}
                  onTotalHPChange={(value) => handleInputChange('totalHP', value)}
                  onTemporaryHPChange={(value) => handleInputChange('temporaryHP', value)}
                />
                <VariousStat
                initiative={isEditing ? (editedCharacter?.initiative || 0) : selectedCharacter.initiative}
                speed={isEditing ? (editedCharacter?.speed || 0) : selectedCharacter.speed}
                darkvision={isEditing ? (editedCharacter?.darkvision || 0) : selectedCharacter.darkvision}
                inspiration={isEditing ? (editedCharacter?.inspiration || 0) : selectedCharacter.inspiration}
                isEditing={isEditing}
                onInitiativeChange={(value) => handleInputChange('initiative', value)}
                onSpeedChange={(value) => handleInputChange('speed', value)}
                onDarkvisionChange={(value) => handleInputChange('darkvision', value)}
                onInspirationChange={(value) => handleInputChange('inspiration', value)}
              />
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