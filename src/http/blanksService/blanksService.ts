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

export const sendCPPS: T.SendCPPS = async (body) => {
    const res: AxiosResponse<ReturnType<typeof sendCPPS>> =
        await $clientBlank.post('contract-provision-paid-services/', body, {
            responseType: 'blob',
        });

    return res.data;
};
export const sendEmploymentContract: T.SendEmploymentContract = async (
    body
) => {
    const res: AxiosResponse<ReturnType<typeof sendEmploymentContract>> =
        await $clientBlank.post('employment-contract/', body, {
            responseType: 'blob',
        });

    return res.data;
};
export const sendNoticeConclusion: T.SendNoticeConclusion = async (body) => {
    const res: AxiosResponse<ReturnType<typeof sendNoticeConclusion>> =
        await $clientBlank.post('notice-conclusion/', body, {
            responseType: 'blob',
        });

    return res.data;
};
export const sendPaymentOrder: T.SendPaymentOrder = async (body) => {
    const res: AxiosResponse<ReturnType<typeof sendPaymentOrder>> =
        await $clientBlank.post('payment-order/', body, {
            responseType: 'blob',
        });

    return res.data;
};

export const sendSuspensionOrder: T.SendSuspensionOrder = async (body) => {
    const res: AxiosResponse<ReturnType<typeof sendSuspensionOrder>> =
        await $clientBlank.post('suspension-order/', body, {
            responseType: 'blob',
        });
    return res.data;
};
