import { useStoriaStore } from '../../stores/storiaStore';
import { useCampaignStore } from '../../stores/campaignStore';

function EstimatedEnd() {
  const fasi = useStoriaStore(state => state.phases);
  const campaignStart = useCampaignStore(state => state.startTime);

  // Convert campaignStart to Date if it's a string
  const startDate = campaignStart ? 
    new Date(`1970-01-01T${campaignStart}:00`) : 
    null;
  
  // Simplified date validation
  const isValidDate = (date: Date | null): date is Date => {
    return date instanceof Date && !isNaN(date.getTime());
  };
  
  // Debug logging (remove after testing)
  console.log('campaignStart:', campaignStart);
  console.log('startDate:', startDate);
  console.log('isValidDate:', isValidDate(startDate));
  
  // Calculate total estimated time in minutes
  const totalMinutes = fasi.reduce((total, fase) => {
    const time = fase.estimatedTime || 0; // Directly use the number value
    return total + time;
  }, 0);

  // Calculate estimated end time
  const estimatedEnd = isValidDate(startDate) ? 
    new Date(startDate.getTime() + totalMinutes * 60000) : 
    null;

  // Format time as HH:mm
  const formatTime = (date: Date | null) => {
    if (!date || !isValidDate(date)) return '--:--';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="bg-zinc-900 px-4 py-2 rounded-lg">
      <span className="text-gray-300">Stima Fine: </span>
      <span className="text-sm text-amber-500">
        {formatTime(estimatedEnd)}
      </span>
    </div>
  );
}

export default EstimatedEnd;