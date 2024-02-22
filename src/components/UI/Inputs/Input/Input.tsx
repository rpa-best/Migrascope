'use client';

import React, { ChangeEventHandler, useMemo, useState } from 'react';
import clsx from 'clsx';

import { IInputProps } from 'components/UI/Inputs/Input/types';

import OpenEye from 'components/UI/svg/eye.svg';
import HiddenEye from 'components/UI/svg/eyeHidden.svg';
import XSvg from '/public/svg/x.svg';

import scss from 'components/UI/Inputs/Input/Input.module.scss';
import { Button } from 'components/UI/Buttons/Button';

export const Input: React.FC<IInputProps> = ({
    type = 'text',
    placeholder,
    autoFocus,
    value,
    name,
    clearable,
    handleError,
    onChange,
    onKeyDown,
    onBlur,
    autoComplete,
    disabled,
    tabIndex,
    label,
    needErrorLabel = true,
    changePasswordVisibility,
    required = false,
    size = 'default',
    style = 'default',
    bgColor,
    submitButton,
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const passType = useMemo(() => {
        if (changePasswordVisibility) {
            return passwordVisible ? 'text' : type;
        } else {
            return type;
        }
    }, [changePasswordVisibility, passwordVisible, type]);

    const handleVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const fieldClass = clsx({
        [scss.field_without_error_label]: !needErrorLabel,
        [scss.field_without_label]: !label,
        [scss.field_without_label_and_error]: !label && !needErrorLabel,
        [scss.field_with_label]: size !== 'big' && label && needErrorLabel,
        [scss.field_with_label_big]: size === 'big' && label && needErrorLabel,
        [scss.field_search]: name === 'search',
        [scss.field_big]: size === 'big',
    });
    const labelErrorClass = clsx({
        [scss.input_error_label]: handleError,
    });

    const labelClass = clsx({
        [scss.input_label]: label && style === 'default',
        [scss.input_label_hollow]: label && style === 'hollow',
    });

    const inputClass = clsx({
        [scss.input]: style === 'default',
        [scss.input_hollow]: style === 'hollow',
        [scss.input_big]: style === 'default' && size === 'big',
        [scss.input_error]: handleError,
        [scss.input_search]: name === 'search',
    });
    const handleClearClick = () => {
        onChange('' as any);
    };

    return (
        <div className={fieldClass}>
            {label && (
                <label htmlFor={name} className={labelClass}>
                    {label}
                    {required && (
                        <span className={scss.required_indicator}>*</span>
                    )}
                </label>
            )}
            <div className={scss.input_svg_wrapper}>
                <input
                    style={{ backgroundColor: bgColor }}
                    onKeyDown={onKeyDown}
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
                {submitButton?.text && (
                    <div className={scss.input_submit_button}>
                        <Button
                            loading={submitButton.loading}
                            type="button"
                            onClick={submitButton.onClick}
                        >
                            {submitButton.text}
                        </Button>
                    </div>
                )}
                {changePasswordVisibility && (
                    <div
                        className={scss.eye_wrapper}
                        onClick={() => handleVisibility()}
                    >
                        {passwordVisible ? <HiddenEye /> : <OpenEye />}
                    </div>
                )}
            </div>

            {clearable && value && (
                <div className={scss.clear_wrapper}>
                    <XSvg
                        onClick={() => handleClearClick()}
                        className={scss.custom_svg}
                    />
                </div>
            )}
            {handleError && !disabled && (
                <label className={labelErrorClass}>{handleError}</label>
            )}
        </div>
    );
};
