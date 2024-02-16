import * as T from './types';
import { AxiosResponse } from 'axios';
import { $clientWorker } from 'http/indexes/clientIndex';
import { $serverWorker } from 'http/indexes/serverIndex';

export const getWorkers: T.GetWorkers = async (org) => {
    const workers: AxiosResponse<ReturnType<typeof getWorkers>> =
        await $clientWorker.get(`${org}/worker`);

    return workers.data;
};
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
        WorkerFormData.append(key, value);
    }

    const workers: AxiosResponse<ReturnType<typeof updateWorker>> =
        await $clientWorker.patch(`update/${workerId}/`, WorkerFormData);

    return workers.data;
};

export const getWorkerSsr: T.GetWorker = async (orgId, workerId) => {
    const res: AxiosResponse<ReturnType<typeof getWorkerSsr>> =
        await $serverWorker.get(`${orgId}/list/${workerId}/`);

    return res.data;
};
