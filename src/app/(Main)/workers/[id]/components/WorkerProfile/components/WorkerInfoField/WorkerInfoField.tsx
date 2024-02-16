import { FC } from 'react';

import { WorkerInfoFieldProps } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerInfoField/types';

import scss from './WorkerInfoField.module.scss';

export const WorkerInfoField: FC<WorkerInfoFieldProps> = ({
    content,
    title,
}) => {
    return (
        <div className={scss.field_wrapper}>
            <span>{title}</span>
            <p>{content}</p>
        </div>
    );
};
