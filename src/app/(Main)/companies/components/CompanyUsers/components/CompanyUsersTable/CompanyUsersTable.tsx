import React, { FC } from 'react';

import { CompanyUserTableRow } from 'app/(Main)/companies/components/CompanyUsers/components/CompanyUsersTable/components/CompanyUserTableRow';
import { CompanyUserColumnHeader } from 'app/(Main)/companies/components/CompanyUsers/components/CompanyUsersTable/components/CompanyUserColumnHeader';

import { CompanyUsersTableProps } from 'app/(Main)/companies/components/CompanyUsers/types';

import scss from 'app/(Main)/companies/components/CompanyUsers/CompanyUsers.module.scss';

export const CompanyUsersTable: FC<CompanyUsersTableProps> = ({
    users,
    headers,
}) => {
    return (
        <>
            <div className={scss.company_users_table_layout}>
                <table className={scss.company_users_table}>
                    <thead className={scss.table_headers}>
                        <tr>
                            {headers.map((el, index) => (
                                <CompanyUserColumnHeader
                                    key={index}
                                    headerName={el}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody className={scss.table_body}>
                        {users?.map((user, index) => {
                            return (
                                <CompanyUserTableRow key={index} user={user} />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
