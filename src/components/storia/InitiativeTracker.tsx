import React from 'react';

interface InitiativeTrackerProps {
  // Define props later
}

const InitiativeTracker: React.FC<InitiativeTrackerProps> = (props) => {
  return (
    <div className="p-4 bg-zinc-700/50 rounded-lg h-full">
      <h4 className="text-lg font-semibold text-gray-300 mb-2">Initiative Tracker</h4>
      {/* Content will go here */}
      <p className="text-sm text-gray-400 italic">Initiative tracking will be implemented here.</p>
    </div>
  );
};

export default InitiativeTracker;