import { Dispatch, SetStateAction } from 'react';

import { FormType } from 'app/(Login)/login/components/types';

export interface PasswordRecoveryFormProps {
    setFormType: Dispatch<SetStateAction<FormType>>;
}

export interface PasswordRecoveryFormTypes {
    email: string;
}
