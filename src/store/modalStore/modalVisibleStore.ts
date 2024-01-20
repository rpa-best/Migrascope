import { create } from 'zustand';

import { IModalStore } from 'store/modalStore/types';

export const useModalStore = create<IModalStore>((set) => ({
    visible: false,
    setVisible: (visible) => set({ visible: visible }),
}));
