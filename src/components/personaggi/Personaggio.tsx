import React, { useState } from 'react';
import { useCharacterStore } from '../../stores/characterStore';

interface PersonaggioProps {
  id: number;
  name: string;
  class: string;
  race: string;
  armorClass: number;
  totalHP: number;
  currentHP: number;
  temporaryHP: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencyBonus: number;
  strengthBonus: number;
  dexterityBonus: number;
  constitutionBonus: number;
  intelligenceBonus: number;
  wisdomBonus: number;
  charismaBonus: number;
}

function Personaggio({ 
  id, 
  name, 
  class: charClass, 
  race, 
  armorClass, 
  totalHP, 
  currentHP, 
  temporaryHP,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  proficiencyBonus,
  strengthBonus,
  dexterityBonus,
  constitutionBonus,
  intelligenceBonus,
  wisdomBonus,
  charismaBonus
}: PersonaggioProps) {
  const [formData, setFormData] = useState({ 
    name, 
    class: charClass, 
    race, 
    armorClass, 
    totalHP, 
    currentHP, 
    temporaryHP,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    proficiencyBonus
  });
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSave = () => {
    updateCharacter(id, formData);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg shadow-lg mb-4">
      <div className="space-y-2">
        <div>
          <label className="text-sm text-gray-400">Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400">Classe:</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400">Razza:</label>
          <input
            type="text"
            name="race"
            value={formData.race}
            onChange={handleChange}
            className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400">CA:</label>
          <input
            type="number"
            name="armorClass"
            value={formData.armorClass}
            onChange={handleChange}
            className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400">HP Totali:</label>
          <input
            type="number"
            name="totalHP"
            value={formData.totalHP}
            onChange={handleChange}
            className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400">HP Temporanei:</label>
          <input
            type="number"
            name="temporaryHP"
            value={formData.temporaryHP}
            onChange={handleChange}
            className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400">HP attuali:</label>
          <input
            type="number"
            name="currentHP"
            value={formData.currentHP}
            onChange={handleChange}
            className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
          />
        </div>
        
        <button
          onClick={handleSave}
          className="w-full mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
        
        {/* Ability Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400">Forza:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="strength"
                value={formData.strength}
                onChange={handleChange}
                className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
              />
              <span className="text-sm">({strengthBonus >= 0 ? '+' : ''}{strengthBonus})</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Destrezza:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="dexterity"
                value={formData.dexterity}
                onChange={handleChange}
                className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
              />
              <span className="text-sm">({dexterityBonus >= 0 ? '+' : ''}{dexterityBonus})</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Costituzione:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="constitution"
                value={formData.constitution}
                onChange={handleChange}
                className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
              />
              <span className="text-sm">({constitutionBonus >= 0 ? '+' : ''}{constitutionBonus})</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Intelligenza:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="intelligence"
                value={formData.intelligence}
                onChange={handleChange}
                className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
              />
              <span className="text-sm">({intelligenceBonus >= 0 ? '+' : ''}{intelligenceBonus})</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Saggezza:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="wisdom"
                value={formData.wisdom}
                onChange={handleChange}
                className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
              />
              <span className="text-sm">({wisdomBonus >= 0 ? '+' : ''}{wisdomBonus})</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Carisma:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="charisma"
                value={formData.charisma}
                onChange={handleChange}
                className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
              />
              <span className="text-sm">({charismaBonus >= 0 ? '+' : ''}{charismaBonus})</span>
            </div>
          </div>
        </div>

        {/* Proficiency Bonus */}
        <div>
          <label className="text-sm text-gray-400">Bonus Competenza:</label>
          <input
            type="number"
            name="proficiencyBonus"
            value={formData.proficiencyBonus}
            onChange={handleChange}
            className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
          />
        </div>

        {/* Save button... */}
      </div>
    </div>
  );
}

export default Personaggio;