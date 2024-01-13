'use client';

import React, { useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import CookiesUniversal from 'universal-cookie';

import { PinCodeInput } from 'components/UI/Inputs/PinCodeInput';

import {
    EnterCodeFormValidate,
    isFullFilled,
} from 'app/(Login)/login/components/EnterCodeForm/EnterCodeForm.utils';
import { checkEmail, registerUser } from 'http/accountService/accountService';

import RayArrow from '/public/svg/rayArrow.svg';
import Spinner from '/public/svg/spinner.svg';

import { RegisterUserBody } from 'http/accountService/types';
import { RegisterFormTypes } from 'app/(Login)/login/components/RegisterForm/types';
import {
    EnterCodeFormProps,
    EnterCodeFormValues,
} from 'app/(Login)/login/components/EnterCodeForm/types';

import scss from './EnterCodeForm.module.scss';

const cookie = new CookiesUniversal();

export const EnterCodeForm: React.FC<EnterCodeFormProps> = ({
    setFormType,
    data,
    itsResetPassword,
    previousFormType,
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [timer, setTimer] = useState(30);
    const [sended, setSended] = useState(false);

    const onSubmit = async (values: EnterCodeFormValues) => {
        if (itsResetPassword) {
            return;
        }
        const body = { ...(data as RegisterFormTypes), pvc: values.join('') };

        setLoading(true);

        try {
            const userBody: RegisterUserBody = {
                name: body.name,
                phone: body.phone,
                surname: body.surname,
                password: body.password,
                verified_password: body.confirmPassword,
                lastname: body.patronymic,
                username: body.email,
                remember: body.remember,
                pvc: body.pvc,
            };

            const userResponse = await registerUser(userBody);

            cookie.set('access', userResponse.access);
            cookie.set('refresh', userResponse.refresh);

            router.replace('/');
        } catch (e) {
            if (e instanceof AxiosError) {
                //@ts-ignore
                errors.code = e.response?.data.pvc[0];
            }
        } finally {
            setLoading(false);
        }
    };

    const {
        values,
        errors,
        submitForm,
        resetForm,
        isValid,
        setFieldError,
        validateForm,
        setValues,
        handleSubmit,
    } = useFormik<EnterCodeFormValues>({
        initialValues: ['', '', '', '', '', ''],
        onSubmit,
        validate: EnterCodeFormValidate,
    });

    useEffect(() => {
        if (sended) {
            const timeout = setTimeout(() => {
                if (timer > 1) {
                    setTimer((t) => t - 1);
                    clearTimeout(timeout);
                } else {
                    setSended(false);
                    setTimer(30);
                    clearTimeout(timeout);
                }
            }, 1000);
        }
    }, [sended, timer]);

    useEffect(() => {
        if (isValid) {
            if (isFullFilled(values)) {
                submitForm();
            }
        }
    }, [isValid, submitForm, values]);

    return (
        <div className={scss.form_wrapper}>
            <form className={scss.form} onSubmit={handleSubmit}>
                <div className={scss.form_title_wrapper}>
                    <RayArrow onClick={() => setFormType(previousFormType)} />
                    <h2>
                        {itsResetPassword
                            ? 'Восстановление пароля'
                            : 'Подтверждение email'}
                    </h2>
                </div>
                <p className={scss.pin_description}>
                    Введите код, отправленный на{' '}
                    <span>{data?.email ?? 'test@mail.ru'}</span>
                </p>
                <PinCodeInput
                    validateForm={validateForm}
                    errors={errors as FormikErrors<{ code: string }>}
                    digits={values}
                    changeHandler={setValues}
                />
                <div className={scss.bottom_wrapper}>
                    <p
                        style={{
                            width: 'max-content',
                            pointerEvents: sended ? 'none' : 'auto',
                        }}
                        onClick={async () => {
                            resetForm();
                            setFieldError('code', '');
                            setSended(true);
                            await checkEmail(data?.email as string, 'register');
                        }}
                        className={scss.form_send_again}
                    >
                        {sended
                            ? `Повторный код можно отправить через ${timer}`
                            : 'Отправить ещё раз'}
                    </p>
                    {loading && <Spinner className={scss.loading_spinner} />}
                </div>
            </form>
        </div>
    );
};
