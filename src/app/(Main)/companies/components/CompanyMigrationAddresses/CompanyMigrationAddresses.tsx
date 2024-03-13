'use client';

import { FC, useState } from 'react';

import { Button } from 'components/UI/Buttons/Button';
import { MigrationAddressItem } from 'app/(Main)/companies/components/CompanyMigrationAddresses/components/MigrationAddressItem';

import { CompanyMigrationAddressesProps } from 'app/(Main)/companies/components/CompanyMigrationAddresses/types';

import scss from './CompanyMigrationAddresses.module.scss';
import { OrgMigrationAddress } from 'http/organizationService/types';

export const CompanyMigrationAddresses: FC<CompanyMigrationAddressesProps> = ({
    addresses,
    selectedOrgId,
}) => {
    const [currentAddresses, setCurrentAddresses] =
        useState<Partial<OrgMigrationAddress>[]>(addresses);

    const handleButtonClick = () => {
        setCurrentAddresses((prevState) => [...prevState, { name: '' }]);
    };

    return (
        <section className={scss.worker_page_section}>
            <div className={scss.worker_page_section_content}>
                <div className={scss.company_migration_addresses_title}>
                    <h3>Адреса миграционного учета</h3>
                    <Button onClick={handleButtonClick} style="hollowActive">
                        Добавить новый адрес
                    </Button>
                </div>
                <div className={scss.addresses_wrapper}>
                    {currentAddresses?.map((address, index) => (
                        <MigrationAddressItem
                            setCurrentAddresses={setCurrentAddresses}
                            index={index}
                            name={address.name}
                            addressId={address.id}
                            orgId={selectedOrgId}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
