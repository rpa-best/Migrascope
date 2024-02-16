'use client';

import { FC, useMemo } from 'react';

import { Button } from 'components/UI/Buttons/Button';
import { DocumentForm } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm';
import { Tooltip } from 'components/Tooltip';

import { useResizeWidth } from 'hooks/useResizeWidth';

import WorkerEditSvg from 'app/(Main)/workers/[id]/svg/edit-2.svg';
import XSvg from '/public/svg/x.svg';
import NotificationSvg from '/public/svg/notifications.svg';

import { WorkerDocuments } from 'http/organizationService/types';

import scss from 'app/(Main)/workers/[id]/components/WorkerDocuments/WorkerDocuments.module.scss';

interface DocumentCard {
    index: number;
    document: Partial<WorkerDocuments>;
}

export const DocumentCard: FC<DocumentCard> = ({ index, document }) => {
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
    }, [bigTabletBreak, fullHdBreak, tabletBreak, thousandTwoBreak]);

    return (
        <div className={scss.document_card_wrapper}>
            <div className={scss.document_card_header}>
                <h5>{document?.typeDocument}</h5>
                <div className={scss.document_card_actions}>
                    <Tooltip
                        customXOffset={customXOffset}
                        needResize={true}
                        propsToComponent={{ type: 'edit', document }}
                        RenderedComponent={DocumentForm as any}
                    >
                        <WorkerEditSvg />
                    </Tooltip>
                    <XSvg />
                </div>
            </div>
            <div className={scss.document_card_content}>
                <p style={{ marginBottom: '3px' }}>
                    Серия: <span>{document?.series}</span>
                </p>
                <p>
                    Выдано: <span>{document?.issuedWhom}</span>
                </p>
                <div className={scss.card_content_file}>
                    <NotificationSvg />
                    <p>{document?.fileDocument}</p>
                </div>
                <div className={scss.content_buttons}>
                    <Button>Скачать</Button>
                    <Button style="hollowActive">Загрузить новый</Button>
                </div>
            </div>
        </div>
    );
};
