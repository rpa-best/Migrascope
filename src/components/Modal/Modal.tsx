'use client';

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { useModalStore } from 'store/modalStore/modalVisibleStore';

import ExitSvg from '/public/svg/x.svg';

import scss from './Modal.module.scss';

interface ModalProps {
    customVisible?: boolean;
    setCustomVisible?: (v: boolean) => void;
    needOverflow?: boolean;
    children: React.ReactElement;
}

export const Modal: React.FC<ModalProps> = ({
    customVisible,
    setCustomVisible,
    children,
    needOverflow = false,
}) => {
    const [visible] = useModalStore((state) => [state.visible]);
    const [setVisible] = useModalStore((state) => [state.setVisible]);

    const actualVisible = customVisible || visible;
    const actualSetVisible = setCustomVisible ? setCustomVisible : setVisible;

    useEffect(() => {
        if (!needOverflow) {
            if (actualVisible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }, [actualVisible, needOverflow]);

    return (
        <AnimatePresence>
            {actualVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                        actualSetVisible(false);
                        toast.dismiss();
                    }}
                    className={scss.modal_background}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, transform: 'translateY(25%)' }}
                        animate={{ opacity: 1, transform: 'translateY(0)' }}
                        exit={{ opacity: 0, transform: 'translateY(25%)' }}
                        className={scss.modal}
                    >
                        <ExitSvg
                            onClick={() => {
                                actualSetVisible(false);
                                toast.dismiss();
                            }}
                            className={scss.exit_svg}
                        />
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
