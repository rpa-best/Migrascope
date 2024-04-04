'use client';

import { useEditStore } from 'app/(Main)/workers/[id]/components/WorkerProfile/store/isEditStore';

import { deleteWorker } from 'http/workerService/workerService';

import WorkerEditSvg from 'app/(Main)/workers/[id]/svg/edit-2.svg';
import DeleteSvg from 'app/(Main)/workers/[id]/svg/trash.svg';

import scss from 'app/(Main)/workers/[id]/components/WorkerProfile/WorkerProfile.module.scss';

export const ProfileActions = ({ workerId }: { workerId: number }) => {
    const [isEdit, setIsEdit] = useEditStore((state) => [
        state.isEdit,
        state.setIsEdit,
    ]);

    async function handleDeleteWorker() {
        await deleteWorker(workerId);
    }

    return (
        <div className={scss.profile_actions}>
            <WorkerEditSvg
                style={{ color: isEdit ? '#595FE5' : undefined }}
                onClick={() => setIsEdit(!isEdit)}
            />
            <DeleteSvg onClick={handleDeleteWorker} />
        </div>
    );
};
