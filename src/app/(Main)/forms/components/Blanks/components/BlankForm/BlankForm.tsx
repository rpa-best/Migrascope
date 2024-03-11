import { BlankFormProps } from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';
import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

import { Button } from 'components/UI/Buttons/Button';
import { BlankFormInput } from 'app/(Main)/forms/components/Blanks/components/BlankForm/components/BlankFormInput';
import { ServicesInput } from 'app/(Main)/forms/components/Blanks/components/BlankForm/components/ServicesInput';
import { InputCheckbox } from 'components/UI/Inputs/InputCheckbox';

import {
    BlankFormValidate,
    handleBlankFormErrors,
    setBlankFormInitialValues,
    submitFormByType,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.utils';
import { useBlankWorkerStore } from 'app/(Main)/forms/components/store/useBlankWorkerStore';

import { AxiosError } from 'axios';
import * as T from './BlankForm.types';

import scss from './BlankForm.module.scss';

export const BlankForm: FC<BlankFormProps> = ({
    blankType,
    visible,
    setVisible,
}) => {
    const [servicesCount, setServicesCount] = useState(1);
    const [worker] = useBlankWorkerStore((state) => [state.worker]);

    const [loading, setLoading] = useState(false);

    const {
        values,
        setFieldValue,
        handleChange,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldTouched,
        setValues,
    } = useFormik<T.BlankFormValues>({
        initialValues: setBlankFormInitialValues(blankType, {
            workerId: worker.workerId as number,
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const document = await submitFormByType(blankType, values);
                saveAs(document as Blob, blankType);
            } catch (e) {
                handleBlankFormErrors(e, errors);
            } finally {
                setLoading(false);
            }
        },
        validate: BlankFormValidate,
    });

    useEffect(() => {
        if (values.person?.slug === 'personProxy') {
            setValues((prevState) => ({
                ...prevState,
                fullName: '',
                series: '',
                number: '',
                issuedBy: '',
                dateIssue: null,
            }));
        }
        if (values.contractType?.slug === 'urgent') {
            setValues((prevState) => ({
                ...prevState,
                endDateUrgent: null,
                cause: '',
            }));
        }

        if (
            values.person?.slug === 'director' ||
            values.contractType?.slug === 'perpetual'
        ) {
            setValues((prevState) =>
                setBlankFormInitialValues(blankType, prevState)
            );
        }
    }, [
        blankType,
        setValues,
        values.contractType?.slug,
        values.person,
        worker.workerId,
    ]);

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={scss.blank_form_wrapper}
        >
            <form onSubmit={handleSubmit}>
                <h3 className={scss.blank_form_title}>{blankType}</h3>
                <h4 className={scss.blank_form_subtitle}>
                    Заполните недостающие поля, чтобы они отобразились в бланке
                </h4>
                {Object.entries(values).map(([key, value], index) => (
                    <BlankFormInput
                        name={key as T.RequiredBlankFormValues}
                        value={value}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        touched={touched as T.BlankFormTouchedType}
                        errors={errors as T.BlankFormErrorsType}
                        key={index}
                    />
                ))}
                {blankType === 'Договор возмездного оказания услуг (ГПХ)' && (
                    <ServicesInput
                        values={values}
                        servicesCount={servicesCount}
                        setServicesCount={setServicesCount}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                    />
                )}
                <div className={scss.check_consent}>
                    <h5>
                        Пожалуйста, перепроверьте все данные перед подачей в
                        гос. органы.
                    </h5>
                    <p>
                        Система не проверяет корректность данных, а только
                        переносит их в бланк из заполненных полей.
                    </p>
                </div>
                <div className={scss.blank_form_checked}>
                    <InputCheckbox
                        name="checked"
                        label="Я всё проверил и даю согласие на обработку персональных данных"
                        value={values.checked as boolean}
                        onChange={() => {
                            setFieldTouched('checked', true);
                            setFieldValue('checked', !values.checked);
                        }}
                    />
                    <span>{touched.checked && errors.checked}</span>
                </div>
                <div className={scss.worker_form_button}>
                    <Button loading={loading} type="submit">
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    );
};
