import { WorkersActions } from 'app/(Main)/workers/components/WorkersActions';
import { WorkersDocsTable } from 'app/(Main)/workers/components/WorkersDocsTable';

import { cookies } from 'next/headers';
import { getServerOrganization } from 'http/organizationService/organizationService';
import { OrgTableWrapper } from 'components/OrganizationTable/OrgTableWrapper';

import scss from './WorkersPage.module.scss';

export default async function WorkersPage() {
    const cookieStore = cookies();
    const access = cookieStore.get('access')?.value as string;

    const organizations = await getServerOrganization(access);

    return (
        <main style={{ width: '100%' }}>
            <WorkersActions />
            <div className={scss.orgs_wrapper}>
                <OrgTableWrapper
                    ChildrenComponent={WorkersDocsTable as any}
                    propsToComponent={{
                        headers: ['ФИО/Компания', 'Вид договора'],
                    }}
                    orgs={organizations.results}
                />
            </div>
        </main>
    );
}
