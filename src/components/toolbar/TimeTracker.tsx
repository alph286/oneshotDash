import React, { useState, useEffect } from 'react';
import { useStoriaStore } from '../../stores/storiaStore';
import { useCampaignStore } from '../../stores/campaignStore';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

function TimeTracker() {
  const fasi = useStoriaStore(state => state.phases);
  const campaignStart = useCampaignStore(state => state.startTime);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeDifference, setTimeDifference] = useState<number>(0);
  const [isAhead, setIsAhead] = useState<boolean>(true);

  // Ordina le fasi per numero
  const sortedFasi = [...fasi].sort((a, b) => a.number - b.number);

  // Aggiorna l'orario corrente ogni secondo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calcola la differenza di tempo quando cambia la fase attiva o l'orario corrente
  useEffect(() => {
    if (activePhaseIndex === null || !campaignStart) return;

    // Converti l'orario di inizio campagna in un oggetto Date
    const today = new Date();
    const [hours, minutes] = campaignStart.split(':').map(Number);
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);

    // Calcola il tempo totale stimato fino alla fase attiva (inclusa)
    let totalMinutes = 0;
    for (let i = 0; i <= activePhaseIndex; i++) {
      totalMinutes += sortedFasi[i]?.estimatedTime || 0;
    }

    // Calcola l'orario previsto di fine della fase attiva
    const expectedEndTime = new Date(startDate.getTime() + totalMinutes * 60000);
    
    // Calcola la differenza tra l'orario corrente e l'orario previsto
    const diffMs = expectedEndTime.getTime() - currentTime.getTime();
    const diffMinutes = Math.abs(Math.round(diffMs / 60000));
    
    setTimeDifference(diffMinutes);
    setIsAhead(diffMs > 0);
  }, [activePhaseIndex, currentTime, campaignStart, sortedFasi]);

  // Gestisce il click su un pulsante di fase
  const handlePhaseClick = (index: number) => {
    setActivePhaseIndex(index);
  };

  // Formatta la differenza di tempo in ore e minuti
  const formatTimeDifference = () => {
    const hours = Math.floor(timeDifference / 60);
    const minutes = timeDifference % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (sortedFasi.length === 0 || !campaignStart) {
    return null;
  }

  return (
    <div className="bg-zinc-900 px-4 py-2 rounded-lg flex items-center gap-3">
      <span className="text-gray-300 text-sm whitespace-nowrap">Fase attiva:</span>
      <div className="flex gap-2 items-center">
        {sortedFasi.map((fase, index) => (
          <button
            key={fase.id}
            onClick={() => handlePhaseClick(index)}
            className={`px-2 py-1 rounded-md text-xs ${
              activePhaseIndex === index 
                ? 'bg-amber-500 text-zinc-900 font-bold' 
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
            title={fase.title}
          >
            {fase.number}
          </button>
        ))}
      </div>
      
      {activePhaseIndex !== null && (
        <div className="flex items-center gap-2 text-sm whitespace-nowrap">
          <span className="text-gray-300">Stato:</span>
          {isAhead ? (
            <>
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-green-500">
                In anticipo di {formatTimeDifference()}
              </span>
            </>
          ) : (
            <>
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-red-500">
                In ritardo di {formatTimeDifference()}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TimeTracker;