'use client';
import React, { FC, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';

import { DocumentFormValidate } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.utils';

import {
    DocumentFormProps,
    DocumentFormValues,
} from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/types';
import { FileRejection, useDropzone } from 'react-dropzone';

import scss from './DocumentForm.module.scss';
import { DropImage } from 'components/DropImage/DropImage';
import { Input } from 'components/UI/Inputs/Input';
import { toast } from 'react-toastify';
import { errorToastOptions } from 'config/toastConfig';
import { Button } from 'components/UI/Buttons/Button';

export const DocumentForm: FC<DocumentFormProps> = ({
    document,
    type,
    opacity,
    setVisible,
    visible,
}) => {
    const [loading, setLoading] = useState(false);

    const {
        values,
        setFieldValue,
        handleChange,
        errors,
        touched,
        handleBlur,
        handleSubmit,
    } = useFormik<DocumentFormValues>({
        initialValues: {
            series: document?.series ?? '',
            images: [],
            issuedWhom: document?.issuedWhom ?? '',
        },
        onSubmit: async (values) => {
            setLoading(true);
        },
        validate: DocumentFormValidate,
    });

    const onDrop = async (acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map((image) => {
            return {
                img: image,
                preview: URL.createObjectURL(image),
            };
        });
        await setFieldValue('images', [...values.images, ...newImages]);
    };

    const onDropRejected = (e: FileRejection[]) => {
        e.map((error) => {
            if (error.errors[0].code === 'file-too-large') {
                toast(
                    `Файл ${error.file.name} слишком большой`,
                    errorToastOptions
                );
            }
        });
    };

    const { getRootProps, isDragActive } = useDropzone({
        maxFiles: 3,
        maxSize: 2097152,
        multiple: true,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg'],
        },
        onDrop,
        onDropRejected,
    });

    const handleDeleteImage = (index: number) => {
        const newArr = values.images.filter((img, imgIndex) => {
            return index !== imgIndex;
        });
        setFieldValue('images', newArr);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                opacity,
            }}
            transition={{ duration: 1 }}
            className={scss.document_form_wrapper}
        >
            <form onSubmit={handleSubmit}>
                <h3 className={scss.document_form_title}>
                    {type === 'edit'
                        ? 'Редактирование документа'
                        : 'Создание нового документа'}
                </h3>
                <DropImage
                    deleteImage={handleDeleteImage}
                    isDragActive={isDragActive}
                    image={values.images}
                    rootProps={getRootProps}
                />
                <div className={scss.photo_label}>
                    <p>
                        Фото документа<span>*</span>
                    </p>
                    {errors.images && (
                        <label className={scss.photo_error}>
                            {errors.images}
                        </label>
                    )}
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Серия<span>*</span>
                    </label>
                    <Input
                        onChange={handleChange}
                        value={values.series}
                        name="series"
                        handleError={touched.series && errors.series}
                        onBlur={handleBlur}
                        placeholder="Укажите серию"
                    />
                </div>
                <div className={scss.input_wrapper}>
                    <label>
                        Выдан<span>*</span>
                    </label>
                    <Input
                        onChange={handleChange}
                        value={values.issuedWhom}
                        name="issuedWhom"
                        handleError={touched.issuedWhom && errors.issuedWhom}
                        onBlur={handleBlur}
                        placeholder="Кем выдано"
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
