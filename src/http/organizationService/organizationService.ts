import { AxiosResponse } from 'axios';
import {
    CreateOrganization,
    GetOrganizations,
    GetOrganizationUsers,
} from 'http/organizationService/types';
import { $clientOrganization } from 'http/indexes/clientIndex';
import { snakeToCamelCaseDeep } from 'utils/snakeTOCamelCaseDeep';

export const getServerOrganization: GetOrganizations = async (access) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ORGANIZATION_API_URL}organization/`,
        {
            headers: {
                Authorization: `Bearer ${access}`,
            },
            method: 'GET',
            next: {
                tags: ['server-organization'],
            },
        }
    );
    const parsedRes = await response.json();
    snakeToCamelCaseDeep(parsedRes);
    return parsedRes;
};

export const getOrganizationUsers: GetOrganizationUsers = async (orgId) => {
    const res: AxiosResponse<ReturnType<typeof getOrganizationUsers>> =
        await $clientOrganization.get(`${orgId}/users/`);

    return res.data;
};

export const createOrganization: CreateOrganization = async (body) => {
    const res: AxiosResponse<ReturnType<typeof createOrganization>> =
        await $clientOrganization.post('organization/', body);

    return res.data;
};
