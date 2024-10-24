import { camelCase, snakeCase } from 'change-case';
import { toast } from 'react-toastify';
import {
    createWorkerDocument,
    editWorkerDocument,
} from 'http/workerService/workerService';
import { camelToSnakeCaseDeep } from 'utils/camelToSnakeCaseDeep';
import { formatDate } from 'utils/formatDate';

import {
    CreateWorkerDocumentBody,
    WorkerDocuments,
} from 'http/workerService/types';
import { FileRejection } from 'react-dropzone';
import { ImageType } from 'components/DropImage/types';
import * as T from 'components/DocumentForm/DocumentForm.types';

import { errorToastOptions } from 'config/toastConfig';
import {
    SelectDocumentList,
    TranslatedLabels,
} from 'components/DocumentForm/data';

const fieldsToExclude = ['archive'];

export const DocumentFormValidate = (values: T.DocumentFormValues) => {
    const errors: Partial<T.DocumentFormErrorType> = {};

    for (const elem in values) {
        if (fieldsToExclude.includes(elem)) continue;
        if (!values[elem as keyof T.DocumentFormValues]) {
            errors[elem as keyof T.DocumentFormErrorType] = 'Обязательное поле';
        }
    }

    return errors;
};

export const onDropDocumentImage = (
    acceptedFiles: File[],
    setFieldValue: (name: string, value: (string | ImageType)[]) => void,
    values: T.DocumentFormValues
) => {
    const newImages = acceptedFiles.map((image) => {
        return {
            img: image,
            preview: URL.createObjectURL(image),
        };
    });
    setFieldValue('images', [...(values.images ?? []), ...newImages]);
};

export const onDropDocumentImageRejected = (e: FileRejection[]) => {
    e.map((error) => {
        if (error.errors[0].code === 'file-too-large') {
            toast(`Файл ${error.file.name} слишком большой`, errorToastOptions);
        }
    });
};

export const getDocumentBody = (
    values: T.DocumentFormValues,
    documentType: T.SelectDocumentType
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
        type_document: snakeDocumentType as T.WorkerDocumentType,
    };

    return createDocumentBody;
};

export const createFormSubmit = async (
    values: T.DocumentFormValues,
    documentType: T.SelectDocumentType,
    workerId: number
) => {
    const createDocumentBody = getDocumentBody(values, documentType);

    await createWorkerDocument(workerId, createDocumentBody);
};

export const editFormSubmit = async (
    values: T.DocumentFormValues,
    documentType: T.SelectDocumentType,
    workerId: number,
    documentId: number
) => {
    const editDocumentBody = getDocumentBody(values, documentType);

    await editWorkerDocument(workerId, documentId, editDocumentBody);
};

export const createNewFormSubmit = async (
    values: T.DocumentFormValues,
    documentType: T.SelectDocumentType,
    workerId: number,
    documentId: number
) => {
    const createDocumentBody = getDocumentBody(values, documentType);

    await editWorkerDocument(workerId, documentId, { archive: true });

    await createWorkerDocument(workerId, createDocumentBody);
};

export const setDocumentFormValues = (
    type: T.WorkerDocumentType,
    document?: Partial<WorkerDocuments>
): T.DocumentFormValues => {
    return setDocumentFormInitialValues(type, document as WorkerDocuments);
};

const defaultValues = (document?: WorkerDocuments) => {
    return {
        series: document?.series ?? '',
        number: document?.number ?? '',
        issuedWhom: document?.issuedWhom ?? '',
        dateIssue: document?.dateIssue ? new Date(document.dateIssue) : null,
        dateEnd: document?.dateEnd ? new Date(document.dateEnd) : null,
        images: document?.fileDocument ?? [],
    };
};

export const setDocumentFormInitialValues: T.SetDocumentFormInitialValues = (
    type,
    document
) => {
    switch (type) {
        case 'initial':
            return { ...defaultValues(document), territoryAction: '' };
        case 'passport':
            return { ...defaultValues(document) };
        case 'migrationCard':
            return {
                images: document?.fileDocument ?? [],
                number: document?.number ?? '',
                series: document?.series ?? '',
                dateIssue: document?.dateIssue
                    ? new Date(document.dateIssue)
                    : null,
                dateEnd: document?.dateEnd ? new Date(document.dateEnd) : null,
            };
        case 'registration':
            return {
                images: document?.fileDocument ?? [],
                dateEnd: document?.dateEnd ? new Date(document.dateEnd) : null,
                dateIssue: document?.dateIssue
                    ? new Date(document.dateIssue)
                    : null,
            };
        case 'patent':
            return {
                ...defaultValues(document),
                territoryAction: document?.territoryAction ?? '',
            };
        case 'paycheck':
            return {
                images: document?.fileDocument ?? [],
                dateEnd: document?.dateEnd ? new Date(document.dateEnd) : null,
            };
        case 'temporaryResidence':
            return { ...defaultValues(document) };
        case 'residencePermit':
            return { ...defaultValues(document) };
        case 'certificateAsylum':
            return { ...defaultValues(document) };
        case 'SNILS':
            return {
                images: document?.fileDocument ?? [],
                number: document?.number ?? '',
            };
        case 'INN':
            return {
                images: document?.fileDocument ?? [],
                number: document?.number ?? '',
            };
    }
};

export const getDocumentLabel = (name: T.RequiredDocumentFormValues) => {
    return TranslatedLabels.find((el) => el.slug === name)!.name;
};

export const getDocumentName = (name: T.WorkerDocumentType) => {
    const camelDocumentName = /^[A-Z]+$/.test(name) ? name : camelCase(name);
    return SelectDocumentList.find((el) => el.slug === camelDocumentName)?.name;
};

export const getDocumentPlaceholder = (name: T.RequiredDocumentFormValues) => {
    return TranslatedLabels.find((el) => el.slug === name)!.placeholder;
};

export const getDocumentInputType = (
    name: T.RequiredDocumentFormValues
): T.DocumentInputType => {
    if (CasesWithDate.includes(name)) {
        return 'date';
    }
    return 'input';
};

const CasesWithDate = ['dateIssue', 'dateEnd'];
