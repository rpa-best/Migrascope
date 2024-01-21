'use client';

import React, { ChangeEventHandler, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';

import revalidate from 'utils/revalidate';
import { useModalStore } from 'store/modalStore/modalVisibleStore';

import { ChangeImgProps } from 'components/ChangeImg/types';
import { errorToastOptions } from 'config/toastConfig';
import { ImgModal } from 'components/ChangeImg/ImgModal';
import Spinner from '/public/svg/spinner.svg';
import revalidateTagOnClient from 'utils/revalidateTagOnClient';

export const ChangeImg: React.FC<ChangeImgProps> = ({
    setUserImg,
    callback,
    revalidateTag,
}) => {
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [setVisible] = useModalStore((state) => [state.setVisible]);
    const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
        try {
            setLoading(true);
            if (e.target.files) {
                if (e.target.files[0].size >= 1048576) {
                    toast('Размер файла превышает 1мб', errorToastOptions);
                    return;
                }

                callback(e.target.files[0])
                    .then((r) => {
                        setUserImg(r.avatar);
                        revalidateTagOnClient(revalidateTag);
                    })
                    .finally(() => {
                        setVisible(false);
                    });
            }
        } catch (e: any) {
            toast('Непредвиденная ошибка', errorToastOptions);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ImgModal
                loading={loading}
                ref={fileInputRef}
                handleChangeFile={handleChangeFile}
            />
        </>
    );
};
