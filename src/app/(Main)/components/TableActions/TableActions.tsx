'use client';

import React, { useMemo } from 'react';

import { useResizeWidth } from 'hooks/useResizeWidth';

import { SelectTableType } from 'app/(Main)/components/MainTableWrapper/components/SelectTableType';
import { SearchInput } from 'components/SearchInput';
import { SettingsMenu } from 'app/(Main)/components/MainTableWrapper/components/SettingsMenu';
import { AdditionalButton } from 'components/UI/Buttons/AdditionalButton';
import { Tooltip } from 'components/Tooltip';
import { AddCompany } from 'components/AddCompany';
import { Button } from 'components/UI/Buttons/Button';

import scss from 'app/(Main)/components/MainTableWrapper/MainTableWrapper.module.scss';

export const TableActions = () => {
    const { tabletBreak, fullHdBreak } = useResizeWidth();

    const customOrgXOffset = useMemo(() => {
        if (tabletBreak) {
            return -300;
        }

        if (fullHdBreak) {
            return -400;
        }

        return -220;
    }, [fullHdBreak, tabletBreak]);

    const customOrgYOffset = useMemo(() => {
        if (tabletBreak) {
            return -300;
        }
        return 10;
    }, [tabletBreak]);

    return (
        <div className={scss.table_actions}>
            <SelectTableType />
            <SearchInput />
            <Tooltip RenderedComponent={SettingsMenu}>
                <AdditionalButton svg="sliders" type="button" />
            </Tooltip>
            <Tooltip
                customYOffset={customOrgYOffset}
                customXOffset={customOrgXOffset}
                needResize={true}
                RenderedComponent={AddCompany}
            >
                <Button size="default" type="button" svg="plus">
                    Добавить компанию
                </Button>
            </Tooltip>
        </div>
    );
};
