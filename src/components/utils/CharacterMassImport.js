import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import { Upload } from 'lucide-react';
import Alert from '../ui/Alert';
function CharacterMassImport() {
    var addCharacter = useCharacterStore(function (state) { return state.addCharacter; });
    var _a = useState(false), isDragging = _a[0], setIsDragging = _a[1];
    var _b = useState(null), alert = _b[0], setAlert = _b[1];
    var handleFileUpload = function (files) {
        // Reset alert state before processing files
        setAlert(null);
        var successCount = 0;
        var errorCount = 0;
        Array.from(files).forEach(function (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                try {
                    var characterData = JSON.parse((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                    addCharacter(characterData);
                    successCount++;
                }
                catch (error) {
                    console.error('Error parsing character file:', error);
                    errorCount++;
                }
            };
            reader.readAsText(file);
        });
        // Set alert after all files are processed
        setTimeout(function () {
            if (errorCount > 0) {
                setAlert({
                    message: "Imported ".concat(successCount, " characters, ").concat(errorCount, " failed"),
                    type: 'error'
                });
            }
            else {
                setAlert({
                    message: "Successfully imported ".concat(successCount, " characters"),
                    type: 'success'
                });
            }
        }, 500);
    };
    var handleDragOver = function (e) {
        e.preventDefault();
        setIsDragging(true);
    };
    var handleDragLeave = function () {
        setIsDragging(false);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            handleFileUpload(e.dataTransfer.files);
        }
    };
    return (_jsxs(_Fragment, { children: [alert && _jsx(Alert, { message: alert.message, type: alert.type }), _jsxs("div", { className: "bg-zinc-900 bg-opacity-80 p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Mass Import Characters" }), _jsx("div", { className: "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ".concat(isDragging ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700 hover:bg-zinc-800'), onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, children: _jsxs("label", { className: "flex flex-col items-center justify-center space-y-2", children: [_jsx(Upload, { size: 32, className: "text-gray-400" }), _jsx("p", { className: "text-gray-400", children: "Drag & drop JSON files here" }), _jsx("p", { className: "text-sm text-gray-500", children: "or" }), _jsx("input", { type: "file", accept: ".json", multiple: true, onChange: function (e) { return e.target.files && handleFileUpload(e.target.files); }, className: "hidden" }), _jsx("span", { className: "text-amber-500 hover:text-amber-400 cursor-pointer", children: "Browse your files" })] }) })] })] }));
}
export default CharacterMassImport;
