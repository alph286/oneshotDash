import Time from "./toolbar/Time"
import CampaignStartDisplay from "./toolbar/CampaignStartDisplay"
import EstimatedEnd from "./toolbar/EstimatedEnd"
import TimeTracker from "./toolbar/TimeTracker" // Aggiungi questa importazione

function Toolbar() {
  return (
    <div className="w-full h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-start px-4">
      <div className="flex items-center gap-4">
        <Time />
        <CampaignStartDisplay />
        <EstimatedEnd />
        <TimeTracker /> {/* Aggiungi questo componente */}
      </div>
    </div>
  )
}

export default Toolbar