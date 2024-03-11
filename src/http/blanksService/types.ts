export interface FindWorkerResponse {
    organizationId: number;
    workerId: number;
    worker: string;
}

export type FindWorker = (name: string | null) => Promise<FindWorkerResponse[]>;

export interface SendCPPSBody {
    worker_id: string;
    number: string;
    start_date: string;
    end_date: string;
    address: string;
    services: [
        {
            name: string;
            price: string;
        },
    ];
}

export type SendCPPS = (body: SendCPPSBody) => Promise<Blob>;

export interface SendEmploymentContractBody {
    worker_id: string;
    number: string;
    position: string;
    salary: string;
    contract_type: string;
    start_date: string;
    end_date_urgent: string;
    start_time: string;
    end_time: string;
    cause: string;
}

export type SendEmploymentContract = (
    body: SendEmploymentContractBody
) => Promise<Blob>;

export interface SendNoticeConclusionBody {
    worker_id: string;
    name_territorial_body: string;
    position: string;
    base: string;
    start_date: string;
    address: string;
    person: string;
    full_name: string;
    series: string;
    number: string;
    date_issue: string;
    issued_by: string;
}

export type SendNoticeConclusion = (
    body: SendNoticeConclusionBody
) => Promise<Blob>;

export interface SendPaymentOrderBody {
    worker_id: string;
    number_months: string;
}

export type SendPaymentOrder = (body: SendPaymentOrderBody) => Promise<Blob>;

export interface SendSuspensionOrderBody {
    worker_id: string;
    number: string;
    start_date: string;
    reason_suspension: string;
    first_manager_id: string;
    second_manager_id: string;
}

export type SendSuspensionOrder = (
    body: SendSuspensionOrderBody
) => Promise<Blob>;
