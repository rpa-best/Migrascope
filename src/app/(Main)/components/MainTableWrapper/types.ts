import { OrganizationUser } from 'http/workerService/types';

export interface MainTableWrapperProps {
    tableData: { results: OrganizationUser[]; count: number };
}
