import React, { FC } from 'react';

import { Input } from 'components/UI/Inputs/Input';
import { InputDate } from 'components/UI/Inputs/InputDate';

import {
    getDocumentInputType,
    getDocumentLabel,
    getDocumentPlaceholder,
} from 'components/DocumentForm/DocumentForm.utils';

import { DocumentFormInputProps } from 'components/DocumentForm/DocumentForm.types';

import scss from 'components/DocumentForm/DocumentForm.module.scss';

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
