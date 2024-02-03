import { WorkerFormValues } from 'app/(Main)/workers/components/WorkerForm/WorkerForm.types';
import { isEmailValid } from 'utils/isEmailValid';
import { CreateWorkerBody } from 'http/workerService/types';
import { createWorker } from 'http/workerService/workerService';
import { FormikErrors } from 'formik';
import { AxiosError } from 'axios';
import { removePhoneMask } from 'utils/removePhoneMask';

interface WorkerErrorTypes
    extends Omit<WorkerFormValues, 'avatar' | 'organization'> {
    avatar: string;
    organization: string;
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
    }: WorkerFormValues,
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
