import {
    BaseType,
    BlankTranslatedLabelsType,
    ContractType,
    PersonType,
    ReasonSuspensionType,
} from 'app/(Main)/forms/components/Blanks/components/BlankForm/BlankForm.types';

export const ContractTypeListValues: ContractType[] = [
    { id: 1, name: 'Срочный договор', slug: 'urgent' },
    { id: 2, name: 'Бессрочный договор', slug: 'perpetual' },
];

export const ReasonSuspensionListValues: ReasonSuspensionType[] = [
    {
        id: 1,
        name: 'Действующего вида на жительство',
        slug: 'validResidencePermit',
    },
    { id: 2, name: 'Валидного патента', slug: 'validPatent' },
    {
        id: 3,
        name: 'Временного разрешения на жительство',
        slug: 'validTemporaryResidencePermit',
    },
    { id: 4, name: 'Справки о вакцинации', slug: 'gettingVaccinated' },
    {
        id: 5,
        name: 'Прохождения медкомиссии',
        slug: 'passingMedicalExamination',
    },
    {
        id: 6,
        name: 'Справки сдачи анализов крови на антитела',
        slug: 'passingAnalysis',
    },
    {
        id: 7,
        name: 'Чеков оплату за патент',
        slug: 'checks',
    },
];

export const BaseListValues: BaseType[] = [
    { id: 1, name: 'ГПХ', slug: 'civilContract' },
    { id: 2, name: 'Трудовой Договор', slug: 'employmentContract' },
];

export const PersonListValues: PersonType[] = [
    {
        id: 1,
        name: 'Человек, подающий документы по доверенности',
        slug: 'personProxy',
    },
    {
        id: 2,
        name: 'Директор',
        slug: 'director',
    },
];

export const TranslatedBlankFormLabels: BlankTranslatedLabelsType[] = [
    {
        slug: 'workerId',
        name: 'Айди работника',
        placeholder: 'айди работника',
    },
    {
        slug: 'services',
        name: 'Услуги',
        placeholder: 'услугу',
    },
    {
        slug: 'endDate',
        name: 'Дата окончания',
        placeholder: 'дату окончания',
    },
    {
        slug: 'startDate',
        name: 'Дата начала',
        placeholder: 'дату начала',
    },
    {
        slug: 'reasonSuspension',
        name: 'Отстранение до предоставления',
        placeholder: 'причину',
    },
    {
        slug: 'base',
        name: 'Основание',
        placeholder: 'основание',
    },
    {
        slug: 'address',
        name: 'Адрес',
        placeholder: 'адрес',
    },
    {
        slug: 'number',
        name: 'Номер',
        placeholder: 'номер',
    },
    {
        slug: 'numberMonths',
        name: 'Кол-во месяцев',
        placeholder: 'кол-во месяцев',
    },
    {
        slug: 'nameTerritorialBody',
        name: 'Наименование органа МВД',
        placeholder: 'наименование территориального МВД',
    },
    {
        slug: 'cause',
        name: 'Причина',
        placeholder: 'причину',
    },
    {
        slug: 'contractType',
        name: 'Тип контракта',
        placeholder: 'тип контракта',
    },
    {
        slug: 'dateIssue',
        name: 'Дату выдачи',
        placeholder: 'дату выдачи',
    },
    {
        slug: 'endDateUrgent',
        name: 'Окончание срока',
        placeholder: 'окончание срока',
    },
    {
        slug: 'firstManagerId',
        name: 'Ответственное лицо 1',
        placeholder: 'ответственное лицо',
    },
    {
        slug: 'secondManagerId',
        name: 'Ответственное лицо 2',
        placeholder: 'ответственное лицо',
    },
    {
        slug: 'series',
        name: 'Серия',
        placeholder: 'серию',
    },
    {
        slug: 'endTime',
        name: 'Конец рабочего времени',
        placeholder: 'конец рабочего времени',
    },
    {
        slug: 'startTime',
        name: 'Начало рабочего времени',
        placeholder: 'начало рабочего времени',
    },
    {
        slug: 'fullName',
        name: 'Полное имя',
        placeholder: 'полное имя',
    },
    {
        slug: 'issuedBy',
        name: 'Кем выдано',
        placeholder: 'кем выдано',
    },
    {
        slug: 'person',
        name: 'Предоставляет уведомление',
        placeholder: 'лицо, представляющее уведомление',
    },
    {
        slug: 'position',
        name: 'Позиция',
        placeholder: 'позицию',
    },
    {
        slug: 'salary',
        name: 'Зарплата',
        placeholder: 'зарплату',
    },
];
