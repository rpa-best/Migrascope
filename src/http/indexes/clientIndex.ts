import axios, { AxiosError } from 'axios';
import {
    handleStatus,
    setClientBearer,
    toCamelCase,
} from 'http/indexes/helpers';

export const $account = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ACCOUNT_API_URL,
});

export const $clientOrganization = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ORGANIZATION_API_URL,
});

export const $clientWorker = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WORKER_API_URL,
});

export const $clientBlank = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BLANK_API_URL,
});

export const $clientTask = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TASK_API_URL,
});

[
    $account,
    $clientOrganization,
    $clientWorker,
    $clientBlank,
    $clientTask,
].forEach((item) => {
    item.interceptors.request.use(async (req) => setClientBearer(req));

    item.interceptors.response.use(
        (res) => toCamelCase(res),
        (error: AxiosError) => handleStatus(error)
    );
});
