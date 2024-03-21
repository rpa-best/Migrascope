'use client';

import { MainTable } from 'app/(Main)/components/Table/MainTable';
import { Column } from 'app/(Main)/components/Table/Column';

import scss from './MainTableWrapper.module.scss';
import { FC } from 'react';
import { MainTableWrapperProps } from 'app/(Main)/components/MainTableWrapper/types';

export const MainTableWrapper: FC<MainTableWrapperProps> = ({ tableData }) => {
    return (
        <>
            <div className={scss.table_title_wrapper}>
                <h3 className={scss.table_title}>ООО Что-то</h3>
                <span className={scss.table_title_role}>Владелец</span>
            </div>
            <MainTable
                paginationData={{ count: tableData.count, offset: 15 }}
                tableData={tableData.results}
            >
                <Column field="firstName" header="Имя пользователя" />
                <Column field="role" header="Роль в команде" />
                <Column field="user" header="Почта" />
                <Column field="phone" header="Телефон" />
            </MainTable>
        </>
    );
};
