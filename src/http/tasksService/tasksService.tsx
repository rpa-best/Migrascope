import * as T from './types';
import { AxiosResponse } from 'axios';
import { $serverTask } from 'http/indexes/serverIndex';
import { $clientTask } from 'http/indexes/clientIndex';
import { setQuery } from 'utils/setQuery';

export const getTasksSsr: T.GetTasksSsr = async (query) => {
    const params = setQuery(query);

    const res: AxiosResponse<ReturnType<typeof getTasksSsr>> =
        await $serverTask.get('list', { params });

    return res.data;
};

export const getTasksInfoSsr: T.GetTaskInfo = async (docId) => {
    const res: AxiosResponse<ReturnType<typeof getTasksInfoSsr>> =
        await $serverTask.get(`info/${docId}`);

    return res.data;
};

export const getTasksInfo: T.GetTaskInfo = async (docId) => {
    const res: AxiosResponse<ReturnType<typeof getTasksInfo>> =
        await $clientTask.get(`info/${docId}`);

    return res.data;
};

export const getTasksCount = async () => {
    const res: AxiosResponse<{ number: number }> =
        await $clientTask.get('number');

    return res.data;
};
