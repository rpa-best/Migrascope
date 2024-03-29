import React, {
    ChangeEvent,
    ChangeEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react';
import Tippy from '@tippyjs/react/headless';

import clsx from 'clsx';
import { useSpring } from 'framer-motion';
import { onHide, onMount } from 'utils/TippyHelper';

import { InputSelectList } from 'components/UI/Inputs/InputSelect/InputSelectList';

import { IInputSelectProps } from 'components/UI/Inputs/InputSelect/types';

import XSvg from '/public/svg/x.svg';
import Arrow from '/public/svg/arrow.svg';

import scss from 'components/UI/Inputs/InputSelect/InputSelect.module.scss';

export const InputSelect: React.FC<IInputSelectProps> = ({
    type = 'text',
    placeholder,
    autoFocus,
    value,
    name,
    label,
    handleError,
    onBlur,
    onChange,
    autoComplete,
    setFieldTouched,
    disabled,
    tabIndex,
    needErrorLabel = true,
    listValues,
    clearable,
    showPrevValue = true,
    style = 'default',
    loading,
    disablePlaceholder = false,
    fetchable = false,
    css,
}) => {
    const opacity = useSpring(0);

    const [inputValue, setInputValue] = useState(value);
    const [visible, setVisible] = useState(false);
    const [modifiedListValues, setModifiedListValues] = useState(listValues);

    const inputRef = useRef<HTMLInputElement>(null);

    const prevValue = useRef(value);

    useEffect(() => {
        if (fetchable) {
            setModifiedListValues(listValues);
            return;
        }
        setModifiedListValues(
            [...listValues].filter((v) => {
                return v.name !== value;
            })
        );
    }, [fetchable, listValues, value]);

    useEffect(() => {
        setInputValue(value);
        prevValue.current = value;
    }, [fetchable, value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (setFieldTouched) {
            setFieldTouched(name, true);
        }
        if (fetchable) {
            onChange(inputValue);
            return;
        }
        setInputValue(inputValue);

        // Фильтруем список на основе inputValue
        const filteredList = listValues.filter(
            (item) =>
                item.name.includes(inputValue) &&
                item.name !== prevValue.current
        );

        // Устанавливаем отфильтрованный список в modifiedListValues
        setModifiedListValues(filteredList);
    };

    const handleSetData = (id: number) => {
        onChange(listValues.find((item) => item.id === id));
        setVisible(!visible);
    };

    const handleArrowClick: ChangeEventHandler<HTMLOrSVGElement> = (event) => {
        if (visible) {
            event.stopPropagation();
            setVisible(false);
            return;
        }
        inputRef.current?.focus();
    };

    const onClickOutside = () => {
        setVisible(!visible);
        if (setFieldTouched) {
            setFieldTouched(name, true);
        }
        if (showPrevValue) {
            setInputValue(prevValue.current);
        }
    };

    const arrowClassname = clsx({
        [scss.input_arrow_svg]: true,
        [scss.input_arrow_svg_open]: visible,
    });

    const fieldClass = clsx({
        [scss.field_without_error_label]: !needErrorLabel,
        [scss.field_without_label]: !label,
        [scss.field_without_label_and_error]: !label && !needErrorLabel,
        [scss.field_search]: name === 'search',
        [scss.field_disabled]: disabled,
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
        [scss.input_error]: handleError,
        [scss.input_search]: name === 'search',
    });

    const handleClearClick = () => {
        onChange('' as any);
    };

    return (
        <div className={scss.input_select_wrapper}>
            <Tippy
                onMount={() => onMount(opacity)}
                onHide={({ unmount }) => onHide({ opacity, unmount })}
                animation={true}
                interactive={true}
                visible={visible}
                placement="bottom"
                offset={[0, 4]}
                onClickOutside={onClickOutside}
                render={(attrs) => (
                    <InputSelectList
                        loading={loading}
                        {...attrs}
                        opacity={opacity}
                        handleSetData={handleSetData}
                        list={modifiedListValues}
                    />
                )}
            >
                <div className={fieldClass}>
                    {label && <label className={labelClass}>{label}</label>}
                    <div
                        onClick={() => setVisible(true)}
                        className={scss.input_wrapper}
                    >
                        <input
                            style={css}
                            onFocus={() => {
                                setVisible(true);
                                if (disablePlaceholder) return;
                                setInputValue('');
                            }}
                            tabIndex={tabIndex}
                            autoComplete={autoComplete as string}
                            className={inputClass}
                            onBlur={onBlur}
                            type={type}
                            onChange={handleInputChange}
                            value={inputValue}
                            autoFocus={autoFocus}
                            id={name}
                            name={name}
                            ref={inputRef}
                            placeholder={
                                prevValue.current
                                    ? prevValue.current
                                    : placeholder
                            }
                            disabled={disabled}
                        />
                        {clearable && inputValue && (
                            <div className={scss.clear_wrapper}>
                                <XSvg
                                    onClick={() => handleClearClick()}
                                    className={scss.custom_svg}
                                />
                            </div>
                        )}
                        {name !== 'search' && !disabled && (
                            <Arrow
                                onClick={handleArrowClick}
                                className={arrowClassname}
                            />
                        )}
                    </div>
                    {handleError && (
                        <label className={labelErrorClass}>{handleError}</label>
                    )}
                </div>
            </Tippy>
        </div>
    );
};
