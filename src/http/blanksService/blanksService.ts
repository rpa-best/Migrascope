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
    return await $clientBlank.post('contract-provision-paid-services/', body);
};
export const sendEmploymentContract: T.SendEmploymentContract = async (
    body
) => {
    return await $clientBlank.post('employment-contract/', body);
};
export const sendNoticeConclusion: T.SendNoticeConclusion = async (body) => {
    return await $clientBlank.post('notice-conclusion/', body);
};
export const sendPaymentOrder: T.SendPaymentOrder = async (body) => {
    return await $clientBlank.post('payment-order/', body);
};

export const sendSuspensionOrder: T.SendSuspensionOrder = async (body) => {
    return await $clientBlank.post('suspension-order/', body);
};
