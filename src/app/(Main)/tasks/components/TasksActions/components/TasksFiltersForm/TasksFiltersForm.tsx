'use client';
import React, { FC, useEffect } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';

import { InputSelect } from 'components/UI/Inputs/InputSelect';

import { SelectDocumentList } from 'components/DocumentForm/data';

import {
    TasksFiltersFormProps,
    TasksFiltersFormValues,
} from 'app/(Main)/tasks/components/TasksActions/components/TasksFiltersForm/TasksFiltersForm.types';

import scss from './TasksFiltersForm.module.scss';
import { Button } from 'components/UI/Buttons/Button';
import { useSearchQuery } from 'hooks/useSearchQuery';

export const TasksFiltersForm: FC<TasksFiltersFormProps> = ({
    opacity,
    setVisible,
    visible,
}) => {
    const { has, setSearchParams, deleteSearchParams, getSearchParams } =
        useSearchQuery();

    const onSubmit = (values: TasksFiltersFormValues) => {
        setSearchParams('type_document', values.type_document?.slug as string);
        setVisible(false);
    };

    const handleClear = () => {
        deleteSearchParams('type_document');
        deleteSearchParams('search');
        resetForm();
        setVisible(false);
    };

    const { values, setFieldValue, handleSubmit, resetForm } =
        useFormik<TasksFiltersFormValues>({
            initialValues: { type_document: null },
            onSubmit,
        });

    useEffect(() => {
        if (visible && has('type_document')) {
            values.type_document = SelectDocumentList.find(
                (el) => el.slug === getSearchParams('type_document')
            )!;
        }
    }, [getSearchParams, has, values, visible]);

    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            style={{
                opacity,
            }}
            transition={{ duration: 1 }}
            className={scss.tasks_filter_form_wrapper}
        >
            <form onSubmit={handleSubmit}>
                <h3 className={scss.document_form_title}>Фильтрация</h3>
                <div className={scss.input_wrapper}>
                    <label>
                        Выберите тип документа<span>*</span>
                    </label>
                    <InputSelect
                        autoComplete="off"
                        listValues={SelectDocumentList}
                        onChange={(type) =>
                            setFieldValue('type_document', type)
                        }
                        value={values.type_document?.name ?? ''}
                        name="type_document"
                        placeholder="Выберите документ"
                    />
                </div>
                <div className={scss.filters_buttons}>
                    <div className={scss.worker_form_button}>
                        <Button type="submit">Сохранить</Button>
                    </div>
                    <div className={scss.worker_form_button}>
                        <Button
                            onClick={handleClear}
                            style="gray"
                            type="button"
                        >
                            Очистить
                        </Button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};
