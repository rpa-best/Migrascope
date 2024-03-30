import React, { FC } from 'react';
import { CompanyResponsibleTableRow } from 'app/(Main)/companies/components/CompanyResponsible/components/CompanyResponsibleTable/components/CompanyResponsibleTableRow';
import { CompanyResponsibleColumnHeader } from 'app/(Main)/companies/components/CompanyResponsible/components/CompanyResponsibleTable/components/CompanyResponsibleColumnHeader';

import { CompanyResponsibleTableProps } from 'app/(Main)/companies/components/CompanyResponsible/types';

import scss from 'app/(Main)/companies/components/CompanyUsers/CompanyUsers.module.scss';

export const CompanyResponsibleTable: FC<CompanyResponsibleTableProps> = ({
    responsible,
    headers,
}) => {
    return (
        <>
            <div className={scss.company_users_table_layout}>
                <table className={scss.company_users_table}>
                    <thead className={scss.table_headers}>
                        <tr>
                            {headers.map((el, index) => (
                                <CompanyResponsibleColumnHeader
                                    key={index}
                                    headerName={el}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody className={scss.table_body}>
                        {responsible?.results.map((user, index) => {
                            return (
                                <CompanyResponsibleTableRow
                                    key={index}
                                    responsible={user}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};
