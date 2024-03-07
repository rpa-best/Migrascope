import * as T from 'http/blanksService/types';
import { AxiosResponse } from 'axios';
import { $clientBlank } from 'http/indexes/clientIndex';

export const findWorker: T.FindWorker = async (name) => {
    const params = new URLSearchParams();

    params.append('limit', '30');
    name && params.append('search', name);

    const res: AxiosResponse<ReturnType<typeof findWorker>> =
        await $clientBlank.get(`search-workers`, { params });

    return res.data;
};
