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

export const getOrganizationMiaAddressesSsr: T.GetOrganizationMiaAddressesSsr =
    async (orgId) => {
        const res: AxiosResponse<
            ReturnType<typeof getOrganizationMiaAddressesSsr>
        > = await $serverOrganization.get(`${orgId}/bodies-mia/`);

        return res.data;
    };

export const createOrganizationMiaAddresses: T.CreateOrganizationAddress =
    async (organization, name) => {
        const res: AxiosResponse<
            ReturnType<typeof createOrganizationMiaAddresses>
        > = await $clientOrganization.post('bodies-mia/', {
            organization,
            name,
        });

        return res.data;
    };

export const deleteOrganizationMiaAddresses: T.DeleteOrganizationAddress =
    async (addressId) => {
        const res: AxiosResponse<
            ReturnType<typeof deleteOrganizationMiaAddresses>
        > = await $clientOrganization.delete(`bodies-mia/${addressId}`);

        return res.data;
    };

export const editOrganizationMiaAddresses: T.EditOrganizationAddress = async (
    addressId,
    organization,
    name
) => {
    const res: AxiosResponse<ReturnType<typeof editOrganizationMiaAddresses>> =
        await $clientOrganization.patch(`bodies-mia/${addressId}/`, {
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
