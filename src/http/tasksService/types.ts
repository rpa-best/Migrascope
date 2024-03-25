import { QueryType, Response } from 'http/types';

export interface TaskItem {
    id: number;
    document: string;
    worker: string;
    organization: string;
    typeDocument: string;
    workerId: number;
    organizationId: number;
    dateEnd: string;
    daysUntilExpiration: string;
    issuedWhom: string | null;
    territoryAction: string | null;
    recommendedStartDate: string;
}

export interface TasksQuery extends QueryType {
    type_document: string;
}

export type GetTasksSsr = (query: TasksQuery) => Promise<Response<TaskItem>>;

export interface TaskInfo {
    daysUntilExpiration: string;
    overdue: boolean;
    recommendedStartDate: string;
}

export type GetTaskInfo = (docId: number) => Promise<TaskInfo>;
