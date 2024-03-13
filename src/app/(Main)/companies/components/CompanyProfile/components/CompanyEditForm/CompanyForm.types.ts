import { OrganizationType } from 'http/organizationService/types';
import { OrgFormType } from 'components/AddCompany/types';

export interface EditCompanyFormProps {
    selectedOrg: OrganizationType;
}

export type DefaultCompanyValues = {
    [key in keyof Omit<
        OrganizationType,
        'organizationalForm' | 'id' | 'createAt' | 'actualAddress'
    >]: string;
};

export interface EditCompanyFormValues extends DefaultCompanyValues {
    organizationalForm: OrgFormType | null;
    actualAddress: string[];
}
