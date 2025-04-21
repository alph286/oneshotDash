import { Phase } from '../../stores/storiaStore';

interface HeaderStoriaProps {
  fase: Phase;
  isEditing: boolean;
  editedFase: Phase | null;
  onEditChange: (field: keyof Phase, value: string | number) => void;
}

function HeaderStoria({ fase, isEditing, editedFase, onEditChange }: HeaderStoriaProps) {
  return (
    <div className="bg-zinc-900/50 p-6 rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {isEditing ? (
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Numero</label>
              <input
                type="number"
                value={editedFase?.number || ''}
                onChange={(e) => onEditChange('number', Number(e.target.value))}
                className="bg-zinc-800 text-amber-500 p-2 rounded-lg w-full"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Titolo</label>
              <input
                value={editedFase?.title || ''}
                onChange={(e) => onEditChange('title', e.target.value)}
                className="bg-zinc-800 text-amber-500 p-2 rounded-lg w-full"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="text-sm text-gray-400">Numero</span>
              <p className="text-2xl font-bold text-amber-500">{fase.number}</p>
            </div>
            <div className="col-span-2">
              <h1 className="text-4xl font-bold text-amber-500">{fase.title}</h1>
            </div>
          </>
        )}
      </div>

      <div className="mt-4">
        {isEditing ? (
          <div>
            <label className="block text-sm text-gray-400 mb-2">Tempo Stimato</label>
            <input
              value={editedFase?.estimatedTime || ''}
              onChange={(e) => onEditChange('estimatedTime', e.target.value)}
              className="bg-zinc-800 text-gray-300 p-2 rounded-lg w-full"
            />
          </div>
        ) : (
          <div>
            <span className="text-sm text-gray-400">Tempo Stimato</span>
            <p className="text-xl text-gray-300">{fase.estimatedTime}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderStoria;