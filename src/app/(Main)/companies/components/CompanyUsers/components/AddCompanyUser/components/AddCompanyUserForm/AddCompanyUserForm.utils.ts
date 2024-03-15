import {
    AddCompanyUserFormErrors,
    AddCompanyUserFormValues,
} from 'app/(Main)/companies/components/CompanyUsers/components/AddCompanyUser/components/AddCompanyUserForm/AddCompanyUserForm.types';
import { isEmailValid } from 'utils/isEmailValid';
import { InviteUserBody } from 'http/organizationService/types';
import { inviteUser } from 'http/organizationService/organizationService';
import { Dispatch, SetStateAction } from 'react';
import { FormikConfig, FormikErrors } from 'formik';
import { AxiosError } from 'axios';

export const AddCompanyUserFormValidate = (
    values: AddCompanyUserFormValues
) => {
    const errors: Partial<AddCompanyUserFormErrors> = {};

    if (!values.role) {
        errors.role = 'Обязательное поле';
    }
    if (!values.firstName) {
        errors.firstName = 'Обязательное поле';
    }
    if (!values.username) {
        errors.username = 'Обязательное поле';
    } else if (!isEmailValid(values.username)) {
        errors.username = 'Неккоректный email';
    }

    return errors;
};

export const AddCompanyUserFormSubmit = async (
    orgId: number,
    values: AddCompanyUserFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setVisible: (v: boolean) => void,
    errors: FormikErrors<AddCompanyUserFormValues>
) => {
    try {
        setLoading(true);
        const body: InviteUserBody = {
            role: values.role?.slug as string,
            username: values.username,
            first_name: values.firstName,
        };
        await inviteUser(orgId, body);
        setVisible(false);
    } catch (e) {
        if (e instanceof AxiosError) {
            if (e.response?.data.role) {
                errors.role = e.response?.data.role;
            }
            if (e.response?.data.username) {
                errors.username = e.response?.data.username;
            }
        }
    } finally {
        setLoading(false);
    }
};
