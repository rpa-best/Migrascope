import { cookies } from 'next/headers';

import { WorkerPhoto } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerPhoto';
import { ProfileActions } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/ProfileActions';
import { WorkerEditForm } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerEditForm';

import { getWorkerSsr } from 'http/workerService/workerService';

import scss from './WorkerProfile.module.scss';

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
        <section className={scss.worker_page_section}>
            <h2>Профиль сотрудника</h2>
            <div className={scss.worker_page_section_content}>
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
            </div>
        </section>
    );
};
