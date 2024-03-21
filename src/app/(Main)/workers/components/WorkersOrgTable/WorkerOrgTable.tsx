import { cookies } from 'next/headers';

import { OrgTableWrapper } from 'components/OrganizationTable/OrgTableWrapper';
import { WorkersDocsTable } from 'app/(Main)/workers/components/WorkersDocsTable';

import { getServerOrganization } from 'http/organizationService/organizationService';

import scss from 'app/(Main)/workers/WorkersPage.module.scss';

export const WorkerOrgTable = async () => {
    const cookieStore = cookies();
    const access = cookieStore.get('access')?.value as string;

    const organizations = await getServerOrganization(access);

    return (
        <div className={scss.orgs_wrapper}>
            <OrgTableWrapper
                which="workers"
                ChildrenComponent={WorkersDocsTable as any}
                propsToComponent={{
                    headers: ['ФИО/Компания', 'Вид договора'],
                }}
                orgs={organizations?.results}
            />
        </div>
    );
};
