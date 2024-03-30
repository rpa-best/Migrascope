import { FC } from 'react';

import { AddCompanyResponsible } from 'app/(Main)/companies/components/CompanyResponsible/components/AddCompanyResponsible/AddCompanyResponsible';
import { CompanyResponsibleTable } from 'app/(Main)/companies/components/CompanyResponsible/components/CompanyResponsibleTable';

import {
    getResponsibleSsr,
    getUsersSsr,
} from 'http/organizationService/organizationService';

import { CompanyResponsibleProps } from 'app/(Main)/companies/components/CompanyResponsible/types';

import scss from 'app/(Main)/companies/components/CompanyResponsible/CompanyResponsible.module.scss';

export const CompanyResponsible: FC<CompanyResponsibleProps> = async ({
    selectedOrgId,
    offset,
}) => {
    const responsible = await getResponsibleSsr(selectedOrgId);

    return (
        <section className={scss.worker_page_section}>
            <div className={scss.worker_page_section_content}>
                <div className={scss.company_users_title}>
                    <div className={scss.worker_header_title}>
                        <h3>Ответственные лица</h3>
                    </div>
                    <AddCompanyResponsible selectedOrgId={selectedOrgId} />
                </div>
                <CompanyResponsibleTable
                    headers={['ФИО']}
                    responsible={responsible}
                />
            </div>
        </section>
    );
};
