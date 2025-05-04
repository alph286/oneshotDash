import React from 'react';
import type { Character } from '../../stores/characterStore';
import { Typography, TextField, Grid, Box, Stack } from '@mui/material';

interface HeaderPgProps {
  character: Character;
  isEditing: boolean;
  onInputChange: (field: keyof Character, value: any) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function HeaderPg({ character, isEditing, onInputChange, onKeyPress }: HeaderPgProps) {
  if (isEditing) {
    return (
      <Grid container spacing={3} sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        {/* Level Section */}
        <Grid size={1}>
          <Box>
            <Typography variant="caption" color="text.secondary">Level</Typography>
            <TextField
              type="number"
              value={character.level}
              onChange={(e) => onInputChange('level', parseInt(e.target.value))}
              variant="outlined"
              size="small"
              sx={{ width: '80px' }}
            />
          </Box>
        </Grid>

        {/* Name, Race, Class Section */}
        <Grid size={{ xs: 12, sm: 6, md: 7 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Name</Typography>
              <TextField
                fullWidth
                value={character.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                onKeyDown={(e) => onKeyPress(e as React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)}
                variant="outlined"
                slotProps={{ input: { sx: { typography: 'h4', fontWeight: 'bold' } } }}
              />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Race</Typography>
              <TextField
                fullWidth
                value={character.race}
                onChange={(e) => onInputChange('race', e.target.value)}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Class</Typography>
              <TextField
                fullWidth
                value={character.class}
                onChange={(e) => onInputChange('class', e.target.value)}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
        </Grid>

        {/* Proficiency Bonus Section */}
        <Grid size={{ xs: 6, sm: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Proficiency Bonus</Typography>
            <TextField
              type="number"
              value={character.proficiencyBonus}
              onChange={(e) => onInputChange('proficiencyBonus', parseInt(e.target.value))}
              variant="outlined"
              size="small"
              sx={{ width: '80px' }}
            />
          </Box>
        </Grid>

        {/* Spell DC Section */}
        <Grid size={{ xs: 6, sm: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Spell DC</Typography>
            <TextField
              type="number"
              value={character.spellDC || 0}
              onChange={(e) => onInputChange('spellDC', parseInt(e.target.value))}
              variant="outlined"
              size="small"
              sx={{ width: '80px' }}
            />
          </Box>
        </Grid>

        {/* Spell ToHit Section */}
        <Grid size={{ xs: 6, sm: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Spell ToHit</Typography>
            <TextField
              type="number"
              value={character.spellToHit || 0}
              onChange={(e) => onInputChange('spellToHit', parseInt(e.target.value))}
              variant="outlined"
              size="small"
              sx={{ width: '80px' }}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }

  // Visualizzazione in modalità non-editing (tutti i campi su una singola riga)
  return (
    <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" spacing={3} alignItems="center" flexWrap="nowrap" sx={{ overflowX: 'auto' }}>
        {/* Level */}
        <Box sx={{ minWidth: '60px', textAlign: 'center' }}>
          <Typography color="text.secondary" variant="caption">Level</Typography>
          <Typography variant="h3" color="primary.main" fontWeight="bold">{character.level}</Typography>
        </Box>

        {/* Name */}
        <Box sx={{ minWidth: '150px' }}>
          <Typography color="text.secondary" variant="caption" noWrap>
            {character.race} - {character.class}
          </Typography>
          <Typography variant="h3" color="primary.main" fontWeight="bold" noWrap>
            {character.name}
          </Typography>
        </Box>

        {/* Proficiency Bonus */}
        <Box sx={{ minWidth: '80px', textAlign: 'center' }}>
          <Typography color="text.secondary" variant="caption">Bonus Competenza</Typography>
          <Typography variant="h3" color="primary.main">+{character.proficiencyBonus}</Typography>
        </Box>

        {/* Spell DC */}
        <Box sx={{ minWidth: '80px', textAlign: 'center' }}>
          <Typography color="text.secondary" variant="caption">Spell DC</Typography>
          <Typography variant="h3" color="primary.main">{character.spellDC}</Typography>
        </Box>

        {/* Spell ToHit */}
        <Box sx={{ minWidth: '80px', textAlign: 'center' }}>
          <Typography color="text.secondary" variant="caption">Spell ToHit</Typography>
          <Typography variant="h3" color="primary.main">+{character.spellToHit}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default HeaderPg;