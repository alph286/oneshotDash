import React from 'react';
import PersonaggiList from './personaggi/PersonaggiList';

function Personaggi() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Personaggi</h1>
      <PersonaggiList />
    </div>
  );
}

export default Personaggi;