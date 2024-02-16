'use client';

import { useMemo } from 'react';

import { Tooltip } from 'components/Tooltip';
import { WorkerForm } from 'app/(Main)/workers/components/WorkerForm';

import { useResizeWidth } from 'hooks/useResizeWidth';

import WorkerEditSvg from 'app/(Main)/workers/[id]/svg/edit-2.svg';
import DeleteSvg from 'app/(Main)/workers/[id]/svg/trash.svg';

import { Worker } from 'http/workerService/types';

import scss from 'app/(Main)/workers/[id]/components/WorkerProfile/WorkerProfile.module.scss';

export const ProfileActions = ({ worker }: { worker: Worker }) => {
    const { tabletBreak, bigTabletBreak, fullHdBreak } = useResizeWidth();

    const customXOffset = useMemo(() => {
        if (tabletBreak) {
            return -600;
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
        <div className={scss.profile_actions}>
            <Tooltip
                needResize={true}
                customXOffset={customXOffset}
                propsToComponent={{ type: 'edit', worker }}
                RenderedComponent={WorkerForm as any}
            >
                <WorkerEditSvg />
            </Tooltip>
            <DeleteSvg />
        </div>
    );
};
