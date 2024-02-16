import { isEmailValid } from 'utils/isEmailValid';
import { createWorker, updateWorker } from 'http/workerService/workerService';
import { removePhoneMask } from 'utils/removePhoneMask';
import { setPhoneMask } from 'utils/setPhoneMask';
import { identificationCardData } from 'app/(Main)/workers/components/WorkerForm/data';

import {
    CreateWorkerBody,
    UpdateWorkerBody,
    Worker,
} from 'http/workerService/types';
import { FormikErrors } from 'formik';
import { AxiosError } from 'axios';
import { ImageType } from 'components/DropImage/types';
import { WorkerFormValues } from 'app/(Main)/workers/components/WorkerForm/WorkerForm.types';

interface WorkerErrorTypes
    extends Omit<WorkerFormValues, 'avatar' | 'organization'> {
    avatar: string;
    organization: string;
}

export interface WorkerSubmitValues extends Omit<WorkerFormValues, 'avatar'> {
    avatar: ImageType;
}

export const WorkerSubmit = async (
    {
        avatar,
        organization,
        email,
        surname,
        name,
        patronymic,
        identificationCard,
        phone,
        citizenship,
    }: WorkerSubmitValues,
    setLoading: (v: boolean) => void,
    setErrors: (errors: FormikErrors<WorkerFormValues>) => void
) => {
    const body: CreateWorkerBody = {
        avatar: avatar?.img as File,
        citizenship,
        email,
        surname,
        name,
        patronymic,
        phone: removePhoneMask(phone),
        organization: organization?.id as number,
        identification_card: identificationCard?.slug as string,
    };
    try {
        setLoading(true);
        await createWorker(body);
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

export const WorkerPatch = async (
    workerId: number,
    {
        avatar,
        organization,
        email,
        surname,
        name,
        patronymic,
        identificationCard,
        phone,
        citizenship,
    }: WorkerFormValues,
    setLoading: (v: boolean) => void,
    setErrors: (errors: FormikErrors<WorkerFormValues>) => void
) => {
    const body: UpdateWorkerBody = {
        avatar: typeof avatar !== 'string' ? (avatar?.img as File) : avatar,
        citizenship,
        email,
        surname,
        name,
        patronymic,
        phone: removePhoneMask(phone),
        organization: organization?.id as number,
        identification_card: identificationCard?.slug as string,
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

export const setInitialValues = (worker: Worker) => {
    return {
        avatar: worker?.avatar ?? null,
        email: worker?.email ?? '',
        citizenship: worker?.citizenship ?? '',
        identificationCard: worker?.identificationCard
            ? identificationCardData.find(
                  (el) => el.slug === worker.identificationCard
              )!
            : null,
        name: worker?.name ?? '',
        organization: null,
        patronymic: worker?.patronymic ?? '',
        phone: worker?.phone ? setPhoneMask(worker.phone) : '',
        surname: worker?.surname ?? '',
    };
};

export const WorkerValidate = (values: WorkerFormValues) => {
    const errors: Partial<WorkerErrorTypes> = {};
    for (const elem in values) {
        // @ts-ignore
        if (!values[elem]) {
            // @ts-ignore
            errors[elem] = 'Обязательное поле';
        }
    }

    if (!values.email) {
        errors.email = 'Обязательное поле';
    } else if (!isEmailValid(values.email)) {
        errors.email = 'Некорректный email';
    }

    if (!values.phone.match(/\(9..\)/)?.length) {
        errors.phone = 'Поддерживаются номера с +79...';
    } else if (!values.phone.match(/\d$/)?.length) {
        errors.phone = 'Неверный формат номера';
    }

    if (!values.avatar) {
        errors.avatar = 'Обязательное поле';
    }

    return errors;
};
