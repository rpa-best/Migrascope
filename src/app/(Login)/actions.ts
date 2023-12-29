'use server';

import { ILoginFormTypes } from './login/components/LoginForm/types';

export const LoginAction = (values: ILoginFormTypes) => {
    console.log(values);
};
