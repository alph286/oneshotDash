import React from 'react';
import type { Character } from '../../stores/characterStore';
import { Paper, Typography, TextField, Box } from '@mui/material';

interface CardCaratteristicaProps {
  name: string;
  field: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
  value: number;
  baseBonus: number;
  additionalBonus?: number;
  isEditing: boolean;
  onValueChange: (value: number) => void;
  onBonusChange: (value: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const CardCaratteristica: React.FC<CardCaratteristicaProps> = ({
  name,
  field,
  value,
  baseBonus,
  additionalBonus = 0,
  isEditing,
  onValueChange,
  onBonusChange,
  onKeyDown,
}) => {
  // Calculate the base bonus directly from the value to ensure it's correct
  const calculatedBaseBonus = Math.floor((value - 10) / 2);
  // Use the calculated base bonus instead of the passed baseBonus
  const totalBonus = calculatedBaseBonus + additionalBonus;

  if (isEditing) {
    return (
      <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography variant="h5" color="primary.main" fontWeight="bold" mb={1}>{name}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Value</Typography>
            <TextField
              type="number"
              value={value}
              onChange={(e) => onValueChange(parseInt(e.target.value) || 0)}
              onKeyDown={onKeyDown}
              onBlur={(e) => onValueChange(parseInt(e.target.value) || 0)}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Mod</Typography>
            <TextField
              type="number"
              value={additionalBonus}
              onChange={(e) => onBonusChange(parseInt(e.target.value) || 0)}
              onKeyDown={onKeyDown}
              onBlur={(e) => onBonusChange(parseInt(e.target.value) || 0)}
              variant="outlined"
              size="small"
              fullWidth
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
      <Typography variant="h5" color="primary.main" fontWeight="bold" mb={1}>{name}</Typography>
      <Typography variant="h4" fontWeight="bold" mb={0.5}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">
        Base: {calculatedBaseBonus >= 0 ? '+' : ''}{calculatedBaseBonus}
      </Typography>
      <Typography variant="body2" color="primary.main">
        Mod: {additionalBonus >= 0 ? '+' : ''}{additionalBonus}
      </Typography>
      <Typography variant="h6" color="success.main" fontWeight="bold" mt={1}>
        Total: {totalBonus >= 0 ? '+' : ''}{totalBonus}
      </Typography>
    </Paper>
  );
};

export default CardCaratteristica;