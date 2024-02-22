import { setPhoneMask } from 'utils/setPhoneMask';
import { getValueByPath } from 'utils/getObjValue';
import { removePhoneMask } from 'utils/removePhoneMask';
import { updateWorker } from 'http/workerService/workerService';
import { formatDate } from 'utils/formatDate';
import { identificationCardData } from 'app/(Main)/workers/components/WorkerForm/data';

import { AxiosError } from 'axios';
import { FormikErrors } from 'formik';
import {
    WorkerEditFormValues,
    WorkerInputType,
} from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerEditForm.types';
import { UpdateWorkerBody, Worker } from 'http/workerService/types';

export const WorkerEditFormDataGender = [
    {
        id: 1,
        name: 'Мужской',
        slug: 'male',
    },
    {
        id: 2,
        name: 'Женский',
        slug: 'female',
    },
];

export const WorkerEditFormDataPersonalData = [
    {
        id: 1,
        name: 'Разрешено',
        slug: true,
    },
    {
        id: 2,
        name: 'Не разрешено',
        slug: false,
    },
];

export const fieldsWithObjects = [
    'identificationCard',
    'processingPersonalData',
    'gender',
];

export const WorkerEditFormValidate = (values: WorkerEditFormValues) => {
    const errors: Partial<WorkerEditFormValues> = {};

    return errors;
    /*for (const [key, value] of Object.entries(values)) {
        if (!value) {
            errors[key as keyof typeof errors] = 'Обязательное поле' as any;
        }
    }*/
};

export const WorkerEditSubmit = async (
    workerId: number,
    {
        birthday,
        gender,
        processingPersonalData,
        position,
        registrationAddress,
        placeBirth,
        email,
        identificationCard,
        phone,
        citizenship,
    }: WorkerEditFormValues,
    setLoading: (v: boolean) => void,
    setErrors: (errors: FormikErrors<WorkerEditFormValues>) => void
) => {
    const body: Omit<Partial<UpdateWorkerBody>, 'avatar'> = {
        citizenship,
        email,
        phone: removePhoneMask(phone),
        birthday: formatDate(new Date(birthday)),
        gender: gender?.slug as 'male' | 'female',
        identification_card: identificationCard.slug,
        processing_personal_data: processingPersonalData?.slug,
        position,
        place_birth: placeBirth,
        registration_address: registrationAddress,
    };
    try {
        setLoading(true);
        await updateWorker(workerId, body);
        return true;
    } catch (e) {
        if (e instanceof AxiosError) {
            if (e.response?.data.phone) {
                setErrors({ phone: e.response.data.phone });
            }

            if (e.response?.data.email) {
                setErrors({ email: e.response.data.email });
            }
        }
        return false;
    } finally {
        setLoading(false);
    }
};
export const setWorkerEditFormInitialValues = (
    worker: Worker
): WorkerEditFormValues => {
    return {
        birthday: worker?.birthday ?? null,
        gender: worker?.gender
            ? WorkerEditFormDataGender.find((el) => el.slug === worker.gender)!
            : null,
        email: worker?.email ?? '',
        citizenship: worker.citizenship ?? '',
        phone: worker?.phone ? setPhoneMask(worker.phone) : '',
        identificationCard: identificationCardData.find(
            (el) => el.name === worker.identificationCard
        )!,
        placeBirth: worker?.placeBirth ?? '',
        position: worker?.position ?? '',
        processingPersonalData: worker?.processingPersonalData
            ? WorkerEditFormDataPersonalData.find(
                  (el) => el.slug === worker.processingPersonalData
              )!
            : null,
        registrationAddress: '',
    };
};

export const setListValues = (value: keyof WorkerEditFormValues) => {
    switch (value) {
        case 'identificationCard':
            return identificationCardData;
        case 'gender':
            return WorkerEditFormDataGender;
        case 'processingPersonalData':
            return WorkerEditFormDataPersonalData;
    }
};

export const getWorkerEditProfileValue = (
    values: WorkerEditFormValues,
    value: keyof WorkerEditFormValues
) => {
    switch (value) {
        case 'identificationCard':
            return getValueByPath(values, ['identificationCard', 'name']);
        case 'gender':
            return getValueByPath(values, ['gender', 'name']) ?? 'Не указано';
        case 'processingPersonalData':
            return (
                getValueByPath(values, ['processingPersonalData', 'name']) ??
                'Не указано'
            );
    }
};

export const getWorkerInputType = (
    key: keyof WorkerEditFormValues
): WorkerInputType => {
    switch (key) {
        case 'processingPersonalData':
            return 'select';
        case 'identificationCard':
            return 'select';
        case 'gender':
            return 'select';
        case 'birthday':
            return 'date';
        case 'phone':
            return 'mask';
        default:
            return 'default';
    }
};
