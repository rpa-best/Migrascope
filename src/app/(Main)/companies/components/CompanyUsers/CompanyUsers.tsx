import { FC } from 'react';

import { CompanyUsersTable } from 'app/(Main)/companies/components/CompanyUsers/components/CompanyUsersTable';
import { AddCompanyUser } from 'app/(Main)/companies/components/CompanyUsers/components/AddCompanyUser';

import { getUsersSsr } from 'http/organizationService/organizationService';

import { CompanyUsersProps } from 'app/(Main)/companies/components/CompanyUsers/types';

import scss from './CompanyUsers.module.scss';

export const CompanyUsers: FC<CompanyUsersProps> = async ({
    selectedOrgId,
    offset,
}) => {
    const users = await getUsersSsr(selectedOrgId, { offset, limit: 15 });

    return (
        <section className={scss.company_profile_section}>
            <div className={scss.worker_page_section_content}>
                <div className={scss.company_users_title}>
                    <div className={scss.worker_header_title}>
                        <h3>Пользователи</h3>
                    </div>
                    <AddCompanyUser selectedOrgId={selectedOrgId} />
                </div>
                <CompanyUsersTable
                    headers={['ФИО', 'Электронная почта', 'Роль в компании']}
                    users={users}
                />
            </div>
        </section>
    );
};
