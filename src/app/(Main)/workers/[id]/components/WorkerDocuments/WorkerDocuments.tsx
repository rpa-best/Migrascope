import { DocumentCard } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentCard';
import { DocumentTooltipWrapper } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentTooltipWrapper';

import { getOrganizationWorkerDocumentSsr } from 'http/organizationService/organizationService';

import { docsTempData } from 'app/(Main)/workers/[id]/components/WorkerDocuments/tempData';

import scss from './WorkerDocuments.module.scss';

export const WorkerDocuments = async ({ workerId }: { workerId: number }) => {
    const documents = await getOrganizationWorkerDocumentSsr(workerId);

    if (documents.results.length !== 0) {
        return (
            <div className={scss.documents_empty}>
                <p>Тут пока что пусто :(</p>
            </div>
        );
    }

    return (
        <div className={scss.documents_wrapper}>
            <DocumentTooltipWrapper />
            <div className={scss.documents_cards}>
                {docsTempData.map((el, index) => (
                    <DocumentCard key={index} index={index} document={el} />
                ))}
            </div>
        </div>
    );
};
