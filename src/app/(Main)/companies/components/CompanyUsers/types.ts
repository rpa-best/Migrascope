import { OrganizationUser } from 'http/workerService/types';

export interface CompanyUsersProps {
    selectedOrgId: number;
}

export interface CompanyUsersTableProps {
    users: OrganizationUser[];
    headers: string[];
}

export interface CompanyUsersRowProps {
    user: OrganizationUser;
}

export interface CompanyUsersHeaderProps {
    headerName: string;
}
