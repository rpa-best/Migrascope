'use client';

import { FC } from 'react';

import { TariffDataType } from 'app/(Main)/components/Tariff/Tariff.consts';

import BaseSvg from 'app/(Main)/components/Tariff/svg/BasePricingCheck.svg';
import AdvancedSvg from 'app/(Main)/components/Tariff/svg/AdvancedPricingCheck.svg';

import scss from 'app/(Main)/components/Tariff/Tariff.module.scss';
import { updateTariff } from 'http/accountService/accountService';
import { toast } from 'react-toastify';
import { warningToastConfig } from 'config/toastConfig';
import { AxiosError } from 'axios';

interface TariffItemProps extends TariffDataType {}

export const TariffItem: FC<TariffItemProps> = ({
    content: { title, description, price },
    type,
    id,
    benefits,
}) => {
    function getPriceSubtitle() {
        if (id === 1) return null;

        return (
            <>
                <span className={scss.price_subtitle}>₽</span>
                <p className={scss.price_description}>/в месяц</p>
            </>
        );
    }

    function getSvg() {
        if (id === 1) return <BaseSvg />;

        return <AdvancedSvg />;
    }

    async function handleSelectTariff() {
        if (type === 'free') return;

        try {
            await updateTariff({ service_rate: type });
        } catch (e) {
            if (e instanceof AxiosError) {
                toast(e.response?.data.error, warningToastConfig);
            }
        }
    }

    return (
        <div
            onClick={handleSelectTariff}
            style={{ backgroundColor: id === 2 ? '#F3F4FF' : '' }}
            className={scss.tariff_item}
        >
            <div className={scss.tariff_description}>
                <h4 data-isfirst={id === 1}>{title}</h4>
                <h3>
                    {price}
                    {getPriceSubtitle()}
                </h3>
                <p>{description}</p>
            </div>
            <div className={scss.tariff_benefits}>
                {benefits.map((el, index) => (
                    <div key={index}>
                        {getSvg()} <p>{el}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
