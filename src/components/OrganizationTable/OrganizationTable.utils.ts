import {
    OrganizationWorker,
    WorkerWithDocuments,
} from 'http/organizationService/types';
import { getOrganizationWorkerDocument } from 'http/organizationService/organizationService';

export const formatToTableData = (obj: WorkerWithDocuments[]) => {
    return obj.map((worker) => {
        return {
            id: worker.id,
            userInfo: {
                name: `${worker.name} ${worker.surname}`,
                subtitle: worker.status,
            },
            docs: worker.documents.map((doc) => {
                return {
                    dateEnd: doc.dateEnd,
                    typeDocument: doc.typeDocument,
                };
            }),
        };
    });
};

export const fetchWorkersDocuments = async (workers: OrganizationWorker[]) => {
    return await Promise.all(
        workers.map(async (worker) => {
            const doc = await getOrganizationWorkerDocument(worker.id);
            return {
                ...worker,
                documents: doc.results,
            };
        })
    );
};
