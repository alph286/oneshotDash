import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Time from "./toolbar/Time";
import CampaignStartDisplay from "./toolbar/CampaignStartDisplay";
function Toolbar() {
    return (_jsx("div", { className: "w-full h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-start px-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Time, {}), _jsx(CampaignStartDisplay, {})] }) }));
}
export default Toolbar;
