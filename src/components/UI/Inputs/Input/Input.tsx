'use client';

import React, { ChangeEventHandler, useMemo, useState } from 'react';
import clsx from 'clsx';

import { IInputProps } from 'components/UI/Inputs/Input/types';

import OpenEye from 'components/UI/svg/eye.svg';
import HiddenEye from 'components/UI/svg/eyeHidden.svg';
import XSvg from '/public/svg/x.svg';

import scss from 'components/UI/Inputs/Input/Input.module.scss';

export const Input: React.FC<IInputProps> = ({
    type = 'text',
    placeholder,
    autoFocus,
    value,
    name,
    clearable,
    handleError,
    onChange,
    onBlur,
    autoComplete,
    disabled,
    tabIndex,
    label,
    needErrorLabel = true,
    changePasswordVisibility,
    required = false,
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const passType = useMemo(() => {
        return passwordVisible ? 'text' : type;
    }, [passwordVisible, type]);

    const handleVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const fieldClass = clsx({
        [scss.field_without_error_label]: !needErrorLabel,
        [scss.field_without_label]: !label,
        [scss.field_with_label]: label && needErrorLabel,
    });
    const labelErrorClass = clsx({
        [scss.input_error_label]: handleError,
    });

    const labelClass = clsx({
        [scss.input_label]: label,
    });

    const inputClass = clsx({
        [scss.input]: true,
        [scss.input_error]: handleError,
    });
    const handleClearClick = () => {
        onChange('' as any);
    };

    return (
        <div className={fieldClass}>
            {label ? (
                <label className={labelClass}>
                    {label}
                    {required && (
                        <span className={scss.required_indicator}>*</span>
                    )}
                </label>
            ) : (
                <label className={labelErrorClass}>{handleError}</label>
            )}
            <input
                tabIndex={tabIndex}
                autoComplete={autoComplete as string}
                className={inputClass}
                type={passType}
                onChange={onChange as ChangeEventHandler<HTMLInputElement>}
                value={value}
                autoFocus={autoFocus}
                id={name}
                name={name}
                placeholder={placeholder}
                onBlur={onBlur}
                disabled={disabled}
            />
            {changePasswordVisibility && (
                <div
                    className={scss.eye_wrapper}
                    onClick={() => handleVisibility()}
                >
                    {passwordVisible ? <HiddenEye /> : <OpenEye />}
                </div>
            )}
            {clearable && (
                <XSvg
                    onClick={() => handleClearClick()}
                    className={scss.custom_svg}
                />
            )}
            {label && <label className={labelErrorClass}>{handleError}</label>}
        </div>
    );
};
