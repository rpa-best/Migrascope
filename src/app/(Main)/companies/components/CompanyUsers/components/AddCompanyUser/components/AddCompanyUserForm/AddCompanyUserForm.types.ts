import { RenderedComponentProps } from 'components/Tooltip/types';
import { InputSelectListType } from 'components/UI/Inputs/InputSelect/types';

export type CompanyUserType = {
    id: number;
    user: string;
    firstName: string;
    surname: string;
    patronymic: string;
    role: string;
};

export interface AddCompanyUserFormProps extends RenderedComponentProps {
    orgId: number;
    type: 'edit' | 'create';
    user?: CompanyUserType;
}

interface RoleType extends InputSelectListType {
    slug: string;
}

export interface AddCompanyUserFormValues {
    username: string;
    firstName: string;
    surname: string;
    patronymic: string;
    role: RoleType | null;
}

export type AddCompanyUserFormErrors = {
    [key in keyof AddCompanyUserFormValues]: string;
};
