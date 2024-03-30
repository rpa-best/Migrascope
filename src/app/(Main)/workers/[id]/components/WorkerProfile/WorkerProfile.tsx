import { WorkerPhoto } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerPhoto';
import { ProfileActions } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/ProfileActions';
import { WorkerEditForm } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerEditForm/WorkerEditForm';

import { getWorkerSsr } from 'http/workerService/workerService';

import scss from './WorkerProfile.module.scss';
import { getServerOrganization } from 'http/organizationService/organizationService';
import { getCookieAccess } from 'utils/getServerAccess';
import { ProfileHeaderActions } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/ProfileHeaderActions/ProfileHeaderActions';

export const WorkerProfile = async ({
    orgId,
    workerId,
}: {
    orgId: number;
    workerId: number;
}) => {
    const access = await getCookieAccess();
    const worker = await getWorkerSsr(orgId, workerId, access!);

    const orgs = await getServerOrganization(access as string);

    const workerOrg = orgs?.results.find((el) => el.id === worker.organization);

    return (
        <section className={scss.worker_page_section}>
            <div className={scss.worker_page_section_header}>
                <h2>Профиль сотрудника</h2>
                <ProfileHeaderActions worker={worker} />
            </div>
            <div className={scss.worker_page_section_content}>
                <div className={scss.worker_layout}>
                    <div className={scss.worker_header}>
                        <div className={scss.worker_header_name}>
                            <h3>
                                {worker.surname + ' '}
                                {worker.name + ' '}
                                {worker.patronymic}
                            </h3>
                            <span>
                                {`${workerOrg?.organizationalForm} 
                                    ${workerOrg?.name}`}
                            </span>
                        </div>
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
