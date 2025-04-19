import React from 'react';
import CampaignStartTime from './CampaignStartTime';

function HomePage() {
  return (
    <div className="text-gray-300 flex">
      {/* Left Side - Campaign Start Time Card */}
   

      {/* Right Side - Main Content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Il Cuore della Foresta</h1>
        <p className="mb-4">OneShot Manager</p>
        <div className="w-1/3 pr-4">
        <CampaignStartTime />
      </div>



      </div>
    </div>
  );
}

export default HomePage;