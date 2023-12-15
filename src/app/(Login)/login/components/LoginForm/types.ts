import { Dispatch, SetStateAction } from 'react';

export interface ILoginFormTypes {
    email: string;
    password: string;
    remember: boolean;
}

export interface LoginFormProps {
    setFormType: Dispatch<SetStateAction<'login' | 'passRecovery'>>;
}
