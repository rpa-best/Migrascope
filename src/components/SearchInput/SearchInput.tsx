'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { SearchParamsHelper } from 'utils/searchParamsHelper';

import { Input } from 'components/UI/Inputs/Input';
import useDebouncedFunction from 'hooks/useDebouncedFunction';
import { SearchInputProps } from 'components/SearchInput/types';

export const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = 'Поиск',
}) => {
    const query = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const queryHelper = new SearchParamsHelper(query.entries);

    const searchValue = query.get('search') ?? '';

    const [inputValue, setInputValue] = useState(searchValue);

    const debouncedQueryChange = useDebouncedFunction(
        handleQueryChange,
        300,
        true
    );

    function handleQueryChange(value: string) {
        if (!value) {
            queryHelper.delete('search');
        } else {
            queryHelper.set('search', value);
        }
        router.replace(pathname + queryHelper.getParams, { scroll: false });
    }

    function handleInputValueChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setInputValue(value);

        debouncedQueryChange(value);
    }

    return (
        <Input
            needErrorLabel={false}
            name="search"
            value={inputValue}
            onChange={handleInputValueChange}
            placeholder={placeholder}
        />
    );
};
