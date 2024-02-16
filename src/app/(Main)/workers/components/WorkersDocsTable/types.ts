import { TableProps } from 'app/(Main)/components/Table/types';

interface DocsType {
    typeDocument: string;
    dateEnd: string;
}

export interface TemporaryDataType {
    id: number;
    userInfo: {
        orgId: number;
        name: string;
        subtitle: string;
    };
    docs: DocsType[];
}

export interface WorkersTableProps extends Pick<TableProps, 'paginationData'> {
    tableData: TemporaryDataType[];
    headers: string[];
}

export interface WorkersDocsRowProps extends TemporaryDataType {}
