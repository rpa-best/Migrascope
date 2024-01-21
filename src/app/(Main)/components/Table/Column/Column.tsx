'use client';

import React, { useContext, useEffect } from 'react';

import { TableContext } from 'app/(Main)/components/Table/MainTable';

import { ColumnProps, ITableContext } from 'app/(Main)/components/Table/types';

export const Column: React.FC<ColumnProps> = ({ header, field }) => {
    const { setHeaders } = useContext<ITableContext | null>(
        TableContext
    ) as ITableContext;

    useEffect(() => {
        setHeaders((prevHeaders) => {
            const currentHeader = { field: field, name: header };
            if (prevHeaders.some((h) => h.name === header)) {
                return prevHeaders;
            }

            return [...prevHeaders, currentHeader];
        });
    }, [field, header, setHeaders]);

    return null;
};
