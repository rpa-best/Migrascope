import React, { FC, useEffect, useState } from 'react';

import { Input } from 'components/UI/Inputs/Input';
import { InputDate } from 'components/UI/Inputs/InputDate';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { InputMask } from 'components/UI/Inputs/InputMask';
import { InputCheckbox } from 'components/UI/Inputs/InputCheckbox';

import {
    getBlankInputType,
    getBlankLabel,
    getBlankPlaceholder,
    setBlankFormListValues,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.utils';

import { BlankFormInputProps } from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';

import scss from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.module.scss';
import clsx from 'clsx';

const namesToExclude = ['services', 'workerId', 'checked', 'initiator'];
const casesWithInt = [
    'number',
    'salary',
    'numberMonths',
    'firstManagerId',
    'secondManagerId',
];

export const BlankFormInput: FC<BlankFormInputProps> = ({
    handleBlur,
    handleChange,
    errors,
    value,
    setFieldValue,
    touched,
    name,
    orgId,
}) => {
    const [listValues, setListValues] = useState<
        { name: string; id: number }[]
    >([]);

    useEffect(() => {
        if (getBlankInputType(name) === 'select') {
            (async () => {
                const list = await setBlankFormListValues(name, orgId);
                setListValues(list as typeof listValues);
            })();
        }
    }, [name, orgId]);

    if (namesToExclude.includes(name)) {
        return;
    }

    function getInput() {
        switch (getBlankInputType(name)) {
            case 'input': {
                return (
                    <Input
                        type={casesWithInt.includes(name) ? 'number' : 'text'}
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
                        maxDate={
                            name.includes('dateIssue') ? new Date() : undefined
                        }
                        placeholder={`Укажите ${getBlankPlaceholder(name)}`}
                        value={value ? new Date(value as string) : null}
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
                        autoComplete="off"
                        onBlur={handleBlur}
                        handleError={touched[name] && errors[name]}
                        listValues={listValues}
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
            case 'mask':
                return (
                    <InputMask
                        name={name}
                        required
                        placeholder={getBlankPlaceholder(name)}
                        handleError={touched[name] && errors[name]}
                        value={value as string}
                        alwaysShowMask={true}
                        mask="99:99:99"
                        onBlur={handleBlur}
                        onChange={(value: string) => setFieldValue(name, value)}
                    />
                );
        }
    }

    return (
        <div className={scss.blank_form_input_wrapper}>
            <label
                className={clsx({
                    [scss.shrinked_input]: getBlankLabel(name).length > 40,
                })}
            >
                {getBlankLabel(name)}
                <span>*</span>
            </label>
            {getInput()}
        </div>
    );
};
