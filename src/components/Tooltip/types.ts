import React from 'react';
import { MotionValue } from 'framer-motion';

interface RenderedComponentProps {
    opacity: MotionValue<number>;
    visible: boolean;
    setVisible: (b: boolean) => void;
}

export interface TooltipProps {
    RenderedComponent: React.FC<RenderedComponentProps>;
    needResize?: true;
    customXOffset?: number;
    customYOffset?: number;
    children: React.ReactElement;
}
