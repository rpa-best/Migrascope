import scss from './ProfileTooltip.module.scss';
import { useUserStore } from 'store/userStore/userStore';
import Link from 'next/link';
import { Button } from 'components/UI/Buttons/Button';

export const ProfileTooltip = () => {
    const [user, onLogout] = useUserStore((state) => [
        state.user,
        state.handleLogout,
    ]);
    return (
        <div className={scss.profile_wrapper}>
            <Link href="/">
                <button className={scss.profile_home}>
                    {user?.surname} {user?.first_name?.slice(0, 1)}.{' '}
                    {user?.patronymic?.slice(0, 1)}.
                </button>
            </Link>
            <p className={scss.profile_balance}>
                Баланс: <span>{user?.balance}</span>
            </p>
            <Link href="/login" className={scss.profile_button_wrapper}>
                <Button onClick={() => onLogout()}>Выйти</Button>
            </Link>
        </div>
    );
};
