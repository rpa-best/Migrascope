export interface FindWorkerResponse {
    organizationId: number;
    workerId: number;
    worker: string;
}

export type FindWorker = (name: string | null) => Promise<FindWorkerResponse[]>;
