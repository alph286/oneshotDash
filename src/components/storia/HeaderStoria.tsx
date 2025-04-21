import { Phase } from '../../stores/storiaStore';

interface HeaderStoriaProps {
  fase: Phase;
  isEditing: boolean;
  editedFase: Phase | null;
  onEditChange: (field: keyof Phase, value: string | number) => void;
  allFasi: Phase[]; // Add this prop
}

function HeaderStoria({ fase, isEditing, editedFase, onEditChange, allFasi }: HeaderStoriaProps) {
  const getNextAvailableNumber = () => {
    const usedNumbers = new Set(allFasi.map(f => f.number));
    let nextNumber = 1;
    while (usedNumbers.has(nextNumber)) {
      nextNumber++;
    }
    return nextNumber;
  };

  const handleNumberChange = (value: number) => {
    const newValue = Math.max(1, value);
    const isDuplicate = allFasi.some(f => f.number === newValue && f.id !== fase.id);
    
    if (isDuplicate) {
      const nextAvailable = getNextAvailableNumber();
      onEditChange('number', nextAvailable);
    } else {
      onEditChange('number', newValue);
    }
  };

  return (
    <div className="bg-zinc-900/50 p-6 rounded-lg">
      <div className="grid grid-cols-6 gap-4 mb-6">
        {isEditing ? (
          <>
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Ordine</label>
                <input
                  type="number"
                  value={editedFase?.number || ''}
                  onChange={(e) => handleNumberChange(Number(e.target.value))}
                  className="bg-zinc-800 text-amber-500 p-2 rounded-lg w-full"
                  min="1"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Titolo</label>
              <input
                value={editedFase?.title || ''}
                onChange={(e) => onEditChange('title', e.target.value)}
                className="bg-zinc-800 text-amber-500 p-2 rounded-lg w-full"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Tempo Stimato (minuti)</label>
              <input
                type="number"
                value={editedFase?.estimatedTime || ''}
                onChange={(e) => onEditChange('estimatedTime', e.target.value)}
                className="bg-zinc-800 text-gray-300 p-2 rounded-lg w-full"
                min="0"
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-400">Ordine</span>
                <p className="text-2xl font-bold text-amber-500">{fase.number}</p>
              </div>
            </div>
            <div className="col-span-2">
              <h1 className="text-4xl font-bold text-amber-500">{fase.title}</h1>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-gray-400">Tempo Stimato (minuti)</span>
              <p className="text-xl text-gray-300">{fase.estimatedTime} min</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderStoria;