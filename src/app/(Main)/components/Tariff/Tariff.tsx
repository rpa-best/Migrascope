import { TariffExpenses } from 'app/(Main)/components/Tariff/components/TariffExpenses';

import { TariffData } from 'app/(Main)/components/Tariff/Tariff.consts';
import { TariffItem } from 'app/(Main)/components/Tariff/components/TariffItem';

import scss from './Tariff.module.scss';

export const Tariff = () => {
    return (
        <div>
            <TariffExpenses />
            <div className={scss.tariff_wrapper}>
                {TariffData.map((tariff, index) => (
                    <TariffItem {...tariff} key={index} />
                ))}
            </div>
        </div>
    );
};
