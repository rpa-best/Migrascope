import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { Input } from 'components/UI/Inputs/Input';

import { MainSectionProps } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';

import {
    deleteBank,
    getBanks,
    getOrgBankByBic,
} from 'http/organizationService/organizationService';
import { toast } from 'react-toastify';
import { Button } from 'components/UI/Buttons/Button';
import { successToastConfig, warningToastConfig } from 'config/toastConfig';
import { AxiosError } from 'axios';

import scss from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyEditForm.module.scss';

export const BankSection: FC<MainSectionProps> = ({
    isEdit,
    touched,
    errors,
    setFieldTouched,
    values,
    handleChange,
    orgId,
    handleBlur,
    setFieldValue,
}) => {
    useEffect(() => {
        (async () => {
            const banks = await getBanks(orgId);
            setFieldValue('bankInfo', banks.results);
        })();
    }, [orgId, setFieldValue]);

    const handleInputSubmit = async (bicNumber: string, index: number) => {
        try {
            const { correspondentAccount, nameBank, cityBank, bic } =
                await getOrgBankByBic(bicNumber);
            const newBankInfoValues = values.bankInfo.map((bank, i) => {
                if (i === index) {
                    return {
                        ...bank,
                        cityBank,
                        correspondentAccount,
                        nameBank,
                    };
                }
                return bank;
            });
            toast('Успешно', successToastConfig);

            setFieldValue('bankInfo', newBankInfoValues);
        } catch (e) {
            if (e instanceof AxiosError) {
                toast(e.response?.data.error, warningToastConfig);
            }
        }
    };

    const handleButtonClick = () => {
        const newBankInfo: (typeof values.bankInfo)[0] = {
            bic: '',
            cityBank: '',
            correspondentAccount: '',
            nameBank: '',
            paymentAccount: '',
        };
        setFieldValue('bankInfo', [...values.bankInfo, newBankInfo]);
    };

    const handleDeleteCLick = async (index: number) => {
        const selectedBank = values.bankInfo.find((_, i) => i === index)!;

        if (selectedBank.id) {
            await deleteBank(selectedBank.id, orgId);
        }
        const newBankInfo = values.bankInfo.filter((_, i) => i !== index);

        setFieldValue('bankInfo', newBankInfo);
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const key = e.target.name;
        const value = e.target.value;

        const newBankInfoValues = values.bankInfo.map((bank, i) => {
            if (i === index) {
                return { ...bank, [key]: value };
            }
            return bank;
        });

        setFieldValue('bankInfo', newBankInfoValues);
    };

    return (
        <section className={scss.company_edit_form_section}>
            <h3>Расчётные счета</h3>
            {values.bankInfo?.map((bank, index) => (
                <div key={index} className={scss.company_edit_form_inputs}>
                    <>
                        <div
                            data-isdisabled={!isEdit}
                            className={scss.company_edit_form_search_wrapper}
                        >
                            {isEdit && (
                                <label htmlFor="search">
                                    Можно найти банковские реквизиты по Бик
                                </label>
                            )}
                            <div className={scss.company_edit_form_input_full}>
                                <div>
                                    <Input
                                        disabled={!isEdit}
                                        style="empty"
                                        needErrorLabel={false}
                                        submitButton={{
                                            onClick: () =>
                                                handleInputSubmit(
                                                    values.bankInfo[index].bic,
                                                    index
                                                ),
                                            text: 'Поиск',
                                        }}
                                        onBlur={() => {
                                            setFieldTouched('bic', true);
                                        }}
                                        placeholder="Не указано"
                                        bgColor="transparent"
                                        value={bank.bic}
                                        name="search"
                                        onChange={(
                                            event: ChangeEvent<HTMLInputElement>
                                        ) => {
                                            const newEvent = {
                                                ...event,
                                                target: {
                                                    ...event.target,
                                                    name: 'bic',
                                                },
                                            };
                                            handleInputChange(newEvent, index);
                                        }}
                                    />
                                    <label style={{ marginLeft: '10px' }}>
                                        БИК
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={scss.company_edit_form_input}>
                            <Input
                                placeholder="Не указано"
                                disabled={!isEdit}
                                onBlur={handleBlur}
                                needErrorLabel={false}
                                style="empty"
                                value={bank.nameBank}
                                name="nameBank"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(e, index)
                                }
                            />
                            <label>Название банка</label>
                        </div>
                        <div className={scss.company_edit_form_input}>
                            <Input
                                placeholder="Не указано"
                                disabled={!isEdit}
                                onBlur={handleBlur}
                                needErrorLabel={false}
                                type="number"
                                style="empty"
                                value={bank.correspondentAccount}
                                name="correspondentAccount"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(e, index)
                                }
                            />
                            <label>Корреспондентский счёт</label>
                        </div>
                        <div className={scss.company_edit_form_input}>
                            <Input
                                placeholder="Не указано"
                                disabled={!isEdit}
                                onBlur={handleBlur}
                                needErrorLabel={false}
                                style="empty"
                                value={bank.cityBank}
                                name="cityBank"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(e, index)
                                }
                            />
                            <label>Город банка</label>
                        </div>
                        <div className={scss.company_edit_form_input}>
                            <Input
                                placeholder="Не указано"
                                disabled={!isEdit}
                                onBlur={handleBlur}
                                needErrorLabel={false}
                                type="number"
                                style="empty"
                                value={bank.paymentAccount}
                                name="paymentAccount"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(e, index)
                                }
                            />
                            <label>Расчётный счёт</label>
                        </div>
                    </>

                    <div className={scss.add_bic_button_wrapper}>
                        {values.bankInfo.length !== 0 && isEdit && (
                            <Button
                                style="hollowActive"
                                onClick={() => handleDeleteCLick(index)}
                                css={{
                                    fontSize: '20px',
                                    height: '30px',
                                    minHeight: '30px',
                                    width: 'max-content',
                                    padding: '0 15px',
                                }}
                            >
                                -
                            </Button>
                        )}
                        {index === values.bankInfo.length - 1 && isEdit && (
                            <Button
                                onClick={handleButtonClick}
                                css={{
                                    height: '30px',
                                    minHeight: '30px',
                                    width: 'max-content',
                                    padding: '12px 18px',
                                }}
                                svg="plus"
                            >
                                {''}
                            </Button>
                        )}
                    </div>
                </div>
            ))}
            {values.bankInfo.length === 0 && isEdit && (
                <div className={scss.add_bic_button_wrapper_first}>
                    <Button
                        onClick={handleButtonClick}
                        css={{
                            height: '30px',
                            minHeight: '30px',
                            width: 'max-content',
                            padding: '12px 18px',
                        }}
                        svg="plus"
                    >
                        {''}
                    </Button>
                </div>
            )}
        </section>
    );
};
