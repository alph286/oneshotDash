import React, { useState } from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  notes: string;
  initiative: number;
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
  charismaBonus,
  notes = '',
  initiative = 0
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
    proficiencyBonus,
    strengthBonus,
    dexterityBonus,
    constitutionBonus,
    intelligenceBonus,
    wisdomBonus,
    charismaBonus,
    notes,
    initiative
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const updateCharacter = useCharacterStore((state) => state.updateCharacter);

  const handleSave = () => {
    updateCharacter(id, formData);
  };

  return (
    <div className="bg-zinc-900 rounded-lg shadow-lg">
      {/* Header with HP and AC */}
      <div className="p-4 border-b border-zinc-700">
        <div className="flex gap-4">
          <div>
            <label className="text-sm text-gray-400">HP:</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="currentHP"
                value={formData.currentHP}
                onChange={handleChange}
                className="w-20 p-1 bg-zinc-800 text-gray-200 rounded"
              />
              <span className="text-gray-400">/</span>
              <input
                type="number"
                name="totalHP"
                value={formData.totalHP}
                onChange={handleChange}
                className="w-20 p-1 bg-zinc-800 text-gray-200 rounded"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">CA:</label>
            <input
              type="number"
              name="armorClass"
              value={formData.armorClass}
              onChange={handleChange}
              className="w-20 p-1 bg-zinc-800 text-gray-200 rounded"
            />
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="p-4 space-y-2">
        <Accordion type="multiple" defaultValue={['stato']} className="w-full">
          <AccordionItem value="stato">
            <AccordionTrigger className="hover:bg-zinc-800 px-4 rounded">
              Stato
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Iniziativa:</label>
                  <input
                    type="number"
                    name="initiative"
                    value={formData.initiative}
                    onChange={handleChange}
                    className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="caratteristiche">
            <AccordionTrigger className="hover:bg-zinc-800 px-4 rounded">
              Caratteristiche
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries({
                  strength: 'Forza',
                  dexterity: 'Destrezza',
                  constitution: 'Costituzione',
                  intelligence: 'Intelligenza',
                  wisdom: 'Saggezza',
                  charisma: 'Carisma'
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="text-sm text-gray-400">{label}:</label>
                    <input
                      type="number"
                      name={key}
                      value={formData[key as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="abilita">
            <AccordionTrigger className="hover:bg-zinc-800 px-4 rounded">
              Abilità
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="space-y-2">
                {Object.entries({
                  strength: 'Forza',
                  dexterity: 'Destrezza',
                  constitution: 'Costituzione',
                  intelligence: 'Intelligenza',
                  wisdom: 'Saggezza',
                  charisma: 'Carisma'
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="text-sm text-gray-400">{label}:</label>
                    <input
                      type="number"
                      name={key}
                      value={formData[key as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="equip">
            <AccordionTrigger className="hover:bg-zinc-800 px-4 rounded">
              Equip
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="space-y-2">
                {Object.entries({
                  strength: 'Forza',
                  dexterity: 'Destrezza',
                  constitution: 'Costituzione',
                  intelligence: 'Intelligenza',
                  wisdom: 'Saggezza',
                  charisma: 'Carisma'
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="text-sm text-gray-400">{label}:</label>
                    <input
                      type="number"
                      name={key}
                      value={formData[key as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="note">
            <AccordionTrigger className="hover:bg-zinc-800 px-4 rounded">
              Note
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div>
                <label className="text-sm text-gray-400">Note:</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-1 bg-zinc-800 text-gray-200 rounded"
                  rows={5}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Save Button */}
      <div className="p-4 border-t border-zinc-700">
        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Personaggio;