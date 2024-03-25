import { AxiosResponse } from 'axios';
import * as T from 'http/organizationService/types';
import { $clientOrganization } from 'http/indexes/clientIndex';
import { snakeToCamelCaseDeep } from 'utils/snakeTOCamelCaseDeep';
import { $serverOrganization } from 'http/indexes/serverIndex';
import { setQuery } from 'utils/setQuery';

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
    async (orgId) => {
        const res: AxiosResponse<
            ReturnType<typeof getOrganizationAddressesSsr>
        > = await $serverOrganization.get(`${orgId}/migration-address/`);

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
    const res: AxiosResponse<ReturnType<typeof deleteOrganizationAddresses>> =
        await $clientOrganization.delete(`migration-address/${addressId}`);

    return res.data;
};

export const editOrganizationAddresses: T.EditOrganizationAddress = async (
    addressId,
    organization,
    name
) => {
    const res: AxiosResponse<ReturnType<typeof editOrganizationAddresses>> =
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

export const getUsersSsr: T.GetUsers = async (orgId, query) => {
    const params = setQuery(query);

    const res: AxiosResponse<ReturnType<typeof getUsersSsr>> =
        await $serverOrganization.get(`${orgId}/users/`, { params });

    return res.data;
};
export const getUsers: T.GetUsers = async (orgId, query) => {
    const params = setQuery(query);
    const res: AxiosResponse<ReturnType<typeof getUsersSsr>> =
        await $clientOrganization.get(`${orgId}/users/`, { params });

    return res.data;
};

export const editUser: T.EditUser = async (userId, orgId, body) => {
    const res: AxiosResponse<ReturnType<typeof editUser>> =
        await $clientOrganization.patch(`${orgId}/users/${userId}/`, body);

    return res.data;
};

export const inviteUser: T.InviteUser = async (orgId, body) => {
    const res: AxiosResponse<ReturnType<typeof inviteUser>> =
        await $clientOrganization.post(`${orgId}/users/`, body);

    return res.data;
};
