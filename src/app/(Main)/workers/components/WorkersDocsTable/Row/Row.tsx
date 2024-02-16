'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Button } from 'components/UI/Buttons/Button';

import { WorkersDocsRowProps } from 'app/(Main)/workers/components/WorkersDocsTable/types';

import scss from 'app/(Main)/workers/components/WorkersDocsTable/WorkersDocsTable.module.scss';

export const Row: React.FC<WorkersDocsRowProps> = ({ docs, userInfo, id }) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <tr
                data-isopen={visible}
                onClick={() => setVisible(!visible)}
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
            {visible && (
                <tr className={scss.docs_wrapper}>
                    <td>
                        <div className={scss.column}>
                            <p className={scss.column_header}>Тип документа</p>
                            <div className={scss.worker_docs_td_docs}>
                                {docs.map((el, index) => (
                                    <span key={index}>{el.typeDocument}</span>
                                ))}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className={scss.column}>
                            <p className={scss.column_header}>Дата окончания</p>
                            <div className={scss.worker_docs_td_docs}>
                                {docs.map((el, index) => (
                                    <div key={index}>
                                        <span style={{ borderBottom: 'none' }}>
                                            {el.dateEnd}
                                        </span>
                                        <Button style="hollow" size="small">
                                            Загрузить новый
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};
