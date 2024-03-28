import { DocumentTooltipWrapper } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentTooltipWrapper';

import { getWorkerDocumentsSsr } from 'http/workerService/workerService';
import { WorkerDocumentsActions } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/WorkerDocumentsActions';

import scss from './WorkerDocuments.module.scss';
import { DocumentCards } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentCards';

export const WorkerDocuments = async ({ workerId }: { workerId: number }) => {
    const documents = await getWorkerDocumentsSsr(workerId);

    return (
        <section className={scss.worker_page_section}>
            <div className={scss.worker_page_section_header}>
                <h2>Документы сотрудника</h2>
                <WorkerDocumentsActions />
            </div>
            <div className={scss.worker_page_section_content}>
                <div className={scss.documents_wrapper}>
                    <DocumentTooltipWrapper />
                    <DocumentCards documents={documents.results} />
                </div>
            </div>
        </section>
    );
};
