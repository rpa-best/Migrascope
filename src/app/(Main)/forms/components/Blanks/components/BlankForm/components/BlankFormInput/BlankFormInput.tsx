import React, { FC } from 'react';

import { Input } from 'components/UI/Inputs/Input';
import { InputDate } from 'components/UI/Inputs/InputDate';
import { InputSelect } from 'components/UI/Inputs/InputSelect';

import {
    getBlankInputType,
    getBlankLabel,
    getBlankPlaceholder,
    setBlankFormListValues,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.utils';

import { BlankFormInputProps } from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';

import scss from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.module.scss';

export const BlankFormInput: FC<BlankFormInputProps> = ({
    values,
    handleBlur,
    handleChange,
    errors,
    value,
    setFieldValue,
    touched,
    name,
}) => {
    if (name === 'workerId') {
        return;
    }

    if (name === 'services') {
        return;
    }

    function getInput() {
        switch (getBlankInputType(name)) {
            case 'input': {
                return (
                    <Input
                        handleError={touched[name] && errors[name]}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={value as string}
                        name={name}
                        placeholder={`Укажите ${getBlankPlaceholder(name)}`}
                    />
                );
            }
            case 'date':
                return (
                    <InputDate
                        maxDate={name === 'dateIssue' ? new Date() : undefined}
                        placeholder={`Укажите ${getBlankPlaceholder(name)}`}
                        value={value ? new Date(value) : null}
                        onChange={(Data: Date) => setFieldValue(name, Data)}
                        mask="99.99.9999"
                        onBlur={handleBlur}
                        handleError={touched[name] && errors[name]}
                        name={name}
                    />
                );
            case 'select':
                return (
                    <InputSelect
                        onBlur={handleBlur}
                        handleError={touched[name] && errors[name]}
                        listValues={setBlankFormListValues(name)!}
                        onChange={(val) => {
                            setFieldValue(name, val);
                        }}
                        placeholder={`Укажите ${getBlankPlaceholder(name)}`}
                        value={
                            (value as unknown as { name: string })?.name ?? ''
                        }
                        name={name}
                    />
                );
        }
    }

    return (
        <div className={scss.input_wrapper}>
            <label>
                {getBlankLabel(name)}
                <span>*</span>
            </label>
            {getInput()}
        </div>
    );
};
