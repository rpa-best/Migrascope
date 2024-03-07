import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useSearchQuery = (replace?: boolean) => {
    const router = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();

    const changePath = () => {
        if (replace) {
            router.replace(`${path}?${searchQuery}`);
        } else {
            router.push(`${path}?${searchQuery}`);
        }
    };

    const searchQuery = useMemo(
        () => new URLSearchParams(Array.from(searchParams.entries())),
        [searchParams]
    );

    const setSearchParams = (name: string, value: string) => {
        searchQuery.set(name, value);
        changePath();
    };

    const getSearchParams = useCallback(
        (name: string) => {
            return searchQuery.get(name);
        },
        [searchQuery]
    );

    const has = (name: string) => {
        return searchQuery.has(name);
    };

    const deleteSearchParams = (name: string) => {
        searchQuery.delete(name);
        changePath();
    };

    return { getSearchParams, setSearchParams, deleteSearchParams, has };
};
