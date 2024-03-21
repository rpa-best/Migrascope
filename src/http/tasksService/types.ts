import { QueryType, Response } from 'http/types';

export interface TaskItem {
    document: string;
    worker: string;
    organization: string;
    documentId: number;
    typeDocument: string;
    workerId: number;
    organizationId: number;
    expirationDate: string;
    daysUntilExpiration: string;
    recommendedStartDate: string;
}

export interface TasksQuery extends QueryType {
    type_document: string;
}

export type GetTasksSsr = (query: TasksQuery) => Promise<TaskItem[]>;

export interface TaskInfo {
    daysUntilExpiration: string;
    overdue: boolean;
    recommendedStartDate: string;
}

export type GetTaskInfo = (docId: number) => Promise<TaskInfo>;
