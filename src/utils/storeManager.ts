import { useCampaignStore } from '../stores/campaignStore';
import { useCharacterStore } from '../stores/characterStore';

export const exportAllStores = () => {
  const campaignState = useCampaignStore.getState();
  const characterState = useCharacterStore.getState();
  
  const data = {
    campaign: campaignState,
    characters: characterState.characters
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `oneshot_backup_${new Date().toISOString()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importAllStores = async (file: File) => {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.campaign) {
          useCampaignStore.setState(data.campaign);
        }
        
        if (data.characters) {
          useCharacterStore.setState({ characters: data.characters });
        }
        
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};