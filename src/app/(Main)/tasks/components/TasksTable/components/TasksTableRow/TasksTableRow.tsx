'use client';

import Link from 'next/link';
import React, { FC, useMemo, useState } from 'react';

import { useResizeWidth } from 'hooks/useResizeWidth';
import { camelCase } from 'change-case';
import { useSpring } from 'framer-motion';

import Modal from 'components/Modal';
import { Button } from 'components/UI/Buttons/Button';
import { DocumentForm } from 'components/DocumentForm';

import { TasksTableRowProps } from 'app/(Main)/tasks/components/TasksTable/types';
import { SelectDocumentList } from 'components/DocumentForm/data';

import scss from 'app/(Main)/tasks/components/TasksTable/TasksTable.module.scss';

export const TasksTableRow: FC<TasksTableRowProps> = ({ document }) => {
    const [visible, setVisible] = useState(false);
    const opacity = useSpring(0);

    const documentType = document.typeDocument.includes('_')
        ? camelCase(document.typeDocument)
        : document.typeDocument;

    return (
        <tr className={scss.tasks_table_row}>
            <td>
                <p>{document.document}</p>
            </td>
            <td>
                <Link
                    className={scss.tasks_table_worker}
                    href={`workers/${document.organizationId}-${document.workerId}`}
                >
                    <p>{document.worker}</p>
                </Link>
                <p>{document.organization}</p>
            </td>
            <td>
                <p>{new Date(document.dateEnd).toLocaleDateString()}</p>
                <p
                    style={{
                        color:
                            document.daysUntilExpiration === 'Просрочено'
                                ? 'red'
                                : '#E5A559',
                    }}
                    className={scss.tasks_expiration}
                >
                    (
                    {document.daysUntilExpiration === 'Просрочено'
                        ? 'Просрочено'
                        : `Осталось дней: ${document.daysUntilExpiration}`}
                    )
                </p>
            </td>
            <td className={scss.tasks_table_action}>
                <p>
                    {new Date(
                        document.recommendedStartDate
                    ).toLocaleDateString()}
                </p>
                <Button
                    onClick={() => {
                        opacity.set(1);
                        setVisible(!visible);
                    }}
                    style="hollowActive"
                >
                    +
                </Button>
                <Modal visible={visible} setVisible={setVisible}>
                    <DocumentForm
                        type="createNew"
                        workerId={document.workerId}
                        document={{
                            id: document.id,
                            typeDocument: SelectDocumentList.find(
                                (doc) => doc.slug === documentType
                            )?.slug as string,
                        }}
                        opacity={opacity}
                        visible={visible}
                        setVisible={setVisible}
                    />
                </Modal>
            </td>
        </tr>
    );
};
