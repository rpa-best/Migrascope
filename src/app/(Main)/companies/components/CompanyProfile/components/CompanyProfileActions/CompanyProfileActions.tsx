'use client';

import { useEditCompanyStore } from 'app/(Main)/companies/components/CompanyProfile/store/editCompanyStore';

import WorkerEditSvg from 'app/(Main)/workers/[id]/svg/edit-2.svg';
import DeleteSvg from 'app/(Main)/workers/[id]/svg/trash.svg';

import scss from 'app/(Main)/companies/components/CompanyProfile/CompanyProfile.module.scss';

export const CompanyProfileActions = () => {
    const [isEdit, setIsEdit] = useEditCompanyStore((state) => [
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
