import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AccessTime as ClockIcon } from '@mui/icons-material';

function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ 
      bgcolor: 'background.paper', 
      px: 2, 
      py: 1.5, 
      borderRadius: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      height: 40 // Altezza fissa standardizzata
    }}>
      <ClockIcon color="primary" fontSize="small" />
      <Typography variant="body2" color="text.primary">
        {time}
      </Typography>
    </Box>
  )
}

export default Time