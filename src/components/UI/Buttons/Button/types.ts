export interface ButtonProps {
    children: string | string[];
    type: HTMLButtonElement['type'];
    style?: 'default' | 'gray';
    onClick?: () => void;
    disabled?: boolean;
    nowrap?: boolean;
}
