import { create } from 'zustand';
import { BlankWorkerStore } from 'app/(Main)/forms/components/store/types';

export const useBlankWorkerStore = create<BlankWorkerStore>((set) => ({
    worker: { name: '' },
    setWorker: (worker) => set({ worker }),
}));
