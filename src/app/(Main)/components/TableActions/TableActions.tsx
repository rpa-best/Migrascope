'use client';

import React from 'react';

import { SelectTableType } from 'app/(Main)/components/MainTableWrapper/components/SelectTableType';

import scss from 'app/(Main)/components/MainTableWrapper/MainTableWrapper.module.scss';

export const TableActions = () => {
    return (
        <div className={scss.table_actions}>
            <SelectTableType />
        </div>
    );
};
