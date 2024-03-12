import { FC } from 'react';

import { CompanyProfileActions } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyProfileActions';
import { CompanyEditForm } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm';

import { CompanyProfileProps } from 'app/(Main)/companies/components/CompanyProfile/types';

import scss from './CompanyProfile.module.scss';

export const CompanyProfile: FC<CompanyProfileProps> = ({ org }) => {
    return (
        <section className={scss.company_profile_section}>
            <div className={scss.worker_page_section_content}>
                <div className={scss.worker_layout}>
                    <div className={scss.worker_header}>
                        <div className={scss.worker_header_title}>
                            <h3>{org.name}</h3>
                            <h4>{org.legalAddress}</h4>
                        </div>
                        <CompanyProfileActions />
                    </div>
                    <div className={scss.worker_content}>
                        <CompanyEditForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
