import React, { useEffect, useState } from 'react';
import { useCampaignStore } from '../../stores/campaignStore';
import Alert from '../ui/Alert';

function CampaignStartTime() {
  const [tempTime, setTempTime] = useState('');
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const { startTime, setStartTime } = useCampaignStore();

  useEffect(() => {
    setTempTime(startTime);
  }, [startTime]);

  const [alertKey, setAlertKey] = useState(0);

  const handleSubmit = () => {
    setAlert(null);
    setAlertKey(prev => prev + 1); // Increment key

    try {
      if (!tempTime) {
        throw new Error('Please select a valid time');
      }
      setStartTime(tempTime);
      setAlert({
        message: 'Orario di inizio aggiornato con successo!',
        type: 'success'
      });
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : 'Errore durante il salvataggio',
        type: 'error'
      });
    }
  };

  const handleInputClick = () => {
    const input = document.getElementById('startTime') as HTMLInputElement | null;
    if (input) {
      input.showPicker();
    }
  };

  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} key={alertKey} />}
      <div className="bg-zinc-900 bg-opacity-80 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Orario di Inizio Campagna</h2>
      <div className="mb-4" onClick={handleInputClick}>
        <label htmlFor="startTime" className="block mb-2">Seleziona l'orario:</label>
        <input
          type="time"
          id="startTime"
          value={tempTime}
          onChange={(e) => setTempTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg bg-zinc-800 text-gray-300 w-full cursor-pointer"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Salva Orario
      </button>
    </div>
    </>
  );
}

export default CampaignStartTime;