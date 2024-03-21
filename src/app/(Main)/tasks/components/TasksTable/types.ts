import { TaskInfo, TaskItem } from 'http/tasksService/types';

export interface TaskItemWithInfo extends TaskItem, TaskInfo {}

export interface TasksTableProps {
    headers: string[];
    documents: TaskItemWithInfo[];
}

export interface TasksTableHeaderProps {
    header: string;
}

export interface TasksTableRowProps {
    document: TaskItemWithInfo;
}
