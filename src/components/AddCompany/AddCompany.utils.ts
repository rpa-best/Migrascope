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

    return errors;
};
