import { ChangeEventHandler, FocusEvent, KeyboardEventHandler } from 'react';

export interface IInputProps {
    value: string;
    name: string | 'search';
    size?: 'default' | 'big';
    style?: 'default' | 'hollow' | 'empty';
    onChange:
        | ChangeEventHandler<HTMLInputElement>
        | ChangeEventHandler<HTMLTextAreaElement>;
    submitButton?: { onClick: () => void; text: string; loading?: boolean };
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    bgColor?: string;
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
