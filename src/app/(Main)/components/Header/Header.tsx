import { Profile } from 'app/(Main)/components/Header/components/Profile';
import { Notifications } from 'app/(Main)/components/Header/components/Notifications';
import { Description } from 'app/(Main)/components/Header/components/Description';

import scss from './Header.module.scss';

export const Header = () => {
    return (
        <header className={scss.header}>
            <h2 className={scss.header_description}>
                <Description />
            </h2>
            <div className={scss.header_actions}>
                {/*<Search />*/}
                <Notifications />
                <Profile />
            </div>
        </header>
    );
};
