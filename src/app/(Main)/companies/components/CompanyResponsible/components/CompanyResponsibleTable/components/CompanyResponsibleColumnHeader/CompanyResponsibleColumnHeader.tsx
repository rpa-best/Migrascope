import React, { FC } from 'react';

import { CompanyResponsibleHeaderProps } from 'app/(Main)/companies/components/CompanyResponsible/types';

import scss from 'app/(Main)/companies/components/CompanyResponsible/CompanyResponsible.module.scss';

export const CompanyResponsibleColumnHeader: FC<
    CompanyResponsibleHeaderProps
> = ({ headerName }) => {
    return (
        <td className={scss.company_user_column_header}>
            <p>{headerName}</p>
        </td>
    );
};
