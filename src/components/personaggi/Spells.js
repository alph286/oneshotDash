var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import SpellLevel from './SpellLevel';
import { useCharacterStore } from '../../stores/characterStore';
function Spells() {
    var _a;
    var _b = useCharacterStore(), updateCharacter = _b.updateCharacter, characters = _b.characters;
    var currentCharacterId = useState((_a = characters[0]) === null || _a === void 0 ? void 0 : _a.id)[0];
    // Initialize from character store
    var _c = useState(function () {
        var _a;
        return ((_a = characters[0]) === null || _a === void 0 ? void 0 : _a.spells) || {
            cantrips: [],
            level1: [],
            level2: [],
            level3: [],
            level4: [],
            level5: [],
            level6: [],
            level7: [],
            level8: [],
            level9: []
        };
    }), spells = _c[0], setSpells = _c[1];
    var handleSpellsChange = function (level, newSpells) {
        setSpells(function (prev) {
            var _a;
            var updatedSpells = __assign(__assign({}, prev), (_a = {}, _a[level] = newSpells, _a));
            if (currentCharacterId) {
                updateCharacter(currentCharacterId, {
                    spells: updatedSpells
                });
            }
            return updatedSpells;
        });
    };
    return (_jsxs("div", { className: "bg-zinc-800 p-4 rounded-lg mt-4", children: [_jsx("h3", { className: "text-lg text-left font-bold mb-2 text-amber-500", children: "Spells" }), _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [_jsx(SpellLevel, { level: "Cantrips", spells: spells.cantrips, onSpellsChange: function (newSpells) { return handleSpellsChange('cantrips', newSpells); } }), _jsx(SpellLevel, { level: "Level 1", spells: spells.level1, onSpellsChange: function (newSpells) { return handleSpellsChange('level1', newSpells); } }), _jsx(SpellLevel, { level: "Level 2", spells: spells.level2, onSpellsChange: function (newSpells) { return handleSpellsChange('level2', newSpells); } }), _jsx(SpellLevel, { level: "Level 3", spells: spells.level3, onSpellsChange: function (newSpells) { return handleSpellsChange('level3', newSpells); } }), _jsx(SpellLevel, { level: "Level 4", spells: spells.level4, onSpellsChange: function (newSpells) { return handleSpellsChange('level4', newSpells); } }), _jsx(SpellLevel, { level: "Level 5", spells: spells.level5, onSpellsChange: function (newSpells) { return handleSpellsChange('level5', newSpells); } }), _jsx(SpellLevel, { level: "Level 6", spells: spells.level6, onSpellsChange: function (newSpells) { return handleSpellsChange('level6', newSpells); } }), _jsx(SpellLevel, { level: "Level 7", spells: spells.level7, onSpellsChange: function (newSpells) { return handleSpellsChange('level7', newSpells); } }), _jsx(SpellLevel, { level: "Level 8", spells: spells.level8, onSpellsChange: function (newSpells) { return handleSpellsChange('level8', newSpells); } }), _jsx(SpellLevel, { level: "Level 9", spells: spells.level9, onSpellsChange: function (newSpells) { return handleSpellsChange('level9', newSpells); } })] })] }));
}
export default Spells;
