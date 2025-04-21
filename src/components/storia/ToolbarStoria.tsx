import { Pencil, Save, Trash2, Download, Book, Wand2, Ruler, Shield } from 'lucide-react';

interface ToolbarStoriaProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  onExport: () => void;
  onDelete: () => void;
}

function ToolbarStoria({ 
  isEditing,
  onEdit,
  onSave,
  onExport,
  onDelete
}: ToolbarStoriaProps) {
  return (
    <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-sm p-2 flex justify-between mb-4 gap-2">
      <div className="flex gap-2">
        {/* Add your specific buttons here if needed */}
      </div>
      
      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={onEdit}
            title="Edit Storia"
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Pencil size={20} className="text-amber-500" />
          </button>
        )}
        {isEditing && (
          <button
            onClick={onSave}
            title="Save Changes"
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Save size={20} className="text-green-500" />
          </button>
        )}
        <button
          onClick={onExport}
          title="Export Storia"
          className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-900 transition-colors"
          disabled={isEditing}
        >
          <Download size={20} className={`text-blue-500 ${isEditing ? 'opacity-50' : ''}`} />
        </button>
        <button
          onClick={onDelete}
          title="Delete Storia"
          className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900 transition-colors"
          disabled={isEditing}
        >
          <Trash2 size={20} className={`text-red-500 ${isEditing ? 'opacity-50' : ''}`} />
        </button>
      </div>
    </div>
  );
}

export default ToolbarStoria;