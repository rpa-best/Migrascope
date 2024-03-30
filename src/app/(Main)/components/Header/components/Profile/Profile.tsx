'use client';

import { Tooltip } from 'components/Tooltip';
import { ProfileTooltip } from 'app/(Main)/components/Header/components/Profile/components/ProfileTooltip';

import AvatarSvg from '/public/svg/profile.svg';

import scss from './Profile.module.scss';

export const Profile = () => {
    return (
        <Tooltip RenderedComponent={ProfileTooltip}>
            <AvatarSvg className={scss.header_profile} />
        </Tooltip>
    );
};
