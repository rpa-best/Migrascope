'use client';

import { useEditStore } from 'app/(Main)/workers/[id]/components/WorkerProfile/store/isEditStore';

import WorkerEditSvg from 'app/(Main)/workers/[id]/svg/edit-2.svg';
import DeleteSvg from 'app/(Main)/workers/[id]/svg/trash.svg';

import scss from 'app/(Main)/workers/[id]/components/WorkerProfile/WorkerProfile.module.scss';

export const ProfileActions = () => {
    const [isEdit, setIsEdit] = useEditStore((state) => [
        state.isEdit,
        state.setIsEdit,
    ]);

    return (
        <div className={scss.profile_actions}>
            <WorkerEditSvg
                style={{ color: isEdit ? '#595FE5' : undefined }}
                onClick={() => setIsEdit(!isEdit)}
            />
            <DeleteSvg />
        </div>
    );
};
