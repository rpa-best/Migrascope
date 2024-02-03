import { Response } from 'http/types';

interface Worker {
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

export type CreateWorker = (body: CreateWorkerBody) => Promise<void>;
