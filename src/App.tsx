import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import Personaggi from './components/PersonaggiPage'
import StoriaPage from './components/StoriaPage'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import bgImage from './assets/bg.png'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import muiTheme from './theme/muiTheme';

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline /> {/* Reset CSS per consistenza */}
      <div className="flex min-h-screen h-screen overflow-hidden bg-black text-gray-300">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1 flex flex-col">
          <Toolbar />
          <div className="flex-1 overflow-y-auto scrollbar-auto bg-zinc-950 content-wrapper">
            {currentPage === 'home' && <HomePage />}
            {currentPage.startsWith('character-') && <Personaggi selectedCharacterId={currentPage} />}
            {currentPage.startsWith('fase-') && (
              <StoriaPage 
                selectedFaseId={currentPage.replace('fase-', '')}
                setCurrentPage={setCurrentPage}
              />
            )}
            {currentPage === 'storia' && (
              <StoriaPage setCurrentPage={setCurrentPage} />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
