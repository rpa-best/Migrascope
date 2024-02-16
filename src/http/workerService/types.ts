import { Response } from 'http/types';

export interface Worker {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    gender: string;
    citizenship: string;
    birthday: string;
    placeBirth: string;
    identificationCard: string;
    status: string;
    phone: string;
    registrationAddress: string;
    email: string;
    avatar: string;
    processingPersonalData: boolean;
    dateDismissal: string;
    organization: number;
}

export type GetWorkers = (org: string) => Promise<Response<Worker>>;

export interface CreateWorkerBody {
    avatar: File;
    organization: number;
    name: string;
    surname: string;
    patronymic: string;
    citizenship: string;
    identification_card: string;
    phone: string;
    email: string;
}

export interface UpdateWorkerBody extends Omit<CreateWorkerBody, 'avatar'> {
    avatar: string | File;
}

export type CreateWorker = (body: CreateWorkerBody) => Promise<void>;

export type UpdateWorker = (
    workerId: number,
    body: UpdateWorkerBody
) => Promise<void>;

export type GetWorker = (orgId: number, workerId: number) => Promise<Worker>;
