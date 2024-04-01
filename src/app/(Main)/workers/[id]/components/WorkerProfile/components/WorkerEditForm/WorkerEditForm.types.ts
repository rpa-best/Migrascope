import { Worker } from 'http/workerService/types';
import { IdentificationCardType } from 'app/(Main)/workers/components/WorkerForm/WorkerForm.types';
import { FormikErrors, FormikHandlers, FormikTouched } from 'formik';

export interface WorkerEditFormProps {
    worker: Worker;
}

interface GenderType extends IdentificationCardType {}

interface ProcessingPersonalDataType
    extends Omit<IdentificationCardType, 'slug'> {
    slug: boolean;
}

export interface WorkerEditFormValues {
    gender: GenderType | null;
    citizenship: string;
    birthday: Date | null;
    position: string;
    name: string;
    surname: string;
    patronymic: string;
    phone: string;
    email: string;
    registrationAddress: string;
    actualWorkAddress: string;
    identificationCard: IdentificationCardType;
    placeBirth: string;
    processingPersonalData: ProcessingPersonalDataType | null;
    dateEmployment: Date | null;
}

export type WorkerInputType = 'select' | 'date' | 'mask' | 'default';

export interface WorkerInputProps {
    type: WorkerInputType;
    values: WorkerEditFormValues;
    setFieldValue: <T>(key: string, value: T) => void;
    setFieldTouched: (key: string, value: boolean) => void;
    errors: FormikErrors<WorkerEditFormValues>;
    objKey: keyof WorkerEditFormValues;
    touched: FormikTouched<WorkerEditFormValues>;
    handleChange: FormikHandlers['handleChange'];
    handleBlur: FormikHandlers['handleBlur'];
}

export interface SubmitEditWorkerBody
    extends Omit<
        WorkerEditFormValues,
        'processingPersonalData' | 'identificationCard' | 'gender'
    > {
    processingPersonalData: boolean;
    identificationCard: string;
    gender: 'male' | 'female';
}
