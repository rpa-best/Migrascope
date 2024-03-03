'use client';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { usePathname } from 'next/navigation';
import { camelCase } from 'change-case';

import { DropImage } from 'components/DropImage/DropImage';
import { Button } from 'components/UI/Buttons/Button';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { DocumentFormInput } from 'components/DocumentForm/components/DocumentFormInput';

import {
    createFormSubmit,
    createNewFormSubmit,
    DocumentFormValidate,
    editFormSubmit,
    onDropDocumentImage,
    onDropDocumentImageRejected,
    setDocumentFormValues,
} from 'components/DocumentForm/DocumentForm.utils';
import { getIds } from 'app/(Main)/workers/utils';
import revalidate from 'utils/revalidate';
import { getWorkerDocumentFiles } from 'http/workerService/workerService';

import { SelectDocumentList } from 'components/DocumentForm/data';

import * as T from 'components/DocumentForm/DocumentForm.types';

import scss from './DocumentForm.module.scss';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { errorToastOptions } from 'config/toastConfig';

export const DocumentForm: FC<T.DocumentFormProps> = ({
    document,
    type,
    opacity,
    setVisible,
    visible,
    workerId,
}) => {
    const path = usePathname();

    const [selectedType, setSelectedType] =
        useState<T.SelectDocumentType | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        values,
        setFieldValue,
        handleChange,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        isValid,
        setValues,
        resetForm,
    } = useFormik<T.DocumentFormValues>({
        initialValues: setDocumentFormValues('initial'),
        onSubmit: async (values) => {
            setLoading(true);

            const { id } = getIds(path);
            try {
                if (type === 'create')
                    await createFormSubmit(
                        values,
                        selectedType as T.SelectDocumentType,
                        +id
                    );

                if (type === 'edit')
                    await editFormSubmit(
                        values,
                        selectedType as T.SelectDocumentType,
                        +id,
                        document?.id as number
                    );

                if (type === 'createNew')
                    await createNewFormSubmit(
                        values,
                        selectedType as T.SelectDocumentType,
                        workerId ?? +id,
                        document?.id as number
                    );

                revalidate(path);
                setVisible(false);
            } catch (e) {
                if (e instanceof AxiosError) {
                    toast(e.response?.data.error, errorToastOptions);
                }
            } finally {
                setLoading(false);
            }
        },
        validate: DocumentFormValidate,
    });

    const handleChangeDocumentType = useCallback(
        (documentType: T.SelectDocumentType) => {
            setSelectedType(documentType);
            const newFormValues = setDocumentFormValues(
                documentType.slug,
                type !== 'createNew' ? document : undefined
            ) as T.DocumentFormValues;
            resetForm();
            setValues(newFormValues);
        },
        [document, resetForm, setValues, type]
    );

    const handleDeleteImage = (index: number) => {
        const newArr = values?.images?.filter((img, imgIndex) => {
            return index !== imgIndex;
        });
        setFieldValue('images', newArr);
    };

    useEffect(() => {
        const docType = document?.typeDocument || '';
        const documentType = docType.includes('_')
            ? camelCase(docType)
            : docType;

        const currentDocumentType = SelectDocumentList.find(
            (doc) => doc.slug.toLowerCase() === documentType.toLowerCase()
        );

        if (type === 'edit' && visible) {
            handleChangeDocumentType(currentDocumentType!);
            getWorkerDocumentFiles(document?.id as number).then((files) => {
                const imageUrls = files.results.map(
                    (file) => file.fileDocument
                );
                setFieldValue('images', imageUrls);
            });
        }

        if (type === 'createNew' && visible) {
            handleChangeDocumentType(currentDocumentType!);
        }
    }, [
        document?.id,
        document?.typeDocument,
        handleChangeDocumentType,
        setFieldValue,
        type,
        visible,
    ]);

    useEffect(() => {
        if (!visible) {
            setSelectedType(null);
            resetForm();
        }
    }, [resetForm, visible]);

    const { getRootProps, isDragActive } = useDropzone({
        maxFiles: 3,
        maxSize: 2097152,
        multiple: true,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.pdf', '.doc', '.docx'],
        },
        onDrop: (acceptedFiles) =>
            onDropDocumentImage(acceptedFiles, setFieldValue, values),
        onDropRejected: onDropDocumentImageRejected,
    });

    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}
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
                        Выберите тип документа<span>*</span>
                    </label>
                    <InputSelect
                        disabled={type === 'createNew'}
                        autoComplete="off"
                        listValues={SelectDocumentList}
                        onChange={handleChangeDocumentType}
                        value={selectedType?.name ?? ''}
                        name="documentType"
                        placeholder="Выберите документ"
                    />
                </div>
                {selectedType && (
                    <>
                        {Object.entries(values).map(([key, value], index) => (
                            <DocumentFormInput
                                name={key as T.RequiredDocumentFormValues}
                                value={value}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                touched={touched as T.DocumentFormTouchedType}
                                errors={errors as T.DocumentFormErrorType}
                                key={index}
                            />
                        ))}
                        <div className={scss.worker_form_button}>
                            <Button loading={loading} type="submit">
                                Сохранить
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </motion.div>
    );
};
