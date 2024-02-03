import React from 'react';
import Link from 'next/link';

import clsx from 'clsx';

import { PaginatorButtonProps } from 'app/(Main)/components/Table/types';

import scss from './Pagination.module.scss';

export const PaginationNumber: React.FC<PaginatorButtonProps> = ({
    href,
    page,
    isActive,
}) => {
    const className = clsx({
        [scss.pagination_number]: true,
    });

    if (page === '...') {
        return (
            <div style={{ pointerEvents: 'none' }} className={className}>
                {page}
            </div>
        );
    }

    return (
        <Link
            data-isactive={isActive}
            href={href}
            scroll={false}
            className={className}
        >
            {page}
        </Link>
    );
};
