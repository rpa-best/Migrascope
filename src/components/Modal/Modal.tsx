'use client';

import React, { MouseEventHandler, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';

import ExitSvg from '/public/svg/x.svg';

import scss from './Modal.module.scss';

interface ModalProps {
    visible: boolean;
    setVisible: (v: boolean) => void;
    needOverflow?: boolean;
    children: React.ReactElement;
}

export const Modal: React.FC<ModalProps> = ({
    visible,
    setVisible,
    children,
}) => {
    const opacity = useSpring(0);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [visible]);

    useEffect(() => {
        if (!visible) {
            opacity.set(0);
        } else {
            opacity.set(1);
        }
    }, [opacity, visible]);

    const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        setVisible(false);
        toast.dismiss();
    };

    return (
        visible &&
        createPortal(
            <div onClick={handleClose} className={scss.modal_background}>
                <motion.div
                    style={{ opacity }}
                    initial={{ y: 100 }}
                    animate={{ y: 0, transition: { bounce: 0 } }}
                    className={scss.modal}
                >
                    <ExitSvg onClick={handleClose} className={scss.exit_svg} />
                    {children}
                </motion.div>
                {/*<div className={scss.overlay} /> - проверить, навесить стили от модал_бекграунд*/}
            </div>,
            document.body
        )
    );
};
