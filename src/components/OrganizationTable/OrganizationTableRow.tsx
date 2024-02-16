'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
    getOrganizationUsers,
    getOrganizationWorkers,
} from 'http/organizationService/organizationService';
import {
    fetchWorkersDocuments,
    formatToTableData,
} from 'components/OrganizationTable/OrganizationTable.utils';

import { OrganizationTableRowProps } from 'components/OrganizationTable/types';
import { OrganizationUser } from 'http/organizationService/types';
import { TemporaryDataType } from 'app/(Main)/workers/components/WorkersDocsTable/types';

import BuildingSvg from '/public/svg/building.svg';
import Spinner from '/public/svg/spinner.svg';

import scss from 'components/OrganizationTable/OrganizationTable.module.scss';

export const OrganizationTableRow: React.FC<OrganizationTableRowProps> = ({
    id,
    name,
    setClickedId,
    propsToComponent,
    clickedId,
    which,
    ChildrenComponent,
    refresh,
}) => {
    const [orgUsers, setOrgUsers] = useState<
        (OrganizationUser | TemporaryDataType)[] | null
    >(null);

    const [loading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (clickedId && clickedId !== id) {
            setVisible(false);
        }
    }, [clickedId, id]);

    useEffect(() => {
        setOrgUsers(null);
    }, [refresh]);

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
            let data: (TemporaryDataType | OrganizationUser)[];
            if (which === 'users') {
                const res = await getOrganizationUsers(id);
                data = res.results;
            } else {
                const workers = await getOrganizationWorkers(id);

                const workersWithDocuments = await fetchWorkersDocuments(
                    workers.results
                );

                data = formatToTableData(workersWithDocuments);
            }

            setOrgUsers(data);
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
                        <ChildrenComponent
                            {...propsToComponent}
                            tableData={orgUsers}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
