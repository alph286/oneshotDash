import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Personaggi from './components/PersonaggiPage';
import SettingsPage from './components/SettingsPage';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import bgImage from './assets/bg.png';
function App() {
    var _a = useState('home'), currentPage = _a[0], setCurrentPage = _a[1];
    return (_jsxs("div", { className: "flex min-h-screen h-screen overflow-hidden bg-black text-gray-300", children: [_jsx(Sidebar, { currentPage: currentPage, setCurrentPage: setCurrentPage }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(Toolbar, {}), _jsxs("div", { className: "flex-1 overflow-y-auto scrollbar-auto bg-zinc-950 content-wrapper", style: {
                            backgroundImage: currentPage === 'home' ? "url(".concat(bgImage, ")") : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }, children: [currentPage === 'home' && _jsx(HomePage, {}), currentPage.startsWith('character-') && _jsx(Personaggi, { selectedCharacterId: currentPage }), currentPage === 'settings' && _jsx(SettingsPage, {})] })] })] }));
}
export default App;
