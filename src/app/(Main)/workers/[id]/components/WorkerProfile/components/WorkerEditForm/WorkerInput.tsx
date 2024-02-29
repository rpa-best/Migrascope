import { FC } from 'react';

import { InputDate } from 'components/UI/Inputs/InputDate';
import { Input } from 'components/UI/Inputs/Input';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { InputMask } from 'components/UI/Inputs/InputMask';

import { useEditStore } from 'app/(Main)/workers/[id]/components/WorkerProfile/store/isEditStore';
import { translateToRussian } from 'app/(Main)/workers/[id]/components/WorkerProfile/utils';
import {
    fieldsWithObjects,
    getWorkerEditProfileValue,
    setListValues,
} from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerEditForm.utils';

import {
    WorkerEditFormValues,
    WorkerInputProps,
} from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerEditForm.types';

export const WorkerInput: FC<WorkerInputProps> = ({
    type,
    values,
    setFieldValue,
    setFieldTouched,
    errors,
    objKey,
    touched,
    handleChange,
    handleBlur,
}) => {
    const [isEdit] = useEditStore((state) => [state.isEdit]);

    switch (type) {
        case 'date':
            return (
                <InputDate
                    placeholder="Не указано"
                    disabled={!isEdit}
                    style="hollow"
                    value={values.birthday ? new Date(values.birthday) : null}
                    onChange={(Data: Date) => setFieldValue('birthday', Data)}
                    label={translateToRussian(objKey)}
                    mask="99.99.9999"
                    onBlur={() => setFieldTouched('birthday', true)}
                    handleError={touched.birthday && errors.birthday}
                    name="birthday"
                />
            );
        case 'default':
            return (
                <Input
                    label={translateToRussian(objKey)}
                    style="hollow"
                    disabled={!isEdit}
                    onBlur={handleBlur}
                    placeholder={
                        values[
                            objKey as keyof Omit<
                                WorkerEditFormValues,
                                | 'gender'
                                | 'identificationCard'
                                | 'processingPersonalData'
                            >
                        ] || 'Не указано'
                    }
                    handleError={touched[objKey] && (errors[objKey] as any)}
                    value={
                        values[
                            objKey as keyof Omit<
                                WorkerEditFormValues,
                                | 'gender'
                                | 'identificationCard'
                                | 'processingPersonalData'
                            >
                        ]
                    }
                    name={objKey}
                    onChange={handleChange}
                />
            );
        case 'select': {
            if (fieldsWithObjects.includes(objKey)) {
                return (
                    <InputSelect
                        disabled={!isEdit}
                        onBlur={handleBlur}
                        label={translateToRussian(objKey)}
                        style="hollow"
                        handleError={touched[objKey] && (errors[objKey] as any)}
                        listValues={setListValues(objKey)!}
                        onChange={(val) => {
                            setFieldValue(`${objKey}`, val);
                        }}
                        value={getWorkerEditProfileValue(values, objKey)}
                        name={objKey}
                    />
                );
            }
            break;
        }
        case 'mask':
            return (
                <InputMask
                    style="hollow"
                    name="phone"
                    placeholder="+7(___)___-__-__"
                    handleError={errors.phone}
                    value={values.phone}
                    alwaysShowMask={true}
                    disabled={!isEdit}
                    label={translateToRussian(objKey)}
                    mask="+7(999)999-99-99"
                    onBlur={() => setFieldTouched('phone', true)}
                    onChange={(value: string) => {
                        setFieldTouched('phone', true);
                        setFieldValue('phone', value);
                    }}
                    type="tel"
                />
            );
    }
};
