'use client';
import { useRef, useState } from 'react';

import { LoginForm } from 'app/(Login)/login/components/LoginForm';
import { PasswordRecoveryForm } from 'app/(Login)/login/components/PasswordRecoveryForm';
import { RegisterForm } from 'app/(Login)/login/components/RegisterForm';
import { EnterCodeForm } from 'app/(Login)/login/components/EnterCodeForm';

import { FormType } from 'app/(Login)/login/components/types';
import { RegisterFormTypes } from 'app/(Login)/login/components/RegisterForm/types';

export const FormsWrapper = () => {
    const [data, setData] = useState<RegisterFormTypes | { email: string }>({
        email: '',
    });
    const [formType, setFormType] = useState<FormType>('login');

    const previousFormType = useRef<FormType>('login');

    switch (formType) {
        case 'login':
            return (
                <LoginForm
                    previousFormType={previousFormType}
                    setData={setData}
                    setFormType={setFormType}
                />
            );

        case 'enterCode':
            return (
                <EnterCodeForm
                    previousFormType={previousFormType.current}
                    itsResetPassword={false}
                    data={data}
                    setFormType={setFormType}
                />
            );

        case 'register':
            return (
                <RegisterForm
                    data={data as RegisterFormTypes}
                    previousFormType={previousFormType}
                    setData={setData}
                    setFormType={setFormType}
                />
            );

        case 'passRecovery':
            return <PasswordRecoveryForm setFormType={setFormType} />;
    }
};
