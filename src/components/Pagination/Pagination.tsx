'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { generatePagination } from 'utils/generatePagination';

import { PaginatorProps } from 'app/(Main)/components/Table/types';
import { PaginationInput } from 'components/Pagination/PaginationInput';
import { PaginationNumber } from 'components/Pagination/PaginationNumber';
import ArrowSvg from '/public/svg/arrow.svg';

import scss from './Pagination.module.scss';

export const Pagination: React.FC<PaginatorProps> = ({
    totalPages,
    offset,
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = useMemo(() => {
        const searchOffset = searchParams.get('offset') || 0;
        if (+searchOffset === 0) {
            return 1;
        }
        return Number(searchOffset) / offset + 1;
    }, [offset, searchParams]);

    const createPageURL = (pageNumber: number): string => {
        const params = new URLSearchParams(searchParams);
        params.set('offset', (pageNumber * offset).toString());

        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <div className={scss.pagination_container}>
            <PaginationInput
                offset={offset}
                totalPages={totalPages}
                currentPage={currentPage}
            />
            <div className={scss.pagination_numbers}>
                <Link
                    data-isdisabled={currentPage === 1}
                    className={scss.arrow_wrapper}
                    scroll={false}
                    href={createPageURL(currentPage - 2)}
                >
                    <ArrowSvg />
                </Link>
                {allPages.map((page, index) => {
                    return (
                        <PaginationNumber
                            key={index}
                            href={createPageURL(+page - 1)}
                            page={page}
                            isActive={currentPage === page}
                        />
                    );
                })}
                <Link
                    scroll={false}
                    data-isdisabled={currentPage === totalPages}
                    className={scss.arrow_wrapper}
                    href={createPageURL(currentPage)}
                >
                    <ArrowSvg />
                </Link>
            </div>
        </div>
    );
};
