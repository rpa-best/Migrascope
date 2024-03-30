'use client';

import { useEffect, useState } from 'react';

import { InputSelect } from 'components/UI/Inputs/InputSelect';

import useDebouncedFunction from 'hooks/useDebouncedFunction';
import { useSearchQuery } from 'hooks/useSearchQuery';
import { findWorker } from 'http/blanksService/blanksService';
import { useBlankWorkerStore } from 'app/(Main)/forms/components/store/useBlankWorkerStore';

import { SearchableWorker } from 'app/(Main)/forms/components/store/types';

import scss from './SearchWorker.module.scss';

export const SearchWorker = () => {
    const [loading, setLoading] = useState(false);

    const { setSearchParams, deleteSearchParams, getSearchParams } =
        useSearchQuery(true);

    const [workersList, setWorkersList] = useState<SearchableWorker[]>([]);

    const [selectedWorker] = useBlankWorkerStore((state) => [state.worker]);
    const [setSelectedWorker] = useBlankWorkerStore((state) => [
        state.setWorker,
    ]);

    const name = getSearchParams('search');

    const debouncedQueryChange = useDebouncedFunction(
        handleQueryChange,
        500,
        true
    );

    useEffect(() => {
        setLoading(true);
        findWorker(name)
            .then((workers) => {
                const modifiedWorkers = workers.map((worker) => ({
                    ...worker,
                    id: worker.workerId,
                    name: worker.worker,
                }));
                setWorkersList(modifiedWorkers);
            })
            .finally(() => setLoading(false));
    }, [name]);

    useEffect(() => {
        if (name && workersList.length !== 0) {
            const currentWorker = workersList.find(
                (worker) =>
                    worker.worker.slice(0, worker.name.indexOf('(') - 1) ===
                    name
            );
            if (!currentWorker) return;
            setSelectedWorker(currentWorker);
        }
        return () => {
            setSelectedWorker({ name: '' });
        };
    }, [name, setSelectedWorker, workersList]);

    function handleQueryChange(searchString: string) {
        if (searchString) {
            setSearchParams('search', searchString);
        } else {
            deleteSearchParams('search');
        }
    }

    const handleSearch = (value: string | SearchableWorker) => {
        if (typeof value === 'string') {
            setSelectedWorker({ name: value });
            debouncedQueryChange(value);
        } else {
            setSelectedWorker(value);
            debouncedQueryChange(
                value.name.slice(0, value.name.indexOf('(') - 1)
            );
        }
    };

    return (
        <section className={scss.search_worker_wrapper}>
            <h3 className={scss.search_title}>
                Для поиска введите ФИО сотрудника
            </h3>
            <InputSelect
                disablePlaceholder={true}
                autoComplete="off"
                loading={loading}
                listValues={workersList}
                value={selectedWorker?.name ?? ''}
                fetchable={true}
                clearable={true}
                placeholder="Поиск"
                needErrorLabel={false}
                name="search"
                onChange={handleSearch}
            />
        </section>
    );
};
