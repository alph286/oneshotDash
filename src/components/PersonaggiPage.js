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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useCharacterStore } from '../stores/characterStore';
import CardCaratteristica from './personaggi/CardCaratteristica';
import EquipmentCard from './personaggi/EquipmentCard';
import HitPoints from './personaggi/HitPoints';
import VariousStat from './personaggi/VariousStat';
import ToolbarPg from './personaggi/ToolbarPg';
import HeaderPg from './personaggi/HeaderPg';
import NotesPg from './personaggi/NotesPg';
import Spells from './personaggi/Spells';
function PersonaggiPage(_a) {
    var _b, _c, _d, _e, _f;
    var selectedCharacterId = _a.selectedCharacterId;
    var characters = useCharacterStore(function (state) { return state.characters; });
    var updateCharacter = useCharacterStore(function (state) { return state.updateCharacter; });
    var deleteCharacter = useCharacterStore(function (state) { return state.deleteCharacter; }); // Add this
    var _g = useState(false), isEditing = _g[0], setIsEditing = _g[1];
    var _h = useState(null), editedCharacter = _h[0], setEditedCharacter = _h[1];
    var _j = useState({}), bonuses = _j[0], setBonuses = _j[1];
    // Define stats array at the top of the component
    var stats = [
        { name: 'STR', field: 'strength' },
        { name: 'DEX', field: 'dexterity' },
        { name: 'CON', field: 'constitution' },
        { name: 'INT', field: 'intelligence' },
        { name: 'WIS', field: 'wisdom' },
        { name: 'CHA', field: 'charisma' }
    ];
    var selectedCharacter = selectedCharacterId
        ? characters.find(function (char) { return "character-".concat(char.id) === selectedCharacterId; })
        : null;
    var handleEdit = function () {
        if (selectedCharacter) {
            setEditedCharacter(__assign({}, selectedCharacter));
            // Initialize bonuses with existing additional bonus values
            var initialBonuses_1 = {};
            stats.forEach(function (stat) {
                var additionalBonusField = "".concat(stat.field, "AdditionalBonus");
                initialBonuses_1[stat.field] = selectedCharacter[additionalBonusField] || 0;
            });
            setBonuses(initialBonuses_1);
            setIsEditing(true);
        }
    };
    // In the handleSave function, update how we handle the additional bonuses
    var handleSave = function () {
        if (editedCharacter && selectedCharacter) {
            // Create a copy of the edited character
            var updatedCharacter_1 = __assign({}, editedCharacter);
            // Save the additional bonuses to their respective fields in the character
            stats.forEach(function (stat) {
                var field = stat.field;
                var additionalBonusField = "".concat(field, "AdditionalBonus");
                // Set the additional bonus value from our bonuses state
                if (bonuses[field] !== undefined) {
                    updatedCharacter_1[additionalBonusField] = bonuses[field];
                }
            });
            // Save the character with the updated additional bonuses
            updateCharacter(selectedCharacter.id, updatedCharacter_1);
            setIsEditing(false);
            setBonuses({});
        }
    };
    var handleInputChange = function (field, value) {
        var _a;
        if (editedCharacter) {
            setEditedCharacter(__assign(__assign({}, editedCharacter), (_a = {}, _a[field] = value, _a)));
        }
    };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
    };
    // REMOVE the getDexterityTotalBonus function entirely
    // const getDexterityTotalBonus = () => { ... }; // DELETE THIS
    var handleDelete = function () {
        if (selectedCharacter && window.confirm('Are you sure you want to delete this character?')) {
            deleteCharacter(selectedCharacter.id);
        }
    };
    var handleExportCharacter = function () {
        if (selectedCharacter) {
            var jsonString = JSON.stringify(selectedCharacter, null, 2);
            var blob = new Blob([jsonString], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var filename = "".concat(selectedCharacter.name, "_").concat(selectedCharacter.class, "_").concat(selectedCharacter.race, "_liv").concat(selectedCharacter.level)
                .replace(/[^a-z0-9]/gi, '_') // Replace special characters with underscores
                .toLowerCase(); // Convert to lowercase
            var link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        }
    };
    // Remove individual showNotes/showSpells state
    // const [showNotes, setShowNotes] = useState(true);
    // const [showSpells, setShowSpells] = useState(true);
    // Modify toggle handlers to use character state
    var handleToggleNotes = function () {
        if (selectedCharacter) {
            updateCharacter(selectedCharacter.id, __assign(__assign({}, selectedCharacter), { showNotes: !selectedCharacter.showNotes }));
        }
    };
    var handleToggleSpells = function () {
        if (selectedCharacter) {
            updateCharacter(selectedCharacter.id, __assign(__assign({}, selectedCharacter), { showSpells: !selectedCharacter.showSpells }));
        }
    };
    // Add these fields to the Character type in characterStore.ts
    // showNotes?: boolean;
    // showSpells?: boolean;
    return (_jsx("div", { className: "h-full overflow-auto scrollbar-auto", children: selectedCharacter ? (_jsxs(_Fragment, { children: [_jsx(ToolbarPg, { isEditing: isEditing, onEdit: handleEdit, onSave: handleSave, onExport: handleExportCharacter, onDelete: handleDelete, onToggleNotes: handleToggleNotes, onToggleSpells: handleToggleSpells, showNotes: (_b = selectedCharacter.showNotes) !== null && _b !== void 0 ? _b : true, showSpells: (_c = selectedCharacter.showSpells) !== null && _c !== void 0 ? _c : true }), _jsxs("div", { className: "bg-zinc-900/50 p-6 rounded-lg", children: [_jsx(HeaderPg, { character: isEditing ? editedCharacter : selectedCharacter, isEditing: isEditing, onInputChange: handleInputChange, onKeyPress: handleKeyPress }), _jsxs("div", { className: "grid grid-cols-6 gap-4 mb-6", children: [_jsx("div", { className: "col-span-2 grid grid-cols-3 gap-4", children: stats.map(function (stat) { return (_jsx(CardCaratteristica, { name: stat.name, field: stat.field, value: isEditing ? editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter[stat.field] : selectedCharacter[stat.field], baseBonus: isEditing
                                            ? editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter["".concat(stat.field, "Bonus")]
                                            : selectedCharacter["".concat(stat.field, "Bonus")], additionalBonus: isEditing
                                            ? bonuses[stat.field]
                                            : selectedCharacter["".concat(stat.field, "AdditionalBonus")] || 0, isEditing: isEditing, onValueChange: function (value) { return handleInputChange(stat.field, value); }, onBonusChange: function (value) {
                                            var _a;
                                            var newBonuses = __assign(__assign({}, bonuses), (_a = {}, _a[stat.field] = value, _a));
                                            setBonuses(newBonuses);
                                        }, onKeyDown: handleKeyPress }, stat.name)); }) }), _jsx("div", { className: "col-span-2", children: _jsx(EquipmentCard, { armorClass: isEditing ? ((editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.armorClass) || 0) : selectedCharacter.armorClass, equipment: isEditing ? ((editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.equipment) || '') : selectedCharacter.equipment, isEditing: isEditing, onArmorClassChange: function (value) { return handleInputChange('armorClass', value); }, onEquipmentChange: function (value) { return handleInputChange('equipment', value); } }) }), _jsxs("div", { className: "col-span-2 grid gap-4", children: [_jsx(HitPoints, { currentHP: isEditing ? ((editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.currentHP) || 0) : selectedCharacter.currentHP, totalHP: isEditing ? ((editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.totalHP) || 0) : selectedCharacter.totalHP, temporaryHP: isEditing ? ((editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.temporaryHP) || 0) : selectedCharacter.temporaryHP, isEditing: isEditing, onCurrentHPChange: function (value) { return handleInputChange('currentHP', value); }, onTotalHPChange: function (value) { return handleInputChange('totalHP', value); }, onTemporaryHPChange: function (value) { return handleInputChange('temporaryHP', value); } }), _jsx(VariousStat
                                        // Remove dexterityTotalBonus prop - This comment seems outdated now, let's remove it.
                                        , { 
                                            // Remove dexterityTotalBonus prop - This comment seems outdated now, let's remove it.
                                            initiative: isEditing
                                                // Use the initiative value directly from the edited character state
                                                ? ((_d = editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.initiative) !== null && _d !== void 0 ? _d : 0)
                                                : selectedCharacter.initiative, speed: isEditing ? ((editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.speed) || 0) : selectedCharacter.speed, darkvision: isEditing ? ((editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.darkvision) || 0) : selectedCharacter.darkvision, inspiration: isEditing ? ((editedCharacter === null || editedCharacter === void 0 ? void 0 : editedCharacter.inspiration) || 0) : selectedCharacter.inspiration, isEditing: isEditing, 
                                            // Remove onInitiativeChange prop
                                            onSpeedChange: function (value) { return handleInputChange('speed', value); }, onDarkvisionChange: function (value) { return handleInputChange('darkvision', value); }, onInspirationChange: function (value) { return handleInputChange('inspiration', value); } })] })] }), ((_e = selectedCharacter === null || selectedCharacter === void 0 ? void 0 : selectedCharacter.showNotes) !== null && _e !== void 0 ? _e : true) && (_jsx(NotesPg, { character: isEditing ? editedCharacter : selectedCharacter, isEditing: isEditing, onInputChange: handleInputChange })), ((_f = selectedCharacter === null || selectedCharacter === void 0 ? void 0 : selectedCharacter.showSpells) !== null && _f !== void 0 ? _f : true) && _jsx(Spells, {})] })] })) : (_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Personaggi" }), _jsx("p", { className: "text-gray-400", children: "Seleziona un personaggio dalla barra laterale" })] })) }));
}
// Helper function (can be placed outside the component or imported)
var calculateBonus = function (value) { return Math.floor((value - 10) / 2); };
export default PersonaggiPage;
