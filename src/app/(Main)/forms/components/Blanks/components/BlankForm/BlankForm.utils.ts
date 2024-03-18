import { camelToSnakeCaseDeep } from 'utils/camelToSnakeCaseDeep';
import { isObject } from 'utils/isObject';
import { formatDate } from 'utils/formatDate';
import {
    sendCPPS,
    sendEmploymentContract,
    sendNoticeConclusion,
    sendNoticeTermination,
    sendPaymentOrder,
    sendSuspensionOrder,
} from 'http/blanksService/blanksService';
import { toast } from 'react-toastify';
import { readBlobAsJson } from 'utils/readBlobAsJson';
import { snakeCase } from 'change-case';

import {
    BaseListValues,
    ContractTypeListValues,
    PersonListValues,
    ReasonSuspensionListValues,
    TranslatedBlankFormLabels,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/Blanks.consts';

import * as T from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';
import {
    BlankFormErrorsType,
    BlankFormValues,
    BlankType,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';
import { AxiosError } from 'axios';

export const BlankFormValidate = (values: T.BlankFormValues) => {
    const errors: T.BlankFormErrorsType = {};

    for (const elem in values) {
        if (elem === 'initiator') {
            continue;
        }
        if (!values[elem as keyof typeof values]) {
            errors[elem as keyof typeof errors] = 'Обязательное поле';
        }
    }

    if (values.services?.some((el) => !el.name || !el.price)) {
        errors.services = 'Обязательное поле';
    }

    return errors;
};

export const handleBlankFormErrors = async (
    e: unknown,
    errors: BlankFormErrorsType
) => {
    if (e instanceof AxiosError) {
        const response = await readBlobAsJson(e.response?.data);

        toast(response.error, {
            theme: 'colored',
            autoClose: 8000,
            position: 'bottom-right',
            type: 'error',
        });
        if (response.first_manager_id) {
            errors.firstManagerId = response.first_manager_id;
        }
        if (response.second_manager_id) {
            errors.secondManagerId = response.second_manager_id;
        }
        if (response.start_time) {
            errors.startTime = 'Неправильный формат времени';
        }
        if (response.end_time) {
            errors.endTime = 'Неправильный формат времени';
        }
    }
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
            return await sendCPPS(
                modifiedValues as Parameters<typeof sendCPPS>[0]
            );
        case 'Трудовой договор':
            return await sendEmploymentContract(
                modifiedValues as Parameters<typeof sendEmploymentContract>[0]
            );
        case 'Уведомление о заключении':
            return await sendNoticeConclusion(
                modifiedValues as Parameters<typeof sendNoticeConclusion>[0]
            );
        case 'Платежное поручение':
            return await sendPaymentOrder(
                modifiedValues as Parameters<typeof sendPaymentOrder>[0]
            );
        case 'Приказ об отстранении':
            return await sendSuspensionOrder(
                modifiedValues as Parameters<typeof sendSuspensionOrder>[0]
            );
        case 'Уведомление о прекращении':
            return await sendNoticeTermination(
                modifiedValues as Parameters<typeof sendNoticeTermination>[0]
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
                nameTerritorialBody: initialValues.nameTerritorialBody,
                position: initialValues.position,
                base: initialValues.base,
                endDate: initialValues.startDate,
                initiator: initialValues.initiator ?? false,
                person: initialValues.person,
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
    if (name === 'initiator') {
        return 'checkbox';
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
