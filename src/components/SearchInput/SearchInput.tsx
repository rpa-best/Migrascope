'use client';

import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { Input } from 'components/UI/Inputs/Input';

import useDebouncedFunction from 'hooks/useDebouncedFunction';
import { useSearchQuery } from 'hooks/useSearchQuery';

import { SearchInputProps } from 'components/SearchInput/types';

export const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = 'Поиск',
}) => {
    const { getSearchParams, setSearchParams, deleteSearchParams, has } =
        useSearchQuery();

    const searchValue = getSearchParams('search') ?? '';

    const [inputValue, setInputValue] = useState(searchValue);

    const debouncedQueryChange = useDebouncedFunction(
        handleQueryChange,
        300,
        true
    );

    function handleQueryChange(value: string) {
        if (!value) {
            deleteSearchParams('search');
        } else {
            setSearchParams('search', value);
        }
    }

    function handleInputValueChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setInputValue(value);

        debouncedQueryChange(value);
    }

    useEffect(() => {
        if (!searchValue) {
            setInputValue('');
        }
    }, [searchValue]);

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
