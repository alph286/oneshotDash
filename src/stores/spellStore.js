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
var useSpellStore = create(function (set, get) { return ({
    spells: [],
    addSpell: function (spell) {
        return set(function (state) { return ({ spells: __spreadArray(__spreadArray([], state.spells, true), [spell], false) }); });
    },
    removeSpell: function (id) {
        return set(function (state) { return ({ spells: state.spells.filter(function (spell) { return spell.id !== id; }) }); });
    },
    updateSpell: function (id, updatedSpell) {
        return set(function (state) { return ({
            spells: state.spells.map(function (spell) {
                return spell.id === id ? __assign(__assign({}, spell), updatedSpell) : spell;
            })
        }); });
    },
    getSpellsByLevel: function (level) {
        return get().spells.filter(function (spell) { return spell.level === level; });
    }
}); });
export default useSpellStore;
