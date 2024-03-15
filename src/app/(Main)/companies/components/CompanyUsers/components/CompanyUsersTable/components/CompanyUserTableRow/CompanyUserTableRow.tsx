import Link from 'next/link';
import React, { FC } from 'react';
import { CompanyUsersRowProps } from 'app/(Main)/companies/components/CompanyUsers/types';

import scss from 'app/(Main)/companies/components/CompanyUsers/CompanyUsers.module.scss';

export const CompanyUserTableRow: FC<CompanyUsersRowProps> = ({ user }) => {
    return (
        <tr className={scss.company_user_table_row}>
            <td>
                <p>{user.user}</p>
            </td>
            <td>
                <p>{user.phone}</p>
            </td>
            <td>
                <p>{user.role}</p>
            </td>
        </tr>
    );
};
