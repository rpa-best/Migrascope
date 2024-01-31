'use client';

import { OrganizationTableRow } from 'components/OrganizationTable/OrganizationTableRow';
import React, { useState } from 'react';
import { OrgTableWrapperProps } from 'components/OrganizationTable/types';

export const OrgTableWrapper: React.FC<OrgTableWrapperProps> = ({
    orgs,
    children,
}) => {
    const [clickedId, setClickedId] = useState<number | null>(null);

    return orgs.map((el, index) => (
        <OrganizationTableRow
            clickedId={clickedId}
            setClickedId={setClickedId}
            key={index}
            id={el.id}
            name={`"${el.organizationalForm}" ${el.name}`}
        >
            {children}
        </OrganizationTableRow>
    ));
};
