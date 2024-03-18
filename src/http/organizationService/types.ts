import { Response } from 'http/types';
import { OrganizationUser } from 'http/workerService/types';

export interface OrganizationType {
    phone: string;
    id: 0;
    organizationalForm: string;
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    nameDirector: string;
    surnameDirector: string;
    patronymicDirector: string;
    passportSeries: string;
    passportNumber: string;
    issuedWhom: string;
    dateIssuePassport: string;
    dateEndPassport: string;
    fullNameBookkeeper: string;
    fullNameHostParty: string;
    phoneHostParty: string;
    legalAddress: string;
    actualAddress: string[];
    createAt: string;
    owner: number;
    okved: string;
}

export type GetOrganizations = (
    access: string
) => Promise<Response<OrganizationType>>;

export type GetOrganizationsOnClient = () => Promise<
    Response<OrganizationType>
>;

export interface OrgMigrationAddress {
    id: number;
    organization: OrganizationType;
    name: string;
}

export type GetOrganizationAddressesSsr = (
    orgId: number
) => Promise<Response<OrgMigrationAddress>>;

export type CreateOrganizationAddress = (
    organization: number,
    name: string
) => Promise<OrgMigrationAddress>;

export type DeleteOrganizationAddress = (addressId: number) => Promise<void>;

export type EditOrganizationAddress = (
    addressId: number,
    organization: number,
    name: string
) => Promise<OrgMigrationAddress>;

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

export interface EditOrganizationBody {
    organizational_form: number;
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    phone: string;
    legal_address: string;
    name_director: string;
    surname_director: string;
    patronymic_director: string;
    passport_series: string;
    passport_number: string;
    issued_whom: string;
    date_issue_passport: string;
    date_end_passport: string;
    full_name_bookkeeper: string;
    full_name_host_party: string;
    phone_host_party: string;
}

export type EditOrganization = (
    orgId: number,
    body: Partial<EditOrganizationBody>
) => Promise<Response<OrganizationType>>;

interface OrganizationInfo extends Omit<OrganizationType, 'name'> {
    nameOrganization: string;
}

export type GetOrganizationByInfo = (info: string) => Promise<OrganizationInfo>;

export type GetUsers = (orgId: number) => Promise<Response<OrganizationUser>>;

export interface InviteUserBody {
    username: string;
    first_name: string;
    role: string;
}

export type InviteUser = (orgId: number, body: InviteUserBody) => Promise<void>;
