import { Dispatch, SetStateAction } from 'react';

export interface PasswordRecoveryFormProps {
    setFormType: Dispatch<SetStateAction<'login' | 'passRecovery'>>;
}

export interface PasswordRecoveryFormTypes {
    email: string;
}
