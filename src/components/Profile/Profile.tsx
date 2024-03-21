import { AdditionalButton } from 'components/UI/Buttons/AdditionalButton';
import { ProfileLogoutButton } from 'components/Profile/components/ProfileLogoutButton';
import { ProfileAvatarWrapper } from 'components/Profile/components/ProfileAvatarWrapper';

import { getServerUser } from 'http/accountService/accountService';
import { getRandomColor } from 'utils/getRandomColor';
import { cookies } from 'next/headers';

import scss from 'components/Profile/Profile.module.scss';
import { redirect } from 'next/navigation';

export const Profile = async () => {
    const cookie = cookies();

    const access = cookie.get('access')?.value as string;

    let user;

    try {
        user = await getServerUser(access);
    } catch (e) {
        redirect('/login');
    }

    return (
        <section className={scss.profile_layout}>
            <div className={scss.profile_container}>
                <div className={scss.profile_data}>
                    <ProfileAvatarWrapper
                        color={getRandomColor()}
                        userData={user}
                    />
                    <h2 className={scss.profile_username}>
                        {user?.first_name} {user?.surname}
                    </h2>
                    <p className={scss.profile_email}>{user.username}</p>
                </div>
                <div className={scss.profile_actions}>
                    {/* <AdditionalButton size="big" svg="ellipsis" type="button" />*/}
                    <ProfileLogoutButton />
                </div>
            </div>
        </section>
    );
};
