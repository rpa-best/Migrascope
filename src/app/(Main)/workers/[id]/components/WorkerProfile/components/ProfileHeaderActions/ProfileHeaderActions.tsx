import Link from 'next/link';
import { Button } from 'components/UI/Buttons/Button';
import { FC } from 'react';
import { Worker } from 'http/workerService/types';

export const ProfileHeaderActions: FC<{ worker: Worker }> = ({ worker }) => {
    return (
        <Link
            href={`/forms?search=${worker.surname}+${worker.name}+${worker.patronymic}`}
        >
            <Button>Сформировать бланк</Button>
        </Link>
    );
};
