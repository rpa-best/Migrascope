'use server';

import { ILoginFormTypes } from './login/components/LoginForm/types';
import {
    RegisterFormTypes,
    RegisterUserAction,
} from 'app/(Login)/login/components/RegisterForm/types';
import { RegisterUserBody } from 'http/accountService/types';
import { registerUser } from 'http/accountService/accountService';

export const LoginAction = async (values: ILoginFormTypes) => {
    console.log(values);
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
}: RegisterUserAction) => {};
