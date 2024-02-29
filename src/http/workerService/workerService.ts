import * as T from './types';
import { AxiosResponse } from 'axios';
import { $clientOrganization, $clientWorker } from 'http/indexes/clientIndex';
import { snakeToCamelCaseDeep } from 'utils/snakeTOCamelCaseDeep';
import { $serverWorker } from 'http/indexes/serverIndex';

export const createWorker: T.CreateWorker = async (body) => {
    const WorkerFormData = new FormData();

    for (const [key, value] of Object.entries(body)) {
        WorkerFormData.append(key, value);
    }

    const workers: AxiosResponse<ReturnType<typeof createWorker>> =
        await $clientWorker.post(`create/`, WorkerFormData);

    return workers.data;
};

export const updateWorker: T.UpdateWorker = async (workerId, body) => {
    const WorkerFormData = new FormData();

    for (const [key, value] of Object.entries(body)) {
        if (key === 'avatar' && typeof value === 'string') {
            continue;
        }
        if (!value) {
            continue;
        }
        WorkerFormData.append(key, value as any);
    }

    const workers: AxiosResponse<ReturnType<typeof updateWorker>> =
        await $clientWorker.patch(`update/${workerId}/`, WorkerFormData);

    return workers.data;
};

export const getWorkerSsr: T.GetWorker = async (orgId, workerId, access) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORKER_API_URL}${orgId}/list/${workerId}/`,
        {
            headers: {
                Authorization: `Bearer ${access}`,
            },
            method: 'GET',
            next: {
                tags: ['server-worker'],
            },
        }
    );
    const parsedRes = await response.json();
    snakeToCamelCaseDeep(parsedRes);
    return parsedRes;
};

export const getUsers: T.GetUsers = async (orgId) => {
    const res: AxiosResponse<ReturnType<typeof getUsers>> =
        await $clientOrganization.get(`${orgId}/users/`);

    return res.data;
};

export const getWorkers: T.GetWorkers = async (orgId) => {
    const res: AxiosResponse<ReturnType<typeof getWorkers>> =
        await $clientWorker.get(`${orgId}/list/`);

    return res.data;
};

export const getWorkerDocuments: T.GetWorkerDocuments = async (workerId) => {
    const res: AxiosResponse<ReturnType<typeof getWorkerDocuments>> =
        await $clientWorker.get(`${workerId}/document/`);

    return res.data;
};

export const getWorkerDocumentsSsr: T.GetWorkerDocuments = async (workerId) => {
    const res: AxiosResponse<ReturnType<typeof getWorkerDocuments>> =
        await $serverWorker.get(`${workerId}/document/`);

    return res.data;
};

export const createWorkerDocument: T.CreateWorkerDocument = async (
    workerId,
    body
) => {
    const formDataBody = new FormData();
    for (const [key, value] of Object.entries(body)) {
        if (key === 'file_documents') {
            value.map((img: File) => {
                formDataBody.append(key, img);
            });
            continue;
        }
        if (!value) {
            continue;
        }

        formDataBody.append(key, value);
    }
    return await $clientWorker.post(`${workerId}/document/`, formDataBody);
};

export const deleteWorkerDocument: T.DeleteWorkerDocument = async (
    workerId,
    documentId
) => {
    return await $clientWorker.delete(`${workerId}/document/${documentId}`);
};
