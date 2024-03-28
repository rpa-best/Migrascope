import { create } from 'zustand';
import { IUserStore } from 'store/userStore/types';
import CookiesUniversal from 'universal-cookie';

const cookie = new CookiesUniversal();

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user: IUserStore['user']) => set({ user: user }),
    handleLogout: () => {
        cookie.remove('access');
        cookie.remove('refresh');
        set({
            user: null,
        });
    },
}));
