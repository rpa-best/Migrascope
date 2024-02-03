import React from 'react';
import clsx from 'clsx';

import { ButtonProps } from 'components/UI/Buttons/Button/types';
import { SvgElement } from 'components/UI/Buttons/Button/SvgElement';

import scss from 'components/UI/Buttons/Button/Button.module.scss';

export const Button: React.FC<ButtonProps> = ({
    onClick,
    disabled,
    type = 'button',
    children,
    nowrap = false,
    size = 'default',
    style = 'default',
    svg,
    loading,
}) => {
    const buttonClass = clsx({
        [scss.button_default]: style === 'default' && size === 'default',
        [scss.button_default_small_hollow]:
            style === 'hollow' && size === 'small',
        [scss.button_default_gray]: style === 'gray' && size === 'default',
        [scss.button_default_white]: style === 'white' && size === 'default',
        [scss.button_big]: style === 'default' && size === 'big',
        [scss.button_big_gray]: style === 'gray' && size === 'big',
        [scss.button_medium]: style === 'default' && size === 'medium',
        [scss.button_medium_gray]: style === 'gray' && size === 'medium',
        [scss.button_svg]: svg,
    });

    return (
        <button
            style={nowrap ? { whiteSpace: 'nowrap' } : undefined}
            disabled={disabled}
            type={type}
            className={buttonClass}
            onClick={onClick}
        >
            <SvgElement type={svg} />
            {children}
            {loading && <SvgElement type="loading" />}
        </button>
    );
};
