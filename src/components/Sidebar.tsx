import { Home, Users, Settings, ChevronDown } from 'lucide-react'
import { useCharacterStore } from '../stores/characterStore'
import { Character } from '../stores/characterStore'; // Add this import
import { useState } from 'react'
import { Plus, Upload } from 'lucide-react'
import { useStoriaStore } from '../stores/storiaStore';
import { useEditModeStore } from '../stores/editModeStore';

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const characters = useCharacterStore(state => state.characters);
  const addCharacter = useCharacterStore(state => state.addCharacter);
  const [isCharacterMenuOpen, setIsCharacterMenuOpen] = useState(false);
  const [isStoriaMenuOpen, setIsStoriaMenuOpen] = useState(false);
  const fasi = useStoriaStore(state => state.phases);
  const isEditing = useEditModeStore(state => state.isEditing);

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

  // Updated import function to match CharacterMassImport logic
  const handleImportCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const characterData = JSON.parse(e.target?.result as string);
          // Remove the id to generate a new one
          const { id, ...characterWithoutId } = characterData;
          addCharacter(characterWithoutId);
        } catch (error) {
          console.error('Error parsing character file:', error);
          alert('Invalid character file');
        }
      };
      reader.readAsText(file);
    });
    
    // Reset the input to allow importing the same file again
    event.target.value = '';
  };

  const addPhase = useStoriaStore(state => state.addPhase);

  const handleAddFase = () => {
    // Find all used numbers
    const usedNumbers = new Set(fasi.map(fase => fase.number));
    
    // Find the lowest available number starting from 1
    let newNumber = 1;
    while (usedNumbers.has(newNumber)) {
      newNumber++;
    }
  
    const newFase = {
      number: newNumber,
      title: `Titolo`,
      estimatedTime: 30  // Changed from string to number
    };
    addPhase(newFase);
  };

  const handleImportFase = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Add your logic for importing fasi
  };

  // Update the totalEstimatedTime calculation
  const totalMinutes = fasi.reduce((total, fase) => {
    // No need to parse as estimatedTime is now a number
    return total + fase.estimatedTime;
  }, 0);
  
  // Convert total minutes to hh:mm format
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return (
    <div className="w-64 h-full bg-zinc-950 p-4 flex flex-col">
      <div className="text-xl font-bold mb-8 pl-4 text-gray-200">OS Manager</div>
      <div className="flex-grow overflow-auto scrollbar-auto">
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
          
          {/* Personaggi section with collapsible sub-items */}
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
              isCharacterMenuOpen ? 'max-h-96 mt-2' : 'max-h-0'
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
              {/* Add the + button */}
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
              {/* Add Import Character button */}
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

          {/* Storia section with collapsible sub-items */}
          <div className="mb-2">
            <button 
              onClick={() => !isEditing && setIsStoriaMenuOpen(!isStoriaMenuOpen)}
              className={`w-full flex items-center p-3 rounded-lg focus:outline-none ${
                currentPage.startsWith('fase-') ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900/50 text-gray-400'
              } ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isEditing}
            >
              <Settings size={20} className="mr-3" />
              <span>Storia</span>
              <span className={`ml-2 text-xs ${
                currentPage.startsWith('fase-') ? 'text-zinc-900' : 'text-gray-400'
              }`}>
                ({formattedTime})
              </span>
              <ChevronDown 
                size={16} 
                className={`ml-auto transition-transform duration-200 ${
                  isStoriaMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${
              isStoriaMenuOpen ? 'max-h-96 mt-2' : 'max-h-0'
            }`}>
              {/* List of fasi */}
              {fasi
                .slice()
                .sort((a, b) => a.number - b.number)
                .map(fase => (
                  <button
                    key={fase.id}
                    onClick={() => !isEditing && setCurrentPage(`fase-${fase.id}`)}
                    className={`w-full flex items-center p-2 mb-1 rounded-lg focus:outline-none ${
                      currentPage === `fase-${fase.id}` ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'
                    } ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isEditing}
                  >
                    <div className="flex flex-col">
                      <span className='text-left'>Fase {fase.number}</span>
                      <span className={`text-xs text-left ${
                        currentPage === `fase-${fase.id}` ? 'text-zinc-900' : 'text-gray-400'
                      }`}>
                        {fase.title}
                      </span>
                    </div>
                  </button>
                ))}
              {/* Add Fase button */}
              <button
                onClick={() => !isEditing && handleAddFase()}
                className={`w-full flex items-center p-2 mb-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none ${
                  isEditing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isEditing}
              >
                <Plus size={16} className="mr-2" />
                Add Fase
              </button>
              {/* Import Fase button */}
              <button
                className={`w-full flex items-center p-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none ${
                  isEditing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isEditing}
              >
                <label className={`w-full flex items-center ${isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <Upload size={16} className="mr-2" />
                  Import Fase
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={!isEditing ? handleImportFase : undefined} 
                    className="hidden"
                    multiple
                    disabled={isEditing}
                  />
                </label>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar