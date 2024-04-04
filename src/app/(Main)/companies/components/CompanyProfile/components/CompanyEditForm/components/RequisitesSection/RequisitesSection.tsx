import React, { ChangeEvent, FC } from 'react';
import { toast } from 'react-toastify';

import { Input } from 'components/UI/Inputs/Input';

import { getOrgBankByBic } from 'http/organizationService/organizationService';

import {
    errorToastOptions,
    successToastConfig,
    warningToastConfig,
} from 'config/toastConfig';

import { MainSectionProps } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';
import { AxiosError } from 'axios';

import scss from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyEditForm.module.scss';

export const RequisitesSection: FC<MainSectionProps> = ({
    isEdit,
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    setFieldTouched,
}) => {
    return (
        <section className={scss.company_edit_form_section}>
            <h3>Реквизиты</h3>
            <div className={scss.company_edit_form_inputs}>
                <div
                    data-iserror={isEdit && touched.inn && !!errors.inn}
                    className={scss.company_edit_form_input}
                >
                    <Input
                        disabled={!isEdit}
                        placeholder="Не указано"
                        onBlur={handleBlur}
                        handleError={isEdit && touched.inn && errors.inn}
                        style="empty"
                        value={values.inn}
                        needErrorLabel={false}
                        name="inn"
                        onChange={handleChange}
                    />
                    <label>ИНН</label>
                </div>
                <div
                    data-iserror={isEdit && touched.ogrn && !!errors.ogrn}
                    className={scss.company_edit_form_input}
                >
                    <Input
                        placeholder="Не указано"
                        disabled={!isEdit}
                        onBlur={handleBlur}
                        handleError={isEdit && touched.ogrn && errors.ogrn}
                        style="empty"
                        needErrorLabel={false}
                        value={values.ogrn}
                        name="ogrn"
                        onChange={handleChange}
                    />
                    <label>ОГРН</label>
                </div>
                <div
                    data-iserror={isEdit && touched.okved && !!errors.okved}
                    className={scss.company_edit_form_input}
                >
                    <Input
                        placeholder="Не указано"
                        disabled={!isEdit}
                        onBlur={handleBlur}
                        needErrorLabel={false}
                        handleError={isEdit && touched.okved && errors.okved}
                        style="empty"
                        value={values.okved}
                        name="okved"
                        onChange={handleChange}
                    />
                    <label>ОКВЭД</label>
                </div>

                <div
                    data-iserror={isEdit && touched.kpp && !!errors.kpp}
                    className={scss.company_edit_form_input}
                >
                    <Input
                        placeholder="Не указано"
                        disabled={!isEdit}
                        needErrorLabel={false}
                        onBlur={handleBlur}
                        handleError={isEdit && touched.kpp && errors.kpp}
                        style="empty"
                        value={values.kpp}
                        name="kpp"
                        onChange={handleChange}
                    />
                    <label>КПП</label>
                </div>
            </div>
        </section>
    );
};
