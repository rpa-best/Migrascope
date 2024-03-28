import { create } from 'zustand';
import { INewsStore } from 'store/showNewsStore/types';

export const useShowNewsStore = create<INewsStore>((set) => ({
    visible: true,
    setVisible: (visible) => set({ visible: visible }),
}));
