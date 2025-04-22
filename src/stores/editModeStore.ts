import { create } from 'zustand';

interface EditModeState {
  isEditing: boolean;
  setEditMode: (isEditing: boolean) => void;
}

export const useEditModeStore = create<EditModeState>((set) => ({
  isEditing: false,
  setEditMode: (isEditing) => set({ isEditing }),
}));