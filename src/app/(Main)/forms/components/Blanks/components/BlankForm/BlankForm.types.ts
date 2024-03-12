import { Dispatch, SetStateAction } from 'react';
import { FormikHandlers } from 'formik';

export type BlankType =
    | 'Договор возмездного оказания услуг (ГПХ)'
    | 'Трудовой договор'
    | 'Уведомление о заключении'
    | 'Платежное поручение'
    | 'Приказ об отстранении'
    | 'Уведомление о прекращении';

export interface BlankFormProps {
    blankType: BlankType;
    setVisible: Dispatch<SetStateAction<boolean>>;
    visible: boolean;
}

export interface BlankServiceType {
    name: string;
    price: string;
}

interface DefaultSelectValues {
    id: number;
    name: string;
}

export interface BaseType extends DefaultSelectValues {
    slug: 'civilContract' | 'employmentContract';
}

export interface PersonType extends DefaultSelectValues {
    slug: 'personProxy' | 'director';
}

export interface ContractType extends DefaultSelectValues {
    slug: 'urgent' | 'perpetual';
}

export type SetBlankFormInitialValues = (
    type: BlankType,
    initialValues: BlankFormValues
) => BlankFormValues;

export interface ReasonSuspensionType extends DefaultSelectValues {
    slug:
        | 'validResidencePermit'
        | 'validPatent'
        | 'validTemporaryResidencePermit'
        | 'gettingVaccinated'
        | 'passingMedicalExamination'
        | 'passingAnalysis'
        | 'checks';
}

export interface BlankFormValues {
    workerId?: number;
    number?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    address?: string;
    services?: BlankServiceType[];
    position?: string;
    salary?: '';
    contractType?: ContractType | null;
    initiator?: boolean;
    endDateUrgent?: Date | null;
    startTime?: Date | null;
    endTime?: Date | null;
    cause?: string;
    dateIssue?: Date | null;
    nameTerritorialBody?: string;
    base?: BaseType | null;
    fullName?: string;
    series?: string;
    checked?: boolean;
    person?: PersonType | null;
    issuedBy?: string;
    numberMonths?: '';
    reasonSuspension?: ReasonSuspensionType | null;
    firstManagerId?: '';
    secondManagerId?: '';
}

export type BlankFormErrorsType = {
    [key in keyof BlankFormValues]: string;
};

export type BlankFormTouchedType = {
    [key in keyof BlankFormValues]: boolean;
};

export type RequiredBlankFormValues = keyof BlankFormValues;

export type BlankInputType = 'date' | 'input' | 'select' | 'mask' | 'checkbox';

export interface BlankTranslatedLabelsType {
    placeholder: string;
    name: string;
    slug: keyof BlankFormValues;
}

export interface ServicesInputProps {
    values: BlankFormValues;
    servicesCount: number;
    setServicesCount: Dispatch<SetStateAction<number>>;
    touched: BlankFormTouchedType;
    errors: BlankFormErrorsType;
    handleBlur: FormikHandlers['handleBlur'];
    setFieldValue: (field: string, value: any) => void;
}

export interface BlankFormInputProps {
    name: RequiredBlankFormValues;
    value: string | Date | boolean;
    setFieldValue: (field: string, value: any) => void;
    handleBlur: FormikHandlers['handleBlur'];
    handleChange: FormikHandlers['handleChange'];
    touched: BlankFormTouchedType;
    errors: BlankFormErrorsType;
}
