import { MotionValue } from 'framer-motion';

export interface AddCompanyProps {
    opacity: MotionValue<number>;
    visible: boolean;
    setVisible: (b: boolean) => void;
}

export interface OrgFormType {
    id: number;
    name: string;
}

export interface AddCompanyValues {
    inn: string;
    orgForm: OrgFormType | null;
    orgName: string;
    legalAddress: string;
    actualAddress: string;
    directorName: string;
    directorSurname: string;
    directorPatronymic: string;
}
