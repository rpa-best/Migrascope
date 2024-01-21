import { getServerOrganization } from 'http/organizationService/organizationService';

import scss from './OrganizationTable.module.scss';

export const OrganizationTable = async () => {
    const organizations = await getServerOrganization();

    return <></>;
};
