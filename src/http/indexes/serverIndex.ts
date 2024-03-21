'use server';

import axios from 'axios';

import { toCamelCase } from 'http/indexes/helpers';
import { setServerBearer } from 'http/indexes/serverHelper';

export const $serverAccount = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ACCOUNT_API_URL,
});

export const $serverOrganization = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ORGANIZATION_API_URL,
});

export const $serverWorker = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WORKER_API_URL,
});

export const $serverBlank = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BLANK_API_URL,
});

export const $serverTask = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TASK_API_URL,
});

export const $serverNews = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEWS_API_URL,
});

[
    $serverAccount,
    $serverOrganization,
    $serverWorker,
    $serverBlank,
    $serverTask,
    $serverNews,
].forEach((instance) => {
    instance.interceptors.request.use(async (req) => setServerBearer(req));
    instance.interceptors.response.use((res) => toCamelCase(res));
});
