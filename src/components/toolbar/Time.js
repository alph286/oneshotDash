import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
function Time() {
    var _a = useState(new Date().toLocaleTimeString()), time = _a[0], setTime = _a[1];
    useEffect(function () {
        var interval = setInterval(function () {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return function () { return clearInterval(interval); };
    }, []);
    return (_jsx("div", { className: "bg-zinc-900 px-4 py-2 rounded-lg", children: _jsx("span", { className: "text-gray-300", children: time }) }));
}
export default Time;
