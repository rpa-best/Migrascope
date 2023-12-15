import React from 'react';
import type { Metadata } from 'next';

import { ToastContainer } from 'react-toastify';

import { poppins } from 'font/montserrat';

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
    return (
        <html lang="ru">
            <body className={poppins.className}>
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}
