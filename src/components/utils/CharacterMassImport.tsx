import React, { useState } from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import { Upload } from 'lucide-react';

function CharacterMassImport() {
  const addCharacter = useCharacterStore(state => state.addCharacter);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const characterData = JSON.parse(e.target?.result as string);
          addCharacter(characterData);
        } catch (error) {
          console.error('Error parsing character file:', error);
          alert(`Invalid character file: ${file.name}`);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="bg-zinc-900 bg-opacity-80 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Mass Import Characters</h2>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700 hover:bg-zinc-800'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center space-y-2">
          <Upload size={32} className="text-gray-400" />
          <p className="text-gray-400">Drag & drop JSON files here</p>
          <p className="text-sm text-gray-500">or</p>
          <input
            type="file"
            accept=".json"
            multiple
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
          />
          <span className="text-amber-500 hover:text-amber-400 cursor-pointer">
            Browse your files
          </span>
        </label>
      </div>
    </div>
  );
}

export default CharacterMassImport;