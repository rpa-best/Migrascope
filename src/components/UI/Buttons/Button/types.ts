import { CSSProperties } from 'react';

export interface ButtonProps {
    children: string | string[];
    type?: HTMLButtonElement['type'];
    style?: 'default' | 'gray' | 'white' | 'hollow' | 'hollowActive';
    onClick?: () => void;
    disabled?: boolean;
    css?: CSSProperties;
    nowrap?: boolean;
    loading?: boolean;
    size?: 'default' | 'big' | 'medium' | 'small';
    svg?: 'plus' | 'loading';
}
