import { EditCompanyFormValues } from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';
import {
    EditOrganizationBody,
    OrganizationType,
} from 'http/organizationService/types';
import { OrgFormData } from 'components/AddCompany/tempData';
import { setPhoneMask } from 'utils/setPhoneMask';
import { camelToSnakeCaseDeep } from 'utils/camelToSnakeCaseDeep';
import { editOrganization } from 'http/organizationService/organizationService';
import { removePhoneMask } from 'utils/removePhoneMask';

export const CompanyFormValidate = (values: EditCompanyFormValues) => {
    const errors = {};

    return errors;
};

export const companyFormSubmit = async (
    orgId: number,
    values: EditCompanyFormValues,
    initialValues: OrganizationType
) => {
    const newValues = structuredClone(values);
    camelToSnakeCaseDeep(newValues);

    const body = {
        ...newValues,
        organizational_form: values.organizationalForm?.id as number,
        phone: removePhoneMask(values.phone),
    } as unknown as EditOrganizationBody;

    return await editOrganization(orgId, body);
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
        okved: values.okved ?? '',
        phone: values.phone ? setPhoneMask(values.phone) : '',
        organizationalForm:
            OrgFormData.find(
                (form) => form.name === values.organizationalForm
            ) ?? null,
        nameDirector: values.nameDirector ?? '',
        patronymicDirector: values.patronymicDirector ?? '',
        surnameDirector: values.surnameDirector ?? '',
        name: values.name ?? '',
    };
};
