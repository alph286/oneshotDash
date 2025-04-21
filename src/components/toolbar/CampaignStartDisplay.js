import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useCampaignStore } from '../../stores/campaignStore';
function CampaignStartDisplay() {
    var startTime = useCampaignStore(function (state) { return state.startTime; });
    return (_jsx("div", { className: "bg-zinc-900 px-4 py-2 rounded-lg mr-4", children: _jsxs("span", { className: "text-gray-300", children: ["Inizio Campagna: ", startTime || 'Non impostato'] }) }));
}
export default CampaignStartDisplay;
