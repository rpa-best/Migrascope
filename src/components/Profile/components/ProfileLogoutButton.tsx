'use client';
import { Button } from 'components/UI/Buttons/Button';
import { useUserStore } from 'store/userStore/userStore';
import CookiesUniversal from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const cookies = new CookiesUniversal();

export const ProfileLogoutButton = () => {
    const router = useRouter();

    const [handleLogout] = useUserStore((state) => [state.handleLogout]);

    useEffect(() => {
        router.prefetch('/login');
    }, []);

    const handleLogoutClick = () => {
        handleLogout();
        cookies.remove('access');
        cookies.remove('refresh');
        router.replace('/login');
    };

    return (
        <>
            <Button
                onClick={() => handleLogoutClick()}
                size="medium"
                type="button"
            >
                Выйти
            </Button>
        </>
    );
};
