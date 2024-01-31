'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Column } from 'app/(Main)/components/Table/Column';
import { MainTable } from 'app/(Main)/components/Table';

import { OrganizationTableRowProps } from 'components/OrganizationTable/types';

import BuildingSvg from '/public/svg/building.svg';

import scss from 'components/OrganizationTable/OrganizationTable.module.scss';
import { getOrganizationUsers } from 'http/organizationService/organizationService';
import { OrganizationUser } from 'http/organizationService/types';
import Spinner from '/public/svg/spinner.svg';

const tableData = [
    {
        id: 1,
        name1: 'testim0',
        name2: 'testiruem0',
        name3: 'testiruemдлинную',
        name4: 'testiruemдли',
    },
    {
        id: 2,
        name1: 'testim1',
        name2: 'testiruem1',
        name3: 'testiruem длинную',
        name4: 'testiruem ',
    },
    {
        id: 3,
        name1: 'testim2',
        name2: 'testiruem2',
        name3: 'testiruem длинную',
        name4: 'testiruem ',
    },
    {
        id: 4,
        name1: 'testim3',
        name2: 'testiruem3',
        name3: 'testiruem длинную',
        name4: 'testiruem',
    },
    {
        id: 5,
        name1: 'testim4',
        name2: 'testiruem4',
        name3: 'testiruem длинную',
        name4: 'testiruem',
    },
];

export const OrganizationTableRow: React.FC<OrganizationTableRowProps> = ({
    id,
    name,
    setClickedId,
    clickedId,
    children,
}) => {
    const [orgUsers, setOrgUsers] = useState<OrganizationUser[] | null>(null);

    const [loading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (clickedId && clickedId !== id) {
            setVisible(false);
        }
    }, [clickedId, id]);

    const handleOrgClick = async () => {
        if (visible) {
            setVisible(false);
            setClickedId(null);
            return;
        }

        if (orgUsers) {
            setVisible(true);
            setClickedId(id);
            return;
        }

        try {
            setLoading(true);
            const users = await getOrganizationUsers(id);
            setOrgUsers(users.results);
            setVisible(true);
            setClickedId(id);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={scss.organization_row}>
            <div
                onClick={() => handleOrgClick()}
                data-isopen={visible}
                className={scss.organization_header}
            >
                <BuildingSvg />
                <p>{name}</p>
                {loading && <Spinner className={scss.spinner_default} />}
            </div>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'max-content', opacity: 1 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
