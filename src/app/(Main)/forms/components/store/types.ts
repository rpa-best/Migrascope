import { FindWorkerResponse } from 'http/blanksService/types';
import { InputSelectListType } from 'components/UI/Inputs/InputSelect/types';

export type SearchableWorker = InputSelectListType & FindWorkerResponse;

export interface BlankWorkerStore {
    worker: Partial<SearchableWorker>;
    setWorker: (v: Partial<SearchableWorker>) => void;
}
