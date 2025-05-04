import React from 'react';
import { Paper, Typography, TextField, Box, LinearProgress } from '@mui/material';

interface HitPointsProps {
  currentHP: number;
  totalHP: number;
  temporaryHP: number;
  isEditing: boolean;
  onCurrentHPChange: (value: number) => void;
  onTotalHPChange: (value: number) => void;
  onTemporaryHPChange: (value: number) => void;
}

const HitPoints: React.FC<HitPointsProps> = ({
  currentHP,
  totalHP,
  temporaryHP,
  isEditing,
  onCurrentHPChange,
  onTotalHPChange,
  onTemporaryHPChange,
}) => {
  return (
    <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Typography variant="h5" color="primary.main" fontWeight="bold" mb={2}>Hit Points</Typography>
      
      {isEditing ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Current HP</Typography>
              <TextField
                type="number"
                value={currentHP}
                onChange={(e) => onCurrentHPChange(parseInt(e.target.value) || 0)}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{ style: { textAlign: 'center' } }}
              />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Max HP</Typography>
              <TextField
                type="number"
                value={totalHP}
                onChange={(e) => onTotalHPChange(parseInt(e.target.value) || 0)}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{ style: { textAlign: 'center' } }}
              />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Temp HP</Typography>
              <TextField
                type="number"
                value={temporaryHP}
                onChange={(e) => onTemporaryHPChange(parseInt(e.target.value) || 0)}
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{ style: { textAlign: 'center' } }}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">Current</Typography>
            <Typography variant="caption" color="text.secondary">Max</Typography>
            <Typography variant="caption" color="text.secondary">Temp</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" color="primary.main">{currentHP}</Typography>
            <Typography variant="h4" fontWeight="bold">{totalHP}</Typography>
            <Typography variant="h4" fontWeight="bold" color="success.main">
              {temporaryHP > 0 ? `+${temporaryHP}` : temporaryHP}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(100, (currentHP / totalHP) * 100)} 
              color="primary"
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default HitPoints;