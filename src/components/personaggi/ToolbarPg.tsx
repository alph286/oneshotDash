import React from 'react';
import { Box, IconButton, Tooltip, AppBar, Toolbar, Stack, alpha } from '@mui/material';
// Importa le icone Material UI
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import StraightenIcon from '@mui/icons-material/Straighten';
import ShieldIcon from '@mui/icons-material/Shield';

interface ToolbarPgProps {
  isEditing: boolean;
  useMetric: boolean;
  onEdit: () => void;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  onExport: () => void;
  onDelete: () => void;
  onToggleNotes: () => void;
  onToggleSpells: () => void;
  onToggleMetric: () => void;
  showNotes: boolean;
  showSpells: boolean;
  onToggleProficiencies: () => void;
  showProficiencies: boolean;
}

function ToolbarPg({ 
  isEditing,
  useMetric,
  onEdit,
  onSave,
  onExport,
  onDelete,
  onToggleNotes,
  onToggleSpells,
  onToggleMetric,
  showNotes,
  showSpells,
  onToggleProficiencies,
  showProficiencies
}: ToolbarPgProps) {
  return (
    <AppBar 
      position="sticky" 
      color="transparent" 
      sx={{ 
        top: 0, 
        zIndex: 50, 
        bgcolor: alpha('#18181b', 0.8),
        backdropFilter: 'blur(4px)',
        mb: 4,
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Abilità e Competenze">
            <IconButton
              onClick={onToggleProficiencies}
              color={showProficiencies ? "primary" : "default"}
              sx={{ 
                bgcolor: showProficiencies ? alpha('#6366f1', 0.2) : 'background.paper',
                '&:hover': { bgcolor: showProficiencies ? alpha('#6366f1', 0.3) : alpha('#27272a', 0.8) }
              }}
            >
              <ShieldIcon fontSize="small" sx={{ color: showProficiencies ? "#a5b4fc" : "#6366f1" }} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Note">
            <IconButton
              onClick={onToggleNotes}
              color={showNotes ? "secondary" : "default"}
              sx={{ 
                bgcolor: showNotes ? alpha('#7c3aed', 0.2) : 'background.paper',
                '&:hover': { bgcolor: showNotes ? alpha('#7c3aed', 0.3) : alpha('#27272a', 0.8) }
              }}
            >
              <MenuBookIcon fontSize="small" sx={{ color: showNotes ? "#c4b5fd" : "#7c3aed" }} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Incantesimi">
            <IconButton
              onClick={onToggleSpells}
              color={showSpells ? "info" : "default"}
              sx={{ 
                bgcolor: showSpells ? alpha('#3b82f6', 0.2) : 'background.paper',
                '&:hover': { bgcolor: showSpells ? alpha('#3b82f6', 0.3) : alpha('#27272a', 0.8) }
              }}
            >
              <AutoFixHighIcon fontSize="small" sx={{ color: showSpells ? "#bfdbfe" : "#3b82f6" }} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Sistema Metrico">
            <IconButton
              onClick={onToggleMetric}
              color={useMetric ? "success" : "default"}
              sx={{ 
                bgcolor: useMetric ? alpha('#10b981', 0.2) : 'background.paper',
                '&:hover': { bgcolor: useMetric ? alpha('#10b981', 0.3) : alpha('#27272a', 0.8) }
              }}
            >
              <StraightenIcon fontSize="small" sx={{ color: useMetric ? "#a7f3d0" : "#10b981" }} />
            </IconButton>
          </Tooltip>
        </Stack>
        
        <Stack direction="row" spacing={1}>
          {!isEditing && (
            <Tooltip title="Modifica Personaggio">
              <IconButton
                onClick={onEdit}
                sx={{ 
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: alpha('#27272a', 0.8) }
                }}
              >
                <EditIcon fontSize="small" sx={{ color: "#f59e0b" }} />
              </IconButton>
            </Tooltip>
          )}
          
          {isEditing && (
            <Tooltip title="Salva Modifiche">
              <IconButton
                onClick={onSave}
                sx={{ 
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: alpha('#27272a', 0.8) }
                }}
              >
                <SaveIcon fontSize="small" sx={{ color: "#10b981" }} />
              </IconButton>
            </Tooltip>
          )}
          
          <Tooltip title="Esporta Personaggio">
            <IconButton
              onClick={onExport}
              disabled={isEditing}
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: isEditing ? undefined : alpha('#1e3a8a', 0.2) },
                '& svg': { opacity: isEditing ? 0.5 : 1 }
              }}
            >
              <FileDownloadIcon fontSize="small" sx={{ color: "#3b82f6" }} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Elimina Personaggio">
            <IconButton
              onClick={onDelete}
              disabled={isEditing}
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: isEditing ? undefined : alpha('#7f1d1d', 0.2) },
                '& svg': { opacity: isEditing ? 0.5 : 1 }
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: "#ef4444" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default ToolbarPg;