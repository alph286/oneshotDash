import { Pencil, Save, Trash2, Download } from 'lucide-react';

interface ToolbarPgProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onExport: () => void;
  onDelete: () => void;
}

function ToolbarPg({ isEditing, onEdit, onSave, onExport, onDelete }: ToolbarPgProps) {
  return (
    <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-sm p-2 flex justify-end mb-4 gap-2">
      {!isEditing && (
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          <Pencil size={20} className="text-amber-500" />
        </button>
      )}
      {isEditing && (
        <button
          onClick={onSave}
          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          <Save size={20} className="text-green-500" />
        </button>
      )}
      <button
        onClick={onExport}
        className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-900 transition-colors"
        disabled={isEditing}
      >
        <Download size={20} className={`text-blue-500 ${isEditing ? 'opacity-50' : ''}`} />
      </button>
      <button
        onClick={onDelete}
        className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900 transition-colors"
        disabled={isEditing}
      >
        <Trash2 size={20} className={`text-red-500 ${isEditing ? 'opacity-50' : ''}`} />
      </button>
    </div>
  );
}

export default ToolbarPg;