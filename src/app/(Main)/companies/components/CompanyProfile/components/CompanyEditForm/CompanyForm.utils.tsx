import { EditCompanyFormValues } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';
import { OrganizationType } from 'http/organizationService/types';
import { OrgFormData } from 'components/AddCompany/tempData';

export const CompanyFormValidate = () => {
    return <></>;
};

export const setInitialEditCompanyValues = (
    values: Partial<OrganizationType>
): EditCompanyFormValues => {
    return {
        owner: values.owner?.toString() ?? '',
        inn: values.inn ?? '',
        kpp: values.kpp ?? '',
        ogrn: values.ogrn ?? '',
        actualAddress: values.actualAddress ?? [],
        legalAddress: values.legalAddress ?? '',
        bankInfoId: values.bankInfoId?.toString() ?? '',
        organizationalForm:
            OrgFormData.find(
                (form) => form.name === values.organizationalForm
            ) ?? null,
        nameDirector: values.nameDirector ?? '',
        patronymicDirector: values.patronymicDirector ?? '',
        surnameDirector: values.surnameDirector ?? '',
        balance: values.balance?.toString() ?? '',
        name: values.name ?? '',
    };
};
