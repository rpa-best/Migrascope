export interface TariffDataContentType {
    title: string;
    price: string;
    description: string;
}

export interface TariffDataType {
    id: number;
    type: 'free' | 'standard' | 'pro';
    content: TariffDataContentType;
    benefits: string[];
}

export const TariffData: TariffDataType[] = [
    {
        id: 1,
        type: 'free',
        content: {
            title: 'Промо',
            description: 'Для всех пользователей',
            price: 'Бесплатно',
        },
        benefits: [
            'Расширенный раздел блока «Бланки»',
            'Детальный отчет по задачам',
            'Расширенный раздел блока «Бланки»',
            'Расширенный раздел блока «Бланки»',
            'Детальный отчет по задачам',
            'Расширенный раздел блока «Бланки»',
        ],
    },
    {
        id: 2,
        type: 'standard',
        content: {
            title: 'Стандарт',
            description: 'Стандартный пакет',
            price: '1 200',
        },
        benefits: [
            'Все из тарифа Промо',
            'Детальный отчет по задачам',
            'Расширенный раздел блока «Бланки»',
            'Расширенный раздел блока «Бланки»',
            'Детальный отчет по задачам',
            'Расширенный раздел блока «Бланки»',
        ],
    },
    {
        id: 3,
        type: 'pro',
        content: {
            title: 'Про',
            description: 'Расширенный пакет',
            price: '2 400',
        },
        benefits: [
            'Все из тарифа Стандарт',
            'Детальный отчет по задачам',
            'Расширенный раздел блока «Бланки»',
            'Расширенный раздел блока «Бланки»',
            'Детальный отчет по задачам',
            'Расширенный раздел блока «Бланки»',
        ],
    },
];
