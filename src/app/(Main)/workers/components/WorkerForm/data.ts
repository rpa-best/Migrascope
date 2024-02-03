import { IdentificationCardType } from 'app/(Main)/workers/components/WorkerForm/WorkerForm.types';

export const identificationCardData: IdentificationCardType[] = [
    {
        id: 1,
        name: 'Паспорт',
        slug: 'passport',
    },
    {
        id: 2,
        name: 'Вид на жительство',
        slug: 'residence_permit',
    },
    {
        id: 3,
        name: 'Право на убежища',
        slug: 'certificate_asylum',
    },
];
