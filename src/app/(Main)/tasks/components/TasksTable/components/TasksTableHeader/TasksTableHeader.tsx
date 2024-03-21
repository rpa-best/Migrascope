import React, { FC } from 'react';

import { TasksTableHeaderProps } from 'app/(Main)/tasks/components/TasksTable/types';

import scss from 'app/(Main)/tasks/components/TasksTable/TasksTable.module.scss';

export const TasksTableHeader: FC<TasksTableHeaderProps> = ({ header }) => {
    return (
        <td className={scss.tasks_table_header}>
            <p>{header}</p>
        </td>
    );
};
