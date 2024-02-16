'use client';

import React, { memo } from 'react';

import { ColumnHeader } from 'app/(Main)/components/Table/ColumnHeader';
import { Row } from 'app/(Main)/workers/components/WorkersDocsTable/Row';
import { Pagination } from 'components/Pagination';
import { WorkersTableProps } from 'app/(Main)/workers/components/WorkersDocsTable/types';

import scss from 'app/(Main)/workers/components/WorkersDocsTable/WorkersDocsTable.module.scss';

export const WorkersDocsTable = memo(function MemoTable({
    tableData,
    paginationData,
    headers,
}: WorkersTableProps) {
    return (
        <>
            <div className={scss.worker_docs_table_wrapper}>
                <table className={scss.worker_docs_table}>
                    <thead className={scss.table_headers}>
                        <tr>
                            {headers.map((el, index) => (
                                <ColumnHeader key={index} headerName={el} />
                            ))}
                        </tr>
                    </thead>
                    <tbody className={scss.table_body}>
                        {tableData?.map((item, index) => {
                            return <Row key={index} {...item} />;
                        })}
                    </tbody>
                </table>
            </div>
            {paginationData?.totalPages && (
                <Pagination totalPages={paginationData.totalPages} />
            )}
        </>
    );
});
