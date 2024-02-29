import { IInputProps } from 'components/UI/Inputs/Input/types';

export interface InputDateProps
    extends Pick<
        IInputProps,
        'name' | 'autoFocus' | 'type' | 'style' | 'needErrorLabel'
    > {
    value: Date | null;
    onBlur?: <T>(e: T) => void;
    onChange: (value: Date) => void;
    alwaysShowMask?: boolean;
    mask: string;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    handleError?: string | boolean;
}
