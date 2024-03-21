import { TableProps } from 'app/(Main)/components/Table/types';

interface DocsType {
    documentId: number;
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
    tableData: { results: TemporaryDataType[]; count: number };
    headers: string[];
}

export interface WorkersDocsRowProps extends TemporaryDataType {
    clickedId: number | null;
    setClickedId: (v: number | null) => void;
}

export interface DocumentRowProps extends DocsType {
    workerId: number;
}
