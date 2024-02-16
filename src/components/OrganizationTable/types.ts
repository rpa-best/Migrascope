import {
    OrganizationType,
    OrganizationUser,
} from 'http/organizationService/types';
import React from 'react';
import { TemporaryDataType } from 'app/(Main)/workers/components/WorkersDocsTable/types';

type ChildrenComponentType = React.FC<{
    tableData: (OrganizationUser | TemporaryDataType)[] | null;
}>;

export interface OrganizationTableRowProps {
    id: number;
    name: string;
    clickedId: number | null;
    setClickedId: (id: number | null) => void;
    ChildrenComponent: ChildrenComponentType;
    which: 'workers' | 'users';
    propsToComponent?: { [key: string]: any };
    refresh: boolean;
}

export interface OrgTableWrapperProps {
    orgs: OrganizationType[];
    which: 'workers' | 'users';
    propsToComponent?: { [key: string]: any };
    ChildrenComponent: ChildrenComponentType;
}
