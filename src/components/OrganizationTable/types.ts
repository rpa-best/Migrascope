import { OrganizationType } from 'http/organizationService/types';
import React from 'react';

export interface OrganizationTableRowProps {
    id: number;
    name: string;
    clickedId: number | null;
    setClickedId: (id: number | null) => void;
    children: React.ReactElement;
}

export interface OrgTableWrapperProps {
    orgs: OrganizationType[];
    children: React.ReactElement;
}
