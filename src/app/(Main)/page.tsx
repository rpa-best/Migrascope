import { Suspense } from 'react';

import { ProfileSkeleton } from 'components/Profile/Skeleton';
import { Profile } from 'components/Profile';
import {
    BarsSkeleton,
    TableSkeleton,
} from 'app/(Main)/components/Sceletons/Skeletons';
import { ProgressBars } from 'app/(Main)/components/ProgressBars';
import { TableActions } from 'app/(Main)/components/TableActions';
import { MainTableWrapper } from 'app/(Main)/components/MainTableWrapper';
import { NewsSkeleton } from 'components/News/Skeleton';
import { News } from 'components/News';

import { ProgressBarsType } from 'app/(Main)/components/ProgressBars/types';

import scss from './MainPage.module.scss';

const barsData: ProgressBarsType[] = [
    { title: 'Выполнено', percentage: 75, color: '#7DC066' },
    { title: 'Отклонено', percentage: 37.5, color: '#E5646C' },
    { title: 'Открыто', percentage: 50, color: '#59B4D1' },
    { title: 'Сдвинуто', percentage: 12.5, color: '#F3935D' },
    { title: 'Отменено', percentage: 25, color: '#727880' },
];

export default function Home() {
    return (
        <>
            <main style={{ flex: 1 }}>
                <Suspense fallback={<ProfileSkeleton />}>
                    <Profile />
                </Suspense>
                <Suspense fallback={<BarsSkeleton />}>
                    <ProgressBars barsData={barsData} />
                </Suspense>
                <TableActions />
                <section className={scss.table_wrapper}>
                    <Suspense fallback={<TableSkeleton />}>
                        <MainTableWrapper />
                        {/*<OrganizationTable />*/}
                    </Suspense>
                </section>
            </main>
            <Suspense fallback={<NewsSkeleton />}>
                <News />
            </Suspense>
        </>
    );
}
