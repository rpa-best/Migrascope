import {
    SelectDocumentType,
    TranslatedLabelsType,
} from 'components/DocumentForm/DocumentForm.types';

export const SelectDocumentList: SelectDocumentType[] = [
    { id: 1, name: 'Паспорт', slug: 'passport' },
    { id: 2, name: 'Патент', slug: 'patent' },
    { id: 3, name: 'Вид на жительство', slug: 'residencePermit' },
    { id: 4, name: 'Чек для патента', slug: 'paycheck' },
    { id: 5, name: 'ИНН', slug: 'INN' },
    { id: 6, name: 'Снилс', slug: 'SNILS' },
    {
        id: 7,
        name: 'Свидетельство о временном убежище',
        slug: 'certificateAsylum',
    },
    { id: 8, name: 'Миграционная карта', slug: 'migrationCard' },
    { id: 9, name: 'Регистрация', slug: 'registration' },
    {
        id: 10,
        name: 'Разрешение на временное проживание',
        slug: 'temporaryResidence',
    },
];

export const TranslatedLabels: TranslatedLabelsType[] = [
    {
        slug: 'dateIssue',
        name: 'Дата выдачи',
        placeholder: 'дату выдачи',
    },
    {
        slug: 'dateEnd',
        name: 'Дата окончания',
        placeholder: 'дату окончания',
    },
    {
        slug: 'number',
        name: 'Номер',
        placeholder: 'номер',
    },
    {
        slug: 'series',
        name: 'Серия',
        placeholder: 'серию',
    },
    {
        slug: 'territoryAction',
        name: 'Территория действия',
        placeholder: 'территорию действия',
    },
    {
        slug: 'issuedWhom',
        name: 'Кем выдан',
        placeholder: 'кем выдан',
    },
    {
        slug: 'territoryAction',
        name: 'Территория действия',
        placeholder: 'территорию действия',
    },
];
