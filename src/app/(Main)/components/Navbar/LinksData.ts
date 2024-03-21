import { NavbarLink } from 'app/(Main)/components/Navbar/types';

import Profile from '/public/svg/profile.svg';
import Tasks from 'app/(Main)/components/Navbar/svg/case.svg';
import Forms from '/public/svg/notifications.svg';
import Building from '/public/svg/building.svg';
import People from 'app/(Main)/components/Navbar/svg/people.svg';

export const LinksData: NavbarLink[] = [
    { href: '/', text: 'Личный кабинет', svg: Profile },
    {
        href: '/forms',
        text: 'Бланки',
        svg: Forms,
    },
    {
        href: '/companies',
        text: 'Компании',
        svg: Building,
    },
    {
        href: '/workers',
        text: 'Сотрудники',
        svg: People,
    },
    {
        href: '/tasks',
        text: 'Задачи',
        svg: Tasks,
    },
];
