'use client';

import React, { FC, useMemo } from 'react';

import { Tooltip } from 'components/Tooltip';
import { Button } from 'components/UI/Buttons/Button';

import { useResizeWidth } from 'hooks/useResizeWidth';
import { AddCompanyResponsibleForm } from 'app/(Main)/companies/components/CompanyResponsible/components/AddCompanyResponsible/components/AddCompanyResponsibleForm';

export const AddCompanyResponsible: FC<{ selectedOrgId: number }> = ({
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
            RenderedComponent={AddCompanyResponsibleForm as any}
        >
            <Button type="button">Добавить</Button>
        </Tooltip>
    );
};
