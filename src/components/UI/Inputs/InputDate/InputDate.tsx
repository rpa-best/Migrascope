import Input from 'react-input-mask';
import React from 'react';
import clsx from 'clsx';

import ru from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import { InputDateProps } from 'components/UI/Inputs/InputDate/InputDate.types';
import CalendarSvg from './icons/Calendar.svg';

import 'react-datepicker/dist/react-datepicker.css';
import scss from './InputDate.module.scss';

export const InputDate = ({
    handleError,
    mask,
    alwaysShowMask,
    placeholder,
    value,
    name,
    onChange,
    onBlur,
    label,
    disabled,
    style = 'default',
    minDate,
}: InputDateProps) => {
    const fieldClass = clsx({
        [scss.field]: !label,
        [scss.field_with_label]: label,
    });

    const labelClass = clsx({
        [scss.input_label]: label && style === 'default',
        [scss.input_label_hollow]: label && style === 'hollow',
    });

    const inputClass = clsx({
        [scss.input]: style === 'default',
        [scss.input_hollow]: style === 'hollow',
        [scss.input_big]: style === 'default',
        [scss.input_error]: handleError,
        [scss.input_search]: name === 'search',
    });

    return (
        <div className={fieldClass}>
            <label className={labelClass}>{label}</label>
            <div onBlur={onBlur} className={scss.input_wrapper}>
                <DatePicker
                    disabled={disabled}
                    locale={ru}
                    dateFormat="dd.MM.yyyy"
                    selected={value}
                    onChange={(date: Date) => {
                        onChange(date as Date);
                    }}
                    placeholderText={placeholder}
                    minDate={minDate}
                    calendarClassName={scss.calendar}
                    customInput={
                        <Input
                            disabled={disabled}
                            className={inputClass}
                            mask={mask}
                            alwaysShowMask={alwaysShowMask}
                            id={name}
                            name={name}
                            placeholder={placeholder}
                            onBlur={onBlur}
                        />
                    }
                />
                {!disabled && <CalendarSvg className={scss.calendar_svg} />}
            </div>
            {handleError && !disabled && (
                <label className={scss.input_error_label}>{handleError}</label>
            )}
        </div>
    );
};
