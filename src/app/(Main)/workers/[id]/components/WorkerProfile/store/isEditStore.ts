import { create } from 'zustand';

export interface IEditStore {
    isEdit: boolean;
    setIsEdit: (v: boolean) => void;
}

export const useEditStore = create<IEditStore>((set) => ({
    isEdit: false,
    setIsEdit: (isEdit) => set({ isEdit }),
}));
