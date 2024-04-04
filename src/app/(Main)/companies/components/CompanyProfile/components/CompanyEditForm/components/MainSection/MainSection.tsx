import React, { FC } from 'react';

import { Input } from 'components/UI/Inputs/Input';
import { InputDate } from 'components/UI/Inputs/InputDate';
import { InputMask } from 'components/UI/Inputs/InputMask';
import { InputSelect } from 'components/UI/Inputs/InputSelect';

import { OrgFormData } from 'components/AddCompany/tempData';

import { MainSectionProps } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';

import scss from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyEditForm.module.scss';

export const MainSection: FC<MainSectionProps> = ({
    isEdit,
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
}) => {
    return (
        <section className={scss.company_edit_form_section}>
            <h3>Контакты организации</h3>
            <div className={scss.company_edit_form_inputs}>
                <div
                    data-iserror={
                        isEdit && touched.nameDirector && !!errors.nameDirector
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
                            isEdit && touched.issuedWhom && errors.issuedWhom
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
                        handleError={isEdit && touched.phone && errors.phone}
                        onBlur={handleBlur}
                        disabled={!isEdit}
                        mask="+7(999)999-99-99"
                        onChange={(value: string) =>
                            setFieldValue('phone', value)
                        }
                        type="tel"
                    />
                    <label>Телефон компании</label>
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
                        onChange={(v) => setFieldValue('organizationalForm', v)}
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
                        isEdit && touched.legalAddress && !!errors.legalAddress
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
                <div
                    data-iserror={
                        isEdit &&
                        touched.actualAddress &&
                        !!errors.actualAddress
                    }
                    className={scss.company_edit_form_input}
                >
                    <Input
                        disabled={!isEdit}
                        placeholder="Не указано"
                        style="empty"
                        value={values.actualAddress}
                        onBlur={handleBlur}
                        needErrorLabel={false}
                        handleError={
                            isEdit &&
                            touched.actualAddress &&
                            errors.actualAddress
                        }
                        name="actualAddress"
                        onChange={handleChange}
                    />
                    <label>Фактический адрес</label>
                </div>
                <div
                    data-iserror={
                        isEdit &&
                        touched.fullNameContactPerson &&
                        !!errors.fullNameContactPerson
                    }
                    className={scss.company_edit_form_input}
                >
                    <Input
                        placeholder="Не указано"
                        disabled={!isEdit}
                        needErrorLabel={false}
                        onBlur={handleBlur}
                        handleError={
                            isEdit &&
                            touched.fullNameContactPerson &&
                            errors.fullNameContactPerson
                        }
                        style="empty"
                        value={values.fullNameContactPerson}
                        name="fullNameContactPerson"
                        onChange={handleChange}
                    />
                    <label>ФИО контактного лица</label>
                </div>
                <div
                    data-iserror={
                        isEdit &&
                        touched.emailContactPerson &&
                        !!errors.emailContactPerson
                    }
                    className={scss.company_edit_form_input}
                >
                    <Input
                        placeholder="Не указано"
                        disabled={!isEdit}
                        needErrorLabel={false}
                        onBlur={handleBlur}
                        handleError={
                            isEdit &&
                            touched.emailContactPerson &&
                            errors.emailContactPerson
                        }
                        style="empty"
                        value={values.emailContactPerson}
                        name="emailContactPerson"
                        onChange={handleChange}
                    />
                    <label>Email контактного лица</label>
                </div>
                <div
                    data-iserror={
                        isEdit &&
                        touched.phoneContactPerson &&
                        !!errors.phoneContactPerson
                    }
                    className={scss.company_edit_form_input}
                >
                    <InputMask
                        autoComplete="off"
                        style="empty"
                        name="phone"
                        placeholder="+7(___)___-__-__"
                        value={values.phoneContactPerson}
                        onBlur={handleBlur}
                        handleError={
                            isEdit &&
                            touched.phoneContactPerson &&
                            errors.phoneContactPerson
                        }
                        needErrorLabel={false}
                        alwaysShowMask={true}
                        disabled={!isEdit}
                        mask="+7(999)999-99-99"
                        onChange={(value: string) =>
                            setFieldValue('phoneContactPerson', value)
                        }
                        type="tel"
                    />
                    <label>Телефон контактного лица</label>
                </div>
                <div
                    data-iserror={
                        isEdit &&
                        touched.additionalPhone &&
                        !!errors.additionalPhone
                    }
                    className={scss.company_edit_form_input}
                >
                    <InputMask
                        autoComplete="off"
                        style="empty"
                        name="phone"
                        placeholder="+7(___)___-__-__"
                        value={values.additionalPhone}
                        onBlur={handleBlur}
                        handleError={
                            isEdit &&
                            touched.additionalPhone &&
                            errors.additionalPhone
                        }
                        needErrorLabel={false}
                        alwaysShowMask={true}
                        disabled={!isEdit}
                        mask="+7(999)999-99-99"
                        onChange={(value: string) =>
                            setFieldValue('additionalPhone', value)
                        }
                        type="tel"
                    />
                    <label>Доп. телефон контактного лица</label>
                </div>
            </div>
        </section>
    );
};
