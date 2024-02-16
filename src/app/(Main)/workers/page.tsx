import { Suspense } from 'react';

import { WorkersActions } from 'app/(Main)/workers/components/WorkersActions';
import { WorkerOrgTable } from 'app/(Main)/workers/components/WorkersOrgTable';
import { TableSkeleton } from 'app/(Main)/components/Sceletons/Skeletons';

export default async function WorkersPage() {
    return (
        <main style={{ width: '100%' }}>
            <WorkersActions />
            <Suspense fallback={<TableSkeleton />}>
                <WorkerOrgTable />
            </Suspense>
        </main>
    );
}
