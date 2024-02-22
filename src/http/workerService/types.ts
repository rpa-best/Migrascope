import { Response } from 'http/types';

export interface Worker {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    gender: string;
    citizenship: string;
    birthday: string;
    position: string;
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

export interface UpdateWorkerBody {
    avatar: string | File;
    registration_address: string;
    identification_card: string;
    name: string;
    surname: string;
    patronymic: string;
    gender: 'male' | 'female';
    citizenship: string;
    birthday: string;
    place_birth: string;
    position: string;
    status: string;
    phone: string;
    email: string;
    processing_personal_data: boolean;
    date_dismissal: string;
    organization: number;
}

export type CreateWorker = (body: CreateWorkerBody) => Promise<void>;

export type UpdateWorker = (
    workerId: number,
    body: Partial<UpdateWorkerBody>
) => Promise<void>;

export type GetWorker = (
    orgId: number,
    workerId: number,
    access: string
) => Promise<Worker>;
