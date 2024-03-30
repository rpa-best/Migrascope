import { AddCompanyResponsibleFormValues } from 'app/(Main)/companies/components/CompanyResponsible/components/AddCompanyResponsible/components/AddCompanyResponsibleForm/AddCompanyResponsibleForm.types';
import {
    CreateResponsibleBody,
    ResponsibleType,
} from 'http/organizationService/types';
import { EditCompanyFormValues } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';
import { Dispatch, SetStateAction } from 'react';
import { FormikErrors } from 'formik';
import revalidate from 'utils/revalidate';
import {
    createResponsible,
    editResponsible,
} from 'http/organizationService/organizationService';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { errorToastOptions } from 'config/toastConfig';
import { camelToSnakeCaseDeep } from 'utils/camelToSnakeCaseDeep';
import { formatDate } from 'utils/formatDate';

export const AddCompanyResponsibleFormValidate = (
    values: AddCompanyResponsibleFormValues
) => {
    const errors: Partial<AddCompanyResponsibleFormValues> = {};

    for (const [key, value] of Object.entries(values)) {
        if (!value) {
            // @ts-ignore
            errors[key] = 'Обязательное поле';
        }
    }

    return errors;
};

export const setInitialCompanyResponsibleFormValues = (
    values?: ResponsibleType
): AddCompanyResponsibleFormValues => {
    return {
        dateEndPassport: values?.dateEndPassport
            ? new Date(values.dateEndPassport)
            : null,
        dateIssuePassport: values?.dateIssuePassport
            ? new Date(values.dateIssuePassport)
            : null,
        name: values?.name ?? '',
        surname: values?.surname ?? '',
        patronymic: values?.patronymic ?? '',
        issuedWhom: values?.issuedWhom ?? '',
        passportNumber: values?.passportNumber ?? '',
        passportSeries: values?.passportSeries ?? '',
    };
};

export const CompanyResponsibleFormSubmit = async (
    orgId: number,
    values: AddCompanyResponsibleFormValues,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setVisible: (v: boolean) => void,
    errors: FormikErrors<AddCompanyResponsibleFormValues>,
    path: string,
    type: 'edit' | 'create',
    responsibleId?: number
) => {
    try {
        setLoading(true);
        const body: CreateResponsibleBody = {
            passportSeries: values.passportSeries,
            name: values.name,
            surname: values.surname,
            patronymic: values.patronymic,
            passportNumber: values.passportNumber,
            issuedWhom: values.issuedWhom,
            dateIssuePassport: formatDate(values.dateIssuePassport!),
            dateEndPassport: formatDate(values.dateEndPassport!),
            organization: orgId,
        };

        const snakeBody = structuredClone(body);
        camelToSnakeCaseDeep(snakeBody);

        type === 'create'
            ? await createResponsible(snakeBody)
            : await editResponsible(responsibleId as number, snakeBody);
        revalidate(path);
        setVisible(false);
    } catch (e) {
        if (e instanceof AxiosError) {
            toast('Ошибка', errorToastOptions);
            console.log(e.response?.data);
        }
    } finally {
        setLoading(false);
    }
};
