'use client';

import React, { FC, useState } from 'react';
import { useFormik } from 'formik';

import { Input } from 'components/UI/Inputs/Input';
import { InputMask } from 'components/UI/Inputs/InputMask';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { Button } from 'components/UI/Buttons/Button';

import {
    companyFormSubmit,
    CompanyFormValidate,
    setInitialEditCompanyValues,
} from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.utils';

import { useEditCompanyStore } from 'app/(Main)/companies/components/CompanyProfile/store/editCompanyStore';
import { OrgFormData } from 'components/AddCompany/tempData';

import {
    EditCompanyFormProps,
    EditCompanyFormValues,
} from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';

import scss from './CompanyEditForm.module.scss';
import revalidateTagOnClient from 'utils/revalidateTagOnClient';

export const CompanyEditForm: FC<EditCompanyFormProps> = ({ selectedOrg }) => {
    const [loading, setLoading] = useState(false);

    const [isEdit] = useEditCompanyStore((state) => [state.isEdit]);

    const { values, handleSubmit, setFieldValue, handleChange, handleBlur } =
        useFormik<EditCompanyFormValues>({
            initialValues: setInitialEditCompanyValues(selectedOrg),
            onSubmit: async (values) => {
                try {
                    setLoading(true);
                    await companyFormSubmit(
                        selectedOrg.id,
                        values,
                        selectedOrg
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
            <section className={scss.company_edit_form_section}>
                <h3>Контакты организации</h3>
                <div className={scss.company_edit_form_inputs}>
                    <div className={scss.company_edit_form_input}>
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            needErrorLabel={false}
                            style="empty"
                            value={values.nameDirector}
                            name="nameDirector"
                            onChange={handleChange}
                        />
                        <label>Имя директора</label>
                    </div>
                    <div className={scss.company_edit_form_input}>
                        <InputMask
                            autoComplete="off"
                            needErrorLabel={false}
                            style="empty"
                            name="phone"
                            placeholder="+7(___)___-__-__"
                            value={values.phone}
                            alwaysShowMask={true}
                            disabled={!isEdit}
                            mask="+7(999)999-99-99"
                            onChange={(value: string) =>
                                setFieldValue('phone', value)
                            }
                            type="tel"
                        />
                        <label>Телефон</label>
                    </div>
                    <div className={scss.company_edit_form_input}>
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            needErrorLabel={false}
                            style="empty"
                            value={values.surnameDirector}
                            name="surnameDirector"
                            onChange={handleChange}
                        />
                        <label>Фамилия директора</label>
                    </div>
                    <div className={scss.company_edit_form_input}>
                        <InputSelect
                            disabled={!isEdit}
                            onChange={(v) =>
                                setFieldValue('organizationalForm', v)
                            }
                            value={values.organizationalForm?.name as string}
                            name="organizationalForm"
                            style="empty"
                            placeholder="Укажите компанию"
                            onBlur={handleBlur}
                            needErrorLabel={false}
                            listValues={OrgFormData}
                        />
                        <label>Форма организации</label>
                    </div>
                    <div className={scss.company_edit_form_input}>
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            needErrorLabel={false}
                            style="empty"
                            value={values.patronymicDirector}
                            name="patronymicDirector"
                            onChange={handleChange}
                        />
                        <label>Отчество директора</label>
                    </div>
                </div>
            </section>
            <section className={scss.company_edit_form_section}>
                <h3>Реквизиты</h3>
                <div className={scss.company_edit_form_inputs}>
                    <div className={scss.company_edit_form_input}>
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            needErrorLabel={false}
                            style="empty"
                            value={values.inn}
                            name="inn"
                            onChange={handleChange}
                        />
                        <label>ИНН</label>
                    </div>
                    <div className={scss.company_edit_form_input}>
                        <Input
                            placeholder="Не указано"
                            disabled={!isEdit}
                            needErrorLabel={false}
                            style="empty"
                            value={values.ogrn}
                            name="ogrn"
                            onChange={handleChange}
                        />
                        <label>ОГРН</label>
                    </div>
                    <div className={scss.company_edit_form_input}>
                        <Input
                            placeholder="Не указано"
                            disabled={!isEdit}
                            needErrorLabel={false}
                            style="empty"
                            value={values.okved}
                            name="okved"
                            onChange={handleChange}
                        />
                        <label>ОКВЭД</label>
                    </div>

                    <div className={scss.company_edit_form_input}>
                        <Input
                            placeholder="Не указано"
                            disabled={!isEdit}
                            needErrorLabel={false}
                            style="empty"
                            value={values.kpp}
                            name="kpp"
                            onChange={handleChange}
                        />
                        <label>КПП</label>
                    </div>
                </div>
            </section>
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
