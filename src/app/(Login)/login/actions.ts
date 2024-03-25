'use server';
import {
    authUser,
    changePassword,
    registerUser,
} from 'http/accountService/accountService';

import { ILoginFormTypes } from 'app/(Login)/login/components/LoginForm/types';
import { RegisterUserAction } from 'app/(Login)/login/components/RegisterForm/types';
import {
    AuthUserBody,
    ChangePasswordBody,
    RegisterUserBody,
} from 'http/accountService/types';
import { AxiosError } from 'axios';

export const LoginAction = async (values: ILoginFormTypes) => {
    const body: AuthUserBody = {
        password: values.password,
        username: values.email,
    };
    try {
        return await authUser(body);
    } catch (e) {
        if (e instanceof AxiosError) {
            return e.response?.data.message;
        }
    }
};

export const RegisterAction = async ({
    name,
    confirmPassword,
    password,
    email,
    surname,
    remember,
    phone,
    patronymic,
    pvc,
}: RegisterUserAction) => {
    const body: RegisterUserBody = {
        name: name,
        phone: phone,
        surname: surname,
        password: password,
        verified_password: confirmPassword,
        patronymic,
        username: email,
        remember: remember,
        pvc: pvc,
    };
    try {
        return await registerUser(body);
    } catch (e) {
        if (e instanceof AxiosError) {
            return JSON.stringify(e.response?.data);
        }
    }
};

export const ChangePasswordAction = async (changeProps: {
    pvc: string;
    password: string;
    confirmPassword: string;
    email: string;
}) => {
    const body: ChangePasswordBody = {
        ...changeProps,
        verified_password: changeProps.confirmPassword,
    };

    try {
        await changePassword(body);

        return true;
    } catch (e) {
        if (e instanceof AxiosError) {
            return JSON.stringify(e.response?.data);
        }
    }
};
