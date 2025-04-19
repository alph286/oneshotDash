import React from 'react';
import CampaignStartTime from './CampaignStartTime';
import OneShotManager from './OneShotManager';

function HomePage() {
  return (
    <div className="text-gray-300">
      {/* Title and Subtitle */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Il Cuore della Foresta</h1>
        <p className="text-gray-400">OneShot Manager</p>
      </div>

      {/* Cards Section */}
      <div className="flex">
        <div className="w-1/3 pr-4">
          <CampaignStartTime />
          </div>
          <div className="w-1/3 pr-4">
          <OneShotManager />
          </div>
      </div>
    </div>
  );
}

export default HomePage;