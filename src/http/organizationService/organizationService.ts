import { AxiosResponse } from 'axios';
import {
    CreateOrganization,
    GetOrganizations,
} from 'http/organizationService/types';
import { $serverOrganization } from 'http/indexes/serverIndex';
import { $clientOrganization } from 'http/indexes/clientIndex';

export const getServerOrganization: GetOrganizations = async () => {
    const res: AxiosResponse<ReturnType<typeof getServerOrganization>> =
        await $serverOrganization.get('organization/');

    return res.data;
};

export const createOrganization: CreateOrganization = async (body) => {
    const res: AxiosResponse<ReturnType<typeof createOrganization>> =
        await $clientOrganization.post('organization/', body);

    return res.data;
};
