import React from 'react';

import { ColumnHeaderProps } from 'app/(Main)/components/Table/types';

import scss from 'app/(Main)/workers/components/WorkersDocsTable/WorkersDocsTable.module.scss';

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ headerName }) => {
    return <td className={scss.worker_docs_header}>{headerName}</td>;
};
