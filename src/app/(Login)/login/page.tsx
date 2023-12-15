import Image from 'next/image';

import { LoginForm } from 'app/(Login)/login/components/LoginForm';

import LoginBackground from '/public/login/LoginFormBackground.png';

import scss from './LoginPage.module.scss';
import { FormsWrapper } from 'app/(Login)/login/components/FormsWrapper';

const LoginPage = () => {
    return (
        <main className={scss.login_wrapper}>
            <section className={scss.login_bg_wrapper}>
                <Image
                    fill
                    src={LoginBackground}
                    alt="Фоновое изображение формы Авторизации"
                />
            </section>
            <FormsWrapper />
        </main>
    );
};

export default LoginPage;
