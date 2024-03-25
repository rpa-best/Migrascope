import { OrganizationUser } from 'http/workerService/types';

export interface CompanyUsersProps {
    selectedOrgId: number;
    offset?: string;
}

export interface CompanyUsersTableProps {
    users: { results: OrganizationUser[]; count: number };
    headers: string[];
}

export interface CompanyUsersRowProps {
    user: OrganizationUser;
}

export interface CompanyUsersHeaderProps {
    headerName: string;
}
