'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { Button } from 'components/UI/Buttons/Button';
import { Input } from 'components/UI/Inputs/Input';

import revalidateTagOnClient from 'utils/revalidateTagOnClient';
import { AddCompanyValidate } from 'components/AddCompany/AddCompany.utils';
import {
    createOrganization,
    getClientOrganizationByInfo,
} from 'http/organizationService/organizationService';

import { OrgFormData } from 'components/AddCompany/tempData';

import {
    AddCompanyProps,
    AddCompanyValues,
    OrgFormType,
} from 'components/AddCompany/types';
import { AxiosError } from 'axios';
import { CreateOrgBody } from 'http/organizationService/types';

import ExitSvg from '/public/svg/x.svg';

import scss from './AddCompany.module.scss';

export const AddCompany: React.FC<AddCompanyProps> = ({
    opacity,
    visible,
    setVisible,
}) => {
    /*  const [addressesCount, setAddressesCount] = useState(1);*/
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: AddCompanyValues) => {
        setLoading(true);
        try {
            const body: CreateOrgBody = {
                name: values.orgName,
                inn: values.inn,
                actual_address: values.actualAddress,
                legal_address: values.legalAddress,
                name_director: values.directorName,
                organizational_form: values.orgForm?.id as number,
                patronymic_director: values.directorPatronymic,
                surname_director: values.directorSurname,
            };
            await createOrganization(body);
            revalidateTagOnClient('server-organization');
            setVisible(false);
        } finally {
            setLoading(false);
        }
    };

    const {
        values,
        handleChange,
        resetForm,
        setFieldValue,
        handleBlur,
        errors,
        setFieldTouched,
        handleSubmit,
        setValues,
        setFieldError,
        touched,
    } = useFormik<AddCompanyValues>({
        initialValues: {
            inn: '',
            directorName: '',
            directorPatronymic: '',
            directorSurname: '',
            orgForm: null,
            orgName: '',
            actualAddress: '',
            legalAddress: '',
        },
        validate: AddCompanyValidate,
        onSubmit,
    });

    const handleInputSubmit = async () => {
        try {
            const info = await getClientOrganizationByInfo(values.inn);
            setValues({
                directorName: info.nameDirector,
                directorPatronymic: info.patronymicDirector,
                orgName: info.nameOrganization,
                orgForm: OrgFormData.find(
                    (el) => el.name === info.organizationalForm
                ) as OrgFormType,
                inn: info.inn,
                legalAddress: info.legalAddress,
                actualAddress: info.actualAddress,
                directorSurname: info.surnameDirector,
            });
            toast('Организация успешно найдена', {
                type: 'success',
            });
        } catch (e) {
            if (e instanceof AxiosError) {
                await setFieldTouched('inn', true);
                errors.inn = e.response?.data.error;
            }
        }
    };

    useEffect(() => {
        if (!visible) {
            resetForm();
            /*setAddressesCount(1);
            values.actualAddress = [''];*/
        }
    }, [resetForm, visible]);

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ opacity }}
            transition={{ duration: 1 }}
            className={scss.company_wrapper}
        >
            <div className={scss.company_header}>
                <h3>Информация о новой компании</h3>
                <ExitSvg
                    onClick={() => {
                        setVisible(false);
                    }}
                    className={scss.exit_svg}
                />
            </div>
            <div className={scss.search_wrapper}>
                <label htmlFor="search">
                    Можно найти организацию по ИНН или ОГРН
                </label>
                <div className={scss.search}>
                    <Input
                        needErrorLabel={false}
                        submitButton={{
                            onClick: () => handleInputSubmit(),
                            text: 'Поиск',
                        }}
                        onBlur={() => {
                            setFieldTouched('inn', true);
                        }}
                        placeholder="Укажите ИНН/ОГРН"
                        bgColor="white"
                        value={values.inn}
                        name="search"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const value = event.target.value;
                            const isNumber = /^\d+$/.test(value);
                            if (!value) {
                                setFieldValue('inn', '');
                            }
                            if (isNumber) {
                                setFieldValue('inn', value);
                            }
                        }}
                    />
                    {touched.inn && (
                        <label className={scss.search_error}>
                            {errors.inn}
                        </label>
                    )}
                </div>
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Название<span>*</span>
                </label>

                <InputSelect
                    listValues={OrgFormData}
                    onChange={(selectedForm) => {
                        setFieldValue('orgForm', selectedForm);
                    }}
                    onBlur={handleBlur}
                    handleError={touched.orgForm && errors.orgForm}
                    placeholder="Организационно-правовая форма"
                    value={values.orgForm?.name ?? ''}
                    name="orgForm"
                />
                <Input
                    handleError={touched.orgName && errors.orgName}
                    value={values.orgName}
                    placeholder="Название"
                    onBlur={handleBlur}
                    name="orgName"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Юридический адрес<span>*</span>
                </label>

                <Input
                    handleError={touched.legalAddress && errors.legalAddress}
                    value={values.legalAddress}
                    onBlur={handleBlur}
                    placeholder="Юридический адрес"
                    name="legalAddress"
                    onChange={handleChange}
                />
            </div>
            <div className={scss.input_wrapper}>
                <label>
                    Фактический адрес<span>*</span>
                </label>
                <Input
                    handleError={
                        touched.actualAddress &&
                        (errors.actualAddress as string)
                    }
                    value={values.actualAddress}
                    placeholder="Фактический адрес"
                    onBlur={handleBlur}
                    name="actualAddress"
                    onChange={handleChange}
                />
                {/* <div className={scss.addresses_wrapper}>
                    {Array.from({ length: addressesCount }).map((el, index) => (
                        <div className={scss.address_input_wrapper} key={index}>
                            <Input
                                handleError={
                                    touched.actualAddress &&
                                    (errors.actualAddress as string)
                                }
                                value={values.actualAddress[index]}
                                placeholder="Фактический адрес"
                                onBlur={handleBlur}
                                name="actualAddress"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    const newArr = values.actualAddress.map(
                                        (el, actIndex) => {
                                            if (actIndex === index) {
                                                return e.target.value;
                                            } else {
                                                return el;
                                            }
                                        }
                                    );
                                    setFieldValue('actualAddress', newArr);
                                }}
                            />
                            {index !== 0 &&
                                index === values.actualAddress.length - 1 && (
                                    <XSvg
                                        onClick={() => {
                                            values.actualAddress =
                                                values.actualAddress.slice(
                                                    0,
                                                    index
                                                );
                                            setAddressesCount((c) => c - 1);
                                        }}
                                    />
                                )}
                        </div>
                    ))}
                    <Button
                        style="hollowActive"
                        onClick={() => {
                            values.actualAddress[addressesCount] = '';
                            setAddressesCount((c) => c + 1);
                        }}
                    >
                        Добавить фактический адресс
                    </Button>
                </div>*/}
            </div>

            <div className={scss.input_wrapper}>
                <label>
                    Руководитель<span>*</span>
                </label>

                <Input
                    handleError={
                        touched.directorSurname && errors.directorSurname
                    }
                    value={values.directorSurname}
                    placeholder="Фамилия"
                    onBlur={handleBlur}
                    name="directorSurname"
                    onChange={handleChange}
                />
                <Input
                    handleError={touched.directorName && errors.directorName}
                    value={values.directorName}
                    placeholder="Имя"
                    onBlur={handleBlur}
                    name="directorName"
                    onChange={handleChange}
                />
                <Input
                    handleError={
                        touched.directorPatronymic && errors.directorPatronymic
                    }
                    onBlur={handleBlur}
                    value={values.directorPatronymic}
                    placeholder="Отчество"
                    name="directorPatronymic"
                    onChange={handleChange}
                />
            </div>
            <Button loading={loading} type="submit">
                Сохранить
            </Button>
        </motion.form>
    );
};
