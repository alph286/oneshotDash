import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function NotesPg(_a) {
    var character = _a.character, isEditing = _a.isEditing, onInputChange = _a.onInputChange;
    return (_jsxs("div", { className: "bg-zinc-800 p-4 rounded-lg", children: [_jsx("h3", { className: "text-lg text-left font-bold mb-2 text-amber-500", children: "Notes" }), isEditing ? (_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 block mb-1", children: "Character Notes" }), _jsx("textarea", { value: character.notes || '', onChange: function (e) { return onInputChange('notes', e.target.value); }, className: "w-full bg-zinc-700 rounded px-2 py-1 min-h-[400px]" })] })) : (_jsx("div", { className: "columns-2 gap-8", children: _jsx("p", { className: "text-gray-300 whitespace-pre-line text-left break-words", children: character.notes || 'No notes available.' }) }))] }));
}
export default NotesPg;
