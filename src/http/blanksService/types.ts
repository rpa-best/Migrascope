import { Response } from 'http/types';

export interface FindWorkerResponse {
    organizationId: number;
    workerId: number;
    worker: string;
}

export type FindWorker = (name: string | null) => Promise<FindWorkerResponse[]>;

export interface ManagerType {
    managerId: number;
    fullName: string;
}

export type GetManagers = (orgId: number) => Promise<ManagerType[]>;

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

export interface SendNoticeTerminationBody {
    worker_id: string;
    name_territorial_body: string;
    position: string;
    base: string;
    end_date: string;
    initiator: true;
    person: string;
    full_name: string;
    series: string;
    number: string;
    date_issue: string;
    issued_by: string;
}

export type SendNoticeTermination = (
    body: SendNoticeTerminationBody
) => Promise<Blob>;

interface SendNoticeArrivalBody {
    document_type: string;
    series: string;
    number: string;
    date_issue: string;
    validity_period: string;
    purpose_departure: string;
    position: string;
    duration_stay: string;
    address_former_place_residence: string;
    place_stay_region: string;
    place_stay_area: string;
    place_stay_city: string;
    place_stay_street: string;
    object_type: string;
    place_stay_house: string;
    place_stay_frame: string;
    place_stay_structure: string;
    room_type: string;
    place_stay_apartment: string;
    stated_period_stay: string;
    place_stay: string;
    document_right_use: string;
    receiving_side: string;
    surname_receiving_side: string;
    name_receiving_side: string;
    patronymic_receiving_side: string;
    type_of_identity_document: string;
    series_receiving_side: string;
    number_receiving_side: string;
    date_issue_receiving_side: string;
    sell_by_receiving_side: string;
    region: string;
    area: string;
    city: string;
    street: string;
    house: string;
    frame: string;
    structure: string;
    apartment: string;
}

export type SendNoticeArrival = (body: SendNoticeArrivalBody) => Promise<Blob>;
