'use client';

import React, { useMemo } from 'react';

import { Tooltip } from 'components/Tooltip';
import { AddCompany } from 'components/AddCompany';
import { Button } from 'components/UI/Buttons/Button';
import { useResizeWidth } from 'hooks/useResizeWidth';

export const AddCompanyWrapper = () => {
    const { tabletBreak, fullHdBreak } = useResizeWidth();

    const customOrgXOffset = useMemo(() => {
        if (tabletBreak) {
            return -300;
        }

        if (fullHdBreak) {
            return -400;
        }

        return -410;
    }, [fullHdBreak, tabletBreak]);

    const customOrgYOffset = useMemo(() => {
        if (tabletBreak) {
            return -300;
        }
        return 10;
    }, [tabletBreak]);

    return (
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
    );
};
