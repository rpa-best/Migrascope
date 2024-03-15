import { RenderedComponentProps } from 'components/Tooltip/types';
import { InputSelectListType } from 'components/UI/Inputs/InputSelect/types';

export interface AddCompanyUserFormProps extends RenderedComponentProps {
    orgId: number;
}

interface RoleType extends InputSelectListType {
    slug: string;
}

export interface AddCompanyUserFormValues {
    username: string;
    firstName: string;
    role: RoleType | null;
}

export type AddCompanyUserFormErrors = {
    [key in keyof AddCompanyUserFormValues]: string;
};
