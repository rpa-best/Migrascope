import Input from 'react-input-mask';
import React from 'react';
import clsx from 'clsx';

import { InputMaskProps } from 'components/UI/Inputs/InputMask/InputMask.types';

import scss from 'components/UI/Inputs/Input/Input.module.scss';

export const InputMask = ({
    handleError,
    mask,
    alwaysShowMask,
    placeholder,
    autoFocus,
    value,
    name,
    onChange,
    onBlur,
    label,
    type,
    maskPlaceholder,
    size = 'default',
    style = 'default',
    needErrorLabel = true,
    autoComplete,
    required,
    disabled,
}: InputMaskProps) => {
    const fieldClass = clsx({
        [scss.field_without_error_label]: !needErrorLabel,
        [scss.field_without_label]: !label,
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
        [scss.input_empty]: style === 'empty',
        [scss.input_big]: style === 'default' && size === 'big',
        [scss.input_error]: handleError,
        [scss.input_search]: name === 'search',
    });

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
            <Input
                disabled={disabled}
                autoComplete={autoComplete}
                maskPlaceholder={maskPlaceholder}
                type={type}
                className={inputClass}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                value={value}
                alwaysShowMask={alwaysShowMask}
                mask={mask}
                autoFocus={autoFocus}
                id={name}
                name={name}
                placeholder={placeholder}
                onBlur={onBlur}
            />
            {handleError && (
                <label className={labelErrorClass}>{handleError}</label>
            )}
        </div>
    );
};
