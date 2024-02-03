import * as T from './types';
import { AxiosResponse } from 'axios';
import { $clientWorker } from 'http/indexes/clientIndex';

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
