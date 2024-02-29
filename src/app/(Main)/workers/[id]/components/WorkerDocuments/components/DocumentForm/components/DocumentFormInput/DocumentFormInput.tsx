import React, { FC } from 'react';

import { Input } from 'components/UI/Inputs/Input';
import {
    getDocumentInputType,
    getDocumentLabel,
    getDocumentPlaceholder,
} from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.utils';

import { DocumentFormInputProps } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.types';

import scss from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.module.scss';
import { translateToRussian } from 'app/(Main)/workers/[id]/components/WorkerProfile/utils';
import { InputDate } from 'components/UI/Inputs/InputDate';

export const DocumentFormInput: FC<DocumentFormInputProps> = ({
    handleBlur,
    handleChange,
    errors,
    value,
    setFieldValue,
    touched,
    name,
}) => {
    if (name === 'images') {
        return null;
    }
    switch (getDocumentInputType(name)) {
        case 'input': {
            return (
                <div className={scss.input_wrapper}>
                    <label>
                        {getDocumentLabel(name)}
                        <span>*</span>
                    </label>
                    <Input
                        handleError={touched[name] && errors[name]}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={value as string}
                        name={name}
                        placeholder={`Укажите ${getDocumentPlaceholder(name)}`}
                    />
                </div>
            );
        }
        case 'date':
            return (
                <div className={scss.input_wrapper}>
                    <label>
                        {getDocumentLabel(name)}
                        <span>*</span>
                    </label>
                    <InputDate
                        maxDate={name === 'dateIssue' ? new Date() : undefined}
                        placeholder={`Укажите ${getDocumentPlaceholder(name)}`}
                        value={value ? new Date(value) : null}
                        onChange={(Data: Date) => setFieldValue(name, Data)}
                        mask="99.99.9999"
                        onBlur={handleBlur}
                        handleError={touched[name] && errors[name]}
                        name={name}
                    />
                </div>
            );
    }
};
