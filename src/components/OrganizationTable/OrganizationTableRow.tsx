'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
    fetchWorkersDocuments,
    formatToTableData,
} from 'components/OrganizationTable/OrganizationTable.utils';
import { getWorkers } from 'http/workerService/workerService';
import { getUsers } from 'http/organizationService/organizationService';

import { OrganizationUser } from 'http/workerService/types';
import { OrganizationTableRowProps } from 'components/OrganizationTable/types';
import { TemporaryDataType } from 'app/(Main)/workers/components/WorkersDocsTable/types';

import BuildingSvg from '/public/svg/building.svg';
import Spinner from '/public/svg/spinner.svg';

import scss from 'components/OrganizationTable/OrganizationTable.module.scss';
import { Response } from 'http/types';
import { useSearchQuery } from 'hooks/useSearchQuery';

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
    const { getSearchParams, deleteSearchParams } = useSearchQuery();
    const [orgUsers, setOrgUsers] = useState<Response<
        OrganizationUser | TemporaryDataType
    > | null>(null);

    const offset = getSearchParams('offset') || '0';
    const search = getSearchParams('search');

    const [loading, setLoading] = useState(false);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (clickedId && clickedId !== id) {
            setVisible(false);
        }
    }, [clickedId, id]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            let data: Response<TemporaryDataType | OrganizationUser>;
            if (which === 'users') {
                data = await getUsers(id, { offset, limit: 15 });
            } else {
                const workers = await getWorkers(id, {
                    offset,
                    limit: 15,
                    search,
                });

                const workersWithDocuments = await fetchWorkersDocuments(
                    workers.results
                );

                data = {
                    results: formatToTableData(workersWithDocuments),
                    count: workers.count,
                };
            }

            setOrgUsers(data);
            setVisible(true);
            setClickedId(id);
        } finally {
            setLoading(false);
        }
    }, [id, offset, setClickedId, which, search]);

    const handleOrgClick = useCallback(async () => {
        deleteSearchParams('offset');
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
        fetchData();
    }, [fetchData, id, orgUsers, setClickedId, visible]);

    useEffect(() => {
        if (visible) {
            fetchData();
        }
    }, [fetchData, refresh, visible, offset]);

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
                        layout
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
