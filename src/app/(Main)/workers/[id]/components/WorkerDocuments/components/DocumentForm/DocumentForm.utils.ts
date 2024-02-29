import { snakeCase } from 'change-case';
import { createWorkerDocument } from 'http/workerService/workerService';
import { camelToSnakeCaseDeep } from 'utils/camelToSnakeCaseDeep';
import { formatDate } from 'utils/formatDate';

import {
    SelectDocumentList,
    TranslatedLabels,
} from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/data';

import { CreateWorkerDocumentBody } from 'http/workerService/types';
import {
    DocumentFormValues,
    DocumentFormErrorType,
    WorkerDocumentType,
    TranslatedLabelsType,
    DocumentInputType,
    RequiredDocumentFormValues,
    SelectDocumentType,
} from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.types';

export const DocumentFormValidate = (values: DocumentFormValues) => {
    const errors: Partial<DocumentFormErrorType> = {};

    for (const elem in values) {
        if (!values[elem as keyof DocumentFormValues]) {
            errors[elem as keyof DocumentFormErrorType] = 'Обязательное поле';
        }
    }

    if (values.images.length === 0) {
        errors.images = 'Обязательное поле';
    }

    return errors;
};

export const createFormSubmit = async (
    values: DocumentFormValues,
    documentType: SelectDocumentType,
    workerId: number
) => {
    const snakeClone = structuredClone(values);
    camelToSnakeCaseDeep(snakeClone);
    const { images, ...omitImagesClone } = snakeClone;

    const snakeDocumentType = /^[A-Z]+$/.test(documentType.slug)
        ? documentType.slug
        : snakeCase(documentType.slug);

    const createDocumentBody: CreateWorkerDocumentBody = {
        ...(omitImagesClone as unknown as CreateWorkerDocumentBody),
        file_documents: values.images.map((img) => {
            if (typeof img === 'string') {
                return;
            }
            return img.img;
        }),
        date_issue: values.dateIssue
            ? formatDate(new Date(values.dateIssue))
            : '',
        date_end: values.dateEnd ? formatDate(new Date(values.dateEnd)) : '',
        type_document: snakeDocumentType as WorkerDocumentType,
    };

    await createWorkerDocument(workerId, createDocumentBody);
};

export const setDocumentFormValues = (
    type: WorkerDocumentType
): DocumentFormValues => {
    return documentFormInitialValues[type] as DocumentFormValues;
};

const defaultValues = {
    series: '',
    number: '',
    issuedWhom: '',
    dateIssue: null,
    dateEnd: null,
    images: [],
};

export const documentFormInitialValues: Record<
    WorkerDocumentType,
    Partial<DocumentFormValues>
> = {
    initial: {
        ...defaultValues,
        territoryAction: '',
    },
    passport: {
        ...defaultValues,
    },
    migrationCard: {
        images: [],
        number: '',
        dateIssue: null,
        dateEnd: null,
    },
    registration: {
        images: [],
        dateIssue: null,
        dateEnd: null,
    },
    patent: {
        ...defaultValues,
        territoryAction: '',
    },
    paycheck: {
        images: [],
        dateEnd: null,
    },
    temporaryResidence: {
        ...defaultValues,
    },
    residencePermit: {
        ...defaultValues,
    },
    certificateAsylum: {
        ...defaultValues,
    },
    SNILS: {
        images: [],
        number: '',
    },
    INN: { images: [], number: '' },
};

export const getDocumentLabel = (name: RequiredDocumentFormValues) => {
    return TranslatedLabels.find((el) => el.slug === name)!.name;
};

export const getDocumentName = (name: WorkerDocumentType) => {
    return SelectDocumentList.find((el) => el.slug === name)!.name;
};

export const getDocumentPlaceholder = (name: RequiredDocumentFormValues) => {
    return TranslatedLabels.find((el) => el.slug === name)!.placeholder;
};

export const getDocumentInputType = (
    name: RequiredDocumentFormValues
): DocumentInputType => {
    if (CasesWithDate.includes(name)) {
        return 'date';
    }
    return 'input';
};

const CasesWithDate = ['dateIssue', 'dateEnd'];
