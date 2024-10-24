import { camelToSnakeCaseDeep } from 'utils/camelToSnakeCaseDeep';
import { isObject } from 'utils/isObject';
import { formatDate } from 'utils/formatDate';
import {
    getManagers,
    sendArrivalNotice,
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
    ArrivalDocumentListValues,
    PurposeDepartureListValues,
    PlaceStayListValues,
    ReceivingSideListValues,
    IdentityDocumentListValues,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/Blanks.consts';

import * as T from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';
import {
    BlankFormErrorsType,
    BlankFormValues,
    BlankType,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';
import { AxiosError } from 'axios';
import { snakeToCamelCaseDeep } from 'utils/snakeTOCamelCaseDeep';

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

    /*    if (values.placeStayStructure && values.placeStayStructure.length > 4) {
        errors.placeStayStructure = 'Длина не может быть больше 4';
    }*/

    return errors;
};

export const handleBlankFormErrors = async (
    e: unknown,
    errors: BlankFormErrorsType
) => {
    if (e instanceof AxiosError) {
        const response = await readBlobAsJson(e.response?.data);

        snakeToCamelCaseDeep(response);

        for (const key in response) {
            errors[key as keyof BlankFormErrorsType] = response[key];
        }

        const toastErrorMessage = response.error
            ? response.error
            : 'Ошибка, проверьте поля в форме';

        toast(toastErrorMessage, {
            theme: 'colored',
            autoClose: 8000,
            position: 'bottom-right',
            type: 'error',
        });
    }
};

function setSnakeCase(value: string) {
    return /^[A-Z]+$/.test(value) ? value : snakeCase(value);
}

export const submitFormByType = async (
    type: BlankType,
    values: BlankFormValues
) => {
    const modifiedValues = Object.fromEntries(
        Object.entries(values)
            .map(([key, value]) => {
                if (isObject(value) && value.slug) {
                    return [key, setSnakeCase(value.slug)];
                }
                if (key === 'firstManagerId' || key === 'secondManagerId') {
                    return [key, value.id];
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
        case 'Уведомление на постановку на миграционный учет':
            return await sendArrivalNotice(
                modifiedValues as Parameters<typeof sendArrivalNotice>[0]
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
        case 'Уведомление на постановку на миграционный учет':
            return {
                ...setBlankFormDefaultValues(initialValues),
                documentType: initialValues.documentType,
                series: initialValues.series,
                number: initialValues.number,
                dateIssue: initialValues.dateIssue,
                validityPeriod: initialValues.validityPeriod,
                purposeDeparture: initialValues.purposeDeparture,
                position: initialValues.position,
                durationStay: initialValues.durationStay,
                addressFormerPlaceResidence:
                    initialValues.addressFormerPlaceResidence,
                placeStayRegion: initialValues.placeStayRegion,
                placeStayArea: initialValues.placeStayArea,
                placeStayCity: initialValues.placeStayCity,
                placeStayStreet: initialValues.placeStayStreet,
                objectType: initialValues.objectType,
                placeStayHouse: initialValues.placeStayHouse,
                placeStayFrame: initialValues.placeStayFrame,
                placeStayStructure: initialValues.placeStayStructure,
                roomType: initialValues.roomType,
                placeStayApartment: initialValues.placeStayApartment,
                statedPeriodStay: initialValues.statedPeriodStay,
                placeStay: initialValues.placeStay,
                documentRightUse: initialValues.documentRightUse,
                receivingSide: initialValues.receivingSide,
                surnameReceivingSide: initialValues.surnameReceivingSide,
                nameReceivingSide: initialValues.nameReceivingSide,
                patronymicReceivingSide: initialValues.patronymicReceivingSide,
                typeOfIdentityDocument: initialValues.typeOfIdentityDocument,
                seriesReceivingSide: initialValues.seriesReceivingSide,
                numberReceivingSide: initialValues.numberReceivingSide,
                dateIssueReceivingSide: initialValues.dateIssueReceivingSide,
                sellByReceivingSide: initialValues.sellByReceivingSide,
                region: initialValues.region,
                area: initialValues.area,
                city: initialValues.city,
                street: initialValues.street,
                house: initialValues.house,
                frame: initialValues.frame,
                structure: initialValues.structure,
                apartment: initialValues.apartment,
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

const CasesWithDate: Array<keyof BlankFormValues> = [
    'startDate',
    'endDate',
    'dateIssue',
    'endDateUrgent',
    'durationStay',
    'validityPeriod',
    'statedPeriodStay',
    'dateIssueReceivingSide',
    'sellByReceivingSide',
];

const CasesWithSelect = [
    'person',
    'contractType',
    'base',
    'reasonSuspension',
    'firstManagerId',
    'secondManagerId',
    'documentType',
    'purposeDeparture',
    'placeStay',
    'receivingSide',
    'typeOfIdentityDocument',
];

export const setBlankFormListValues = async (
    objName: keyof BlankFormValues,
    orgId: number
) => {
    async function fetchManagers() {
        const response = await getManagers(orgId);
        return response.map((manager) => ({
            ...manager,
            id: manager.managerId,
            name: manager.fullName,
        }));
    }

    switch (objName) {
        case 'person':
            return PersonListValues;
        case 'contractType':
            return ContractTypeListValues;
        case 'base':
            return BaseListValues;
        case 'reasonSuspension':
            return ReasonSuspensionListValues;
        case 'documentType':
            return ArrivalDocumentListValues;
        case 'purposeDeparture':
            return PurposeDepartureListValues;
        case 'placeStay':
            return PlaceStayListValues;
        case 'receivingSide':
            return ReceivingSideListValues;
        case 'typeOfIdentityDocument':
            return IdentityDocumentListValues;
        case 'firstManagerId':
            return await fetchManagers();
        case 'secondManagerId':
            return await fetchManagers();
    }
};

export const getBlankLabel = (name: T.RequiredBlankFormValues) => {
    return TranslatedBlankFormLabels.find((el) => el.slug === name)!.name;
};

export const getBlankPlaceholder = (name: T.RequiredBlankFormValues) => {
    return TranslatedBlankFormLabels.find((el) => el.slug === name)!
        .placeholder;
};
