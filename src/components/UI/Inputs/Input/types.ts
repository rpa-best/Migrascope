import { ChangeEventHandler, FocusEvent } from 'react';

export interface IInputProps {
    value: string;
    name: string;
    onChange:
        | ChangeEventHandler<HTMLInputElement>
        | ChangeEventHandler<HTMLTextAreaElement>;
    autoFocus?: boolean;
    handleError?: string | boolean;
    onBlur?: (
        event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>
    ) => void;
    required?: boolean;
    type?: HTMLInputElement['type'];
    changePasswordVisibility?: boolean;
    placeholder?: string;
    autoComplete?: 'on' | 'off' | 'new-password';
    disabled?: boolean;
    tabIndex?: number;
    clearable?: boolean;
    label?: string;
    needErrorLabel?: boolean;
}
