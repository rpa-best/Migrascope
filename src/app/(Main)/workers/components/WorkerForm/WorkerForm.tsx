'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { usePathname } from 'next/navigation';

import revalidate from 'utils/revalidate';
import {
    setWorkerCreateFormInitialValues,
    WorkerSubmit,
    WorkerSubmitValues,
    WorkerValidate,
} from 'app/(Main)/workers/components/WorkerForm/WorkerForm.utils';
import { getOrganizationOnClient } from 'http/organizationService/organizationService';

import { Input } from 'components/UI/Inputs/Input';
import { InputMask } from 'components/UI/Inputs/InputMask';
import { Button } from 'components/UI/Buttons/Button';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { DropImage } from 'components/DropImage/DropImage';

import { identificationCardData } from 'app/(Main)/workers/components/WorkerForm/data';

import {
    WorkerFormProps,
    WorkerFormValues,
} from 'app/(Main)/workers/components/WorkerForm/WorkerForm.types';
import { OrganizationType } from 'http/organizationService/types';

import scss from './WorkerForm.module.scss';

export const WorkerForm: React.FC<WorkerFormProps> = ({
    worker,
    visible,
    setVisible,
    opacity,
}) => {
    const path = usePathname();
    const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
    const [loading, setLoading] = useState(false);

    const {
        values,
        setFieldValue,
        handleChange,
        errors,
        touched,
        handleBlur,
        setFieldTouched,
        handleSubmit,
        setErrors,
    } = useFormik<WorkerFormValues>({
        initialValues: setWorkerCreateFormInitialValues(worker),
        onSubmit: async (values) => {
            const result = await WorkerSubmit(
                values as WorkerSubmitValues,
                setLoading,
                setErrors
            );

            if (result) {
                setVisible(false);
                revalidate(path);
            }
        },
        validate: WorkerValidate,
    });

    const onDrop = async (acceptedFiles: any) => {
        await setFieldValue('avatar', {
            img: acceptedFiles[0],
            preview: URL.createObjectURL(acceptedFiles[0]),
        });
    };

    useEffect(() => {
        if (visible) {
            getOrganizationOnClient().then((d) => {
                setOrganizations(d.results);
            });
        }
    }, [visible]);

    const { getRootProps, isDragActive } = useDropzone({
        maxFiles: 1,
        multiple: false,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg'],
        },
        onDrop,
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ opacity }}
            transition={{ duration: 1 }}
            className={scss.addWorker_wrapper}
        >
            <form onSubmit={handleSubmit}>
                <h3 className={scss.worker_form_title}>
                    Создание нового сотрудника
                </h3>
                <DropImage
                    deleteImage={() => setFieldValue('avatar', null)}
                    isDragActive={isDragActive}
                    image={values.avatar}
                    rootProps={getRootProps}
                />
                <div className={scss.photo_label}>
                    <p>
                        Фото сотрудника<span>*</span>
                    </p>
                    {errors.avatar && (
                        <label className={scss.photo_error}>
                            {errors.avatar}
                        </label>
                    )}
                </div>

                <div className={scss.input_wrapper}>
                    <label>
                        Компания<span>*</span>
                    </label>
                    <InputSelect
                        onChange={(v) => setFieldValue('organization', v)}
                        value={values.organization?.name as string}
                        name="organization"
                        placeholder="Укажите компанию"
                        onBlur={handleBlur}
                        handleError={
                            touched.organization && errors.organization
                        }
                        listValues={organizations}
                    />
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Фамилия<span>*</span>
                    </label>
                    <Input
                        onChange={handleChange}
                        value={values.surname}
                        name="surname"
                        handleError={touched.surname && errors.surname}
                        onBlur={handleBlur}
                        placeholder="Укажите фамилию"
                    />
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Имя<span>*</span>
                    </label>
                    <Input
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        handleError={touched.name && errors.name}
                        onBlur={handleBlur}
                        placeholder="Укажите имя"
                    />
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Отчество<span>*</span>
                    </label>
                    <Input
                        onChange={handleChange}
                        value={values.patronymic}
                        name="patronymic"
                        handleError={touched.patronymic && errors.patronymic}
                        onBlur={handleBlur}
                        placeholder="Укажите отчество"
                    />
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Гражданство<span>*</span>
                    </label>
                    <Input
                        onChange={handleChange}
                        value={values.citizenship}
                        name="citizenship"
                        handleError={touched.citizenship && errors.citizenship}
                        onBlur={handleBlur}
                        placeholder="Укажите гражданство"
                    />
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Удостоверение личности<span>*</span>
                    </label>
                    <InputSelect
                        onChange={(v) => setFieldValue('identificationCard', v)}
                        value={values.identificationCard?.name as string}
                        name="identificationCard"
                        placeholder="Удостоверение личности"
                        onBlur={handleBlur}
                        handleError={
                            touched.identificationCard &&
                            errors.identificationCard
                        }
                        listValues={identificationCardData}
                    />
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Телефон<span>*</span>
                    </label>
                    <InputMask
                        name="phone"
                        required
                        placeholder="+7(___)___-__-__"
                        handleError={touched.phone && errors.phone}
                        value={values.phone}
                        alwaysShowMask={true}
                        mask="+7(999)999-99-99"
                        onBlur={() => setFieldTouched('phone', true)}
                        onChange={(value: string) => {
                            setFieldTouched('phone', true);
                            setFieldValue('phone', value);
                        }}
                        type="tel"
                    />
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Электронная почта<span>*</span>
                    </label>
                    <Input
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        handleError={touched.email && errors.email}
                        onBlur={handleBlur}
                        placeholder="Укажите почту"
                    />
                </div>
                <div className={scss.worker_form_button}>
                    <Button loading={loading} type="submit">
                        Сохранить
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};
