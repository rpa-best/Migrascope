'use client';

import { FC } from 'react';

import { DocumentCard } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentCards/components/DocumentCard';
import { useViewDocumentsStore } from 'app/(Main)/workers/[id]/components/WorkerDocuments/store/viewDocumentsStore';

import type { WorkerDocuments } from 'http/workerService/types';

import scss from 'app/(Main)/workers/[id]/components/WorkerDocuments/WorkerDocuments.module.scss';
import clsx from 'clsx';

export const DocumentCards: FC<{ documents: WorkerDocuments[] }> = ({
    documents,
}) => {
    const [view] = useViewDocumentsStore((state) => [state.view]);

    const documentCardsClass = clsx({
        [scss.documents_cards]: view === 'grid',
        [scss.documents_cards_column]: view === 'column',
    });

    return documents.length === 0 ? (
        <div className={scss.documents_empty}>
            <p>Тут пока что пусто :(</p>
        </div>
    ) : (
        <div className={documentCardsClass}>
            {documents.map((el, index) => (
                <DocumentCard key={index} index={index} document={el} />
            ))}
        </div>
    );
};
