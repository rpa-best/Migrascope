import { OrganizationType } from 'http/organizationService/types';
import { RenderedComponentProps } from 'components/Tooltip/types';

export interface WorkerFormProps extends RenderedComponentProps {
    type: 'edit' | 'create';
}

interface WorkerImageType {
    img: File;
    preview: string;
}

export interface WorkerImageProps {
    image: WorkerImageType | null;
    isDragActive: boolean;
    rootProps: any;
    deleteImage: () => void;
}

export interface IdentificationCardType {
    id: number;
    name: string;
    slug: string;
}

export interface WorkerFormValues {
    avatar: WorkerImageType | null;
    organization: OrganizationType | null;
    name: string;
    surname: string;
    patronymic: string;
    citizenship: string;
    identificationCard: IdentificationCardType | null;
    phone: string;
    email: string;
}
