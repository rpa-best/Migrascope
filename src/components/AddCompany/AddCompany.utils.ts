import { AddCompanyValues } from 'components/AddCompany/types';

export const AddCompanyValidate = (values: AddCompanyValues) => {
    const errors: Partial<AddCompanyValues> = {};

    for (const elem in values) {
        // @ts-ignore
        if (!values[elem]) {
            // @ts-ignore
            errors[elem] = 'Обязательное поле';
        }
    }

    if (values.inn.toString().length < 10) {
        errors.inn = 'Длина поля не может быть меньше 10';
    }

    return errors;
};
