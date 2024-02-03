import { TableProps } from 'app/(Main)/components/Table/types';
import { TemporaryDataType } from 'app/(Main)/workers/components/WorkersDocsTable/tempData';

export interface WorkersTableProps extends Pick<TableProps, 'paginationData'> {
    tableData: TemporaryDataType[];
    headers: string[];
}

export interface WorkersDocsRowProps extends TemporaryDataType {}
