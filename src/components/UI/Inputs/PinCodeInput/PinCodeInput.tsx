import React, { useRef, useEffect, KeyboardEvent } from 'react';

import { IPinCodeInputProps } from 'components/UI/Inputs/PinCodeInput/types';

import scss from './PinCodeInput.module.scss';

export const PinCodeInput: React.FC<IPinCodeInputProps> = ({
    digits,
    validateForm,
    changeHandler,
    errors,
}) => {
    const length = digits.length;
    // здесь будут ссылки на input-элементы
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        inputRefs.current[0].focus();
    }, []);

    const handleKeyDown = (
        index: number,
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Backspace') {
            if (digits[index].match(/^[0-9]$/)) {
                // если элемент массива digits содержит цифру, то при нажатии клавиши
                // вызываем callback-функцию родителя, чтобы записать пустую строку
                const newDigits = [...digits]; // копия digits
                newDigits[index] = '';
                changeHandler(newDigits, true);
                if (index > 0) inputRefs.current[index - 1].focus();
            } else {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleChange = async (index: number, newValue: string) => {
        const letterRegex = /[a-zA-Z]/;
        if (letterRegex.test(newValue)) {
            return;
        }
        if (newValue.length > 6) {
            newValue = newValue.slice(0, 6);
        }
        if (newValue.length > 1) {
            if (letterRegex.test(newValue)) {
                return;
            }
            const coppiedValues = newValue.split('');
            const newDigits = [...digits];
            coppiedValues.forEach((el, index) => {
                newDigits[index] = el;
            });
            await changeHandler(newDigits);
            if (coppiedValues.length === 6) {
                inputRefs.current[index].blur();
            } else {
                inputRefs.current[coppiedValues.length].focus();
            }
            return;
        }
        const oldDigit = digits[index];
        // старую цифру в поле ввода убираем, оставляя только новую
        const newDigit = newValue.trim().replace(oldDigit, '');
        // если это не цифра, ничего не делаем, пока не будет цифры
        if (newDigit < '0' || newDigit > '9') return;
        // теперь вызываем callback родителя, чтобы обовить digits
        const newDigits = [...digits]; // копия digits
        newDigits[index] = newDigit;
        await changeHandler(newDigits);
        // смещаем фокус на следующее поле для ввода следующей цифры
        if (index < length - 1) {
            inputRefs.current[index + 1].focus();
        } else {
            // или убираем фокус, если это было последнее поле
            inputRefs.current[index].blur();
        }
    };
    return (
        <div className={scss.pin_code_input_wrapper}>
            <div className={scss.inputs_wrapper}>
                {digits.map((digit, index) => {
                    const lastIndex = digits.findLastIndex((el) => el);
                    let indexOfLastNumber = 0;

                    const hasLastNumber = !!digits[length - 1];
                    const hasFirstNumber = !!digits[0];

                    let disabled = false;

                    if (hasLastNumber) {
                        indexOfLastNumber = lastIndex;
                        disabled = index < lastIndex;
                    } else if (!hasFirstNumber) {
                        indexOfLastNumber = 0;
                        disabled = index > 0;
                    } else {
                        indexOfLastNumber = lastIndex + 1;
                        disabled =
                            index >= indexOfLastNumber + 1 ||
                            index <= indexOfLastNumber - 2;
                    }

                    return (
                        <input
                            key={index}
                            className={
                                errors.code
                                    ? scss.input_cell_error
                                    : scss.input_cell
                            }
                            data-isdisabled={disabled}
                            value={digit}
                            onBlur={() => validateForm()}
                            onChange={(event) => {
                                if (disabled) {
                                    return;
                                }
                                handleChange(index, event.target.value);
                            }}
                            onClick={() => {
                                if (disabled) {
                                    inputRefs.current[
                                        indexOfLastNumber
                                    ].focus();
                                }
                            }}
                            onKeyDown={(event) => {
                                if (disabled) {
                                    return;
                                }
                                handleKeyDown(index, event);
                            }}
                            ref={(element) =>
                                (inputRefs.current[index] =
                                    element as HTMLInputElement)
                            }
                        />
                    );
                })}
            </div>
            {errors.code && (
                <label
                    style={{ textAlign: 'center' }}
                    className={scss.input_error_label}
                >
                    {errors.code}
                </label>
            )}
        </div>
    );
};
