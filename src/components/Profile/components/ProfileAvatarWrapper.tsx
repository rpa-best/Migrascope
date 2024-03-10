'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useUserStore } from 'store/userStore/userStore';

import { Modal } from 'components/Modal';
import { ChangeImg } from 'components/ChangeImg';
import { updateAvatar } from 'http/accountService/accountService';

import { UserType } from 'http/accountService/types';

import EditSvg from '/public/svg/edit.svg';

import scss from 'components/Profile/Profile.module.scss';

export const ProfileAvatarWrapper = ({
    userData,
    color,
}: {
    color: string;
    userData: UserType;
}) => {
    const [visible, setVisible] = useState(false);
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);

    const avatar = user?.avatar ?? userData.avatar;

    useEffect(() => {
        setUser(userData);
    }, [setUser, userData]);

    const handleChangeImg = async (avatar: File) => {
        return await updateAvatar(avatar);
    };

    return (
        <div className={scss.profile_avatar_wrapper}>
            {avatar ? (
                <Image
                    className={scss.profile_avatar}
                    src={avatar}
                    width={80}
                    height={80}
                    alt="user image"
                />
            ) : (
                <div
                    style={{ backgroundColor: color }}
                    className={scss.profile_avatar}
                >
                    {`${userData?.name[0]}${userData?.surname[0]}`}
                </div>
            )}
            <button
                onClick={() => setVisible(true)}
                className={scss.profile_edit_svg_wrapper}
            >
                <EditSvg className={scss.profile_edit_svg} />
            </button>
            <Modal visible={visible} setVisible={setVisible}>
                <ChangeImg
                    revalidateTag="server-user"
                    setUserImg={(avatar) =>
                        setUser({ ...userData, avatar: avatar })
                    }
                    callback={handleChangeImg}
                />
            </Modal>
        </div>
    );
};
