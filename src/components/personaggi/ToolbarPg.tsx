import { Pencil, Save, Trash2, Download, Book, Wand2, Ruler, Shield } from 'lucide-react';

interface ToolbarPgProps {
  isEditing: boolean;
  useMetric: boolean; // Add this
  onEdit: () => void;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  onExport: () => void;
  onDelete: () => void;
  onToggleNotes: () => void;
  onToggleSpells: () => void;
  onToggleMetric: () => void; // Add this
  showNotes: boolean;
  showSpells: boolean;
  onToggleProficiencies: () => void; // Add this
  showProficiencies: boolean; // Add this
}

function ToolbarPg({ 
  isEditing,
  useMetric,
  onEdit,
  onSave,
  onExport,
  onDelete,
  onToggleNotes,
  onToggleSpells,
  onToggleMetric,
  showNotes,
  showSpells,
  onToggleProficiencies,
  showProficiencies
}: ToolbarPgProps) {
  return (
    <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-sm p-2 flex justify-between mb-4 gap-2">
      <div className="flex gap-2">
      <button
          onClick={onToggleProficiencies}
          title="Toggle Proficiencies"
          className={`p-2 rounded-lg transition-colors focus:outline-none ${
            showProficiencies ? 'bg-indigo-800 hover:bg-indigo-700' : 'bg-zinc-800 hover:bg-zinc-700'
          }`}
        >
          <Shield size={20} className={`${showProficiencies ? 'text-indigo-300' : 'text-indigo-500'}`} />
        </button>
        <button
          onClick={onToggleNotes}
          title="Toggle Notes" // Add this
          className={`p-2 rounded-lg transition-colors focus:outline-none ${
            showNotes ? 'bg-purple-800 hover:bg-purple-700' : 'bg-zinc-800 hover:bg-zinc-700'
          }`}
        >
          <Book size={20} className={`${showNotes ? 'text-purple-300' : 'text-purple-500'}`} />
        </button>
        <button
          onClick={onToggleSpells}
          title="Toggle Spells" // Add this
          className={`p-2 rounded-lg transition-colors focus:outline-none ${
            showSpells ? 'bg-blue-800 hover:blue-700' : 'bg-zinc-800 hover:bg-zinc-700'
          }`}
        >
          <Wand2 size={20} className={`${showSpells ? 'text-blue-200' : 'text-blue-300'}`} />
        </button>
       
      
        <button
          onClick={onToggleMetric}
          title="Toggle Metric" // Add this
          className={`p-2 rounded-lg transition-colors focus:outline-none ${
            useMetric ? 'bg-green-800 hover:bg-green-700' : 'bg-zinc-800 hover:bg-zinc-700'
          }`}
        >
          <Ruler size={20} className={`${useMetric ? 'text-green-300' : 'text-green-500'}`} />
        </button>
      </div>
      
      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={onEdit}
            title="Edit Character" // Add this
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Pencil size={20} className="text-amber-500" />
          </button>
        )}
        {isEditing && (
          <button
            onClick={onSave}
            title="Save Changes" // Add this
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Save size={20} className="text-green-500" />
          </button>
        )}
        <button
          onClick={onExport}
          title="Export Character" // Add this
          className="p-2 rounded-lg bg-zinc-800 hover:bg-blue-900 transition-colors"
          disabled={isEditing}
        >
          <Download size={20} className={`text-blue-500 ${isEditing ? 'opacity-50' : ''}`} />
        </button>
        <button
          onClick={onDelete}
          title="Delete Character" // Add this
          className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900 transition-colors"
          disabled={isEditing}
        >
          <Trash2 size={20} className={`text-red-500 ${isEditing ? 'opacity-50' : ''}`} />
        </button>
      </div>
    </div>
  );
}

export default ToolbarPg;