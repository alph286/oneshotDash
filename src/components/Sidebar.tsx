import { Home, Users, Settings, ChevronDown } from 'lucide-react'
import { useCharacterStore } from '../stores/characterStore'
import { Character } from '../stores/characterStore'; // Add this import
import { useState } from 'react'
import { Plus } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const characters = useCharacterStore(state => state.characters);
  const addCharacter = useCharacterStore(state => state.addCharacter);
  const [isCharacterMenuOpen, setIsCharacterMenuOpen] = useState(false);

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
    };
    addCharacter(newCharacter);
  };

  return (
    <div className="w-64 h-full bg-zinc-950 p-4 flex flex-col">
      <div className="text-xl font-bold mb-8 pl-4 text-gray-200">OS Manager</div>
      <div className="flex-grow overflow-auto scrollbar-auto">
        <nav>
          <button 
            onClick={() => setCurrentPage('home')}
            className={`w-full flex items-center p-3 mb-2 rounded-lg focus:outline-none ${
              currentPage === 'home' ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'
            }`}
          >
            <Home size={20} className="mr-3" />
            Home
          </button>
          
          {/* Personaggi section with collapsible sub-items */}
          <div className="mb-2">
            <button 
              onClick={() => setIsCharacterMenuOpen(!isCharacterMenuOpen)}
              className={`w-full flex items-center p-3 rounded-lg focus:outline-none ${
                currentPage.startsWith('character-') ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900/50 text-gray-400'
              }`}
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
              isCharacterMenuOpen ? 'max-h-96 mt-2' : 'max-h-0'
            }`}>
              {characters.map(character => (
                <button
                  key={character.id}
                  onClick={() => setCurrentPage(`character-${character.id}`)}
                  className={`w-full flex items-center p-2 mb-1 rounded-lg focus:outline-none ${
                    currentPage === `character-${character.id}` ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'
                  }`}
                >
                  {character.name}
                </button>
              ))}
              {/* Add the + button */}
              <button
                onClick={handleAddCharacter}
                className="w-full flex items-center p-2 rounded-lg hover:bg-zinc-900 text-gray-400 focus:outline-none"
              >
                <Plus size={16} className="mr-2" />
                Add Character
              </button>
            </div>
          </div>

          <button 
            onClick={() => setCurrentPage('settings')}
            className={`w-full flex items-center p-3 mb-2 rounded-lg focus:outline-none ${
              currentPage === 'settings' ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'
            }`}
          >
            <Settings size={20} className="mr-3" />
            Settings
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar