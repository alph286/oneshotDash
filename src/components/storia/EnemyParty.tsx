import React from 'react';

interface EnemyPartyProps {
  // Define props later
}

const EnemyParty: React.FC<EnemyPartyProps> = (props) => {
  return (
    <div className="p-4 bg-zinc-700/50 rounded-lg h-full">
      <h4 className="text-lg font-semibold text-gray-300 mb-2">Enemy Party</h4>
      {/* Content will go here */}
      <p className="text-sm text-gray-400 italic">Enemy party details will be implemented here.</p>
    </div>
  );
};

export default EnemyParty;