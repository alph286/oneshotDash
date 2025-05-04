import { Users, ChevronDown, Plus, Upload } from 'lucide-react'
import { useState } from 'react'
import { useCharacterStore } from '../../stores/characterStore'
import { Character } from '../../stores/characterStore'
import { useEditModeStore } from '../../stores/editModeStore'
import { 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse, 
  Button, 
  Box,
  Typography
} from '@mui/material'

interface CharacterSectionProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function CharacterSection({ currentPage, setCurrentPage }: CharacterSectionProps) {
  const characters = useCharacterStore(state => state.characters)
  const addCharacter = useCharacterStore(state => state.addCharacter)
  const [isCharacterMenuOpen, setIsCharacterMenuOpen] = useState(false)
  const isEditing = useEditModeStore(state => state.isEditing)

  const handleAddCharacter = () => {
    const newCharacter: Omit<Character, 'id'> = {
      name: 'New Character',
      race: '',
      class: '',
      level: 1,
      alignment: '',
      proficiencyBonus: 2,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      armorClass: 10,
      initiative: 0,
      speed: 30,
      currentHP: 10,
      totalHP: 10,
      equipment: '',
      notes: ''
    }
    addCharacter(newCharacter)
  }

  // Funzione per importare personaggi
  const handleImportCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return
    
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const characterData = JSON.parse(e.target?.result as string)
          // Rimuovi l'ID per generarne uno nuovo
          const { id, ...characterWithoutId } = characterData
          addCharacter(characterWithoutId)
        } catch (error) {
          console.error('Error parsing character file:', error)
          alert('Invalid character file')
        }
      }
      reader.readAsText(file)
    })
    
    // Reset dell'input per permettere di importare lo stesso file più volte
    event.target.value = ''
  }

  return (
    <Box sx={{ mb: 2 }}>
      <ListItemButton
        onClick={() => !isEditing && setIsCharacterMenuOpen(!isCharacterMenuOpen)}
        selected={currentPage.startsWith('character-')}
        disabled={isEditing}
        sx={{
          borderRadius: 2,
          opacity: isEditing ? 0.5 : 1,
          cursor: isEditing ? 'not-allowed' : 'pointer',
          bgcolor: currentPage.startsWith('character-') ? 'primary.main' : 'background.paper',
          '&:hover': {
            bgcolor: currentPage.startsWith('character-') ? 'primary.dark' : 'action.hover',
          },
        }}
      >
        <ListItemIcon sx={{ 
          minWidth: 40, 
          color: currentPage.startsWith('character-') ? 'primary.contrastText' : 'text.secondary' 
        }}>
          <Users size={20} />
        </ListItemIcon>
        <ListItemText primary="Personaggi" />
        <ChevronDown 
          size={16} 
          style={{ 
            marginLeft: 'auto', 
            transform: isCharacterMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        />
      </ListItemButton>
      
      <Collapse in={isCharacterMenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ mt: 1 }}>
          {characters.map(character => (
            <ListItemButton
              key={character.id}
              selected={currentPage === `character-${character.id}`}
              onClick={() => !isEditing && setCurrentPage(`character-${character.id}`)}
              disabled={isEditing}
              sx={{ 
                pl: 2,
                mb: 0.5,
                opacity: isEditing ? 0.5 : 1,
                cursor: isEditing ? 'not-allowed' : 'pointer',
              }}
            >
              <ListItemText primary={character.name} />
            </ListItemButton>
          ))}
          
          <Button
            variant="text"
            startIcon={<Plus size={16} />}
            onClick={() => !isEditing && handleAddCharacter()}
            disabled={isEditing}
            fullWidth
            sx={{ 
              justifyContent: 'flex-start',
              mb: 0.5,
              py: 1,
              textAlign: 'left',
              color: 'text.secondary',
              bgcolor: 'rgba(245, 158, 11, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(245, 158, 11, 0.2)',
              },
              opacity: isEditing ? 0.5 : 1,
            }}
          >
            Add Character
          </Button>
          
          <Button
            variant="text"
            component="label"
            startIcon={<Upload size={16} />}
            disabled={isEditing}
            fullWidth
            sx={{ 
              justifyContent: 'flex-start',
              py: 1,
              textAlign: 'left',
              color: 'text.secondary',
              bgcolor: 'rgba(245, 158, 11, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(245, 158, 11, 0.2)',
              },
              opacity: isEditing ? 0.5 : 1,
            }}
          >
            Import Character(s)
            <input 
              type="file" 
              accept=".json" 
              onChange={!isEditing ? handleImportCharacter : undefined} 
              style={{ display: 'none' }}
              multiple
              disabled={isEditing}
            />
          </Button>
        </List>
      </Collapse>
    </Box>
  )
}

export default CharacterSection