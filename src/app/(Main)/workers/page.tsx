import { WorkersActions } from 'app/(Main)/workers/components/WorkersActions';
import { WorkersDocsTable } from 'app/(Main)/workers/components/WorkersDocsTable';

import { cookies } from 'next/headers';
import { getServerOrganization } from 'http/organizationService/organizationService';
import { OrgTableWrapper } from 'components/OrganizationTable/OrgTableWrapper';

import { TemporaryWorkersData } from 'app/(Main)/workers/components/WorkersDocsTable/tempData';

import scss from './WorkersPage.module.scss';

export default async function WorkersPage() {
    const cookieStore = cookies();
    const access = cookieStore.get('access')?.value as string;

    const organizations = await getServerOrganization(access);

    return (
        <main style={{ width: '100%' }}>
            <WorkersActions />
            <div className={scss.orgs_wrapper}>
                <OrgTableWrapper orgs={organizations.results}>
                    <WorkersDocsTable
                        tableData={TemporaryWorkersData}
                        headers={['ФИО/Компания', 'Документы', 'Действует до']}
                    />
                </OrgTableWrapper>
            </div>
        </main>
    );
}
