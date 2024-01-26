import { AxiosResponse } from 'axios';
import * as T from 'http/organizationService/types';
import { $clientOrganization } from 'http/indexes/clientIndex';
import { snakeToCamelCaseDeep } from 'utils/snakeTOCamelCaseDeep';

export const getServerOrganization: T.GetOrganizations = async (access) => {
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

export const getClientOrganizationByInfo: T.GetOrganizationByInfo = async (
    info
) => {
    const res: AxiosResponse<ReturnType<typeof getClientOrganizationByInfo>> =
        await $clientOrganization.get(`${info}/search-organization/`);

    return res.data;
};

export const getOrganizationUsers: T.GetOrganizationUsers = async (orgId) => {
    const res: AxiosResponse<ReturnType<typeof getOrganizationUsers>> =
        await $clientOrganization.get(`${orgId}/users/`);

    return res.data;
};

export const createOrganization: T.CreateOrganization = async (body) => {
    const res: AxiosResponse<ReturnType<typeof createOrganization>> =
        await $clientOrganization.post('organization/', body);

    return res.data;
};
