import {
    ArrivalDocumentType,
    BaseType,
    BlankTranslatedLabelsType,
    ContractType,
    IdentityDocumentType,
    PersonType,
    PlaceStayType,
    PurposeDepartureType,
    ReasonSuspensionType,
    ReceivingSideType,
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

export const ArrivalDocumentListValues: ArrivalDocumentType[] = [
    {
        id: 1,
        name: 'Нет документов',
        slug: 'notDocuments',
    },
    {
        id: 2,
        name: 'Виза',
        slug: 'visa',
    },
    {
        id: 3,
        name: 'Вид на жительство',
        slug: 'residentCard',
    },
    {
        id: 4,
        name: 'Разрешение на временное проживание',
        slug: 'temporaryResidencePermit',
    },
    {
        id: 5,
        name: 'Разрешение на временное проживание в целях получения образования',
        slug: 'temporaryResidencePermitEducational',
    },
];

export const PurposeDepartureListValues: PurposeDepartureType[] = [
    {
        id: 1,
        name: 'Туризм',
        slug: 'tourism',
    },
    {
        id: 2,
        name: 'Деловая',
        slug: 'business',
    },
    {
        id: 3,
        name: 'Работа',
        slug: 'work',
    },
    {
        id: 4,
        name: 'Учеба',
        slug: 'studies',
    },
    {
        id: 5,
        name: 'Частная',
        slug: 'private',
    },
    {
        id: 6,
        name: 'Транзит',
        slug: 'transit',
    },
    {
        id: 7,
        name: 'Гуманитарная',
        slug: 'humanitarian',
    },
    {
        id: 8,
        name: 'Иная',
        slug: 'other',
    },
];

export const PlaceStayListValues: PlaceStayType[] = [
    {
        id: 1,
        name: 'Жилое помещение',
        slug: 'residentialPremises',
    },
    {
        id: 2,
        name: 'Иное помещение',
        slug: 'otherPremises',
    },
    {
        id: 3,
        name: 'Организация',
        slug: 'organization',
    },
];

export const ReceivingSideListValues: ReceivingSideType[] = [
    {
        id: 1,
        name: 'Юридическое лицо',
        slug: 'legalEntity',
    },
    {
        id: 2,
        name: 'Физическое лицо',
        slug: 'individual',
    },
];

export const IdentityDocumentListValues: IdentityDocumentType[] = [
    {
        id: 1,
        slug: 'certificateAsylum',
        name: 'Свидетельство о предоставлении убежища',
    },
    {
        id: 2,
        slug: 'residencePermit',
        name: 'Вид на жительство',
    },
    {
        id: 3,
        slug: 'passport',
        name: 'Паспорт',
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
        name: 'Профессия',
        placeholder: 'профессию',
    },
    {
        slug: 'salary',
        name: 'Зарплата',
        placeholder: 'зарплату',
    },
    {
        slug: 'documentType',
        name: 'Тип документа',
        placeholder: 'тип документа',
    },
    {
        slug: 'validityPeriod',
        name: 'Период действия',
        placeholder: 'период действия',
    },
    {
        slug: 'purposeDeparture',
        name: 'Цель выезда',
        placeholder: 'цель выезда',
    },

    {
        slug: 'durationStay',
        name: 'Срок пребывания до',
        placeholder: 'срок прибывания',
    },
    {
        slug: 'addressFormerPlaceResidence',
        name: 'Адрес прежнего места пребывания',
        placeholder: 'адрес прежнего места пребывания',
    },
    {
        slug: 'placeStayRegion',
        name: 'Область, край, республика, автономный округ (область) места пребывания',
        placeholder: 'регион пребывания',
    },
    {
        slug: 'placeStayArea',
        name: 'Район прибывания',
        placeholder: 'район пребывания',
    },
    {
        slug: 'placeStayCity',
        name: 'Город пребывания',
        placeholder: 'город пребывания',
    },
    {
        slug: 'placeStayStreet',
        name: 'Улица пребывания',
        placeholder: 'улицу пребывания',
    },
    {
        slug: 'objectType',
        name: 'Тип объекта места пребывания (дом, участок, владение и иное)',
        placeholder: 'тип объекта',
    },
    {
        slug: 'placeStayHouse',
        name: 'Дом места пребывания',
        placeholder: 'Дом места пребывания',
    },
    {
        slug: 'placeStayFrame',
        name: 'Корпус  места пребывания',
        placeholder: 'корпус места пребывания',
    },
    {
        slug: 'placeStayStructure',
        name: 'Строение места пребывания',
        placeholder: 'строение места пребывания',
    },
    {
        slug: 'roomType',
        name: 'Тип комнаты места пребывания (квартира, комната, офис и иное)',
        placeholder: 'тип комнаты',
    },
    {
        slug: 'placeStayApartment',
        name: 'Квартира места пребывания',
        placeholder: 'квартиру места пребывания',
    },
    {
        slug: 'statedPeriodStay',
        name: 'Заявленный срок пребывания до',
        placeholder: 'срок пребывания до',
    },
    {
        slug: 'placeStay',
        name: 'Квартира, комната, офис и иное',
        placeholder: 'тип места пребывания',
    },
    {
        slug: 'documentRightUse',
        name: 'Наименование и реквизиты документа, подтверждающего право пользования помещением (строением, сооружением) (указывается при наличии)',
        placeholder: 'права на использование помещения',
    },
    {
        slug: 'receivingSide',
        name: 'Принимающая сторона',
        placeholder: 'принимающую сторону',
    },
    {
        slug: 'surnameReceivingSide',
        name: 'Фамилия принимающей стороны',
        placeholder: 'фамилию принимающей стороны',
    },
    {
        slug: 'nameReceivingSide',
        name: 'Имя принимающей стороны',
        placeholder: 'имя принимающей стороны',
    },
    {
        slug: 'patronymicReceivingSide',
        name: 'Отчество принимающей стороны',
        placeholder: 'отчество принимающей стороны',
    },
    {
        slug: 'typeOfIdentityDocument',
        name: 'Тип документа, удостоверяющий личность принимающей стороны',
        placeholder: 'тип документа',
    },
    {
        slug: 'seriesReceivingSide',
        name: 'Серия документа принимающей сторон',
        placeholder: 'серию документа',
    },
    {
        slug: 'numberReceivingSide',
        name: 'Номер документа принимающей сторон',
        placeholder: 'номер документа',
    },
    {
        slug: 'dateIssueReceivingSide',
        name: 'Дата выдачи документа принимающей сторон',
        placeholder: 'дата выдачи документа',
    },
    {
        slug: 'sellByReceivingSide',
        name: 'Дата окончания документа принимающей стороны',
        placeholder: 'дату окончания документа',
    },
    {
        slug: 'region',
        name: 'Область, край, республика, автономный округ (область) принимающей стороны',
        placeholder: 'регион принимающей стороны',
    },
    {
        slug: 'area',
        name: 'Район принимающей стороны',
        placeholder: 'район принимающей стороны',
    },
    {
        slug: 'city',
        name: 'Город принимающей стороны',
        placeholder: 'город принимающей стороны',
    },
    {
        slug: 'street',
        name: 'Улицу принимающей стороны',
        placeholder: 'улицу принимающей стороны',
    },
    {
        slug: 'house',
        name: 'Дом принимающей стороны',
        placeholder: 'дом принимающей стороны',
    },
    {
        slug: 'frame',
        name: 'Корпус принимающей стороны',
        placeholder: 'корпус принимающей стороны',
    },
    {
        slug: 'structure',
        name: 'Строение принимающей стороны',
        placeholder: 'строение принимающей стороны',
    },
    {
        slug: 'apartment',
        name: 'Квартира принимающей стороны',
        placeholder: 'квартиру принимающей стороны',
    },
];
