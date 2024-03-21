import { TasksActions } from 'app/(Main)/tasks/components/TasksActions';
import { TasksTable } from 'app/(Main)/tasks/components/TasksTable';

import { getTasksInfoSsr, getTasksSsr } from 'http/tasksService/tasksService';

export default async function TasksPage({
    searchParams,
}: {
    searchParams: { search: string; type_document: string };
}) {
    const tasks = await getTasksSsr({
        search: searchParams.search,
        type_document: searchParams.type_document,
    });

    const tasksWithInfo = await Promise.all(
        tasks.map(async (el) => {
            const info = await getTasksInfoSsr(el.documentId);

            return { ...el, ...info };
        })
    );

    return (
        <main style={{ width: '100%' }}>
            <TasksActions />
            <TasksTable
                headers={[
                    'Документы',
                    'Работник',
                    'Дата окончания',
                    'Начать оформление до',
                ]}
                documents={tasksWithInfo}
            />
        </main>
    );
}
