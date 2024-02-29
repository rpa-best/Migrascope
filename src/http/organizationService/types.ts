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
