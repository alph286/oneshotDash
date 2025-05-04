import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCampaignStore } from '../../stores/campaignStore';

function CampaignStartDisplay() {
  const startTime = useCampaignStore((state) => state.startTime);

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
        Inizio Campagna:
      </Typography>
      <Typography variant="body2" color="primary" sx={{ ml: 1 }}>
        {startTime || 'Non impostato'}
      </Typography>
    </Box>
  );
}

export default CampaignStartDisplay;