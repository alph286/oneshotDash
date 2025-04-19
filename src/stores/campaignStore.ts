import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';

interface CampaignState {
  startTime: string;
  setStartTime: (time: string) => void;
  exportCampaign: () => Promise<void>;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      startTime: '',
      setStartTime: (time) => set({ startTime: time }),
      exportCampaign: async () => {
        const state = get();
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `campaign_${new Date().toISOString()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }),
    {
      name: 'campaign-storage',
      storage: createJSONStorage(() => localforage),
    }
  )
);