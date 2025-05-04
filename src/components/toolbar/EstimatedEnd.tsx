import { Box, Typography } from '@mui/material';
import { useStoriaStore } from '../../stores/storiaStore';
import { useCampaignStore } from '../../stores/campaignStore';

function EstimatedEnd() {
  const fasi = useStoriaStore(state => state.phases);
  const campaignStart = useCampaignStore(state => state.startTime);

  // Convert campaignStart to Date if it's a string
  const startDate = campaignStart ? 
    new Date(`1970-01-01T${campaignStart}:00`) : 
    null;
  
  // Simplified date validation
  const isValidDate = (date: Date | null): date is Date => {
    return date instanceof Date && !isNaN(date.getTime());
  };
  
  // Debug logging (remove after testing)
  console.log('campaignStart:', campaignStart);
  console.log('startDate:', startDate);
  console.log('isValidDate:', isValidDate(startDate));
  
  // Calculate total estimated time in minutes
  const totalMinutes = fasi.reduce((total, fase) => {
    const time = fase.estimatedTime || 0; // Directly use the number value
    return total + time;
  }, 0);

  // Calculate estimated end time
  const estimatedEnd = isValidDate(startDate) ? 
    new Date(startDate.getTime() + totalMinutes * 60000) : 
    null;

  // Format time as HH:mm
  const formatTime = (date: Date | null) => {
    if (!date || !isValidDate(date)) return '--:--';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.paper', 
      px: 2, 
      py: 1.5, 
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      height: 40 // Altezza fissa standardizzata
    }}>
      <Typography variant="body2" color="text.secondary">
        Stima Fine:
      </Typography>
      <Typography variant="body2" color="primary" sx={{ ml: 1 }}>
        {formatTime(estimatedEnd)}
      </Typography>
    </Box>
  );
}

export default EstimatedEnd;