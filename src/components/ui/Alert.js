import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
function Alert(_a) {
    var message = _a.message, type = _a.type, _b = _a.duration, duration = _b === void 0 ? 5000 : _b, key = _a.key;
    var _c = useState(true), visible = _c[0], setVisible = _c[1];
    var _d = useState(false), isFadingOut = _d[0], setIsFadingOut = _d[1];
    useEffect(function () {
        setVisible(true);
        var timer = setTimeout(function () {
            setIsFadingOut(true);
            setTimeout(function () { return setVisible(false); }, 200); // Wait for fade-out to complete
        }, duration);
        return function () { return clearTimeout(timer); };
    }, [duration, key]);
    if (!visible)
        return null;
    return (_jsx("div", { className: "fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white transform transition-all duration-200 ".concat(isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0', " ").concat(type === 'success' ? 'bg-green-500' : 'bg-red-500'), children: message }));
}
export default Alert;
