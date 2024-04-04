import { OrganizationType } from 'http/organizationService/types';
import { OrgFormType } from 'components/AddCompany/types';
import { FormikHandlers } from 'formik';

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
    bankInfo: {
        id?: number;
        bic: string;
        nameBank: string;
        paymentAccount: string;
        correspondentAccount: string;
        cityBank: string;
    }[];
}

export type EditCompanyFormErrorType = {
    [key in keyof EditCompanyFormValues]: string;
};

export type EditCompanyFormTouchedType = {
    [key in keyof EditCompanyFormValues]: boolean;
};

export interface MainSectionProps {
    orgId: number;
    isEdit: boolean;
    touched: EditCompanyFormTouchedType;
    values: EditCompanyFormValues;
    errors: EditCompanyFormErrorType;
    handleChange: FormikHandlers['handleChange'];
    handleBlur: FormikHandlers['handleBlur'];
    setFieldValue: (key: string, value: any) => void;
    setFieldTouched: (key: string, value: boolean) => void;
}
