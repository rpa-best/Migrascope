import { Suspense } from 'react';

import { SearchWorker } from 'app/(Main)/forms/components/SearchWorker';
import { News } from 'components/News';
import { Blanks } from 'app/(Main)/forms/components/Blanks';
import { NewsSkeleton } from 'components/News/Skeleton';
import { BlanksSkeleton } from 'app/(Main)/forms/components/BlankSkeleton';

import scss from './Forms.module.scss';

export default function FormsPage() {
    return (
        <>
            <main className={scss.forms} style={{ flex: 1 }}>
                <Suspense>
                    <SearchWorker />
                </Suspense>
                <Suspense fallback={<BlanksSkeleton />}>
                    <Blanks />
                </Suspense>
            </main>
            <Suspense fallback={<NewsSkeleton />}>
                <News />
            </Suspense>
        </>
    );
}
