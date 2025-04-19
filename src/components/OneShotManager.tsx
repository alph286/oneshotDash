import React, { useRef } from 'react';
import { exportAllStores, importAllStores } from '../utils/storeManager';

function OneShotManager() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importAllStores(file);
      alert('Stores imported successfully!');
    } catch (error) {
      alert(`Error importing stores: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-zinc-900 bg-opacity-80 p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">OneShot Manager</h2>
      
      <div className="space-y-2">
        <button
          onClick={exportAllStores}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Esporta Tutti i Dati
        </button>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200"
        >
          Importa Tutti i Dati
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          className="hidden"
          accept=".json"
        />
      </div>
    </div>
  );
}

export default OneShotManager;