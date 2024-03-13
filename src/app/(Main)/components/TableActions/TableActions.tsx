'use client';

import React from 'react';

import { SelectTableType } from 'app/(Main)/components/MainTableWrapper/components/SelectTableType';
import { SearchInput } from 'components/SearchInput';
import { SettingsMenu } from 'app/(Main)/components/MainTableWrapper/components/SettingsMenu';
import { AdditionalButton } from 'components/UI/Buttons/AdditionalButton';
import { Tooltip } from 'components/Tooltip';
import { AddCompanyWrapper } from 'app/(Main)/companies/components/AddCompanyWrapper';

import scss from 'app/(Main)/components/MainTableWrapper/MainTableWrapper.module.scss';

export const TableActions = () => {
    return (
        <div className={scss.table_actions}>
            <SelectTableType />
            <SearchInput />
            <Tooltip RenderedComponent={SettingsMenu}>
                <AdditionalButton svg="sliders" type="button" />
            </Tooltip>
            <AddCompanyWrapper />
        </div>
    );
};
