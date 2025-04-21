import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useCampaignStore } from '../../stores/campaignStore';
import Alert from '../ui/Alert';
function CampaignStartTime() {
    var _a = useState(''), tempTime = _a[0], setTempTime = _a[1];
    var _b = useState(null), alert = _b[0], setAlert = _b[1];
    var _c = useCampaignStore(), startTime = _c.startTime, setStartTime = _c.setStartTime;
    useEffect(function () {
        setTempTime(startTime);
    }, [startTime]);
    var _d = useState(0), alertKey = _d[0], setAlertKey = _d[1];
    var handleSubmit = function () {
        setAlert(null);
        setAlertKey(function (prev) { return prev + 1; }); // Increment key
        try {
            if (!tempTime) {
                throw new Error('Please select a valid time');
            }
            setStartTime(tempTime);
            setAlert({
                message: 'Orario di inizio aggiornato con successo!',
                type: 'success'
            });
        }
        catch (error) {
            setAlert({
                message: error instanceof Error ? error.message : 'Errore durante il salvataggio',
                type: 'error'
            });
        }
    };
    var handleInputClick = function () {
        var input = document.getElementById('startTime');
        if (input) {
            input.showPicker();
        }
    };
    return (_jsxs(_Fragment, { children: [alert && _jsx(Alert, { message: alert.message, type: alert.type }, alertKey), _jsxs("div", { className: "bg-zinc-900 bg-opacity-80 p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Orario di Inizio Campagna" }), _jsxs("div", { className: "mb-4", onClick: handleInputClick, children: [_jsx("label", { htmlFor: "startTime", className: "block mb-2", children: "Seleziona l'orario:" }), _jsx("input", { type: "time", id: "startTime", value: tempTime, onChange: function (e) { return setTempTime(e.target.value); }, className: "p-2 border border-gray-300 rounded-lg bg-zinc-800 text-gray-300 w-full cursor-pointer" })] }), _jsx("button", { onClick: handleSubmit, className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200", children: "Salva Orario" })] })] }));
}
export default CampaignStartTime;
