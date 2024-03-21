import { SelectDocumentType } from 'components/DocumentForm/DocumentForm.types';
import { RenderedComponentProps } from 'components/Tooltip/types';

export interface TasksFiltersFormProps extends RenderedComponentProps {}

export interface TasksFiltersFormValues {
    type_document: SelectDocumentType | null;
}
