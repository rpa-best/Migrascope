'use client';

import { FC, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';

import { WorkerInput } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerInput';
import { Button } from 'components/UI/Buttons/Button';

import { useEditStore } from 'app/(Main)/workers/[id]/components/WorkerProfile/store/isEditStore';
import revalidate from 'utils/revalidate';
import {
    filterFields,
    getWorkerInputType,
    setWorkerEditFormInitialValues,
    WorkerEditFormValidate,
    WorkerEditSubmit,
} from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerEditForm.utils';

import {
    WorkerEditFormProps,
    WorkerEditFormValues,
} from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerEditForm.types';

import scss from 'app/(Main)/workers/[id]/components/WorkerProfile/WorkerProfile.module.scss';

export const WorkerEditForm: FC<WorkerEditFormProps> = ({ worker }) => {
    const path = usePathname();
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useEditStore((state) => [
        state.isEdit,
        state.setIsEdit,
    ]);

    const filteredFields = useMemo(() => {
        return filterFields(worker);
    }, [worker]);

    const {
        values,
        errors,
        touched,
        handleBlur,
        setFieldValue,
        setErrors,
        handleChange,
        handleSubmit,
        setFieldTouched,
    } = useFormik<WorkerEditFormValues>({
        initialValues: setWorkerEditFormInitialValues(worker),
        onSubmit: async (values) => {
            await WorkerEditSubmit(worker.id, values, setLoading, setErrors);
            revalidate(path);
            setIsEdit(false);
        },
        validate: WorkerEditFormValidate,
    });

    return (
        <form onSubmit={handleSubmit} className={scss.worker_content_fields}>
            {filteredFields.map((el, index) => {
                const key = el[0] as keyof WorkerEditFormValues;
                return (
                    <WorkerInput
                        type={getWorkerInputType(key)}
                        values={values}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        errors={errors}
                        objKey={key}
                        key={index}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                );
            })}
            {isEdit ? (
                <Button loading={loading} type="submit">
                    Сохранить
                </Button>
            ) : (
                <Button>Уволить</Button>
            )}
        </form>
    );
};
