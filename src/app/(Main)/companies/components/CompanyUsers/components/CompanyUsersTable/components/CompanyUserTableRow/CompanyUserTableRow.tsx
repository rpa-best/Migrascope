'use client';
import React, { FC, useState } from 'react';
import { useSpring } from 'framer-motion';

import Modal from 'components/Modal';
import { AddCompanyUserForm } from 'app/(Main)/companies/components/CompanyUsers/components/AddCompanyUser/components/AddCompanyUserForm';

import { RolesConst } from 'const/RolesConst';

import { CompanyUsersRowProps } from 'app/(Main)/companies/components/CompanyUsers/types';

import scss from 'app/(Main)/companies/components/CompanyUsers/CompanyUsers.module.scss';

export const CompanyUserTableRow: FC<CompanyUsersRowProps> = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const opacity = useSpring(0);

    const translatedRole = RolesConst.find((role) => role.slug === user.role)
        ?.name as string;

    const handleClick = () => {
        opacity.set(1);
        setVisible(!visible);
    };

    return (
        <tr onClick={handleClick} className={scss.company_user_table_row}>
            <td>
                <p>
                    {user.firstName} {user.surname} {user.patronymic}
                </p>
            </td>
            <td>
                <p>{user.user}</p>
            </td>
            <td>
                <p>{translatedRole}</p>
            </td>
            <Modal visible={visible} setVisible={setVisible}>
                <AddCompanyUserForm
                    opacity={opacity}
                    setVisible={setVisible}
                    visible={visible}
                    orgId={user.organization}
                    user={user}
                    type="edit"
                />
            </Modal>
        </tr>
    );
};
