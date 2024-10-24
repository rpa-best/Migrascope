import {
    EditCompanyFormErrorType,
    EditCompanyFormValues,
} from 'app/(Main)/companies/components/CompanyProfile/components/CompanyEditForm/CompanyForm.types';
import {
    EditOrganizationBody,
    OrganizationType,
} from 'http/organizationService/types';
import { OrgFormData } from 'components/AddCompany/tempData';
import { setPhoneMask } from 'utils/setPhoneMask';
import { camelToSnakeCaseDeep } from 'utils/camelToSnakeCaseDeep';
import {
    createBank,
    editBank,
    editOrganization,
} from 'http/organizationService/organizationService';
import { removePhoneMask } from 'utils/removePhoneMask';
import { formatDate } from 'utils/formatDate';
import { checkForNotEmpty } from 'utils/checkForNotEmpty';
import { toast } from 'react-toastify';
import { errorToastOptions } from 'config/toastConfig';

const fieldsToExclude: (keyof EditCompanyFormValues)[] = [
    'emailContactPerson',
    'phoneContactPerson',
    'fullNameContactPerson',
    'additionalPhone',
];

export const CompanyFormValidate = (values: EditCompanyFormValues) => {
    const errors: Partial<EditCompanyFormErrorType> = {};

    for (const [key, value] of Object.entries(values)) {
        if (fieldsToExclude.includes(key as keyof EditCompanyFormValues))
            continue;
        if (!value) {
            errors[key as keyof typeof errors] = 'Обязательное поле';
        }
    }

    return errors;
};

export const companyFormSubmit = async (
    orgId: number,
    values: EditCompanyFormValues,
    initialValues: OrganizationType,
    setIsEdit: (v: boolean) => void
) => {
    const { bankInfo, ...newValues } = structuredClone(values);
    camelToSnakeCaseDeep(newValues);

    const body: EditOrganizationBody = {
        ...(newValues as unknown as EditOrganizationBody),
        organizational_form: values.organizationalForm?.id as number,
        phone: removePhoneMask(values.phone)!,
        date_end_passport: formatDate(values.dateEndPassport as Date),
        date_issue_passport: formatDate(values.dateIssuePassport as Date),
        phone_host_party: removePhoneMask(values.phoneHostParty)!,
        phone_contact_person: removePhoneMask(values.phoneContactPerson)!,
        additional_phone: removePhoneMask(values.additionalPhone)!,
    };

    await editOrganization(orgId, body);

    bankInfo.forEach((bank, index) => {
        camelToSnakeCaseDeep(bank);
        if (bank.id) {
            editBank(bank.id, bank);
            setIsEdit(false);
        } else {
            if (!checkForNotEmpty(bank)) {
                toast('Заполните все поля в новом банке', errorToastOptions);
                return;
            }
            createBank(
                orgId,
                bank as unknown as Parameters<typeof createBank>[1]
            ).then((res) => {
                const currentBank = values.bankInfo.find(
                    (_, i) => i === index
                )!;
                currentBank.id = res?.id;
            });
            setIsEdit(false);
        }
    });

    return;
};

export const setInitialEditCompanyValues = (
    values: Partial<OrganizationType>
): EditCompanyFormValues => {
    return {
        bankInfo: [],
        owner: values.owner?.toString() ?? '',
        inn: values.inn ?? '',
        kpp: values.kpp ?? '',
        ogrn: values.ogrn ?? '',
        okved: values.okved ?? '',
        passportSeries: values.passportSeries ?? '',
        emailContactPerson: values.emailContactPerson ?? '',
        additionalPhone: values.additionalPhone
            ? setPhoneMask(values.additionalPhone)
            : '',
        fullNameContactPerson: values.fullNameContactPerson ?? '',
        phoneContactPerson: values.phoneContactPerson
            ? setPhoneMask(values.phoneContactPerson)
            : '',
        dateEndPassport: values.dateEndPassport
            ? new Date(values.dateEndPassport)
            : null,
        actualAddress: values.actualAddress ?? '',
        legalAddress: values.legalAddress ?? '',
        dateIssuePassport: values.dateIssuePassport
            ? new Date(values.dateIssuePassport)
            : null,
        fullNameBookkeeper: values.fullNameBookkeeper ?? '',
        fullNameHostParty: values.fullNameHostParty ?? '',
        issuedWhom: values.issuedWhom ?? '',
        passportNumber: values.passportNumber ?? '',
        phoneHostParty: values.phoneHostParty
            ? setPhoneMask(values.phoneHostParty)
            : '',
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
