'use client';

import React, { FC, useState } from 'react';
import { useFormik } from 'formik';

import { Button } from 'components/UI/Buttons/Button';
import { MainSection } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/components/MainSection';
import { RequisitesSection } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/components/RequisitesSection';
import { BankSection } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/components/BanksSection';

import revalidateTagOnClient from 'utils/revalidateTagOnClient';
import {
    companyFormSubmit,
    CompanyFormValidate,
    setInitialEditCompanyValues,
} from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.utils';

import { useEditCompanyStore } from 'app/(Main)/companies/components/CompanyProfile/store/editCompanyStore';

import {
    EditCompanyFormErrorType,
    EditCompanyFormProps,
    EditCompanyFormTouchedType,
    EditCompanyFormValues,
} from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';

import scss from './CompanyEditForm.module.scss';

export const CompanyEditForm: FC<EditCompanyFormProps> = ({ selectedOrg }) => {
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useEditCompanyStore((state) => [
        state.isEdit,
        state.setIsEdit,
    ]);

    const {
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
    } = useFormik<EditCompanyFormValues>({
        initialValues: setInitialEditCompanyValues(selectedOrg),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await companyFormSubmit(
                    selectedOrg.id,
                    values,
                    selectedOrg,
                    setIsEdit
                );
                revalidateTagOnClient('server-organization');
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        },
        validate: CompanyFormValidate,
    });

    return (
        <form className={scss.company_edit_form} onSubmit={handleSubmit}>
            <MainSection
                orgId={selectedOrg.id}
                setFieldTouched={setFieldTouched}
                isEdit={isEdit}
                touched={touched as any}
                errors={errors as EditCompanyFormErrorType}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />

            <RequisitesSection
                orgId={selectedOrg.id}
                isEdit={isEdit}
                touched={touched as any}
                values={values}
                errors={errors as EditCompanyFormErrorType}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
            />
            <BankSection
                orgId={selectedOrg.id}
                isEdit={isEdit}
                touched={touched as any}
                values={values}
                errors={errors as EditCompanyFormErrorType}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
            />

            {isEdit && (
                <div className={scss.company_edit_form_button_wrapper}>
                    <Button loading={loading} type="submit">
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
};
