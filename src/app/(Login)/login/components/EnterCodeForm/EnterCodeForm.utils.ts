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
    try {
        const userBody = { ...(data as Required<RecoveryPassType>), pvc };

        const result = await ChangePasswordAction(userBody);

        if (result) {
            setFormType('login');
            setData(null);
            toast('Пароль успешно изменён', successToastConfig);
        }
    } catch (e) {
        if (e instanceof Error) {
            const resErrors = JSON.parse(e.message);
            if (resErrors.pvc) {
                errors.code = 'Неверный код';
                return;
            } else if (resErrors?.password[0]) {
                previousFormType.current = 'passRecovery';
                checkEmail(data.email, 'change_password');
                setFormType('enterNewPassword');
            }
        }
    }
};

export const onRegisterSubmit = async (
    pvc: string,
    data: RegisterFormTypes,
    errors: { code?: string },
    router: AppRouterInstance
) => {
    try {
        const userBody = {
            ...(data as RegisterFormTypes),
            pvc,
            phone: removePhoneMask(data.phone),
        };

        await RegisterAction(userBody);

        router.replace('/');
    } catch (e) {
        if (e instanceof Error) {
            const resErrors = JSON.parse(e.message);
            if (resErrors.pvc) {
                errors.code = 'Неверный код';
                return;
            }
        }
    }
};
