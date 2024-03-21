import React, { FC } from 'react';

import { TasksTableProps } from 'app/(Main)/tasks/components/TasksTable/types';
import { TasksTableHeader } from 'app/(Main)/tasks/components/TasksTable/components/TasksTableHeader';
import { TasksTableRow } from 'app/(Main)/tasks/components/TasksTable/components/TasksTableRow';

import scss from './TasksTable.module.scss';

export const TasksTable: FC<TasksTableProps> = ({ headers, documents }) => {
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
            </div>
        </>
    );
};
