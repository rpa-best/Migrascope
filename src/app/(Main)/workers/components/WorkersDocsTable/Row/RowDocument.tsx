import React, { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring } from 'framer-motion';

import { Button } from 'components/UI/Buttons/Button';
import { DocumentForm } from 'components/DocumentForm';
import { createPortal } from 'react-dom';
import { DocumentRowProps } from 'app/(Main)/workers/components/WorkersDocsTable/types';
import { WorkerDocuments } from 'http/workerService/types';

import scss from 'app/(Main)/workers/components/WorkersDocsTable/WorkersDocsTable.module.scss';
import { getRemainingTime } from 'utils/getRemainingTime';
import { Modal } from 'components/Modal';

export const RowDocument: FC<DocumentRowProps> = ({
    documentId,
    typeDocument,
    dateEnd,
    workerId,
}) => {
    const [visible, setVisible] = useState(false);
    const opacity = useSpring(0);

    return (
        <div>
            <span
                className={scss.docs_row_text}
                style={{ borderBottom: 'none' }}
            >
                {dateEnd}
                {getRemainingTime(dateEnd)}
            </span>
            <Button
                onClick={() => {
                    setVisible(true);
                    opacity.set(1);
                }}
                style="hollow"
                size="small"
            >
                Загрузить новый
            </Button>

            <Modal visible={visible} setVisible={setVisible}>
                <DocumentForm
                    document={
                        {
                            id: documentId,
                            typeDocument: typeDocument,
                        } as WorkerDocuments
                    }
                    workerId={workerId}
                    type="createNew"
                    opacity={opacity}
                    visible={true}
                    setVisible={setVisible}
                />
            </Modal>
        </div>
    );
};

/*createPortal(
    <motion.div
        onClick={() => setVisible(false)}
        style={{
            opacity,
        }}
        className={scss.form_bg}
    ></motion.div>,
    document.body
);*/
