import { Suspense } from 'react';

import { WorkersActions } from 'app/(Main)/workers/components/WorkersActions';
import { WorkerOrgTable } from 'app/(Main)/workers/components/WorkersOrgTable';
import { TableSkeleton } from 'app/(Main)/components/Sceletons/Skeletons';

interface WorkersPageProps {
    searchParams: { search: string };
}

export default async function WorkersPage({
    searchParams: { search },
}: WorkersPageProps) {
    return (
        <main style={{ width: '100%' }}>
            <WorkersActions />
            <Suspense fallback={<TableSkeleton />}>
                <WorkerOrgTable search={search || ''} />
            </Suspense>
        </main>
    );
}
