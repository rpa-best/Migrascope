import { EnterCodeFormValues } from 'app/(Login)/login/components/EnterCodeForm/types';

export const EnterCodeFormValidate = (values: EnterCodeFormValues) => {
    const errors: { code?: string } = {};

    return errors;
};

export function isFullFilled(str: string[]) {
    return str.every((el) => /\d/g.test(el));
}
