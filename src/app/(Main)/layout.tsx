import type { Metadata } from 'next';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import clsx from 'clsx';

import { Header } from 'app/(Main)/components/Header';
import { Navbar } from 'app/(Main)/components/Navbar';

import { poppins } from 'font/montserrat';

import scss from './MainPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'scss/utils.scss';
import 'scss/_reset.scss';

export const metadata: Metadata = {
    title: 'Migrascope',
    description: 'Migrascope',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const bodyClass = clsx({
        [poppins.className]: true,
        [scss.body]: true,
    });

    return (
        <html lang="ru">
            <body className={bodyClass}>
                <Navbar />
                <Header />
                <div style={{ display: 'flex' }}>{children}</div>
                <ToastContainer />
            </body>
        </html>
    );
}
