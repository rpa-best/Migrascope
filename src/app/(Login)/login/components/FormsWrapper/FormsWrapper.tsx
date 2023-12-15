'use client';
import { useState } from 'react';

import { LoginForm } from 'app/(Login)/login/components/LoginForm';
import { PasswordRecoveryForm } from 'app/(Login)/login/components/PasswordRecoveryForm';

export const FormsWrapper = () => {
    const [formType, setFormType] = useState<'login' | 'passRecovery'>('login');

    switch (formType) {
        case 'login':
            return <LoginForm setFormType={setFormType} />;

        case 'passRecovery':
            return <PasswordRecoveryForm setFormType={setFormType} />;
    }
};
