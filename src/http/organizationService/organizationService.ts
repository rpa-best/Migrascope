import { AxiosResponse } from 'axios';
import * as T from 'http/organizationService/types';
import { $clientOrganization, $clientWorker } from 'http/indexes/clientIndex';
import { snakeToCamelCaseDeep } from 'utils/snakeTOCamelCaseDeep';
import { $serverWorker } from 'http/indexes/serverIndex';

export const getServerOrganization: T.GetOrganizations = async (access) => {
    try {
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
        if (response.status !== 200) {
            throw new Error(
                'failed to fetch Organization status: ' + response.status
            );
        }
        const parsedRes = await response.json();
        snakeToCamelCaseDeep(parsedRes);
        return parsedRes;
    } catch (e) {
        console.log(e);
    }
};

export const getOrganizationOnClient: T.GetOrganizationsOnClient = async () => {
    const res: AxiosResponse<ReturnType<typeof getOrganizationOnClient>> =
        await $clientOrganization.get(`organization/`);

    return res.data;
};

export const getClientOrganizationByInfo: T.GetOrganizationByInfo = async (
    info
) => {
    const res: AxiosResponse<ReturnType<typeof getClientOrganizationByInfo>> =
        await $clientOrganization.get(`${info}/search-organization/`);

    return res.data;
};

export const createOrganization: T.CreateOrganization = async (body) => {
    const res: AxiosResponse<ReturnType<typeof createOrganization>> =
        await $clientOrganization.post('organization/', body);

    return res.data;
};
