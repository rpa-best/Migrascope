import React, { useState } from 'react';

import { useFormik } from 'formik';

import { Input } from 'components/UI/Inputs/Input';
import { InputCheckbox } from 'components/UI/Inputs/InputCheckbox';
import { Button } from 'components/UI/Buttons/Button';

import { LoginFormValidate } from 'app/(Login)/login/components/LoginForm/LoginForm.utils';

import {
    ILoginFormTypes,
    LoginFormProps,
} from 'app/(Login)/login/components/LoginForm/types';

import scss from './LoginForm.module.scss';

export const LoginForm: React.FC<LoginFormProps> = ({ setFormType }) => {
    const [type, setType] = useState<'login' | 'register'>('login');

    const itsRegister = type === 'register';

    const onSubmit = (values: ILoginFormTypes) => {};

    const {
        values,
        handleChange,
        setFieldValue,
        handleBlur,
        errors,
        handleSubmit,
        setFieldTouched,
        touched,
    } = useFormik<ILoginFormTypes>({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
        validate: LoginFormValidate,
        onSubmit,
    });

    return (
        <section className={scss.form_wrapper}>
            <h2 className={scss.form_title}>
                {itsRegister ? 'Регистрация' : 'Вход'}
            </h2>
            <form onSubmit={handleSubmit} className={scss.form}>
                <Input
                    required
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    onBlur={handleBlur}
                    handleError={touched.email && errors.email}
                    label="Email или имя пользователя"
                    placeholder="Введите email"
                />
                <Input
                    required
                    value={values.password}
                    name="password"
                    changePasswordVisibility
                    onChange={handleChange}
                    type="password"
                    onBlur={handleBlur}
                    handleError={touched.password && errors.password}
                    label="Пароль"
                    placeholder="Введите пароль"
                />
                <span
                    onClick={() => setFormType('passRecovery')}
                    className={scss.forgot_password}
                >
                    Забыли пароль?
                </span>
                <div className={scss.login_actions_wrapper}>
                    <InputCheckbox
                        type="checkbox"
                        value={values.remember}
                        name="rememberCheckbox"
                        onChange={(v) => {
                            setFieldValue('remember', v);
                            setFieldTouched('remember');
                        }}
                        label="Запомнить меня"
                    />
                    <Button type="submit">
                        {itsRegister ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </div>
            </form>
            <p className={scss.change_form_text}>
                {itsRegister ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'}
                <span
                    className={scss.linked_text}
                    onClick={() => setType(itsRegister ? 'login' : 'register')}
                >
                    {itsRegister ? ' Войти' : ' Зарегестрироваться!'}
                </span>
            </p>
        </section>
    );
};
