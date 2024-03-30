'use client';
import React, { FC, useState } from 'react';
import { useSpring } from 'framer-motion';

import Modal from 'components/Modal';
import { AddCompanyResponsibleForm } from 'app/(Main)/companies/components/CompanyResponsible/components/AddCompanyResponsible/components/AddCompanyResponsibleForm';

import { CompanyResponsibleRowProps } from 'app/(Main)/companies/components/CompanyResponsible/types';

import scss from 'app/(Main)/companies/components/CompanyUsers/CompanyUsers.module.scss';
import XSvg from '/public/svg/x.svg';

export const CompanyResponsibleTableRow: FC<CompanyResponsibleRowProps> = ({
    responsible,
}) => {
    const [visible, setVisible] = useState(false);
    const opacity = useSpring(0);

    const handleClick = () => {
        opacity.set(1);
        setVisible(!visible);
    };

    return (
        <tr onClick={handleClick} className={scss.company_user_table_row}>
            <td>
                <p>
                    {responsible.name} {responsible.surname}{' '}
                    {responsible.patronymic}
                </p>
            </td>
            <Modal visible={visible} setVisible={setVisible}>
                <AddCompanyResponsibleForm
                    opacity={opacity}
                    setVisible={setVisible}
                    visible={visible}
                    orgId={responsible.organization}
                    responsible={responsible}
                    type="edit"
                />
            </Modal>
        </tr>
    );
};
