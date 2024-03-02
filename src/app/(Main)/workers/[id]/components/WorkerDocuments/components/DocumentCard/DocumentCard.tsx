'use client';

import { FC, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import revalidate from 'utils/revalidate';

import { Button } from 'components/UI/Buttons/Button';
import { DocumentForm } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm';
import { Tooltip } from 'components/Tooltip';

import {
    deleteWorkerDocument,
    getWorkerDocumentFiles,
} from 'http/workerService/workerService';
import { getIds } from 'app/(Main)/workers/utils';
import { useResizeWidth } from 'hooks/useResizeWidth';
import {
    getDocumentLabel,
    getDocumentName,
} from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.utils';

import WorkerEditSvg from 'app/(Main)/workers/[id]/svg/edit-2.svg';
import XSvg from '/public/svg/x.svg';

import { WorkerDocuments } from 'http/workerService/types';
import {
    RequiredDocumentFormValues,
    WorkerDocumentType,
} from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm/DocumentForm.types';

import scss from 'app/(Main)/workers/[id]/components/WorkerDocuments/WorkerDocuments.module.scss';
import { saveAs } from 'file-saver';

interface DocumentCard {
    index: number;
    document: WorkerDocuments;
}

const keysToExclude = ['archive', 'id', 'typeDocument'];

export const DocumentCard: FC<DocumentCard> = ({ index, document }) => {
    const path = usePathname();
    const { tabletBreak, bigTabletBreak, fullHdBreak, thousandTwoBreak } =
        useResizeWidth();

    const customXOffset = useMemo(() => {
        if (tabletBreak) {
            return -600;
        }

        if (bigTabletBreak) {
            return -550;
        }

        if (thousandTwoBreak) {
            return -250;
        }

        if (fullHdBreak) {
            return index % 3 === 0 ? -100 : -250;
        }

        return -220;
    }, [bigTabletBreak, fullHdBreak, index, tabletBreak, thousandTwoBreak]);

    const handleDownloadFiles = async () => {
        const files = await getWorkerDocumentFiles(document.id);
        saveAs(files.results[0].fileDocument, 'image.jpg');
    };

    return (
        <div className={scss.document_card_wrapper}>
            <div className={scss.document_card_header}>
                <h5>
                    {getDocumentName(
                        document.typeDocument as WorkerDocumentType
                    )}
                </h5>
                <div className={scss.document_card_actions}>
                    <Tooltip
                        customXOffset={customXOffset}
                        needResize={true}
                        propsToComponent={{ type: 'edit', document }}
                        RenderedComponent={DocumentForm as any}
                    >
                        <WorkerEditSvg />
                    </Tooltip>
                    <XSvg
                        onClick={async () => {
                            const { id } = getIds(path);
                            await deleteWorkerDocument(+id, +document.id);
                            revalidate(path);
                        }}
                    />
                </div>
            </div>
            <div className={scss.document_card_content}>
                {Object.entries(document).map(([key, value], index) => {
                    if (keysToExclude.includes(key)) {
                        return;
                    }
                    return (
                        value && (
                            <p key={index} style={{ marginBottom: '3px' }}>
                                {getDocumentLabel(
                                    key as RequiredDocumentFormValues
                                )}
                                : <span>{value}</span>
                            </p>
                        )
                    );
                })}
            </div>
            <div className={scss.content_buttons}>
                <Button onClick={handleDownloadFiles}>Скачать</Button>
                <Button style="hollowActive">Загрузить новый</Button>
            </div>
        </div>
    );
};
