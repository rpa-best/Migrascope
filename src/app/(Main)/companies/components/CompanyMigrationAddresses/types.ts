import { OrgMigrationAddress } from 'http/organizationService/types';
import { Dispatch, SetStateAction } from 'react';

export interface CompanyMigrationAddressesProps {
    addresses: OrgMigrationAddress[];
    selectedOrgId: number;
}
export interface MigrationAddressItemProps {
    index: number;
    addressId?: number;
    orgId: number;
    name?: string;
    setCurrentAddresses: Dispatch<
        SetStateAction<Partial<OrgMigrationAddress>[]>
    >;
}
