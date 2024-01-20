import { create } from 'zustand';
import { IUserStore } from 'store/userStore/types';

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user: IUserStore['user']) => set({ user: user }),
    handleLogout: () => {
        set({
            user: null,
        });
    },
}));
