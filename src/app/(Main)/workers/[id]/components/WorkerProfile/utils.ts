const replaceArray = [
    {
        search: 'gender',
        replace: 'Пол',
    },
    {
        search: 'actualWorkAddress',
        replace: 'Текущее место работы',
    },
    {
        search: 'citizenship',
        replace: 'Гражданство',
    },
    {
        search: 'birthday',
        replace: 'Дата рождения',
    },
    {
        search: 'phone',
        replace: 'Телефон',
    },
    {
        search: 'registrationAddress',
        replace: 'Адресс регистрации',
    },
    {
        search: 'processingPersonalData',
        replace: 'Обработка персональных данных',
    },
    {
        search: 'identificationCard',
        replace: 'Идентификационный документ',
    },
    {
        search: 'placeBirth',
        replace: 'Место рождения',
    },
    {
        search: 'status',
        replace: 'Статус',
    },
    {
        search: 'dateDismissal',
        replace: 'Дата увольнения',
    },
    {
        search: 'email',
        replace: 'Почта',
    },
    {
        search: 'position',
        replace: 'Позиция',
    },
];

export const translateToRussian = (value: string) => {
    return replaceArray.find((el) => el.search === value)?.replace as string;
};
