'use client';

import { FC, useEffect, useState } from 'react';

import { Button } from 'components/UI/Buttons/Button';
import { AddressItem } from 'app/(Main)/companies/components/CompanyAddresses/components/AddressItem';

import { OrgMigrationAddress } from 'http/organizationService/types';

import { CompanyAddressesProps } from 'app/(Main)/companies/components/CompanyAddresses/types';

import scss from './CompanyAddresses.module.scss';

export const CompanyAddresses: FC<CompanyAddressesProps> = ({
    addresses,
    selectedOrgId,
}) => {
    const [currentAddresses, setCurrentAddresses] =
        useState<Partial<OrgMigrationAddress>[]>(addresses);

    useEffect(() => {
        setCurrentAddresses(addresses);
    }, [addresses]);

    const handleButtonClick = () => {
        setCurrentAddresses((prevState) => [...prevState, { name: '' }]);
    };

    const buttonDisabled = !currentAddresses.at(-1)?.id && !currentAddresses;

    return (
        <section className={scss.worker_page_section}>
            <div className={scss.worker_page_section_content}>
                <div className={scss.company_migration_addresses_title}>
                    <h3>Адреса органов МВД</h3>
                    <Button
                        disabled={buttonDisabled}
                        onClick={handleButtonClick}
                        style="hollowActive"
                    >
                        Добавить новый адрес
                    </Button>
                </div>
                <div className={scss.addresses_wrapper}>
                    {currentAddresses?.map((address, index) => (
                        <AddressItem
                            setCurrentAddresses={setCurrentAddresses}
                            index={index}
                            name={address.name}
                            addressId={address.id}
                            orgId={selectedOrgId}
                            key={address.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
