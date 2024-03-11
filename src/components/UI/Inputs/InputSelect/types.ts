import { MotionValue } from 'framer-motion';
import { IInputProps } from 'components/UI/Inputs/Input/types';

export interface InputSelectListType {
    id: number;
    name: string;
}

export interface ListProps {
    list: { id: number; name: string }[];
    handleSetData: (id: number) => void;
    opacity: MotionValue<string>;
    loading?: boolean;
}

export interface IInputSelectProps extends Omit<IInputProps, 'onChange'> {
    listValues: InputSelectListType[];
    onChange: (item: any) => void;
    disablePlaceholder?: boolean;
    loading?: boolean;
    fetchable?: boolean;
    setFieldTouched?: (field: string, value: boolean) => void;
    showPrevValue?: boolean;
}
