import { Input } from 'components/UI/Inputs/Input';

import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { usePathname } from 'next/navigation';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { Button } from 'components/UI/Buttons/Button';

import {
    AddCompanyUserFormValidate,
    CompanyUserFormSubmit,
    setInitialCompanyUserFormValues,
} from 'app/(Main)/companies/components/CompanyUsers/components/AddCompanyUser/components/AddCompanyUserForm/AddCompanyUserForm.utils';

import ExitSvg from '/public/svg/x.svg';
import { RolesConst } from 'const/RolesConst';

import {
    AddCompanyUserFormProps,
    AddCompanyUserFormValues,
} from 'app/(Main)/companies/components/CompanyUsers/components/AddCompanyUser/components/AddCompanyUserForm/AddCompanyUserForm.types';

import scss from './AddCompanyUserForm.module.scss';

export const AddCompanyUserForm: FC<AddCompanyUserFormProps> = ({
    opacity,
    visible,
    setVisible,
    orgId,
    user,
    type,
}) => {
    const [loading, setLoading] = useState(false);
    const path = usePathname();

    const {
        handleSubmit,
        setFieldValue,
        handleBlur,
        values,
        errors,
        touched,
        handleChange,
        isValid,
        resetForm,
    } = useFormik<AddCompanyUserFormValues>({
        initialValues: setInitialCompanyUserFormValues(user),
        validate: AddCompanyUserFormValidate,
        onSubmit: async () => {
            await CompanyUserFormSubmit(
                orgId,
                values,
                setLoading,
                setVisible,
                errors,
                path,
                type,
                user?.id
            );
        },
    });

    useEffect(() => {
        if (!visible) {
            resetForm();
        }
    }, [resetForm, visible]);

    return (
        <motion.form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            style={{ opacity }}
            transition={{ duration: 1 }}
            className={scss.company_wrapper}
        >
            <div className={scss.company_header}>
                <div>
                    <h3>Пригласить работника</h3>
                    <h4 className={scss.add_company_form_subtitle}>
                        Заполните недостающие поля, чтобы они отобразились в
                        бланке
                    </h4>
                </div>
                {type !== 'edit' && (
                    <ExitSvg
                        onClick={() => {
                            setVisible(false);
                        }}
                        className={scss.exit_svg}
                    />
                )}
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Электронная почта<span>*</span>
                </label>

                <Input
                    handleError={touched.username && errors.username}
                    value={values.username}
                    placeholder="Электронная почта"
                    onBlur={handleBlur}
                    name="username"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Имя<span>*</span>
                </label>

                <Input
                    handleError={touched.firstName && errors.firstName}
                    value={values.firstName}
                    placeholder="Имя"
                    onBlur={handleBlur}
                    name="firstName"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Фамилия<span>*</span>
                </label>

                <Input
                    handleError={touched.surname && errors.surname}
                    value={values.surname}
                    placeholder="Фамилия"
                    onBlur={handleBlur}
                    name="surname"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Отчество<span>*</span>
                </label>

                <Input
                    handleError={touched.patronymic && errors.patronymic}
                    value={values.patronymic}
                    placeholder="Отчество"
                    onBlur={handleBlur}
                    name="patronymic"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Роль в компании<span>*</span>
                </label>

                <InputSelect
                    listValues={RolesConst.slice(1)}
                    onChange={(selectedRole) => {
                        setFieldValue('role', selectedRole);
                    }}
                    onBlur={handleBlur}
                    handleError={touched.role && errors.role}
                    placeholder="Выбрать"
                    value={values.role?.name ?? ''}
                    name="role"
                />
            </div>
            <Button disabled={!isValid} loading={loading} type="submit">
                {type === 'edit' ? 'Сохранить' : 'Пригласить'}
            </Button>
        </motion.form>
    );
};
