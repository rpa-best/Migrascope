import { create } from 'zustand';

type ViewType = 'grid' | 'column';

export interface IViewDocumentStore {
    view: ViewType;
    setView: (v: ViewType) => void;
}

export const useViewDocumentsStore = create<IViewDocumentStore>((set) => ({
    view: 'grid',
    setView: (view) => set({ view }),
}));
