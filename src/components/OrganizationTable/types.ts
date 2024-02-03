import {
    OrganizationType,
    OrganizationUser,
} from 'http/organizationService/types';
import React from 'react';

export interface OrganizationTableRowProps {
    id: number;
    name: string;
    clickedId: number | null;
    setClickedId: (id: number | null) => void;
    ChildrenComponent: React.FC<{ users: OrganizationUser[] | null }>;
    propsToComponent?: { [key: string]: any };
    refresh: boolean;
}

export interface OrgTableWrapperProps {
    orgs: OrganizationType[];
    propsToComponent?: { [key: string]: any };
    ChildrenComponent: React.FC<{ users: OrganizationUser[] | null }>;
}
