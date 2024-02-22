import Image from 'next/image';

import { ProfileActions } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/ProfileActions';
import { WorkerEditForm } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerEditForm';
import { getWorkerSsr } from 'http/workerService/workerService';

import scss from './WorkerProfile.module.scss';
import { WorkerPhoto } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerPhoto';
import { cookies } from 'next/headers';

export const WorkerProfile = async ({
    orgId,
    workerId,
}: {
    orgId: number;
    workerId: number;
}) => {
    const cookieStore = cookies();
    const access = cookieStore.get('access')?.value;

    const worker = await getWorkerSsr(orgId, workerId, access!);

    return (
        <div className={scss.worker_layout}>
            <div className={scss.worker_header}>
                <h3>
                    {worker.surname + ' '}
                    {worker.name}
                </h3>
                <ProfileActions />
            </div>
            <div className={scss.worker_content}>
                <WorkerPhoto id={worker.id} photo={worker.avatar} />
                <WorkerEditForm worker={worker} />
            </div>
        </div>
    );
};
