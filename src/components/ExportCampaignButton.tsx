import React from 'react';
import { useCampaignStore } from '../stores/campaignStore';

function ExportCampaignButton() {
  const { exportCampaign } = useCampaignStore();

  return (
    <button
      onClick={exportCampaign}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
    >
      Esporta Campagna
    </button>
  );
}

export default ExportCampaignButton;