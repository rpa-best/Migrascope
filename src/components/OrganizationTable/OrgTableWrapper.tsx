'use client';

import React, { useEffect, useState } from 'react';

import { OrganizationTableRow } from 'components/OrganizationTable/OrganizationTableRow';

import { OrgTableWrapperProps } from 'components/OrganizationTable/types';

export const OrgTableWrapper: React.FC<OrgTableWrapperProps> = ({
    orgs,
    ChildrenComponent,
    propsToComponent,
}) => {
    const [clickedId, setClickedId] = useState<number | null>(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh((prev) => !prev);
    }, [orgs]);

    return orgs?.map((el, index) => (
        <OrganizationTableRow
            refresh={refresh}
            clickedId={clickedId}
            setClickedId={setClickedId}
            key={index}
            id={el.id}
            ChildrenComponent={ChildrenComponent}
            propsToComponent={propsToComponent}
            name={`"${el.organizationalForm}" ${el.name}`}
        />
    ));
};
