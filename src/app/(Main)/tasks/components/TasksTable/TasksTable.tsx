import React, { FC, useMemo } from 'react';

import { TasksTableProps } from 'app/(Main)/tasks/components/TasksTable/types';
import { TasksTableHeader } from 'app/(Main)/tasks/components/TasksTable/components/TasksTableHeader';
import { TasksTableRow } from 'app/(Main)/tasks/components/TasksTable/components/TasksTableRow';
import { Pagination } from 'components/Pagination';

import scss from './TasksTable.module.scss';

export const TasksTable: FC<TasksTableProps> = ({
    headers,
    documents,
    paginationData,
}) => {
    const totalPages = useMemo(() => {
        return paginationData?.total
            ? Math.ceil(paginationData?.total / paginationData.offset)
            : null;
    }, [paginationData?.total, paginationData?.offset]);

    return (
        <>
            <div className={scss.tasks_table_layout}>
                <table className={scss.tasks_table}>
                    <thead className={scss.table_headers}>
                        <tr>
                            {headers.map((header, index) => (
                                <TasksTableHeader key={index} header={header} />
                            ))}
                        </tr>
                    </thead>
                    <tbody className={scss.table_body}>
                        {documents?.map((doc, index) => {
                            return <TasksTableRow key={index} document={doc} />;
                        })}
                    </tbody>
                </table>
                {paginationData.total > paginationData.offset && (
                    <Pagination
                        totalPages={totalPages as number}
                        offset={paginationData.offset}
                    />
                )}
            </div>
        </>
    );
};
