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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// Helper function to calculate bonus
var calculateBonus = function (value) { return Math.floor((value - 10) / 2); };
export var useCharacterStore = create()(persist(function (set, get) { return ({
    characters: [],
    addCharacter: function (characterData) {
        var newId = get().characters.length > 0 ? Math.max.apply(Math, get().characters.map(function (c) { return c.id; })) + 1 : 1;
        // Calculate initial bonuses and initiative
        var dexterity = characterData.dexterity || 0;
        var dexBaseBonus = calculateBonus(dexterity);
        var dexAdditionalBonus = characterData.dexterityAdditionalBonus || 0;
        var initiative = dexBaseBonus + dexAdditionalBonus;
        var newCharacter = __assign(__assign({}, characterData), { id: newId, strengthBonus: calculateBonus(characterData.strength || 0), dexterityBonus: dexBaseBonus, constitutionBonus: calculateBonus(characterData.constitution || 0), intelligenceBonus: calculateBonus(characterData.intelligence || 0), wisdomBonus: calculateBonus(characterData.wisdom || 0), charismaBonus: calculateBonus(characterData.charisma || 0), initiative: initiative });
        set(function (state) { return ({ characters: __spreadArray(__spreadArray([], state.characters, true), [newCharacter], false) }); });
    },
    updateCharacter: function (id, updatedData) {
        set(function (state) {
            var characters = state.characters.map(function (char) {
                if (char.id === id) {
                    var mergedData = __assign(__assign({}, char), updatedData);
                    // Recalculate base bonuses based on updated values
                    var strength = mergedData.strength || 0;
                    var dexterity = mergedData.dexterity || 0;
                    var constitution = mergedData.constitution || 0;
                    var intelligence = mergedData.intelligence || 0;
                    var wisdom = mergedData.wisdom || 0;
                    var charisma = mergedData.charisma || 0;
                    mergedData.strengthBonus = calculateBonus(strength);
                    mergedData.dexterityBonus = calculateBonus(dexterity);
                    mergedData.constitutionBonus = calculateBonus(constitution);
                    mergedData.intelligenceBonus = calculateBonus(intelligence);
                    mergedData.wisdomBonus = calculateBonus(wisdom);
                    mergedData.charismaBonus = calculateBonus(charisma);
                    // Recalculate initiative based on updated dexterity and its additional bonus
                    var dexBaseBonus = mergedData.dexterityBonus;
                    var dexAdditionalBonus = mergedData.dexterityAdditionalBonus || 0;
                    mergedData.initiative = dexBaseBonus + dexAdditionalBonus;
                    return mergedData;
                }
                return char;
            });
            return { characters: characters };
        });
    },
    deleteCharacter: function (id) {
        set(function (state) { return ({
            characters: state.characters.filter(function (char) { return char.id !== id; }),
        }); });
    },
}); }, {
    name: 'character-storage', // name of the item in the storage (must be unique)
}));
