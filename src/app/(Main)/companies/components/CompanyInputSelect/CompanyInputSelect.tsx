'use client';
import { FC, useState } from 'react';

import { InputSelect } from 'components/UI/Inputs/InputSelect';

import { OrganizationType } from 'http/organizationService/types';

import scss from './CompanyInputSelect.module.scss';
import { useSearchQuery } from 'hooks/useSearchQuery';
import { useEditCompanyStore } from 'app/(Main)/companies/components/CompanyProfile/store/editCompanyStore';

interface CompanyInputSelect {
    organizationsList: OrganizationType[];
    selectedOrg: OrganizationType;
}

export const CompanyInputSelect: FC<CompanyInputSelect> = ({
    organizationsList,
    selectedOrg,
}) => {
    const [setIsEdit] = useEditCompanyStore((state) => [state.setIsEdit]);
    const [selectedValue, setSelectedValue] =
        useState<OrganizationType>(selectedOrg);
    const { setSearchParams, deleteSearchParams } = useSearchQuery();

    const handleOrganizationChange = (org: OrganizationType) => {
        deleteSearchParams('offset');
        setSelectedValue(org);
        setSearchParams('org', String(org.id));
        setIsEdit(false);
    };

    return (
        <div className={scss.org_input_select}>
            <InputSelect
                name="organization"
                value={selectedValue.name}
                listValues={organizationsList}
                onChange={handleOrganizationChange}
            />
        </div>
    );
};
