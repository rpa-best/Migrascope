import Image from 'next/image';

import { Button } from 'components/UI/Buttons/Button';
import { ProfileActions } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/ProfileActions';
import { WorkerInfoField } from 'app/(Main)/workers/[id]/components/WorkerProfile/components/WorkerInfoField';

import { translateToRussian } from 'app/(Main)/workers/[id]/components/WorkerProfile/utils';
import { getWorkerSsr } from 'http/workerService/workerService';

import scss from './WorkerProfile.module.scss';
import { setPhoneMask } from 'utils/setPhoneMask';

const fieldsToExclude = [
    'id',
    'avatar',
    'organization',
    'name',
    'surname',
    'patronymic',
];

export const WorkerProfile = async ({
    orgId,
    workerId,
}: {
    orgId: number;
    workerId: number;
}) => {
    const worker = await getWorkerSsr(orgId, workerId);

    return (
        <div className={scss.worker_layout}>
            <div className={scss.worker_header}>
                <h3>
                    {worker.surname + ' '}
                    {worker.name}
                </h3>
                <ProfileActions worker={worker} />
            </div>
            <div className={scss.worker_content}>
                <div className={scss.worker_content_image}>
                    <Image
                        style={{ borderRadius: '15px' }}
                        fill
                        src={worker.avatar}
                        alt="worker-image"
                    />
                </div>
                <div className={scss.worker_content_fields}>
                    {Object.entries(worker).map((el, index) => {
                        if (fieldsToExclude.includes(el[0])) {
                            return;
                        }
                        if (el[0] === 'phone') {
                            el[1] = setPhoneMask(el[1]);
                        }
                        return (
                            <WorkerInfoField
                                key={index}
                                title={translateToRussian(el[0])}
                                content={el[1] || 'Не указано'}
                            />
                        );
                    })}
                    <Button>Уволить</Button>
                </div>
            </div>
        </div>
    );
};
