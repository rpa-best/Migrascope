import { RenderedComponentProps } from 'components/Tooltip/types';
import { ResponsibleType } from 'http/organizationService/types';

export interface AddCompanyResponsibleFormProps extends RenderedComponentProps {
    orgId: number;
    type: 'edit' | 'create';
    responsible?: ResponsibleType;
}

export interface AddCompanyResponsibleFormValues
    extends Omit<
        ResponsibleType,
        'organization' | 'id' | 'dateEndPassport' | 'dateIssuePassport'
    > {
    dateEndPassport: Date | null;
    dateIssuePassport: Date | null;
}

export type AddCompanyResponsibleFormErrors = {
    [key in keyof AddCompanyResponsibleFormValues]: string;
};
