import {
    AddCompanyUserFormErrors,
    AddCompanyUserFormValues,
    CompanyUserType,
} from 'app/(Main)/companies/components/CompanyUsers/components/AddCompanyUser/components/AddCompanyUserForm/AddCompanyUserForm.types';
import { isEmailValid } from 'utils/isEmailValid';
import { InviteUserBody } from 'http/organizationService/types';
import {
    editUser,
    inviteUser,
} from 'http/organizationService/organizationService';
import { Dispatch, SetStateAction } from 'react';
import { FormikConfig, FormikErrors } from 'formik';
import { AxiosError } from 'axios';
import revalidate from 'utils/revalidate';
import { RolesConst } from 'const/RolesConst';

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
    if (!values.patronymic) {
        errors.patronymic = 'Обязательное поле';
    }
    if (!values.surname) {
        errors.surname = 'Обязательное поле';
    }
    if (!values.username) {
        errors.username = 'Обязательное поле';
    } else if (!isEmailValid(values.username)) {
        errors.username = 'Неккоректный email';
    }

    return errors;
};

export const setInitialCompanyUserFormValues = (values?: CompanyUserType) => {
    return {
        role: values?.role
            ? RolesConst.find((el) => el.slug === values.role)!
            : null,
        firstName: values?.firstName ?? '',
        surname: values?.surname ?? '',
        patronymic: values?.patronymic ?? '',
        username: values?.user ?? '',
    };
};

export const CompanyUserFormSubmit = async (
    orgId: number,
    values: AddCompanyUserFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setVisible: (v: boolean) => void,
    errors: FormikErrors<AddCompanyUserFormValues>,
    path: string,
    type: 'edit' | 'create',
    userId?: number
) => {
    try {
        setLoading(true);
        const body: InviteUserBody = {
            role: values.role?.slug as string,
            username: values.username,
            first_name: values.firstName,
            surname: values.surname,
            patronymic: values.patronymic,
        };

        type === 'create'
            ? await inviteUser(orgId, body)
            : await editUser(userId as number, orgId, body);
        revalidate(path);
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
