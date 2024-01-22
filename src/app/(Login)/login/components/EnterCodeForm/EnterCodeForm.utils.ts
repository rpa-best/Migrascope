import {
    RecoveryPassType,
    RegisterFormTypes,
} from 'app/(Login)/login/components/RegisterForm/types';

import {
    ChangePasswordAction,
    RegisterAction,
} from 'app/(Login)/login/actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FormType } from 'app/(Login)/login/components/types';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { checkEmail } from 'http/accountService/accountService';
import { toast } from 'react-toastify';
import { successToastConfig } from 'config/toastConfig';
import { removePhoneMask } from 'utils/removePhoneMask';
import CookiesUniversal from 'universal-cookie';

const cookie = new CookiesUniversal();

export const EnterCodeFormValidate = () => {
    const errors: { code?: string } = {};

    return errors;
};

export function isFullFilled(str: string[]) {
    return str.every((el) => /\d/g.test(el));
}

export const onResetPasswordSubmit = async (
    pvc: string,
    data: RecoveryPassType,
    errors: { code?: string },
    setFormType: (v: FormType) => void,
    setData: Dispatch<SetStateAction<RecoveryPassType | null>>,
    previousFormType: MutableRefObject<FormType>
) => {
    const userBody = { ...(data as Required<RecoveryPassType>), pvc };

    const result = await ChangePasswordAction(userBody);

    if (typeof result === 'boolean') {
        setFormType('login');
        setData(null);
        toast('Пароль успешно изменён', successToastConfig);
    } else {
        const resErrors = JSON.parse(result as string);
        if (resErrors.pvc) {
            errors.code = 'Неверный код';
            return;
        } else if (resErrors?.password[0]) {
            previousFormType.current = 'passRecovery';
            checkEmail(data.email, 'change_password');
            setFormType('enterNewPassword');
        }
    }
};

export const onRegisterSubmit = async (
    pvc: string,
    data: RegisterFormTypes,
    errors: { code?: string }
) => {
    const userBody = {
        ...(data as RegisterFormTypes),
        pvc,
        phone: removePhoneMask(data.phone),
    };

    const result = await RegisterAction(userBody);

    console.log(typeof result);

    if (typeof result !== 'string') {
        cookie.set('access', result?.access);
        cookie.set('refresh', result?.refresh);
    } else {
        const resErrors = JSON.parse(result);
        if (resErrors.pvc) {
            errors.code = 'Неверный код';
            return;
        }
    }
};
