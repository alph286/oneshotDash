import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var CardCaratteristica = function (_a) {
    var name = _a.name, field = _a.field, value = _a.value, baseBonus = _a.baseBonus, _b = _a.additionalBonus, additionalBonus = _b === void 0 ? 0 : _b, isEditing = _a.isEditing, onValueChange = _a.onValueChange, onBonusChange = _a.onBonusChange, onKeyDown = _a.onKeyDown;
    // Calculate the base bonus directly from the value to ensure it's correct
    var calculatedBaseBonus = Math.floor((value - 10) / 2);
    // Use the calculated base bonus instead of the passed baseBonus
    var totalBonus = calculatedBaseBonus + additionalBonus;
    if (isEditing) {
        return (_jsxs("div", { className: "bg-zinc-800 p-3 rounded-lg text-center", children: [_jsx("div", { className: "text-lg font-bold text-amber-500 mb-2", children: name }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 block", children: "Value" }), _jsx("input", { type: "number", value: value, onChange: function (e) { return onValueChange(parseInt(e.target.value) || 0); }, onKeyDown: onKeyDown, onBlur: function (e) { return onValueChange(parseInt(e.target.value) || 0); }, className: "w-full bg-zinc-700 text-center rounded px-2 py-1" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 block", children: "Mod" }), _jsx("input", { type: "number", value: additionalBonus, onChange: function (e) { return onBonusChange(parseInt(e.target.value) || 0); }, onKeyDown: onKeyDown, onBlur: function (e) { return onBonusChange(parseInt(e.target.value) || 0); }, className: "w-full bg-zinc-700 text-center rounded px-2 py-1 text-sm" })] })] })] }));
    }
    return (_jsxs("div", { className: "bg-zinc-800 p-3 rounded-lg text-center", children: [_jsx("div", { className: "text-lg font-bold text-amber-500 mb-2", children: name }), _jsx("div", { className: "text-xl font-bold text-white mb-1", children: value }), _jsxs("div", { className: "text-sm text-gray-300", children: ["Base: ", calculatedBaseBonus >= 0 ? '+' : '', calculatedBaseBonus] }), _jsxs("div", { className: "text-sm text-amber-500", children: ["Mod: ", additionalBonus >= 0 ? '+' : '', additionalBonus] }), _jsxs("div", { className: "text-lg font-bold text-green-500 mt-2", children: ["Total: ", totalBonus >= 0 ? '+' : '', totalBonus] })] }));
};
export default CardCaratteristica;
