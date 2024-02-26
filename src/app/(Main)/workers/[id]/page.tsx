import { WorkerProfile } from 'app/(Main)/workers/[id]/components/WorkerProfile';
import { getIds } from 'app/(Main)/workers/utils';

import scss from './WorkerPage.module.scss';
import { WorkerDocuments } from 'app/(Main)/workers/[id]/components/WorkerDocuments';

export default async function WorkerPage({
    params,
}: {
    params: { id: string };
}) {
    const { orgId, id } = getIds(params!.id);

    return (
        <main className={scss.worker_page_layout}>
            <div className={scss.worker_page}>
                <section className={scss.worker_page_section}>
                    <h2>Профиль сотрудника</h2>
                    <div className={scss.worker_page_section_content}>
                        <WorkerProfile orgId={+orgId} workerId={+id} />
                    </div>
                </section>
                <section className={scss.worker_page_section}>
                    <h2>Документы сотрудника</h2>
                    <div className={scss.worker_page_section_content}>
                        <WorkerDocuments workerId={+id} />
                    </div>
                </section>
            </div>
        </main>
    );
}
