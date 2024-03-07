import {
    BaseListValues,
    ContractTypeListValues,
    PersonListValues,
    ReasonSuspensionListValues,
    TranslatedBlankFormLabels,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/Blanks.consts';

import { BlankFormValues } from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';
import * as T from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';

export const BlankFormValidate = (values: T.BlankFormValues) => {
    const errors: T.BlankFormErrorsType = {};

    for (const elem in values) {
        if (!values[elem as keyof typeof values]) {
            errors[elem as keyof typeof errors] = 'Обязательное поле';
        }
    }

    if (values.services?.some((el) => !el.name || !el.price)) {
        errors.services = 'Обязательное поле';
    }
    return errors;
};

export const setBlankFormInitialValues: T.SetBlankFormInitialValues = (
    type,
    initialValues
) => {
    switch (type) {
        case 'Договор возмездного оказания услуг (ГПХ)':
            return {
                workerId: initialValues.workerId,
                number: '',
                startDate: null,
                endDate: null,
                address: '',
                services: [{ name: '', price: '0' }],
            };
        case 'Трудовой договор':
            return {
                workerId: initialValues.workerId,
                position: '',
                salary: '',
                contractType: null,
                startDate: null,
                endDateUrgent: null,
                startTime: null,
                endTime: null,
                cause: '',
            };
        case 'Уведомление о заключении':
            return {
                workerId: initialValues.workerId,
                nameTerritorialBody: initialValues.nameTerritorialBody,
                position: initialValues.position,
                base: initialValues.base,
                startDate: initialValues.startDate,
                address: initialValues.address,
                person: initialValues.person,
            };
        case 'Платежное поручение':
            return {
                workerId: initialValues.workerId,
                numberMonth: '',
            };
        case 'Приказ об отстранении':
            return {
                workerId: initialValues.workerId,
                number: '',
                startDate: null,
                reasonSuspension: null,
                firstManagerId: '',
                secondManagerId: '',
            };
        case 'Уведомление о прекращении':
            return {
                workerId: initialValues.workerId,
            };
    }
};

export const getBlankInputType = (
    name: T.RequiredBlankFormValues
): T.BlankInputType => {
    if (CasesWithDate.includes(name)) {
        return 'date';
    }
    if (CasesWithSelect.includes(name)) {
        return 'select';
    }
    return 'input';
};

const CasesWithDate = [
    'startDate',
    'endDate',
    'startTime',
    'endTime',
    'dateIssue',
    'endDateUrgent',
];

const CasesWithSelect = ['person', 'contractType', 'base', 'reasonSuspension'];

export const setBlankFormListValues = (objName: keyof BlankFormValues) => {
    switch (objName) {
        case 'person':
            return PersonListValues;
        case 'contractType':
            return ContractTypeListValues;
        case 'base':
            return BaseListValues;
        case 'reasonSuspension':
            return ReasonSuspensionListValues;
    }
};

export const getBlankLabel = (name: T.RequiredBlankFormValues) => {
    return TranslatedBlankFormLabels.find((el) => el.slug === name)!.name;
};

export const getBlankPlaceholder = (name: T.RequiredBlankFormValues) => {
    return TranslatedBlankFormLabels.find((el) => el.slug === name)!
        .placeholder;
};
