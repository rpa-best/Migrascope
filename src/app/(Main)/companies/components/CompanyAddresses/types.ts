import { OrgMigrationAddress } from 'http/organizationService/types';
import { Dispatch, SetStateAction } from 'react';

export interface CompanyAddressesProps {
    addresses: OrgMigrationAddress[];
    selectedOrgId: number;
}
export interface AddressItemProps {
    index: number;
    addressId?: number;
    orgId: number;
    name?: string;
    setCurrentAddresses: Dispatch<
        SetStateAction<Partial<OrgMigrationAddress>[]>
    >;
}
