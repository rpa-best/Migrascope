import { Response } from 'http/types';

export interface OrganizationType {
    id: 0;
    organizationalForm: string;
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    nameDirector: string;
    surnameDirector: string;
    patronymicDirector: string;
    legalAddress: string;
    actualAddress: string[];
    createAt: string;
    balance: number;
    owner: number;
    bankInfoId: number;
}

export type GetOrganizations = (
    access: string
) => Promise<Response<OrganizationType>>;

export type GetOrganizationsOnClient = () => Promise<
    Response<OrganizationType>
>;

export interface OrganizationWorker {
    id: number;
    registration_address: string;
    name: string;
    surname: string;
    patronymic: string;
    gender: string;
    citizenship: string;
    birthday: string;
    place_birth: string;
    identificationCard: string;
    position: string;
    status: string;
    phone: string;
    email: string;
    avatar: string;
    processingPersonalData: boolean;
    dateDismissal: string;
    organization: number;
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

export interface WorkerWithDocuments extends OrganizationWorker {
    documents: WorkerDocuments[];
}

export type GetOrganizationUsers = (
    orgId: number
) => Promise<Response<OrganizationUser>>;

export type GetOrganizationWorkers = (
    orgId: number
) => Promise<Response<OrganizationWorker>>;

export type GetOrganizationWorkerDocument = (
    workerId: number
) => Promise<Response<WorkerDocuments>>;

export interface CreateOrgBody {
    organizational_form: number;
    name: string;
    inn: string;
    name_director: string;
    surname_director: string;
    patronymic_director: string;
    legal_address: string;
    actual_address: string[];
}

export type CreateOrganization = (
    body: CreateOrgBody
) => Promise<Response<OrganizationType>>;

interface OrganizationInfo extends Omit<OrganizationType, 'name'> {
    nameOrganization: string;
}

export type GetOrganizationByInfo = (info: string) => Promise<OrganizationInfo>;
