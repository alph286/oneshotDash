import { Home } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useEditModeStore } from '../stores/editModeStore'
import BeholderBox from './ui/BeholderBox'
import CharacterSection from './sidebar/CharacterSection'
import StoriaSection from './sidebar/StoriaSection'

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const isEditing = useEditModeStore(state => state.isEditing)
  
  // Riferimento e stato per il rilevamento della barra di scorrimento
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [hasScrollbar, setHasScrollbar] = useState(false)
  
  // Verifica se è presente la barra di scorrimento
  useEffect(() => {
    const checkForScrollbar = () => {
      if (navContainerRef.current) {
        const { scrollHeight, clientHeight } = navContainerRef.current
        setHasScrollbar(scrollHeight > clientHeight)
      }
    }
    
    // Verifica iniziale
    checkForScrollbar()
    
    // Verifica quando la finestra viene ridimensionata o il contenuto cambia
    window.addEventListener('resize', checkForScrollbar)
    
    return () => {
      window.removeEventListener('resize', checkForScrollbar)
    }
  }, [])

  return (
    <div className="w-64 h-full bg-zinc-950 p-4 flex flex-col">
      <BeholderBox />
      <div 
        ref={navContainerRef}
        className={`flex-grow overflow-y-auto custom-scrollbar ${hasScrollbar ? 'pr-2' : ''}`}
      >
        <nav>
          <button 
            onClick={() => !isEditing && setCurrentPage('home')}
            className={`w-full flex items-center p-3 mb-2 rounded-lg focus:outline-none ${
              currentPage === 'home' ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'
            } ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isEditing}
          >
            <Home size={20} className="mr-3" />
            Home
          </button>
          
          {/* Componente per la sezione Personaggi */}
          <CharacterSection 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
          />

          {/* Componente per la sezione Storia */}
          <StoriaSection 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
          />
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
