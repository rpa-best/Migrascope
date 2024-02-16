import { WorkerDocuments } from 'http/organizationService/types';
import { ImageType } from 'components/DropImage/types';
import { RenderedComponentProps } from 'components/Tooltip/types';

export interface DocumentFormProps extends RenderedComponentProps {
    type: 'create' | 'edit';
    document?: WorkerDocuments;
}

export interface DocumentFormValues {
    images: ImageType[] | string[];
    series: string;
    issuedWhom: string;
}
