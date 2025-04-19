import { useState } from 'react'
import './App.css'
import { Home, Users, Settings } from 'lucide-react'
import HomePage from './components/HomePage'
import UsersPage from './components/UsersPage'
import SettingsPage from './components/SettingsPage'
import bgImage from './assets/bg.png' // Import the background image

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-black text-gray-300">
      {/* Sidebar */}
      <div className="w-64 h-full bg-zinc-950 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent hover:scrollbar-thumb-gray-700">
        <div className="text-xl font-bold mb-8 pl-4 text-gray-200">Dashboard</div>
        <nav className="h-full">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`w-full flex items-center p-3 mb-2 rounded-lg ${
              currentPage === 'home' ? 'bg-zinc-900' : 'hover:bg-zinc-900'
            }`}
          >
            <Home size={20} className="mr-3" />
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('users')}
            className={`w-full flex items-center p-3 mb-2 rounded-lg ${
              currentPage === 'users' ? 'bg-zinc-900' : 'hover:bg-zinc-900'
            }`}
          >
            <Users size={20} className="mr-3" />
            Users
          </button>
          <button 
            onClick={() => setCurrentPage('settings')}
            className={`w-full flex items-center p-3 mb-2 rounded-lg ${
              currentPage === 'settings' ? 'bg-zinc-900' : 'hover:bg-zinc-900'
            }`}
          >
            <Settings size={20} className="mr-3" />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 overflow-y-auto p-8 bg-zinc-950 content-wrapper"
        style={{
          backgroundImage: currentPage === 'home' ? `url(${bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'users' && <UsersPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </div>
    </div>
  )
}

export default App
