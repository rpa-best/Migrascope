'use client';

import React, { useMemo } from 'react';

import { AdditionalButton } from 'components/UI/Buttons/AdditionalButton';
import { SearchInput } from 'components/SearchInput';
import { Tooltip } from 'components/Tooltip';
import { TasksFiltersForm } from 'app/(Main)/tasks/components/TasksActions/components/TasksFiltersForm';
import { useResizeWidth } from 'hooks/useResizeWidth';

import scss from './TasksActions.module.scss';

export const TasksActions = () => {
    const { tabletBreak, bigTabletBreak } = useResizeWidth();

    const customXOffset = useMemo(() => {
        if (tabletBreak) {
            return -680;
        }

        if (bigTabletBreak) {
            return -550;
        }

        return -560;
    }, [bigTabletBreak, tabletBreak]);
    return (
        <div className={scss.tasks_actions_wrapper}>
            <SearchInput placeholder="Название документа" />
            <Tooltip
                customXOffset={customXOffset}
                RenderedComponent={TasksFiltersForm}
            >
                <AdditionalButton svg="sliders" type="button" />
            </Tooltip>
        </div>
    );
};
