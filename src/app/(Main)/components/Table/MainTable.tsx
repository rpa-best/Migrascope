'use client';

import React, { useState, createContext, memo, useMemo } from 'react';

import { ColumnHeader } from 'app/(Main)/components/Table/ColumnHeader';

import {
    IHeader,
    ITableContext,
    TableProps,
} from 'app/(Main)/components/Table/types';

import scss from './Table.module.scss';
import { Pagination } from 'components/Pagination';
import { Row } from 'app/(Main)/components/Table/Row';

export const TableContext = createContext<ITableContext | null>(null);

export const MainTable = memo(function MemoTable({
    tableData,
    children,
    paginationData,
}: TableProps) {
    const [headers, setHeaders] = useState<IHeader[]>([]);

    const totalPages = useMemo(() => {
        return paginationData?.count
            ? Math.ceil(paginationData?.count / paginationData.offset)
            : null;
    }, [paginationData?.count, paginationData?.offset]);

    return (
        <>
            <div className={scss.table_wrapper}>
                <table className={scss.table}>
                    <thead className={scss.table_headers}>
                        <tr>
                            {headers.map((el, index) => (
                                <ColumnHeader
                                    key={index}
                                    headerName={el.name}
                                />
                            ))}
                        </tr>
                    </thead>
                    <TableContext.Provider
                        value={{
                            setHeaders,
                        }}
                    >
                        <tbody className={scss.table_body}>
                            {tableData?.map((item, index) => {
                                return (
                                    <tr key={index} className={scss.table_row}>
                                        <Row item={item} headers={headers} />
                                    </tr>
                                );
                            })}
                        </tbody>
                        {children}
                    </TableContext.Provider>
                </table>
            </div>
            {paginationData?.count &&
                paginationData.count > paginationData.offset && (
                    <Pagination
                        totalPages={totalPages as number}
                        offset={paginationData.offset}
                    />
                )}
        </>
    );
});
