import { Worker, WorkerWithDocuments } from 'http/workerService/types';
import { getWorkerDocuments } from 'http/workerService/workerService';

export const formatToTableData = (obj: WorkerWithDocuments[]) => {
    return obj.map((worker) => {
        return {
            id: worker.id,
            userInfo: {
                orgId: worker.organization,
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

export const fetchWorkersDocuments = async (workers: Worker[]) => {
    return await Promise.all(
        workers.map(async (worker) => {
            const doc = await getWorkerDocuments(worker.id);
            return {
                ...worker,
                documents: doc.results,
            };
        })
    );
};
