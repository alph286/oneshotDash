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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { Scrollbars } from 'react-custom-scrollbars-2';
var CustomScrollArea = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.style, style = _c === void 0 ? {} : _c, _d = _a.autoHide, autoHide = _d === void 0 ? true : _d, _e = _a.autoHeight, autoHeight = _e === void 0 ? false : _e, _f = _a.autoHeightMin, autoHeightMin = _f === void 0 ? 0 : _f, _g = _a.autoHeightMax, autoHeightMax = _g === void 0 ? 200 : _g;
    return (_jsx("div", { className: className, children: _jsx(Scrollbars, { autoHide: autoHide, autoHideTimeout: 1000, autoHideDuration: 200, autoHeight: autoHeight, autoHeightMin: autoHeightMin, autoHeightMax: autoHeightMax, renderThumbVertical: function (_a) {
                var style = _a.style, props = __rest(_a, ["style"]);
                return (_jsx("div", __assign({}, props, { style: __assign(__assign({}, style), { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '6px' }) })));
            }, renderThumbHorizontal: function (_a) {
                var style = _a.style, props = __rest(_a, ["style"]);
                return (_jsx("div", __assign({}, props, { style: __assign(__assign({}, style), { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '6px' }) })));
            }, renderTrackVertical: function (_a) {
                var style = _a.style, props = __rest(_a, ["style"]);
                return (_jsx("div", __assign({}, props, { style: __assign(__assign({}, style), { backgroundColor: 'transparent', right: 0, bottom: 0, top: 0, borderRadius: '6px', width: '8px' }) })));
            }, renderTrackHorizontal: function (_a) {
                var style = _a.style, props = __rest(_a, ["style"]);
                return (_jsx("div", __assign({}, props, { style: __assign(__assign({}, style), { backgroundColor: 'transparent', height: '8px', borderRadius: '6px' }) })));
            }, style: __assign({}, style), children: children }) }));
};
export default CustomScrollArea;
