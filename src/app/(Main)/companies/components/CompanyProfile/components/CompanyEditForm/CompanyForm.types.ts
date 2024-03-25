import { OrganizationType } from 'http/organizationService/types';
import { OrgFormType } from 'components/AddCompany/types';

export interface EditCompanyFormProps {
    selectedOrg: OrganizationType;
}

export type DefaultCompanyValues = {
    [key in keyof Omit<
        OrganizationType,
        | 'organizationalForm'
        | 'id'
        | 'createAt'
        | 'dateEndPassport'
        | 'dateIssuePassport'
    >]: string;
};

export interface EditCompanyFormValues extends DefaultCompanyValues {
    organizationalForm: OrgFormType | null;
    dateEndPassport: Date | null;
    dateIssuePassport: Date | null;
}

export type EditCompanyFormErrorType = {
    [key in keyof EditCompanyFormValues]: string;
};
