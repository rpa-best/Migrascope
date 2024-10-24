import { Suspense } from 'react';

import { ProfileSkeleton } from 'components/Profile/Skeleton';
import { Profile } from 'components/Profile';
import { CompanyProfile } from 'app/(Main)/companies/components/CompanyProfile/CompanyProfile';
import { AddCompanyWrapper } from 'app/(Main)/companies/components/AddCompanyWrapper';

import { getCookieAccess } from 'utils/getServerAccess';
import {
    getOrganizationMiaAddressesSsr,
    getServerOrganization,
} from 'http/organizationService/organizationService';
import { CompanyInputSelect } from 'app/(Main)/companies/components/CompanyInputSelect';
import { CompanyUsers } from 'app/(Main)/companies/components/CompanyUsers';
import { CompanyAddresses } from 'app/(Main)/companies/components/CompanyAddresses';

import scss from './Companies.module.scss';
import { CompanyResponsible } from 'app/(Main)/companies/components/CompanyResponsible';

export default async function CompaniesPage({
    searchParams,
}: {
    searchParams?: { org?: string; offset?: string };
}) {
    const access = await getCookieAccess();

    const organizations = await getServerOrganization(access);

    const currentOrgId = searchParams?.org ?? organizations.results[0].id;

    const selectedOrg = organizations.results.find(
        (org) => org.id === +currentOrgId
    )!;

    const migrationAddresses = await getOrganizationMiaAddressesSsr(
        selectedOrg.id
    );

    return (
        <main className={scss.company_page_wrapper}>
            <Suspense fallback={<ProfileSkeleton />}>
                <Profile />
            </Suspense>
            <div className={scss.company_content_layout}>
                <CompanyInputSelect
                    selectedOrg={selectedOrg}
                    organizationsList={organizations.results}
                />
                <div className={scss.company_content}>
                    <div className={scss.company_profile_header}>
                        <h2>Профиль компании</h2>
                        <AddCompanyWrapper />
                    </div>
                    <CompanyProfile selectedOrg={selectedOrg} />
                    <CompanyAddresses
                        addresses={migrationAddresses.results}
                        selectedOrgId={selectedOrg.id}
                    />
                    <CompanyResponsible selectedOrgId={selectedOrg.id} />
                    <CompanyUsers
                        offset={searchParams?.offset}
                        selectedOrgId={selectedOrg.id}
                    />
                </div>
            </div>
        </main>
    );
}
