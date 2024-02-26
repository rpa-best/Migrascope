'use client';

import Image from 'next/image';

import { ChangeImg } from 'components/ChangeImg';
import { Modal } from 'components/Modal';

import { updateWorker } from 'http/workerService/workerService';
import { useModalStore } from 'store/modalStore/modalVisibleStore';
import { useEditStore } from 'app/(Main)/workers/[id]/components/WorkerProfile/store/isEditStore';

import EditSvg from '/public/svg/edit.svg';

import scss from 'app/(Main)/workers/[id]/components/WorkerProfile/WorkerProfile.module.scss';

export const WorkerPhoto = ({ id, photo }: { id: number; photo: string }) => {
    const [setVisible] = useModalStore((state) => [state.setVisible]);
    const [isEdit] = useEditStore((state) => [state.isEdit]);

    const handleChangeImg = async (avatar: File) => {
        await updateWorker(id, {
            avatar,
        });
    };

    return (
        <div className={scss.worker_content_image}>
            <Image
                style={{
                    borderRadius: '15px',
                }}
                fill
                src={photo}
                alt="worker-image"
            />
            {isEdit && (
                <div onClick={() => setVisible(true)} className={scss.edit_svg}>
                    <EditSvg />
                </div>
            )}
            <Modal>
                <ChangeImg
                    revalidateTag="server-worker"
                    callback={handleChangeImg}
                />
            </Modal>
        </div>
    );
};
