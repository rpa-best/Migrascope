import React from 'react';

import scss from 'components/UI/Buttons/Button/Button.module.scss';
import clsx from 'clsx';
import { ButtonProps } from 'components/UI/Buttons/Button/types';

export const Button: React.FC<ButtonProps> = ({
    onClick,
    disabled,
    type,
    children,
    nowrap = false,
    style = 'default',
}) => {
    const buttonClass = clsx({
        [scss.button]: style === 'default',
        [scss.button_gray]: style === 'gray',
    });

    return (
        <button
            style={nowrap ? { whiteSpace: 'nowrap' } : undefined}
            disabled={disabled}
            type={type}
            className={buttonClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
