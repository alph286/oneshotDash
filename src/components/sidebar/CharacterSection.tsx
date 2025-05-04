import { Users, ChevronDown, Plus, Upload } from 'lucide-react'
import { useState } from 'react'
import { useCharacterStore } from '../../stores/characterStore'
import { Character } from '../../stores/characterStore'
import { useEditModeStore } from '../../stores/editModeStore'

interface CharacterSectionProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function CharacterSection({ currentPage, setCurrentPage }: CharacterSectionProps) {
  const characters = useCharacterStore(state => state.characters)
  const addCharacter = useCharacterStore(state => state.addCharacter)
  const [isCharacterMenuOpen, setIsCharacterMenuOpen] = useState(false)
  const isEditing = useEditModeStore(state => state.isEditing)

  const handleAddCharacter = () => {
    const newCharacter: Omit<Character, 'id'> = {
      name: 'New Character',
      race: '',
      class: '',
      level: 1,
      alignment: '',
      proficiencyBonus: 2,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      armorClass: 10,
      initiative: 0,
      speed: 30,
      currentHP: 10,
      totalHP: 10,
      equipment: '',
      notes: ''
    }
    addCharacter(newCharacter)
  }

  // Funzione per importare personaggi
  const handleImportCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return
    
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const characterData = JSON.parse(e.target?.result as string)
          // Rimuovi l'ID per generarne uno nuovo
          const { id, ...characterWithoutId } = characterData
          addCharacter(characterWithoutId)
        } catch (error) {
          console.error('Error parsing character file:', error)
          alert('Invalid character file')
        }
      }
      reader.readAsText(file)
    })
    
    // Reset dell'input per permettere di importare lo stesso file più volte
    event.target.value = ''
  }

  return (
    <div className="mb-2">
      <button 
        onClick={() => !isEditing && setIsCharacterMenuOpen(!isCharacterMenuOpen)}
        className={`w-full flex items-center p-3 rounded-lg focus:outline-none ${
          currentPage.startsWith('character-') ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900/50 text-gray-400'
        } ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isEditing}
      >
        <Users size={20} className="mr-3" />
        <span>Personaggi</span>
        <ChevronDown 
          size={16} 
          className={`ml-auto transition-transform duration-200 ${
            isCharacterMenuOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${
        isCharacterMenuOpen ? 'mt-2' : 'max-h-0'
      }`}>
        {characters.map(character => (
          <button
            key={character.id}
            onClick={() => !isEditing && setCurrentPage(`character-${character.id}`)}
            className={`w-full flex items-center p-2 mb-1 rounded-lg focus:outline-none ${
              currentPage === `character-${character.id}` ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'
            } ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isEditing}
          >
            {character.name}
          </button>
        ))}
        {/* Pulsante per aggiungere personaggio */}
        <button
          onClick={() => !isEditing && handleAddCharacter()}
          className={`w-full flex items-center p-2 mb-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none ${
            isEditing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isEditing}
        >
          <Plus size={16} className="mr-2" />
          Add Character
        </button>
        {/* Pulsante per importare personaggi */}
        <button
          className={`w-full flex items-center p-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none ${
            isEditing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isEditing}
        >
          <label className={`w-full flex items-center ${isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <Upload size={16} className="mr-2" />
            Import Character(s)
            <input 
              type="file" 
              accept=".json" 
              onChange={!isEditing ? handleImportCharacter : undefined} 
              className="hidden"
              multiple
              disabled={isEditing}
            />
          </label>
        </button>
      </div>
    </div>
  )
}

export default CharacterSection