import { isEmailValid } from 'utils/isEmailValid';
import { createWorker } from 'http/workerService/workerService';
import { removePhoneMask } from 'utils/removePhoneMask';
import { setPhoneMask } from 'utils/setPhoneMask';
import { identificationCardData } from 'app/(Main)/workers/components/WorkerForm/data';

import { CreateWorkerBody, Worker } from 'http/workerService/types';
import { FormikErrors } from 'formik';
import { AxiosError } from 'axios';
import {
    WorkerErrorTypes,
    WorkerFormValues,
    WorkerSubmitValues,
} from 'app/(Main)/workers/components/WorkerForm/WorkerForm.types';

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
        phone: removePhoneMask(phone)!,
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

export const setWorkerCreateFormInitialValues = (worker: Worker) => {
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

const fieldsToExclude = ['email', 'phone'];

export const WorkerValidate = (values: WorkerFormValues) => {
    const errors: Partial<WorkerErrorTypes> = {};
    for (const elem in values) {
        if (fieldsToExclude.includes(elem)) continue;
        // @ts-ignore
        if (!values[elem]) {
            // @ts-ignore
            errors[elem] = 'Обязательное поле';
        }
    }

    if (!values.avatar) {
        errors.avatar = 'Обязательное поле';
    }

    return errors;
};
