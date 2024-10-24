'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { InputSelect } from 'components/UI/Inputs/InputSelect';

import { SearchParamsHelper } from 'utils/searchParamsHelper';

import { TableTypesData } from 'app/(Main)/components/MainTableWrapper/components/SelectTableType/data';

import scss from 'app/(Main)/components/MainTableWrapper/MainTableWrapper.module.scss';
import { useEffect } from 'react';

export const SelectTableType = () => {
    const query = useSearchParams();

    const type = query.get('type') ?? TableTypesData[0].name;

    const pathname = usePathname();
    const router = useRouter();
    const searchHelper = new SearchParamsHelper(query.entries);

    const handleTypeClick = (id: number) => {
        const selectedType = TableTypesData.find((el) => el.id === id);

        searchHelper.set('type', selectedType?.name as string);
        router.replace(pathname + searchHelper.getParams, { scroll: false });
    };

    useEffect(() => {
        TableTypesData.forEach((el) => router.prefetch('?type=' + el.name));
    }, [router]);

    return (
        <div className={scss.table_type_variants}>
            {TableTypesData.map((el) => (
                <button
                    data-isactive={type === el.name}
                    onClick={() => handleTypeClick(el.id)}
                    key={el.id}
                    className={scss.type}
                >
                    {el.name}
                </button>
            ))}
            <InputSelect
                needErrorLabel={false}
                listValues={TableTypesData}
                onChange={({ id }) => handleTypeClick(id)}
                value={type}
                name="inputType"
            />
        </div>
    );
};
