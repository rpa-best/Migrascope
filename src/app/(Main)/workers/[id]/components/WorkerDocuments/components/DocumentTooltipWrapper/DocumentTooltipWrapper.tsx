'use client';

import { useResizeWidth } from 'hooks/useResizeWidth';
import { useMemo } from 'react';

import { Tooltip } from 'components/Tooltip';
import { DocumentForm } from 'app/(Main)/workers/[id]/components/WorkerDocuments/components/DocumentForm';

import scss from 'app/(Main)/workers/[id]/components/WorkerDocuments/WorkerDocuments.module.scss';

export const DocumentTooltipWrapper = () => {
    const { tabletBreak, bigTabletBreak, fullHdBreak } = useResizeWidth();

    const customXOffset = useMemo(() => {
        if (tabletBreak) {
            return -620;
        }

        if (bigTabletBreak) {
            return -550;
        }

        if (fullHdBreak) {
            return -250;
        }

        return -220;
    }, [bigTabletBreak, fullHdBreak, tabletBreak]);

    return (
        <Tooltip
            needResize={true}
            customXOffset={customXOffset}
            propsToComponent={{ type: 'create' }}
            RenderedComponent={DocumentForm as any}
        >
            <button className={scss.plus_button}>+</button>
        </Tooltip>
    );
};
