import React, {
    ChangeEvent,
    EventHandler,
    KeyboardEvent,
    useEffect,
    useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from 'components/UI/Inputs/Input';

import scss from './Pagination.module.scss';
import { useSearchQuery } from 'hooks/useSearchQuery';

interface PaginationInputProps {
    currentPage: number;
    totalPages: number;
    offset: number;
}

export const PaginationInput = ({
    currentPage,
    totalPages,
    offset,
}: PaginationInputProps) => {
    const { setSearchParams } = useSearchQuery(true);

    const [inputValue, setInputValue] = useState(currentPage.toString());

    useEffect(() => {
        setInputValue(currentPage.toString());
    }, [currentPage]);

    const handleEnterKey: EventHandler<KeyboardEvent<Element>> = (e) => {
        if (e.key === 'Enter') {
            if (+inputValue <= 0) {
                handleBlur();
                return;
            }
            setSearchParams('offset', ((+inputValue - 1) * offset).toString());
        }
    };

    const handleBlur = () => {
        setInputValue(currentPage.toString());
    };

    const handleChangePage = (e: ChangeEvent<HTMLInputElement>) => {
        const page = e.target.value;

        if (+page > totalPages) return;

        setInputValue(e.target.value);
    };
    return (
        <div className={scss.pagination_input}>
            <p>Страница</p>
            <Input
                onBlur={handleBlur}
                onKeyDown={handleEnterKey}
                type="number"
                value={inputValue}
                name="input page"
                onChange={handleChangePage}
                needErrorLabel={false}
            />
        </div>
    );
};
