import { Button } from 'components/UI/Buttons/Button';
import { AdditionalButton } from 'components/UI/Buttons/AdditionalButton';
import { ProfileAvatarWrapper } from 'components/Profile/components/ProfileAvatarWrapper';

import { getServerUser } from 'http/accountService/accountService';
import { getRandomColor } from 'utils/getRandomColor';
import { cookies } from 'next/headers';

import scss from 'components/Profile/Profile.module.scss';
import { ProfileLogoutButton } from 'components/Profile/components/ProfileLogoutButton';

export const Profile = async () => {
    const cookie = cookies();

    const access = cookie.get('access')?.value as string;

    const user = await getServerUser(access);

    return (
        <section className={scss.profile_layout}>
            <div className={scss.profile_container}>
                <div className={scss.profile_data}>
                    <ProfileAvatarWrapper
                        color={getRandomColor()}
                        userData={user}
                    />
                    <h2 className={scss.profile_username}>
                        {user.name} {user.surname}
                    </h2>
                    <p className={scss.profile_email}>{user.username}</p>
                </div>
                <div className={scss.profile_actions}>
                    <AdditionalButton size="big" svg="ellipsis" type="button" />
                    <ProfileLogoutButton />
                </div>
            </div>
        </section>
    );
};
