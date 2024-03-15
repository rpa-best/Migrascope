'use client';

import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { Input } from 'components/UI/Inputs/Input';
import { InputMask } from 'components/UI/Inputs/InputMask';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { Button } from 'components/UI/Buttons/Button';
import { InputDate } from 'components/UI/Inputs/InputDate';

import revalidateTagOnClient from 'utils/revalidateTagOnClient';
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
        handleChange,
        handleBlur,
    } = useFormik<EditCompanyFormValues>({
        initialValues: setInitialEditCompanyValues(selectedOrg),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await companyFormSubmit(selectedOrg.id, values, selectedOrg);
                revalidateTagOnClient('server-organization');
                setIsEdit(false);
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
                    <div
                        data-iserror={
                            isEdit &&
                            touched.nameDirector &&
                            !!errors.nameDirector
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            needErrorLabel={false}
                            value={values.nameDirector}
                            onBlur={handleBlur}
                            handleError={
                                isEdit &&
                                touched.nameDirector &&
                                errors.nameDirector
                            }
                            name="nameDirector"
                            onChange={handleChange}
                        />
                        <label>Имя директора</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.passportSeries &&
                            !!errors.passportSeries
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            needErrorLabel={false}
                            onBlur={handleBlur}
                            handleError={
                                isEdit &&
                                touched.passportSeries &&
                                errors.passportSeries
                            }
                            value={values.passportSeries}
                            name="passportSeries"
                            onChange={handleChange}
                        />
                        <label>Серия паспорта директора</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.surnameDirector &&
                            !!errors.surnameDirector
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            needErrorLabel={false}
                            onBlur={handleBlur}
                            handleError={
                                isEdit &&
                                touched.surnameDirector &&
                                errors.surnameDirector
                            }
                            value={values.surnameDirector}
                            name="surnameDirector"
                            onChange={handleChange}
                        />
                        <label>Фамилия директора</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.passportNumber &&
                            !!errors.passportNumber
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            needErrorLabel={false}
                            onBlur={handleBlur}
                            handleError={
                                isEdit &&
                                touched.passportNumber &&
                                errors.passportNumber
                            }
                            value={values.passportNumber}
                            name="passportNumber"
                            onChange={handleChange}
                        />
                        <label>Номер паспорта директора</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.patronymicDirector &&
                            !!errors.patronymicDirector
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            needErrorLabel={false}
                            onBlur={handleBlur}
                            handleError={
                                isEdit &&
                                touched.patronymicDirector &&
                                errors.patronymicDirector
                            }
                            value={values.patronymicDirector}
                            name="patronymicDirector"
                            onChange={handleChange}
                        />
                        <label>Отчество директора</label>
                    </div>

                    <div
                        data-iserror={
                            isEdit && touched.issuedWhom && !!errors.issuedWhom
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            needErrorLabel={false}
                            onBlur={handleBlur}
                            handleError={
                                isEdit &&
                                touched.issuedWhom &&
                                errors.issuedWhom
                            }
                            value={values.issuedWhom}
                            name="issuedWhom"
                            onChange={handleChange}
                        />
                        <label>Кем выдан паспорт</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.dateIssuePassport &&
                            !!errors.dateIssuePassport
                        }
                        className={scss.company_edit_form_input}
                    >
                        <InputDate
                            disabled={!isEdit}
                            style="empty"
                            value={values.dateIssuePassport}
                            onChange={(Data: Date) =>
                                setFieldValue('dateIssuePassport', Data)
                            }
                            placeholder="Не указано"
                            mask="99.99.9999"
                            needErrorLabel={false}
                            onBlur={handleBlur}
                            handleError={
                                isEdit &&
                                touched.dateIssuePassport &&
                                errors.dateIssuePassport
                            }
                            name="dateIssuePassport"
                        />
                        <label>Дата выдачи паспорта</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.dateEndPassport &&
                            !!errors.dateEndPassport
                        }
                        className={scss.company_edit_form_input}
                    >
                        <InputDate
                            disabled={!isEdit}
                            style="empty"
                            value={values.dateEndPassport}
                            onChange={(Data: Date) =>
                                setFieldValue('dateEndPassport', Data)
                            }
                            placeholder="Не указано"
                            mask="99.99.9999"
                            onBlur={handleBlur}
                            needErrorLabel={false}
                            handleError={
                                isEdit &&
                                touched.dateEndPassport &&
                                errors.dateEndPassport
                            }
                            name="dateEndPassport"
                        />
                        <label>Дата окончания паспорта</label>
                    </div>
                    <div
                        data-iserror={isEdit && touched.phone && !!errors.phone}
                        className={scss.company_edit_form_input}
                    >
                        <InputMask
                            autoComplete="off"
                            style="empty"
                            name="phone"
                            placeholder="+7(___)___-__-__"
                            value={values.phone}
                            needErrorLabel={false}
                            alwaysShowMask={true}
                            handleError={
                                isEdit && touched.phone && errors.phone
                            }
                            onBlur={handleBlur}
                            disabled={!isEdit}
                            mask="+7(999)999-99-99"
                            onChange={(value: string) =>
                                setFieldValue('phone', value)
                            }
                            type="tel"
                        />
                        <label>Телефон директора</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.organizationalForm &&
                            !!errors.organizationalForm
                        }
                        className={scss.company_edit_form_input}
                    >
                        <InputSelect
                            disabled={!isEdit}
                            onChange={(v) =>
                                setFieldValue('organizationalForm', v)
                            }
                            value={values.organizationalForm?.name as string}
                            name="organizationalForm"
                            style="empty"
                            placeholder="Укажите компанию"
                            needErrorLabel={false}
                            handleError={
                                isEdit &&
                                touched.organizationalForm &&
                                errors.organizationalForm
                            }
                            onBlur={handleBlur}
                            listValues={OrgFormData}
                        />
                        <label>Форма организации</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.fullNameHostParty &&
                            !!errors.fullNameHostParty
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            value={values.fullNameHostParty}
                            onBlur={handleBlur}
                            needErrorLabel={false}
                            handleError={
                                isEdit &&
                                touched.fullNameHostParty &&
                                errors.fullNameHostParty
                            }
                            name="fullNameHostParty"
                            onChange={handleChange}
                        />
                        <label>ФИО принимающей стороны</label>
                    </div>
                    <div
                        data-iserror={isEdit && touched.name && !!errors.name}
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            value={values.name}
                            onBlur={handleBlur}
                            needErrorLabel={false}
                            handleError={isEdit && touched.name && errors.name}
                            name="name"
                            onChange={handleChange}
                        />
                        <label>Название компании</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.fullNameBookkeeper &&
                            !!errors.fullNameBookkeeper
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            value={values.fullNameBookkeeper}
                            onBlur={handleBlur}
                            needErrorLabel={false}
                            handleError={
                                isEdit &&
                                touched.fullNameBookkeeper &&
                                errors.fullNameBookkeeper
                            }
                            name="fullNameBookkeeper"
                            onChange={handleChange}
                        />
                        <label>ФИО главного бухгалтера</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.legalAddress &&
                            !!errors.legalAddress
                        }
                        className={scss.company_edit_form_input}
                    >
                        <Input
                            disabled={!isEdit}
                            placeholder="Не указано"
                            style="empty"
                            value={values.legalAddress}
                            onBlur={handleBlur}
                            needErrorLabel={false}
                            handleError={
                                isEdit &&
                                touched.legalAddress &&
                                errors.legalAddress
                            }
                            name="legalAddress"
                            onChange={handleChange}
                        />
                        <label>Юридический адрес</label>
                    </div>
                    <div
                        data-iserror={
                            isEdit &&
                            touched.phoneHostParty &&
                            !!errors.phoneHostParty
                        }
                        className={scss.company_edit_form_input}
                    >
                        <InputMask
                            autoComplete="off"
                            style="empty"
                            name="phone"
                            placeholder="+7(___)___-__-__"
                            value={values.phoneHostParty}
                            onBlur={handleBlur}
                            handleError={
                                isEdit &&
                                touched.phoneHostParty &&
                                errors.phoneHostParty
                            }
                            needErrorLabel={false}
                            alwaysShowMask={true}
                            disabled={!isEdit}
                            mask="+7(999)999-99-99"
                            onChange={(value: string) =>
                                setFieldValue('phoneHostParty', value)
                            }
                            type="tel"
                        />
                        <label>Телефон принимающей стороны</label>
                    </div>
                </div>
            </section>
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
                            handleError={
                                isEdit && touched.okved && errors.okved
                            }
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
