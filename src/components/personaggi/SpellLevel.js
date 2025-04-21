var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Pencil, Save, X } from 'lucide-react';
import { SpellChooseModal } from './SpellChooseModal';
import { loadSpells } from '../../utils/loadSpells';
import { Trash2 } from 'lucide-react';
function SpellLevel(_a) {
    var level = _a.level, spells = _a.spells, onSpellsChange = _a.onSpellsChange;
    var _b = useState(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = useState(false), showSpellModal = _c[0], setShowSpellModal = _c[1];
    var _d = useState(null), selectedSpell = _d[0], setSelectedSpell = _d[1];
    var levelNumber = parseInt(level.replace(/\D/g, '') || '0');
    var handleSave = function () {
        setIsEditing(false);
        // Removed redundant onSpellsChange call
    };
    var handleAddSpell = function (spell) {
        if (onSpellsChange && !spells.includes(spell.name)) {
            var newSpells = __spreadArray(__spreadArray([], spells, true), [spell.name], false);
            onSpellsChange(newSpells);
            console.log('Added spell:', spell.name); // Debug log
        }
        setShowSpellModal(false);
    };
    var handleRemoveSpell = function (index) {
        if (onSpellsChange) {
            var newSpells = spells.filter(function (_, i) { return i !== index; });
            onSpellsChange(newSpells);
        }
    };
    var handleSpellClick = function (spellName) {
        var spell = loadSpells().find(function (s) { return s.name === spellName; });
        if (spell) {
            setSelectedSpell(spell);
        }
    };
    console.log('Current spells:', spells); // Debug log
    return (_jsxs("div", { className: "bg-zinc-700 p-4 rounded-lg shadow-md", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h4", { className: "text-md font-bold text-amber-400", children: level }), isEditing ? (_jsx("button", { onClick: handleSave, className: "p-1 rounded hover:bg-zinc-600 transition-colors", children: _jsx(Save, { size: 16, className: "text-green-500" }) })) : (_jsx("button", { onClick: function () { return setIsEditing(true); }, className: "p-1 rounded hover:bg-zinc-600 transition-colors", children: _jsx(Pencil, { size: 16, className: "text-amber-500" }) }))] }), spells.map(function (spell, index) { return (_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("button", { onClick: function () { return handleSpellClick(spell); }, className: "text-gray-300 hover:text-amber-400 text-left", children: spell }), _jsx("div", { className: isEditing ? 'visible' : 'invisible', children: _jsx("button", { onClick: function () { return handleRemoveSpell(index); }, className: "p-1 rounded hover:bg-zinc-600 transition-colors", children: _jsx(Trash2, { size: 16, className: "text-red-500" }) }) })] }, index)); }), selectedSpell && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-zinc-800 p-6 rounded-lg max-w-2xl", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-bold text-amber-500", children: selectedSpell.name }), _jsx("button", { onClick: function () { return setSelectedSpell(null); }, className: "p-1 rounded hover:bg-zinc-700", children: _jsx(X, { size: 20, className: "text-gray-400" }) })] }), selectedSpell.imageUrl && (_jsx("img", { src: selectedSpell.imageUrl, alt: selectedSpell.name, className: "max-h-[80vh] max-w-full rounded-lg" }))] }) })), isEditing && (_jsx("button", { onClick: function () { return setShowSpellModal(true); }, className: "w-full bg-zinc-600 hover:bg-zinc-500 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-0", children: "+ Add Spell" })), showSpellModal && (_jsx(SpellChooseModal, { level: levelNumber, onSelect: handleAddSpell, onClose: function () { return setShowSpellModal(false); } }))] }));
}
export default SpellLevel;
