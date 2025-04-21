import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
import { loadSpells } from '../../utils/loadSpells';
export function SpellChooseModal(_a) {
    var level = _a.level, onSelect = _a.onSelect, onClose = _a.onClose;
    var allSpells = loadSpells().filter(function (spell) { return spell.level === level; });
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-zinc-800 p-6 rounded-lg max-w-md w-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-bold text-amber-500", children: "Select a Spell" }), _jsx("button", { onClick: onClose, className: "p-1 rounded hover:bg-zinc-700", children: _jsx(X, { size: 20, className: "text-gray-400" }) })] }), _jsx("div", { className: "max-h-[60vh] overflow-y-auto", children: allSpells.map(function (spell) { return (_jsx("div", { onClick: function () { return onSelect(spell); }, className: "cursor-pointer p-2 hover:bg-zinc-700 rounded-lg mb-1", children: _jsx("p", { className: "text-gray-300", children: spell.name }) }, spell.id)); }) })] }) }));
}
