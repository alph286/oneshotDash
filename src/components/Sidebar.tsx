import { Home, Users, Settings, ChevronDown } from 'lucide-react'
import { useCharacterStore } from '../stores/characterStore'
import { Character } from '../stores/characterStore';
import { useState, useRef, useEffect } from 'react'
import { Plus, Upload, Download } from 'lucide-react'
import { useStoriaStore } from '../stores/storiaStore';
import { useEditModeStore } from '../stores/editModeStore';
import BeholderBox from './ui/BeholderBox';

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
  
  // Add the missing ref and state for scrollbar detection
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  
  // Check if scrollbar is present
  useEffect(() => {
    const checkForScrollbar = () => {
      if (navContainerRef.current) {
        const { scrollHeight, clientHeight } = navContainerRef.current;
        setHasScrollbar(scrollHeight > clientHeight);
      }
    };
    
    // Check initially
    checkForScrollbar();
    
    // Check when window resizes or content changes
    window.addEventListener('resize', checkForScrollbar);
    
    return () => {
      window.removeEventListener('resize', checkForScrollbar);
    };
  }, [isCharacterMenuOpen, isStoriaMenuOpen, characters.length, fasi.length]);

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
  const addEvent = useStoriaStore(state => state.addEvent);

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
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const faseData = JSON.parse(e.target?.result as string);
          console.log("Imported fase data:", faseData); // Debug log
          
          // Check if the imported data has the required fields
          if (!faseData.number || !faseData.title) {
            throw new Error('Invalid fase data: missing required fields');
          }
          
          // Find all used numbers to avoid duplicates
          const usedNumbers = new Set(fasi.map(fase => fase.number));
          
          // If the number is already used, find the next available number
          let faseNumber = faseData.number;
          while (usedNumbers.has(faseNumber)) {
            faseNumber++;
          }
          
          // Create a new fase object without the id to generate a new one
          const newFase = {
            number: faseNumber,
            title: faseData.title,
            estimatedTime: faseData.estimatedTime || 30
          };
          
          // Add the fase
          const phaseId = addPhase(newFase);
          console.log("Added phase with ID:", phaseId); // Debug log
          
          // Check if there are events to import
          if (faseData.events && Array.isArray(faseData.events) && faseData.events.length > 0) {
            console.log(`Found ${faseData.events.length} events to import`); // Debug log
            
            // Get the latest state of phases
            const currentPhases = useStoriaStore.getState().phases;
            const addedPhase = currentPhases.find(fase => fase.number === faseNumber);
            
            if (addedPhase) {
              console.log("Found added phase:", addedPhase); // Debug log
              
              // Sort events by position
              const sortedEvents = [...faseData.events].sort((a, b) => 
                (a.position !== undefined && b.position !== undefined) 
                  ? a.position - b.position 
                  : 0
              );
              
              // Add each event to the phase
              sortedEvents.forEach((event, index) => {
                if (event.type && event.title && event.description) {
                  const newEvent = {
                    type: event.type,
                    title: event.title,
                    description: event.description,
                    timestamp: new Date(),
                    position: event.position !== undefined ? event.position : index
                  };
                  
                  // Add the event to the fase
                  addEvent(addedPhase.id, newEvent);
                  console.log(`Added event: ${event.title} to phase ${faseNumber}`);
                } else {
                  console.warn('Skipping invalid event:', event);
                }
              });
              
              // Navigate to the newly imported phase
              setCurrentPage(`fase-${addedPhase.id}`);
            } else {
              console.error('Could not find the newly added phase');
            }
          }
          
          alert(`Fase "${faseData.title}" imported successfully!`);
        } catch (error) {
          console.error('Error parsing fase file:', error);
          alert('Invalid fase file');
        }
      };
      reader.readAsText(file);
    });
    
    // Reset the input to allow importing the same file again
    event.target.value = '';
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

  const handleExportAllFasi = () => {
    if (isEditing) return;
    
    // Ordina le fasi per numero
    const sortedFasi = [...fasi].sort((a, b) => a.number - b.number);
    
    // Crea un oggetto con tutte le fasi ordinate
    const exportData = {
      exportDate: new Date().toISOString(),
      totalEstimatedTime: totalMinutes,
      phases: sortedFasi
    };
    
    // Crea e scarica il file JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_phases_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Tutte le fasi sono state esportate con successo!');
  };

  const handleImportAllFasi = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string);
        
        // Verifica che il file contenga l'array delle fasi
        if (!importData.phases || !Array.isArray(importData.phases)) {
          throw new Error('File non valido: manca l\'array delle fasi');
        }
        
        // Ottieni tutti i numeri di fase già utilizzati
        const usedNumbers = new Set(fasi.map(fase => fase.number));
        
        // Contatori per il report finale
        let importedCount = 0;
        let eventsCount = 0;
        
        // Importa ogni fase
        for (const faseData of importData.phases) {
          // Verifica che la fase abbia i campi richiesti
          if (!faseData.number || !faseData.title) {
            console.warn('Fase non valida, mancano campi obbligatori:', faseData);
            continue;
          }
          
          // Trova un numero disponibile per la fase
          let faseNumber = faseData.number;
          while (usedNumbers.has(faseNumber)) {
            faseNumber++;
          }
          usedNumbers.add(faseNumber);
          
          // Crea una nuova fase
          const newFase = {
            number: faseNumber,
            title: faseData.title,
            estimatedTime: faseData.estimatedTime || 30
          };
          
          // Aggiungi la fase
          const phaseId = addPhase(newFase);
          importedCount++;
          
          // Importa gli eventi se presenti
          if (faseData.events && Array.isArray(faseData.events)) {
            // Ottieni lo stato aggiornato delle fasi
            const currentPhases = useStoriaStore.getState().phases;
            const addedPhase = currentPhases.find(fase => fase.number === faseNumber);
            
            if (addedPhase) {
              // Ordina gli eventi per posizione
              const sortedEvents = [...faseData.events].sort((a, b) => 
                (a.position !== undefined && b.position !== undefined) 
                  ? a.position - b.position 
                  : 0
              );
              
              // Aggiungi ogni evento alla fase
              sortedEvents.forEach((event, index) => {
                if (event.type && event.title && event.description) {
                  const newEvent = {
                    type: event.type,
                    title: event.title,
                    description: event.description,
                    timestamp: new Date(),
                    position: event.position !== undefined ? event.position : index,
                    data: event.data
                  };
                  
                  // Aggiungi l'evento alla fase
                  addEvent(addedPhase.id, newEvent);
                  eventsCount++;
                }
              });
            }
          }
        }
        
        alert(`Importazione completata: ${importedCount} fasi e ${eventsCount} eventi importati con successo!`);
      } catch (error) {
        console.error('Errore durante l\'importazione delle fasi:', error);
        alert('File non valido o errore durante l\'importazione');
      }
    };
    
    reader.readAsText(files[0]);
    
    // Resetta l'input per permettere di importare lo stesso file più volte
    event.target.value = '';
  };

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
              isStoriaMenuOpen ? 'mt-2' : 'max-h-0'
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
                className={`w-full flex items-center p-2 mb-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none ${
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
              
              {/* Export All button */}
              <button
                onClick={() => !isEditing && handleExportAllFasi()}
                className={`w-full flex items-center p-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none ${
                  isEditing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isEditing}
              >
                <Download size={16} className="mr-2" />
                Export All
              </button>
              
              {/* Import All Fasi button */}
              <button
                className={`w-full flex items-center p-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none ${
                  isEditing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isEditing}
              >
                <label className={`w-full flex items-center ${isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                  <Upload size={16} className="mr-2" />
                  Import All Fasi
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={!isEditing ? handleImportAllFasi : undefined} 
                    className="hidden"
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
