import { InputSelectListType } from 'components/UI/Inputs/InputSelect/types';

interface RolesConstType extends InputSelectListType {
    slug: string;
}

export const RolesConst: RolesConstType[] = [
    {
        id: 1,
        name: 'Владелец',
        slug: 'owner',
    },
    {
        id: 2,
        name: 'Администратор',
        slug: 'admin',
    },
    {
        id: 3,
        name: 'Наблюдатель',
        slug: 'observer',
    },
];
