import { getCookieAccess } from 'utils/getServerAccess';

import { OrgTableWrapper } from 'components/OrganizationTable/OrgTableWrapper';
import { getServerOrganization } from 'http/organizationService/organizationService';
import { MainTableWrapper } from 'app/(Main)/components/MainTableWrapper';

import scss from 'components/OrganizationTable/OrganizationTable.module.scss';

export const OrganizationTable = async () => {
    const access = await getCookieAccess();

    const organizations = await getServerOrganization(access);

    return (
        <div className={scss.organization_table}>
            <OrgTableWrapper
                which="users"
                ChildrenComponent={MainTableWrapper as any}
                orgs={organizations?.results}
            />
        </div>
    );
};
