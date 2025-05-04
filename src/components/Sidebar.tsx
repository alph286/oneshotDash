import { Home } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { useEditModeStore } from '../stores/editModeStore'
import BeholderBox from './ui/BeholderBox'
import CharacterSection from './sidebar/CharacterSection'
import StoriaSection from './sidebar/StoriaSection'
import { Box, Paper, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme/muiTheme'

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const isEditing = useEditModeStore(state => state.isEditing)
  
  // Riferimento e stato per il rilevamento della barra di scorrimento
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [hasScrollbar, setHasScrollbar] = useState(false)
  
  // Verifica se è presente la barra di scorrimento
  useEffect(() => {
    const checkForScrollbar = () => {
      if (navContainerRef.current) {
        const { scrollHeight, clientHeight } = navContainerRef.current
        setHasScrollbar(scrollHeight > clientHeight)
      }
    }
    
    // Verifica iniziale
    checkForScrollbar()
    
    // Verifica quando la finestra viene ridimensionata o il contenuto cambia
    window.addEventListener('resize', checkForScrollbar)
    
    return () => {
      window.removeEventListener('resize', checkForScrollbar)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Paper 
        elevation={0}
        sx={{ 
          width: 256, 
          height: '100%', 
          bgcolor: 'background.default',
          display: 'flex', 
          flexDirection: 'column',
          p: 2,
          borderRadius: 0
        }}
      >
        <BeholderBox />
        <Box 
          ref={navContainerRef}
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto',
            pr: hasScrollbar ? 1 : 0,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '4px',
            },
          }}
        >
          <List component="nav" disablePadding>
            <ListItemButton
              selected={currentPage === 'home'}
              onClick={() => !isEditing && setCurrentPage('home')}
              disabled={isEditing}
              sx={{
                mb: 1,
                opacity: isEditing ? 0.5 : 1,
                cursor: isEditing ? 'not-allowed' : 'pointer',
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: currentPage === 'home' ? 'primary.contrastText' : 'text.secondary' }}>
                <Home size={20} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            
            {/* Componente per la sezione Personaggi */}
            <CharacterSection 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
            />

            {/* Componente per la sezione Storia */}
            <StoriaSection 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
            />
          </List>
        </Box>
      </Paper>
    </ThemeProvider>
  )
}

export default Sidebar
