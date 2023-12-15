import React from 'react';
import { useFormik } from 'formik';

import { Input } from 'components/UI/Inputs/Input';
import { Button } from 'components/UI/Buttons/Button';

import { PasswordRecoveryValidate } from 'app/(Login)/login/components/PasswordRecoveryForm/PasswordRecoveryUtils';

import {
    PasswordRecoveryFormProps,
    PasswordRecoveryFormTypes,
} from 'app/(Login)/login/components/PasswordRecoveryForm/types';

import scss from './PasswordRecoveryForm.module.scss';

export const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({
    setFormType,
}) => {
    const onSubmit = (values: PasswordRecoveryFormTypes) => {};

    const { values, handleChange, handleBlur, errors, handleSubmit, touched } =
        useFormik<PasswordRecoveryFormTypes>({
            initialValues: {
                email: '',
            },
            validate: PasswordRecoveryValidate,
            onSubmit,
        });

    return (
        <section className={scss.form_wrapper}>
            <h2 className={scss.form_title}>Восстановление пароля</h2>
            <p className={scss.form_description}>
                Введите адрес электронной почты, а мы вышлем вам новый пароль
            </p>
            <form onSubmit={handleSubmit} className={scss.recovery_form}>
                <Input
                    required
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    onBlur={handleBlur}
                    handleError={touched.email && errors.email}
                    label="Email"
                    placeholder="Введите email"
                />
                <div className={scss.login_actions_wrapper}>
                    <Button
                        style="gray"
                        onClick={() => setFormType('login')}
                        type="button"
                    >
                        Назад
                    </Button>
                    <Button type="submit">Восстановить</Button>
                </div>
            </form>
        </section>
    );
};
