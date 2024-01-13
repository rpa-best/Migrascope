import { RegisterFormTypes } from 'app/(Login)/login/components/RegisterForm/types';
import { isEmailValid } from 'utils/isEmailValid';

export const RegisterFormValidate = (values: RegisterFormTypes) => {
    const errors: Partial<RegisterFormTypes> = {};

    if (!values.name) {
        errors.name = 'Обязательное поле';
    }

    if (!values.surname) {
        errors.surname = 'Обязательное поле';
    }

    if (!values.email) {
        errors.email = 'Обязательное поле';
    } else if (!isEmailValid(values.email)) {
        errors.email = 'Неккоректный email';
    }

    if (!values.phone.match(/\(9..\)/)?.length) {
        errors.phone = 'Поддерживаются номера с +79...';
    } else if (!values.phone.match(/\d$/)?.length) {
        errors.phone = 'Неверный формат номера';
    }

    if (!values.password) {
        errors.password = 'Укажите пароль';
    } else if (!values.confirmPassword) {
        errors.confirmPassword = 'Обязательное поле';
    } else if (values.confirmPassword !== values.password) {
        errors.password = 'Пароли не совпадают';
        errors.confirmPassword = 'Пароли не совпадают';
    }

    return errors;
};
