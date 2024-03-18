import React, { FC } from 'react';
import { CompanyUsersRowProps } from 'app/(Main)/companies/components/CompanyUsers/types';

import scss from 'app/(Main)/companies/components/CompanyUsers/CompanyUsers.module.scss';
import { RolesConst } from 'const/RolesConst';

export const CompanyUserTableRow: FC<CompanyUsersRowProps> = ({ user }) => {
    const translatedRole = RolesConst.find((role) => role.slug === user.role)
        ?.name as string;

    return (
        <tr className={scss.company_user_table_row}>
            <td>
                <p>{user.firstName}</p>
            </td>
            <td>
                <p>{user.user}</p>
            </td>
            <td>
                <p>{translatedRole}</p>
            </td>
        </tr>
    );
};
