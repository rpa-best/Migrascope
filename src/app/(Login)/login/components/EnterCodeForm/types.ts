import { FormType } from 'app/(Login)/login/components/types';
import { RegisterFormTypes } from 'app/(Login)/login/components/RegisterForm/types';
import { MutableRefObject } from 'react';

export interface EnterCodeFormProps {
    itsResetPassword: boolean;
    setFormType: (v: FormType) => void;
    data: RegisterFormTypes | { email: string };
    previousFormType: FormType;
}

export type EnterCodeFormValues = string[];
