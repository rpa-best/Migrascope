import { OrganizationType } from 'http/organizationService/types';
import { RenderedComponentProps } from 'components/Tooltip/types';
import { Worker } from 'http/workerService/types';
import { ImageType } from 'components/DropImage/types';

export interface WorkerFormProps extends RenderedComponentProps {
    worker: Worker;
}

export interface IdentificationCardType {
    id: number;
    name: string;
    slug: string;
}

export interface WorkerFormValues {
    avatar: ImageType | string | null;
    organization: OrganizationType | null;
    name: string;
    surname: string;
    patronymic: string;
    citizenship: string;
    identificationCard: IdentificationCardType | null;
    phone: string;
    email: string;
}

export interface WorkerErrorTypes
    extends Omit<WorkerFormValues, 'avatar' | 'organization'> {
    avatar: string;
    organization: string;
}

export interface WorkerSubmitValues extends Omit<WorkerFormValues, 'avatar'> {
    avatar: ImageType;
}
