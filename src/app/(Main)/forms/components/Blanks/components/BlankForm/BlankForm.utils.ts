import { camelToSnakeCaseDeep } from 'utils/camelToSnakeCaseDeep';
import { isObject } from 'utils/isObject';
import { formatDate } from 'utils/formatDate';
import {
    sendCPPS,
    sendEmploymentContract,
    sendNoticeConclusion,
    sendPaymentOrder,
    sendSuspensionOrder,
} from 'http/blanksService/blanksService';
import { snakeCase } from 'change-case';

import {
    BaseListValues,
    ContractTypeListValues,
    PersonListValues,
    ReasonSuspensionListValues,
    TranslatedBlankFormLabels,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/Blanks.consts';

import {
    BlankFormValues,
    BlankType,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';
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

export const submitFormByType = async (
    type: BlankType,
    values: BlankFormValues
) => {
    const modifiedValues = Object.fromEntries(
        Object.entries(values)
            .map(([key, value]) => {
                if (isObject(value)) {
                    return [
                        key,
                        /^[A-Z]+$/.test(value.slug)
                            ? value.slug
                            : snakeCase(value.slug),
                    ];
                }
                if (value instanceof Date) {
                    return [key, formatDate(value)];
                }
                return [key, value];
            })
            .filter((entry) => entry[0] !== 'checked')
    );
    camelToSnakeCaseDeep(modifiedValues);

    switch (type) {
        case 'Договор возмездного оказания услуг (ГПХ)':
            return sendCPPS(modifiedValues as Parameters<typeof sendCPPS>[0]);
        case 'Трудовой договор':
            return sendEmploymentContract(
                modifiedValues as Parameters<typeof sendEmploymentContract>[0]
            );
        case 'Уведомление о заключении':
            return sendNoticeConclusion(
                modifiedValues as Parameters<typeof sendNoticeConclusion>[0]
            );
        case 'Платежное поручение':
            return sendPaymentOrder(
                modifiedValues as Parameters<typeof sendPaymentOrder>[0]
            );
        case 'Приказ об отстранении':
            return sendSuspensionOrder(
                modifiedValues as Parameters<typeof sendSuspensionOrder>[0]
            );
    }
};

export const setBlankFormDefaultValues = (
    values: BlankFormValues
): BlankFormValues => ({
    workerId: values.workerId,
    checked: values.checked,
});

export const setBlankFormInitialValues: T.SetBlankFormInitialValues = (
    type,
    initialValues
) => {
    switch (type) {
        case 'Договор возмездного оказания услуг (ГПХ)':
            return {
                ...setBlankFormDefaultValues(initialValues),
                number: '',
                startDate: null,
                endDate: null,
                address: '',
                services: [{ name: '', price: '0' }],
            };
        case 'Трудовой договор':
            return {
                ...setBlankFormDefaultValues(initialValues),
                number: initialValues.number,
                position: initialValues.position,
                salary: initialValues.salary,
                contractType: initialValues.contractType,
                startDate: initialValues.startDate,
                startTime: initialValues.startTime,
                endTime: initialValues.endTime,
            };
        case 'Уведомление о заключении':
            return {
                ...setBlankFormDefaultValues(initialValues),
                nameTerritorialBody: initialValues.nameTerritorialBody,
                position: initialValues.position,
                base: initialValues.base,
                startDate: initialValues.startDate,
                address: initialValues.address,
                person: initialValues.person,
            };
        case 'Платежное поручение':
            return {
                ...setBlankFormDefaultValues(initialValues),
                numberMonths: '',
            };
        case 'Приказ об отстранении':
            return {
                ...setBlankFormDefaultValues(initialValues),
                number: '',
                startDate: null,
                reasonSuspension: null,
                firstManagerId: '',
                secondManagerId: '',
            };
        case 'Уведомление о прекращении':
            return {
                ...setBlankFormDefaultValues(initialValues),
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
    if (name === 'startTime' || name === 'endTime') {
        return 'mask';
    }
    return 'input';
};

const CasesWithDate = ['startDate', 'endDate', 'dateIssue', 'endDateUrgent'];

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