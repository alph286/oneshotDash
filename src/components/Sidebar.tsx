import { Home, Users, Settings, ChevronDown } from 'lucide-react'
import { useCharacterStore } from '../stores/characterStore'
import { useState } from 'react'

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const characters = useCharacterStore(state => state.characters)
  const [isCharacterMenuOpen, setIsCharacterMenuOpen] = useState(false)

  return (
    <div className="w-64 h-full bg-zinc-950 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent hover:scrollbar-thumb-gray-700">
      <div className="text-xl font-bold mb-8 pl-4 text-gray-200">OS Manager</div>
      <nav className="h-full">
        <button 
          onClick={() => setCurrentPage('home')}
          className={`w-full flex items-center p-3 mb-2 rounded-lg ${
            currentPage === 'home' ? 'bg-zinc-900' : 'hover:bg-zinc-900'
          }`}
        >
          <Home size={20} className="mr-3" />
          Home
        </button>
        
        {/* Personaggi section with collapsible sub-items */}
        <div className="mb-2">
          <button 
            onClick={() => setIsCharacterMenuOpen(!isCharacterMenuOpen)}
            className="w-full flex items-center p-3 text-gray-400 bg-zinc-900/50 rounded-lg"
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
                className={`w-full flex items-center p-2 mb-1 rounded-lg ${
                  currentPage === `character-${character.id}` ? 'bg-zinc-900' : 'hover:bg-zinc-900'
                }`}
              >
                {character.name}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setCurrentPage('settings')}
          className={`w-full flex items-center p-3 mb-2 rounded-lg ${
            currentPage === 'settings' ? 'bg-zinc-900' : 'hover:bg-zinc-900'
          }`}
        >
          <Settings size={20} className="mr-3" />
          Settings
        </button>
      </nav>
    </div>
  )
}

export default Sidebar