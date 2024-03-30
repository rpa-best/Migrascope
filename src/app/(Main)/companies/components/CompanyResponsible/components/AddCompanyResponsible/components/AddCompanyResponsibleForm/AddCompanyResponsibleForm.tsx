import { Input } from 'components/UI/Inputs/Input';

import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';

import { Button } from 'components/UI/Buttons/Button';
import { InputDate } from 'components/UI/Inputs/InputDate';

import {
    AddCompanyResponsibleFormValidate,
    CompanyResponsibleFormSubmit,
    setInitialCompanyResponsibleFormValues,
} from 'app/(Main)/companies/components/CompanyResponsible/components/AddCompanyResponsible/components/AddCompanyResponsibleForm/AddCompanyResponsibleForm.utils';

import ExitSvg from '/public/svg/x.svg';

import {
    AddCompanyResponsibleFormProps,
    AddCompanyResponsibleFormValues,
} from 'app/(Main)/companies/components/CompanyResponsible/components/AddCompanyResponsible/components/AddCompanyResponsibleForm/AddCompanyResponsibleForm.types';

import scss from 'app/(Main)/companies/components/CompanyResponsible/components/AddCompanyResponsible/components/AddCompanyResponsibleForm/AddCompanyResponsibleForm.module.scss';

export const AddCompanyResponsibleForm: FC<AddCompanyResponsibleFormProps> = ({
    opacity,
    visible,
    setVisible,
    orgId,
    responsible,
    type,
}) => {
    const [loading, setLoading] = useState(false);
    const path = usePathname();

    const {
        handleSubmit,
        setFieldValue,
        handleBlur,
        values,
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        resetForm,
    } = useFormik<AddCompanyResponsibleFormValues>({
        initialValues: setInitialCompanyResponsibleFormValues(responsible),
        validate: AddCompanyResponsibleFormValidate,
        onSubmit: async () => {
            await CompanyResponsibleFormSubmit(
                orgId,
                values,
                setLoading,
                setVisible,
                errors,
                path,
                type,
                responsible?.id
            );
        },
    });

    useEffect(() => {
        if (!visible) {
            resetForm();
        }
    }, [resetForm, visible]);

    return (
        <motion.form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            style={{ opacity }}
            transition={{ duration: 1 }}
            className={scss.company_wrapper}
        >
            <div className={scss.company_header}>
                <div>
                    <h3>Добавить ответственного работника</h3>
                </div>
                {type !== 'edit' && (
                    <ExitSvg
                        onClick={() => {
                            setVisible(false);
                        }}
                        className={scss.exit_svg}
                    />
                )}
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Имя<span>*</span>
                </label>

                <Input
                    handleError={touched.name && errors.name}
                    value={values.name}
                    placeholder="Имя"
                    onBlur={handleBlur}
                    name="name"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Фамилия<span>*</span>
                </label>

                <Input
                    handleError={touched.surname && errors.surname}
                    value={values.surname}
                    placeholder="Фамилия"
                    onBlur={handleBlur}
                    name="surname"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Отчество<span>*</span>
                </label>

                <Input
                    handleError={touched.patronymic && errors.patronymic}
                    value={values.patronymic}
                    placeholder="Отчество"
                    onBlur={handleBlur}
                    name="patronymic"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Серия паспорта<span>*</span>
                </label>
                <Input
                    handleError={
                        touched.passportSeries && errors.passportSeries
                    }
                    value={values.passportSeries}
                    placeholder="Серия паспорта"
                    onBlur={handleBlur}
                    name="passportSeries"
                    type="number"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Номер паспорта<span>*</span>
                </label>

                <Input
                    handleError={
                        touched.passportNumber && errors.passportNumber
                    }
                    value={values.passportNumber}
                    placeholder="Номер паспорта"
                    onBlur={handleBlur}
                    name="passportNumber"
                    type="number"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Дата выдачи паспорта<span>*</span>
                </label>

                <InputDate
                    placeholder="Не указано"
                    value={
                        values.dateIssuePassport
                            ? new Date(values.dateIssuePassport)
                            : null
                    }
                    onChange={(Data: Date) =>
                        setFieldValue('dateIssuePassport', Data)
                    }
                    mask="99.99.9999"
                    onBlur={() => setFieldTouched('dateIssuePassport', true)}
                    handleError={
                        touched.dateIssuePassport && errors.dateIssuePassport
                    }
                    name="birthday"
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Дата окончания паспорта<span>*</span>
                </label>

                <InputDate
                    placeholder="Не указано"
                    value={
                        values.dateEndPassport
                            ? new Date(values.dateEndPassport)
                            : null
                    }
                    onChange={(Data: Date) =>
                        setFieldValue('dateEndPassport', Data)
                    }
                    mask="99.99.9999"
                    onBlur={() => setFieldTouched('dateEndPassport', true)}
                    handleError={
                        touched.dateEndPassport && errors.dateEndPassport
                    }
                    name="birthday"
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Кем выдан паспорта<span>*</span>
                </label>

                <Input
                    handleError={touched.issuedWhom && errors.issuedWhom}
                    value={values.issuedWhom}
                    placeholder="Кем выдан паспорта"
                    onBlur={handleBlur}
                    name="issuedWhom"
                    onChange={handleChange}
                />
            </div>
            <Button disabled={!isValid} loading={loading} type="submit">
                {type === 'edit' ? 'Сохранить' : 'Добавить'}
            </Button>
        </motion.form>
    );
};
