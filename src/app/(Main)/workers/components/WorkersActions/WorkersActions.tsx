'use client';

import { SearchInput } from 'components/SearchInput';
import { DownloadButton } from 'app/(Main)/workers/components/WorkersActions/components/DownloadButton';
import { Button } from 'components/UI/Buttons/Button';
import { Tooltip } from 'components/Tooltip';
import { WorkerForm } from 'app/(Main)/workers/components/WorkerForm';

import scss from './WorkersActions.module.scss';

export const WorkersActions = () => {
    return (
        <div className={scss.actions_wrapper}>
            <SearchInput placeholder="ФИО сотрудника" />
            <div>
                <DownloadButton />
                <Tooltip
                    needResize={true}
                    RenderedComponent={WorkerForm as any}
                >
                    <Button nowrap svg="plus">
                        Добавить сотрудника
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};
