import React from 'react';
import { MotionValue } from 'framer-motion';

export interface RenderedComponentProps {
    opacity: MotionValue<number>;
    visible: boolean;
    setVisible: (b: boolean) => void;
}

export interface TooltipProps<T> {
    RenderedComponent: React.FC<RenderedComponentProps>;
    propsToComponent?: T;
    needResize?: true;
    customXOffset?: number;
    customYOffset?: number;
    children: React.ReactElement;
}
