'use client';

import NotificationSvg from '/public/svg/notifications.svg';
import { useShowNewsStore } from 'store/showNewsStore/modalVisibleStore';

import scss from './Notifications.module.scss';

export const Notifications = () => {
    const [visible, setVisible] = useShowNewsStore((state) => [
        state.visible,
        state.setVisible,
    ]);

    return (
        <button
            onClick={() => setVisible(!visible)}
            data-isactive={visible}
            className={scss.notifications_container}
        >
            <NotificationSvg className={scss.svg} />
        </button>
    );
};
