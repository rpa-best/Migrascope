import { AxiosResponse } from 'axios';
import * as T from 'http/organizationService/types';
import { $clientOrganization } from 'http/indexes/clientIndex';
import { snakeToCamelCaseDeep } from 'utils/snakeTOCamelCaseDeep';
import { $serverOrganization } from 'http/indexes/serverIndex';

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

export const getOrganizationAddressesSsr: T.GetOrganizationAddressesSsr =
    async () => {
        const res: AxiosResponse<
            ReturnType<typeof getOrganizationAddressesSsr>
        > = await $serverOrganization.get('migration-address/');

        return res.data;
    };

export const createOrganizationAddresses: T.CreateOrganizationAddress = async (
    organization,
    name
) => {
    const res: AxiosResponse<ReturnType<typeof createOrganizationAddresses>> =
        await $clientOrganization.post('migration-address/', {
            organization,
            name,
        });

    return res.data;
};

export const deleteOrganizationAddresses: T.DeleteOrganizationAddress = async (
    addressId
) => {
    const res: AxiosResponse<ReturnType<typeof createOrganizationAddresses>> =
        await $clientOrganization.delete(`migration-address/${addressId}`);

    return res.data;
};

export const editOrganizationAddresses: T.EditOrganizationAddress = async (
    addressId,
    organization,
    name
) => {
    const res: AxiosResponse<ReturnType<typeof createOrganizationAddresses>> =
        await $clientOrganization.patch(`migration-address/${addressId}/`, {
            organization,
            name,
        });

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

export const editOrganization: T.EditOrganization = async (orgId, body) => {
    const res: AxiosResponse<ReturnType<typeof editOrganization>> =
        await $clientOrganization.patch(`organization/${orgId}/`, body);

    return res.data;
};
