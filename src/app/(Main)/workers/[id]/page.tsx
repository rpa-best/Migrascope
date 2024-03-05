import { Suspense } from 'react';

import { WorkerProfile } from 'app/(Main)/workers/[id]/components/WorkerProfile';
import { WorkerDocuments } from 'app/(Main)/workers/[id]/components/WorkerDocuments';
import { WorkerProfileSkeleton } from 'app/(Main)/components/Sceletons/Skeletons';

import { getIds } from 'app/(Main)/workers/utils';

import scss from './WorkerPage.module.scss';

export default async function WorkerPage({
    params,
}: {
    params: { id: string };
}) {
    const { orgId, id } = getIds(params!.id);

    return (
        <main className={scss.worker_page_layout}>
            <div className={scss.worker_page}>
                <Suspense fallback={<WorkerProfileSkeleton />}>
                    <WorkerProfile orgId={+orgId} workerId={+id} />
                </Suspense>
                <WorkerDocuments workerId={+id} />
            </div>
        </main>
    );
}
