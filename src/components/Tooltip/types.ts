import React from 'react';
import { MotionValue } from 'framer-motion';

export interface RenderedComponentProps {
    opacity: MotionValue<number>;
    visible: boolean;
    setVisible: (b: boolean) => void;
}

export interface TooltipProps {
    RenderedComponent: React.FC<RenderedComponentProps>;
    propsToComponent?: { [key: string]: any };
    needResize?: true;
    customXOffset?: number;
    customYOffset?: number;
    children: React.ReactElement;
}
