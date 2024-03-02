import { WorkerDocuments } from 'http/workerService/types';
import { ImageType } from 'components/DropImage/types';
import { RenderedComponentProps } from 'components/Tooltip/types';
import { FormikHandlers } from 'formik';

export interface DocumentFormProps extends RenderedComponentProps {
    type: 'create' | 'edit';
    document?: WorkerDocuments;
}

export type DocumentFormErrorType = {
    [key in keyof DocumentFormValues]: string;
};

export type DocumentFormTouchedType = {
    [key in RequiredDocumentFormValues]: boolean;
};

export type DocumentInputType = 'date' | 'input';

export type SetDocumentFormInitialValues = (
    type: WorkerDocumentType,
    document?: WorkerDocuments
) => DocumentFormValues;

export interface DocumentFormValues
    extends Partial<
        Omit<
            WorkerDocuments,
            'dateIssue' | 'dateEnd' | 'fileDocument' | 'typeDocument' | 'id'
        >
    > {
    typeDocument?: WorkerDocumentType;
    images: ImageType[] | string[];
    series?: string;
    dateIssue?: Date | null;
    dateEnd?: Date | null;
    issuedWhom?: string;
}

export type WorkerDocumentType =
    | 'initial'
    | 'passport'
    | 'migrationCard'
    | 'registration'
    | 'patent'
    | 'paycheck'
    | 'temporaryResidence'
    | 'residencePermit'
    | 'certificateAsylum'
    | 'SNILS'
    | 'INN';

export type RequiredDocumentFormValues = keyof Omit<
    DocumentFormValues,
    'typeDocument' | 'archive'
>;

export interface SelectDocumentType {
    id: number;
    name: string;
    slug: WorkerDocumentType;
}

export interface TranslatedLabelsType {
    slug: RequiredDocumentFormValues;
    name: string;
    placeholder: string;
}

export interface DocumentFormInputProps {
    name: RequiredDocumentFormValues;
    value: string | Date;
    setFieldValue: (field: string, value: any) => void;
    handleBlur: FormikHandlers['handleBlur'];
    handleChange: FormikHandlers['handleChange'];
    touched: DocumentFormTouchedType;
    errors: DocumentFormErrorType;
}
