interface DocsType {
    typeDocument: string;
    dateEnd: string;
}

export interface TemporaryDataType {
    id: number;
    userInfo: {
        name: string;
        subtitle: string;
    };
    docs: DocsType[];
}

export const TemporaryWorkersData: TemporaryDataType[] = [
    {
        id: 1,
        userInfo: {
            name: 'Артём Николаич',
            subtitle:
                'Договор с иностранным гражданином (трудовой/гражданско-правовой) от 29.02.2020',
        },
        docs: [
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'passport',
            },
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'Авансовый налоговый платеж по патенту',
            },
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'Авансовый налоговый платеж по патенту',
            },
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'Миграционный учет',
            },
        ],
    },
    {
        id: 2,
        userInfo: {
            name: 'Артём Николаич',
            subtitle:
                'Договор с иностранным гражданином (трудовой/гражданско-правовой) от 29.02.2020',
        },
        docs: [
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'passport',
            },
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'Авансовый налоговый платеж по патенту',
            },

            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'Миграционный учет',
            },
        ],
    },
    {
        id: 3,
        userInfo: {
            name: 'Артём Николаич',
            subtitle:
                'Договор с иностранным гражданином (трудовой/гражданско-правовой) от 29.02.2020',
        },
        docs: [
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'Авансовый налоговый платеж по патенту',
            },
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'Миграционный учет',
            },
        ],
    },

    {
        id: 4,
        userInfo: {
            name: 'Артём Николаич',
            subtitle:
                'Договор с иностранным гражданином (трудовой/гражданско-правовой) от 29.02.2020',
        },
        docs: [
            {
                dateEnd: new Date().toLocaleDateString(),
                typeDocument: 'Авансовый налоговый платеж по патенту',
            },
        ],
    },
];
