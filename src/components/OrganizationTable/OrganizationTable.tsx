import { cookies } from 'next/headers';

import { OrgTableWrapper } from 'components/OrganizationTable/OrgTableWrapper';
import { getServerOrganization } from 'http/organizationService/organizationService';
import { MainTableWrapper } from 'app/(Main)/components/MainTableWrapper';

import scss from 'components/OrganizationTable/OrganizationTable.module.scss';

export const OrganizationTable = async () => {
    const cookieStore = cookies();
    const access = cookieStore.get('access')?.value as string;

    const organizations = await getServerOrganization(access);

    return (
        <div className={scss.organization_table}>
            <OrgTableWrapper orgs={organizations?.results}>
                <MainTableWrapper />
            </OrgTableWrapper>
        </div>
    );
};
