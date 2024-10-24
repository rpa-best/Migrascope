'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { BlankForm } from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm';
import { BlankItemProps } from 'app/(Main)/forms/components/Blanks/types';

import NotificationSvg from '/public/svg/notifications.svg';

import scss from 'app/(Main)/forms/components/Blanks/Blanks.module.scss';

const Modal = dynamic(() => import('components/Modal'));

export const BlanksItem: React.FC<BlankItemProps> = ({ name }) => {
    const [visible, setVisible] = useState(false);
    return (
        <li onClick={() => setVisible(true)} className={scss.blank_item}>
            <div className={scss.blank_item_name}>
                <NotificationSvg className={scss.notification_svg} />
                <p>{name}</p>
            </div>
            <button className={scss.download_link}>Скачать бланк</button>
            <Modal visible={visible} setVisible={setVisible}>
                <BlankForm setVisible={setVisible} blankType={name} />
            </Modal>
        </li>
    );
};
