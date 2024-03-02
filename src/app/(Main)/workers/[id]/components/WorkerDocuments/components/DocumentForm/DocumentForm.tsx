'use client';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';

import { DropImage } from 'components/DropImage/DropImage';
import { Button } from 'components/UI/Buttons/Button';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { DocumentFormInput } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/components/DocumentFormInput';

import { getIds } from 'app/(Main)/workers/utils';
import revalidate from 'utils/revalidate';
import {
    createFormSubmit,
    DocumentFormValidate,
    editFormSubmit,
    onDropDocumentImage,
    onDropDocumentImageRejected,
    setDocumentFormValues,
} from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.utils';
import { errorToastOptions } from 'config/toastConfig';
import { SelectDocumentList } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/data';

import {
    DocumentFormProps,
    DocumentFormValues,
    DocumentFormErrorType,
    SelectDocumentType,
    DocumentFormTouchedType,
    RequiredDocumentFormValues,
} from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.types';
import { ImageType } from 'components/DropImage/types';

import scss from './DocumentForm.module.scss';
import { getWorkerDocumentFiles } from 'http/workerService/workerService';

export const DocumentForm: FC<DocumentFormProps> = ({
    document,
    type,
    opacity,
    setVisible,
    visible,
}) => {
    const path = usePathname();

    const [selectedType, setSelectedType] = useState<SelectDocumentType | null>(
        null
    );
    const [loading, setLoading] = useState(false);

    const {
        values,
        setFieldValue,
        handleChange,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setValues,
        resetForm,
    } = useFormik<DocumentFormValues>({
        initialValues: setDocumentFormValues('initial'),
        onSubmit: async (values) => {
            setLoading(true);

            const { id } = getIds(path);
            try {
                if (type === 'create') {
                    await createFormSubmit(
                        values,
                        selectedType as SelectDocumentType,
                        +id
                    );
                } else {
                    await editFormSubmit(
                        values,
                        selectedType as SelectDocumentType,
                        +id,
                        document?.id as number
                    );
                }
                revalidate(path);
                setVisible(false);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        },
        validate: DocumentFormValidate,
    });

    const handleChangeDocumentType = useCallback(
        (documentType: SelectDocumentType) => {
            setSelectedType(documentType);
            const newFormValues = setDocumentFormValues(
                documentType.slug,
                document
            ) as DocumentFormValues;
            resetForm();
            setValues(newFormValues);
        },
        [document, resetForm, setValues]
    );

    const handleDeleteImage = (index: number) => {
        const newArr = values?.images?.filter((img, imgIndex) => {
            return index !== imgIndex;
        });
        setFieldValue('images', newArr);
    };

    useEffect(() => {
        if (type === 'edit' && visible) {
            const currentDocumentType = SelectDocumentList.find(
                (doc) => doc.slug === document?.typeDocument
            );
            handleChangeDocumentType(currentDocumentType!);
            getWorkerDocumentFiles(document?.id as number).then((files) => {
                const imageUrls = files.results.map(
                    (file) => file.fileDocument
                );
                setFieldValue('images', imageUrls);
            });
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                opacity,
            }}
            onTransitionEnd={() => {}}
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
                                name={key as RequiredDocumentFormValues}
                                value={value}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                touched={touched as DocumentFormTouchedType}
                                errors={errors as DocumentFormErrorType}
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
