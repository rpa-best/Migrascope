'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion, useSpring } from 'framer-motion';
import { toast } from 'react-toastify';

import ExitSvg from '/public/svg/x.svg';

import scss from './Modal.module.scss';
import { createPortal } from 'react-dom';

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

    const handleClose = () => {
        setVisible(false);
        toast.dismiss();
    };

    return (
        visible &&
        createPortal(
            <motion.div onClick={handleClose} className={scss.modal_background}>
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    style={{ opacity }}
                    initial={{ y: 100 }}
                    animate={{ y: 0, transition: { bounce: 0 } }}
                    className={scss.modal}
                >
                    <ExitSvg onClick={handleClose} className={scss.exit_svg} />
                    {children}
                </motion.div>
            </motion.div>,
            window.document.body
        )
    );
};
