import { DocumentFormValues } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/types';

export const DocumentFormValidate = (values: DocumentFormValues) => {
    const errors: Partial<DocumentFormValues> = {};

    for (const elem in values) {
        // @ts-ignore
        if (!values[elem]) {
            // @ts-ignore
            errors[elem] = 'Обязательное поле';
        }
    }

    return errors;
};
