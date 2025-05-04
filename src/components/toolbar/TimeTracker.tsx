import React, { useState, useEffect } from 'react';
import { useStoriaStore } from '../../stores/storiaStore';
import { useCampaignStore } from '../../stores/campaignStore';
import { 
  Box, 
  Typography, 
  Button, 
  Chip,
  Stack
} from '@mui/material';
import { 
  AccessTime as ClockIcon, 
  Warning as AlertIcon, 
  CheckCircle as CheckIcon 
} from '@mui/icons-material';

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
    <Box sx={{ 
      bgcolor: 'background.paper', 
      px: 2, 
      py: 1.5, 
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: 40 // Altezza fissa standardizzata
    }}>
      <Typography variant="body2" color="text.secondary">
        Fase attiva:
      </Typography>
      
      <Stack direction="row" spacing={1}>
        {sortedFasi.map((fase, index) => (
          <Button
            key={fase.id}
            onClick={() => handlePhaseClick(index)}
            variant={activePhaseIndex === index ? "contained" : "outlined"}
            color={activePhaseIndex === index ? "primary" : "inherit"}
            size="small"
            sx={{ minWidth: 'auto', px: 1, height: 24 }} // Altezza fissa per i pulsanti
          >
            {fase.number}
          </Button>
        ))}
      </Stack>
      
      {activePhaseIndex !== null && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Stato:
          </Typography>
          
          <Chip
            icon={isAhead ? <CheckIcon /> : <AlertIcon />}
            label={isAhead 
              ? `In anticipo di ${formatTimeDifference()}` 
              : `In ritardo di ${formatTimeDifference()}`
            }
            color={isAhead ? "success" : "error"}
            size="small"
          />
        </Box>
      )}
    </Box>
  );
}

export default TimeTracker;