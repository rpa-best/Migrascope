import { cookies } from 'next/headers';

import { OrganizationTableRow } from 'app/(Main)/components/OrganizationTable/OrganizationTableRow';
import { getServerOrganization } from 'http/organizationService/organizationService';

import scss from './OrganizationTable.module.scss';

export const OrganizationTable = async () => {
    const cookieStore = cookies();
    const access = cookieStore.get('access')?.value as string;

    const organizations = await getServerOrganization(access);

    return (
        <div className={scss.organization_table}>
            {organizations.results.map((el, index) => (
                <OrganizationTableRow
                    key={index}
                    id={el.id}
                    name={`"${el.organizationalForm}" ${el.name}`}
                />
            ))}
        </div>
    );
};
