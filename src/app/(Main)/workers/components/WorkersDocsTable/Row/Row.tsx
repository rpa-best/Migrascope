'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { RowDocument } from 'app/(Main)/workers/components/WorkersDocsTable/Row/RowDocument';
import { getDocumentName } from 'components/DocumentForm/DocumentForm.utils';

import { WorkerDocumentType } from 'components/DocumentForm/DocumentForm.types';
import { WorkersDocsRowProps } from 'app/(Main)/workers/components/WorkersDocsTable/types';

import scss from 'app/(Main)/workers/components/WorkersDocsTable/WorkersDocsTable.module.scss';

export const Row: React.FC<WorkersDocsRowProps> = ({
    setClickedId,
    clickedId,
    docs,
    userInfo,
    id,
}) => {
    const isOpen = clickedId === id;

    return (
        <>
            <tr
                data-isopen={isOpen}
                onClick={() => setClickedId(isOpen ? null : id)}
                className={scss.worker_docs_table_row}
            >
                <td>
                    <div className={scss.worker_docs_td_info}>
                        <Link
                            onClick={(e) => e.stopPropagation()}
                            href={`workers/${userInfo.orgId}-${id}`}
                        >
                            {userInfo.name}
                        </Link>
                    </div>
                </td>
                <td>
                    <p className={scss.worker_docs_subtitle}>
                        {userInfo.subtitle}
                    </p>
                </td>
            </tr>
            {isOpen && (
                <tr className={scss.docs_wrapper}>
                    <td>
                        <div className={scss.column}>
                            <p className={scss.column_header}>Тип документа</p>
                            <div className={scss.worker_docs_td_docs}>
                                {docs.map((doc, index) => (
                                    <span
                                        className={scss.docs_row_text}
                                        key={index}
                                    >
                                        {getDocumentName(
                                            doc.typeDocument as WorkerDocumentType
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className={scss.column}>
                            <p className={scss.column_header}>Дата окончания</p>
                            <div className={scss.worker_docs_td_docs}>
                                {docs.map((doc, index) => (
                                    <RowDocument
                                        workerId={id}
                                        key={index}
                                        {...doc}
                                    />
                                ))}
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};
