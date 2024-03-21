'use client';

import React, { FC, Suspense, useEffect, useMemo, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { AnimatePresence, motion, MotionValue, useSpring } from 'framer-motion';

import { useResizeWidth } from 'hooks/useResizeWidth';
import { onHide } from 'utils/TippyHelper';

import { TooltipProps } from 'components/Tooltip/types';

import scss from './Tooltip.module.scss';

export const Tooltip: FC<TooltipProps> = ({
    RenderedComponent,
    children,
    needResize,
    customXOffset,
    propsToComponent,
    customYOffset,
}) => {
    const { phoneBreak } = useResizeWidth();

    const opacity = useSpring(0);
    const [visible, setVisible] = useState(false);

    const xOffset = useMemo(() => {
        return customXOffset ?? (phoneBreak ? -300 : -125);
    }, [customXOffset, phoneBreak]);

    function onMount(opacity: MotionValue<number>) {
        opacity.set(1);
    }

    function onSettingsHide(opacity: MotionValue, unmount: () => void) {
        onHide({ opacity, unmount });
    }

    useEffect(() => {
        if (needResize) {
            if (visible) {
                setTimeout(() => {
                    document.body.style.height =
                        document.documentElement.scrollHeight + 'px';
                }, 0);
            } else {
                document.body.style.height = 'max-content';
            }
        }
    }, [needResize, visible]);

    return (
        <div className={scss.tippy_wrapper}>
            <Tippy
                onMount={() => onMount(opacity)}
                onHide={({ unmount }) => onSettingsHide(opacity, unmount)}
                animation={true}
                interactive={true}
                visible={visible}
                offset={[xOffset, customYOffset ?? 10]}
                placement="bottom-start"
                onClickOutside={() => setVisible(!visible)}
                render={(attrs) => (
                    <Suspense fallback={<></>}>
                        <RenderedComponent
                            {...propsToComponent}
                            visible={visible}
                            setVisible={setVisible}
                            opacity={opacity}
                            {...attrs}
                        />
                    </Suspense>
                )}
            >
                <div onClick={() => setVisible(!visible)}>{children}</div>
            </Tippy>
            <AnimatePresence>
                {visible && (
                    <motion.span
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={scss.body_gray}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
