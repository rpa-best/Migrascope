'use client';

import React, { FC, useMemo } from 'react';

import { Tooltip } from 'components/Tooltip';
import { Button } from 'components/UI/Buttons/Button';
import { AddCompanyUserForm } from 'app/(Main)/companies/components/CompanyUsers/components/AddCompanyUser/components/AddCompanyUserForm';

import { useResizeWidth } from 'hooks/useResizeWidth';

export const AddCompanyUser: FC<{ selectedOrgId: number }> = ({
    selectedOrgId,
}) => {
    const { tabletBreak, fullHdBreak } = useResizeWidth();

    const customOrgXOffset = useMemo(() => {
        if (tabletBreak) {
            return -350;
        }

        if (fullHdBreak) {
            return -505;
        }

        return -250;
    }, [fullHdBreak, tabletBreak]);

    return (
        <Tooltip
            customXOffset={customOrgXOffset}
            needResize={true}
            propsToComponent={{ orgId: selectedOrgId, type: 'create' }}
            RenderedComponent={AddCompanyUserForm as any}
        >
            <Button type="button">Добавить</Button>
        </Tooltip>
    );
};
