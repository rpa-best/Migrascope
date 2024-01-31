import * as T from './types';
import { AxiosResponse } from 'axios';
import { $clientWorker } from 'http/indexes/clientIndex';

export const getWorkers: T.GetWorkers = async (org) => {
    const workers: AxiosResponse<ReturnType<typeof getWorkers>> =
        await $clientWorker(`${org}/worker`);

    return workers.data;
};
