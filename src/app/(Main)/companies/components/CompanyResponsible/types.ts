import { ResponsibleType } from 'http/organizationService/types';

export interface CompanyResponsibleProps {
    selectedOrgId: number;
    offset?: string;
}

export interface CompanyResponsibleTableProps {
    responsible: { results: ResponsibleType[]; count: number };
    headers: string[];
}

export interface CompanyResponsibleRowProps {
    responsible: ResponsibleType;
}

export interface CompanyResponsibleHeaderProps {
    headerName: string;
}
