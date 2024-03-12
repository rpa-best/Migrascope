import { FC } from 'react';
import { useFormik } from 'formik';

import {
    CompanyFormValidate,
    setInitialEditCompanyValues,
} from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.utils';

import {
    EditCompanyFormProps,
    EditCompanyFormValues,
} from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';

import scss from './CompanyEditForm.module.scss';

export const CompanyEditForm: FC<EditCompanyFormProps> = ({ org }) => {
    const { values } = useFormik<EditCompanyFormValues>({
        initialValues: setInitialEditCompanyValues(org),
        onSubmit: () => {},
        validate: CompanyFormValidate,
    });

    return <></>;
};
