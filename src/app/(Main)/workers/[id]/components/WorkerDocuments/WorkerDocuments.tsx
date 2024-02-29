import { DocumentCard } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentCard';
import { DocumentTooltipWrapper } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentTooltipWrapper';

import { getWorkerDocumentsSsr } from 'http/workerService/workerService';

import scss from './WorkerDocuments.module.scss';

export const WorkerDocuments = async ({ workerId }: { workerId: number }) => {
    const documents = await getWorkerDocumentsSsr(workerId);

    return (
        <div className={scss.documents_wrapper}>
            <DocumentTooltipWrapper />
            {documents.results.length === 0 ? (
                <div className={scss.documents_empty}>
                    <p>Тут пока что пусто :(</p>
                </div>
            ) : (
                <div className={scss.documents_cards}>
                    {documents.results.map((el, index) => (
                        <DocumentCard key={index} index={index} document={el} />
                    ))}
                </div>
            )}
        </div>
    );
};
