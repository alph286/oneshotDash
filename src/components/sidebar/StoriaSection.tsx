import { Settings, ChevronDown, Plus, Upload, Download } from 'lucide-react'
import { useState } from 'react'
import { useStoriaStore } from '../../stores/storiaStore'
import { useEditModeStore } from '../../stores/editModeStore'

interface StoriaSectionProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function StoriaSection({ currentPage, setCurrentPage }: StoriaSectionProps) {
  const [isStoriaMenuOpen, setIsStoriaMenuOpen] = useState(false)
  const fasi = useStoriaStore(state => state.phases)
  const addPhase = useStoriaStore(state => state.addPhase)
  const addEvent = useStoriaStore(state => state.addEvent)
  const isEditing = useEditModeStore(state => state.isEditing)

  // Calcolo del tempo totale stimato
  const totalMinutes = fasi.reduce((total, fase) => {
    return total + fase.estimatedTime
  }, 0)
  
  // Conversione in formato hh:mm
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  const handleAddFase = () => {
    // Trova tutti i numeri già utilizzati
    const usedNumbers = new Set(fasi.map(fase => fase.number))
    
    // Trova il numero più basso disponibile partendo da 1
    let newNumber = 1
    while (usedNumbers.has(newNumber)) {
      newNumber++
    }
  
    const newFase = {
      number: newNumber,
      title: `Titolo`,
      estimatedTime: 30
    }
    addPhase(newFase)
  }

  const handleImportFase = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return
    
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const faseData = JSON.parse(e.target?.result as string)
          console.log("Imported fase data:", faseData) // Debug log
          
          // Verifica che i dati importati abbiano i campi richiesti
          if (!faseData.number || !faseData.title) {
            throw new Error('Invalid fase data: missing required fields')
          }
          
          // Trova tutti i numeri già utilizzati per evitare duplicati
          const usedNumbers = new Set(fasi.map(fase => fase.number))
          
          // Se il numero è già utilizzato, trova il prossimo disponibile
          let faseNumber = faseData.number
          while (usedNumbers.has(faseNumber)) {
            faseNumber++
          }
          
          // Crea un nuovo oggetto fase senza l'id per generarne uno nuovo
          const newFase = {
            number: faseNumber,
            title: faseData.title,
            estimatedTime: faseData.estimatedTime || 30
          }
          
          // Aggiungi la fase
          const phaseId = addPhase(newFase)
          console.log("Added phase with ID:", phaseId) // Debug log
          
          // Verifica se ci sono eventi da importare
          if (faseData.events && Array.isArray(faseData.events) && faseData.events.length > 0) {
            console.log(`Found ${faseData.events.length} events to import`) // Debug log
            
            // Ottieni lo stato più recente delle fasi
            const currentPhases = useStoriaStore.getState().phases
            const addedPhase = currentPhases.find(fase => fase.number === faseNumber)
            
            if (addedPhase) {
              console.log("Found added phase:", addedPhase) // Debug log
              
              // Ordina gli eventi per posizione
              const sortedEvents = [...faseData.events].sort((a, b) => 
                (a.position !== undefined && b.position !== undefined) 
                  ? a.position - b.position 
                  : 0
              )
              
              // Aggiungi ogni evento alla fase
              sortedEvents.forEach((event, index) => {
                if (event.type && event.title && event.description) {
                  const newEvent = {
                    type: event.type,
                    title: event.title,
                    description: event.description,
                    timestamp: new Date(),
                    position: event.position !== undefined ? event.position : index
                  }
                  
                  // Aggiungi l'evento alla fase
                  addEvent(addedPhase.id, newEvent)
                  console.log(`Added event: ${event.title} to phase ${faseNumber}`)
                } else {
                  console.warn('Skipping invalid event:', event)
                }
              })
              
              // Naviga alla fase appena importata
              setCurrentPage(`fase-${addedPhase.id}`)
            } else {
              console.error('Could not find the newly added phase')
            }
          }
          
          alert(`Fase "${faseData.title}" imported successfully!`)
        } catch (error) {
          console.error('Error parsing fase file:', error)
          alert('Invalid fase file')
        }
      }
      reader.readAsText(file)
    })
    
    // Reset dell'input per permettere di importare lo stesso file più volte
    event.target.value = ''
  }

  const handleExportAllFasi = () => {
    if (isEditing) return
    
    // Ordina le fasi per numero
    const sortedFasi = [...fasi].sort((a, b) => a.number - b.number)
    
    // Crea un oggetto con tutte le fasi ordinate
    const exportData = {
      exportDate: new Date().toISOString(),
      totalEstimatedTime: totalMinutes,
      phases: sortedFasi
    }
    
    // Crea e scarica il file JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `all_phases_${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    alert('Tutte le fasi sono state esportate con successo!')
  }

  const handleImportAllFasi = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target?.result as string)
        
        // Verifica che il file contenga l'array delle fasi
        if (!importData.phases || !Array.isArray(importData.phases)) {
          throw new Error('File non valido: manca l\'array delle fasi')
        }
        
        // Ottieni tutti i numeri di fase già utilizzati
        const usedNumbers = new Set(fasi.map(fase => fase.number))
        
        // Contatori per il report finale
        let importedCount = 0
        let eventsCount = 0
        
        // Importa ogni fase
        for (const faseData of importData.phases) {
          // Verifica che la fase abbia i campi richiesti
          if (!faseData.number || !faseData.title) {
            console.warn('Fase non valida, mancano campi obbligatori:', faseData)
            continue
          }
          
          // Trova un numero disponibile per la fase
          let faseNumber = faseData.number
          while (usedNumbers.has(faseNumber)) {
            faseNumber++
          }
          usedNumbers.add(faseNumber)
          
          // Crea una nuova fase
          const newFase = {
            number: faseNumber,
            title: faseData.title,
            estimatedTime: faseData.estimatedTime || 30
          }
          
          // Aggiungi la fase
          const phaseId = addPhase(newFase)
          importedCount++
          
          // Importa gli eventi se presenti
          if (faseData.events && Array.isArray(faseData.events)) {
            // Ottieni lo stato aggiornato delle fasi
            const currentPhases = useStoriaStore.getState().phases
            const addedPhase = currentPhases.find(fase => fase.number === faseNumber)
            
            if (addedPhase) {
              // Ordina gli eventi per posizione
              const sortedEvents = [...faseData.events].sort((a, b) => 
                (a.position !== undefined && b.position !== undefined) 
                  ? a.position - b.position 
                  : 0
              )
              
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
                  }
                  
                  // Aggiungi l'evento alla fase
                  addEvent(addedPhase.id, newEvent)
                  eventsCount++
                }
              })
            }
          }
        }
        
        alert(`Importazione completata: ${importedCount} fasi e ${eventsCount} eventi importati con successo!`)
      } catch (error) {
        console.error('Errore durante l\'importazione delle fasi:', error)
        alert('File non valido o errore durante l\'importazione')
      }
    }
    
    reader.readAsText(files[0])
    
    // Reset dell'input per permettere di importare lo stesso file più volte
    event.target.value = ''
  }

  return (
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
        {/* Lista delle fasi */}
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
        {/* Pulsante per aggiungere fase */}
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
        {/* Pulsante per importare fase */}
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
        
        {/* Pulsante per esportare tutte le fasi */}
        <button
          onClick={() => !isEditing && handleExportAllFasi()}
          className={`w-full flex items-center p-2 mb-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none ${
            isEditing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isEditing}
        >
          <Download size={16} className="mr-2" />
          Export All
        </button>
        
        {/* Pulsante per importare tutte le fasi */}
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
  )
}

export default StoriaSection