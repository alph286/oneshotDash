import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CampaignStartTime from './utils/CampaignStartTime';
import OneShotManager from './utils/OneShotManager';
import CharacterMassImport from './utils/CharacterMassImport';
function HomePage() {
    return (_jsx("div", { className: 'p-8', children: _jsxs("div", { className: "text-gray-300", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Il Cuore della Foresta" }), _jsx("p", { className: "text-gray-400", children: "OneShot Manager" })] }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: "w-1/3 pr-4", children: _jsx(CampaignStartTime, {}) }), _jsx("div", { className: "w-1/3 pr-4", children: _jsx(OneShotManager, {}) }), _jsx("div", { className: "w-1/3 pr-4", children: _jsx(CharacterMassImport, {}) })] })] }) }));
}
export default HomePage;
