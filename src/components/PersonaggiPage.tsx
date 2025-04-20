import React, { useState, KeyboardEvent as ReactKeyboardEvent } from 'react'; 
import { useCharacterStore } from '../stores/characterStore';
import { Pencil, Save, Trash2, Download } from 'lucide-react';
import type { Character } from '../stores/characterStore';
import CardCaratteristica from './personaggi/CardCaratteristica';
import EquipmentCard from './personaggi/EquipmentCard';
import HitPoints from './personaggi/HitPoints';
import VariousStat from './personaggi/VariousStat';
import ToolbarPg from './personaggi/ToolbarPg';
import HeaderPg from './personaggi/HeaderPg';
import NotesPg from './personaggi/NotesPg';
import Spells from './personaggi/Spells';

interface PersonaggiPageProps {
  selectedCharacterId?: string;
}

function PersonaggiPage({ selectedCharacterId }: PersonaggiPageProps) {
  const characters = useCharacterStore(state => state.characters);
  const updateCharacter = useCharacterStore(state => state.updateCharacter);
  const deleteCharacter = useCharacterStore(state => state.deleteCharacter); // Add this
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
      e.preventDefault();
      handleSave();
    }
  };

  // REMOVE the getDexterityTotalBonus function entirely
  // const getDexterityTotalBonus = () => { ... }; // DELETE THIS

  const handleDelete = () => {
    if (selectedCharacter && window.confirm('Are you sure you want to delete this character?')) {
      deleteCharacter(selectedCharacter.id);
    }
  };

  const handleExportCharacter = () => {
    if (selectedCharacter) {
      const jsonString = JSON.stringify(selectedCharacter, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const filename = `${selectedCharacter.name}_${selectedCharacter.class}_${selectedCharacter.race}_liv${selectedCharacter.level}`
        .replace(/[^a-z0-9]/gi, '_') // Replace special characters with underscores
        .toLowerCase(); // Convert to lowercase
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      
      URL.revokeObjectURL(url);
    }
  };

  // Remove individual showNotes/showSpells state
  // const [showNotes, setShowNotes] = useState(true);
  // const [showSpells, setShowSpells] = useState(true);
  
  // Modify toggle handlers to use character state
  const handleToggleNotes = () => {
    if (selectedCharacter) {
      updateCharacter(selectedCharacter.id, {
        ...selectedCharacter,
        showNotes: !selectedCharacter.showNotes
      });
    }
  };
  
  const handleToggleSpells = () => {
    if (selectedCharacter) {
      updateCharacter(selectedCharacter.id, {
        ...selectedCharacter,
        showSpells: !selectedCharacter.showSpells
      });
    }
  };
  
  // Add these fields to the Character type in characterStore.ts
  // showNotes?: boolean;
  // showSpells?: boolean;

  return (
    <div className="h-full overflow-auto scrollbar-auto">
      {selectedCharacter ? (
        <>
          <ToolbarPg
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onExport={handleExportCharacter}
            onDelete={handleDelete}
            onToggleNotes={handleToggleNotes}
            onToggleSpells={handleToggleSpells}
            showNotes={selectedCharacter.showNotes ?? true}
            showSpells={selectedCharacter.showSpells ?? true}
          />
          <div className="bg-zinc-900/50 p-6 rounded-lg">
            <HeaderPg
              character={isEditing ? editedCharacter! : selectedCharacter}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
           
            

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

              {/* HP component and VariousStat */}
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
                // Remove dexterityTotalBonus prop - This comment seems outdated now, let's remove it.
                initiative={isEditing 
                  // Use the initiative value directly from the edited character state
                  ? (editedCharacter?.initiative ?? 0) 
                  : selectedCharacter.initiative} 
                speed={isEditing ? (editedCharacter?.speed || 0) : selectedCharacter.speed}
                darkvision={isEditing ? (editedCharacter?.darkvision || 0) : selectedCharacter.darkvision}
                inspiration={isEditing ? (editedCharacter?.inspiration || 0) : selectedCharacter.inspiration}
                isEditing={isEditing}
                // Remove onInitiativeChange prop
                onSpeedChange={(value) => handleInputChange('speed', value)}
                onDarkvisionChange={(value) => handleInputChange('darkvision', value)}
                onInspirationChange={(value) => handleInputChange('inspiration', value)}
              />
              </div>
            </div>

           

            {/* Notes Section */}
            
            {(selectedCharacter?.showNotes ?? true) && (
              <NotesPg
                character={isEditing ? editedCharacter! : selectedCharacter}
                isEditing={isEditing}
                onInputChange={handleInputChange}
              />
            )}

            {(selectedCharacter?.showSpells ?? true) && <Spells />}
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

// Helper function (can be placed outside the component or imported)
const calculateBonus = (value: number): number => Math.floor((value - 10) / 2);


export default PersonaggiPage;