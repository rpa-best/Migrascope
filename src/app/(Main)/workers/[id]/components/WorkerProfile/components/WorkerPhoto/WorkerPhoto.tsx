'use client';

import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import { ChangeImg } from 'components/ChangeImg';

import { updateWorker } from 'http/workerService/workerService';
import { useEditStore } from 'app/(Main)/workers/[id]/components/WorkerProfile/store/isEditStore';

import ProfileSvg from '/public/svg/profile.svg';
import EditSvg from '/public/svg/edit.svg';

import scss from 'app/(Main)/workers/[id]/components/WorkerProfile/WorkerProfile.module.scss';

const Modal = dynamic(() => import('components/Modal'));

export const WorkerPhoto = ({ id, photo }: { id: number; photo?: string }) => {
    const [visible, setVisible] = useState(false);
    const [isEdit] = useEditStore((state) => [state.isEdit]);

    const handleChangeImg = async (avatar: File) => {
        await updateWorker(id, {
            avatar,
        });
    };

    return (
        <div className={scss.worker_content_image}>
            {photo ? (
                <Image
                    style={{
                        borderRadius: '15px',
                    }}
                    fill
                    src={photo}
                    alt="worker-image"
                />
            ) : (
                <ProfileSvg />
            )}

            {isEdit && (
                <div onClick={() => setVisible(true)} className={scss.edit_svg}>
                    <EditSvg />
                </div>
            )}
            <Modal visible={visible} setVisible={setVisible}>
                <ChangeImg
                    revalidateTag="server-worker"
                    callback={handleChangeImg}
                />
            </Modal>
        </div>
    );
};
