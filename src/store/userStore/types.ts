import { UserType } from 'http/accountService/types';

type SetUserType = (user: UserType) => void;

type HandleLogout = () => void;

export interface IUserStore {
    user: UserType | null;
    setUser: SetUserType;
    handleLogout: HandleLogout;
}
