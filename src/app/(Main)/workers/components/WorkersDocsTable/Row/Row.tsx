'use client';

import React from 'react';

import { WorkersDocsRowProps } from 'app/(Main)/workers/components/WorkersDocsTable/types';

import scss from 'app/(Main)/workers/components/WorkersDocsTable/WorkersDocsTable.module.scss';

export const Row: React.FC<WorkersDocsRowProps> = ({ docs, userInfo }) => {
    return (
        <>
            <td>
                <div className={scss.worker_docs_td_info}>
                    <p>{userInfo.name}</p>
                    <p>{userInfo.subtitle}</p>
                </div>
            </td>
            <td className={scss.worker_docs_td_docs}>
                <div className={scss.worker_docs_td_docs}>
                    {docs.map((el, index) => (
                        <span key={index}>{el.typeDocument}</span>
                    ))}
                </div>
            </td>
            <td className={scss.last_td}>
                <div className={scss.worker_docs_td_docs}>
                    {docs.map((el, index) => (
                        <span key={index}>{el.dateEnd}</span>
                    ))}
                </div>
            </td>
        </>
    );
};
