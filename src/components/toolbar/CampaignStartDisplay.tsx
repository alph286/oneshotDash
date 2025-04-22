import React from 'react';
import { useCampaignStore } from '../../stores/campaignStore';

function CampaignStartDisplay() {
  const startTime = useCampaignStore((state) => state.startTime);

  return (
    <div className="bg-zinc-900 px-4 py-2 rounded-lg">
      <span className="text-gray-300">
        Inizio Campagna: {startTime || 'Non impostato'}
      </span>
    </div>
  );
}

export default CampaignStartDisplay;