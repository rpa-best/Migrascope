import React, { ChangeEvent, FC } from 'react';
import { Input } from 'components/UI/Inputs/Input';
import { Button } from 'components/UI/Buttons/Button';

import XSvg from '/public/svg/x.svg';

import { ServicesInputProps } from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';

import scss from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.module.scss';

export const ServicesInput: FC<ServicesInputProps> = ({
    values,
    servicesCount,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setServicesCount,
}) => {
    const handleDeleteRow = (index: number) => {
        values.services = values.services?.slice(0, index);
        setServicesCount((c) => c - 1);
    };

    const handleChangeInput = (
        e: ChangeEvent<HTMLInputElement>,
        type: 'name' | 'price',
        index: number
    ) => {
        const newArr = values.services?.map((el, actIndex) => {
            if (actIndex === index) {
                el[type] = e.target.value;
            }
            return el;
        });
        setFieldValue('services', newArr);
    };

    return (
        <>
            <label className={scss.input_title}>Услуги*</label>
            {Array.from({ length: servicesCount }).map((_, index, self) => {
                const lastElement = index === self.length - 1 && index !== 0;

                return (
                    <div
                        style={{ paddingRight: lastElement ? '30px' : '0' }}
                        className={scss.services_input_wrapper}
                        key={index}
                    >
                        <Input
                            handleError={touched.services && errors.services}
                            value={values.services![index]?.name ?? ''}
                            placeholder="Укажите название"
                            onBlur={handleBlur}
                            name="services"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleChangeInput(e, 'name', index)
                            }
                        />
                        <Input
                            handleError={touched.services && errors.services}
                            value={values.services![index]?.price ?? ''}
                            placeholder="Укажите цену"
                            onBlur={handleBlur}
                            name="services"
                            type="number"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleChangeInput(e, 'price', index)
                            }
                        />
                        {lastElement && (
                            <XSvg onClick={() => handleDeleteRow(index)} />
                        )}
                    </div>
                );
            })}
            <div className={scss.add_service_button}>
                <Button
                    style="hollowActive"
                    onClick={() => {
                        values.services![servicesCount] = {
                            name: '',
                            price: '0',
                        };
                        setServicesCount((c) => c + 1);
                    }}
                >
                    Добавить услугу
                </Button>
            </div>
        </>
    );
};
