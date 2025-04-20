import React, { useState } from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import { Upload } from 'lucide-react';
import Alert from '../ui/Alert';

function CharacterMassImport() {
  const addCharacter = useCharacterStore(state => state.addCharacter);
  const [isDragging, setIsDragging] = useState(false);
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const handleFileUpload = (files: FileList) => {
    // Reset alert state before processing files
    setAlert(null);

    let successCount = 0;
    let errorCount = 0;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const characterData = JSON.parse(e.target?.result as string);
          addCharacter(characterData);
          successCount++;
        } catch (error) {
          console.error('Error parsing character file:', error);
          errorCount++;
        }
      };
      reader.readAsText(file);
    });

    // Set alert after all files are processed
    setTimeout(() => {
      if (errorCount > 0) {
        setAlert({
          message: `Imported ${successCount} characters, ${errorCount} failed`,
          type: 'error'
        });
      } else {
        setAlert({
          message: `Successfully imported ${successCount} characters`,
          type: 'success'
        });
      }
    }, 500);
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
    <>
      {alert && <Alert message={alert.message} type={alert.type} />}
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
    </>
  );
}

export default CharacterMassImport;