'use client';

import React, { memo, useState } from 'react';

import { ColumnHeader } from 'app/(Main)/components/Table/ColumnHeader';
import { Row } from 'app/(Main)/workers/components/WorkersDocsTable/Row';
import { Pagination } from 'components/Pagination';
import { WorkersTableProps } from 'app/(Main)/workers/components/WorkersDocsTable/types';

import scss from 'app/(Main)/workers/components/WorkersDocsTable/WorkersDocsTable.module.scss';

export const WorkersDocsTable = memo(function MemoTable({
    tableData,
    headers,
}: WorkersTableProps) {
    const [clickedId, setClickedId] = useState<number | null>(null);

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
                        {tableData?.results.map((item, index) => {
                            return (
                                <Row
                                    clickedId={clickedId}
                                    setClickedId={setClickedId}
                                    key={index}
                                    {...item}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {tableData.count > 15 && (
                <Pagination offset={1} totalPages={tableData.count} />
            )}
        </>
    );
});
