import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, Users, Settings, ChevronDown } from 'lucide-react';
import { useCharacterStore } from '../stores/characterStore';
import { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
function Sidebar(_a) {
    var currentPage = _a.currentPage, setCurrentPage = _a.setCurrentPage;
    var characters = useCharacterStore(function (state) { return state.characters; });
    var addCharacter = useCharacterStore(function (state) { return state.addCharacter; });
    var _b = useState(false), isCharacterMenuOpen = _b[0], setIsCharacterMenuOpen = _b[1];
    var handleAddCharacter = function () {
        var newCharacter = {
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
        };
        addCharacter(newCharacter);
    };
    var handleImportCharacter = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                try {
                    var characterData = JSON.parse((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                    addCharacter(characterData);
                }
                catch (error) {
                    console.error('Error parsing character file:', error);
                    alert('Invalid character file');
                }
            };
            reader.readAsText(file);
        }
    };
    return (_jsxs("div", { className: "w-64 h-full bg-zinc-950 p-4 flex flex-col", children: [_jsx("div", { className: "text-xl font-bold mb-8 pl-4 text-gray-200", children: "OS Manager" }), _jsx("div", { className: "flex-grow overflow-auto scrollbar-auto", children: _jsxs("nav", { children: [_jsxs("button", { onClick: function () { return setCurrentPage('home'); }, className: "w-full flex items-center p-3 mb-2 rounded-lg focus:outline-none ".concat(currentPage === 'home' ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'), children: [_jsx(Home, { size: 20, className: "mr-3" }), "Home"] }), _jsxs("div", { className: "mb-2", children: [_jsxs("button", { onClick: function () { return setIsCharacterMenuOpen(!isCharacterMenuOpen); }, className: "w-full flex items-center p-3 rounded-lg focus:outline-none ".concat(currentPage.startsWith('character-') ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900/50 text-gray-400'), children: [_jsx(Users, { size: 20, className: "mr-3" }), _jsx("span", { children: "Personaggi" }), _jsx(ChevronDown, { size: 16, className: "ml-auto transition-transform duration-200 ".concat(isCharacterMenuOpen ? 'rotate-180' : '') })] }), _jsxs("div", { className: "overflow-hidden transition-all duration-200 ".concat(isCharacterMenuOpen ? 'max-h-96 mt-2' : 'max-h-0'), children: [characters.map(function (character) { return (_jsx("button", { onClick: function () { return setCurrentPage("character-".concat(character.id)); }, className: "w-full flex items-center p-2 mb-1 rounded-lg focus:outline-none ".concat(currentPage === "character-".concat(character.id) ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'), children: character.name }, character.id)); }), _jsxs("button", { onClick: handleAddCharacter, className: "w-full flex items-center p-2 mb-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none", children: [_jsx(Plus, { size: 16, className: "mr-2" }), "Add Character"] }), _jsx("button", { className: "w-full flex items-center p-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-gray-400 focus:outline-none", children: _jsxs("label", { className: "w-full flex items-center cursor-pointer", children: [_jsx(Upload, { size: 16, className: "mr-2" }), "Import Character", _jsx("input", { type: "file", accept: ".json", onChange: handleImportCharacter, className: "hidden" })] }) })] })] }), _jsxs("button", { onClick: function () { return setCurrentPage('settings'); }, className: "w-full flex items-center p-3 mb-2 rounded-lg focus:outline-none ".concat(currentPage === 'settings' ? 'bg-amber-500 text-zinc-950' : 'hover:bg-zinc-900 text-gray-400'), children: [_jsx(Settings, { size: 20, className: "mr-3" }), "Settings"] })] }) })] }));
}
export default Sidebar;
