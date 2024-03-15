import React, { FC } from 'react';

import { CompanyUsersHeaderProps } from 'app/(Main)/companies/components/CompanyUsers/types';

import scss from 'app/(Main)/companies/components/CompanyUsers/CompanyUsers.module.scss';

export const CompanyUserColumnHeader: FC<CompanyUsersHeaderProps> = ({
    headerName,
}) => {
    return (
        <td className={scss.company_user_column_header}>
            <p>{headerName}</p>
        </td>
    );
};
