import { Response } from 'http/types';
import { WorkerDocumentType } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.types';

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

export interface WorkerWithDocuments extends Worker {
    documents: WorkerDocuments[];
}

export interface OrganizationUser {
    id: number;
    role: string;
    user: string;
    organization: number;
}

export interface WorkerDocuments {
    id: number;
    fileDocument: string;
    typeDocument: string;
    series: string;
    number: string;
    dateIssue: string;
    issuedWhom: string;
    territoryAction: string;
    dateEnd: string;
    archive: true;
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

export type GetUsers = (orgId: number) => Promise<Response<OrganizationUser>>;

export type GetWorkers = (orgId: number) => Promise<Response<Worker>>;

export type GetWorkerDocuments = (
    workerId: number
) => Promise<Response<WorkerDocuments>>;

export interface CreateWorkerDocumentBody {
    file_documents: (File | undefined)[];
    type_document: WorkerDocumentType;
    series: string;
    number: string;
    date_issue: string;
    issued_whom: string;
    territory_action: string;
    date_end: string;
}

export type CreateWorkerDocument = (
    workerId: number,
    body: CreateWorkerDocumentBody
) => Promise<void>;

export type DeleteWorkerDocument = (
    workerId: number,
    documentId: number
) => Promise<void>;
