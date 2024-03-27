'use client';

import React, { useState } from 'react';

import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { RolesConst } from 'const/RolesConst';

import { ColumnRowProps } from 'app/(Main)/components/Table/types';

import scss from 'app/(Main)/components/Table/Table.module.scss';
import { editUser } from 'http/organizationService/organizationService';
import { toast } from 'react-toastify';
import { errorToastOptions } from 'config/toastConfig';

export const Row: React.FC<ColumnRowProps> = ({ item, headers }) => {
    const [selectedRole, setSelectedRole] = useState(
        RolesConst.find((role) => role.slug === item['role'])
    );

    const handleRoleChange = async (role: Required<typeof selectedRole>) => {
        try {
            await editUser(item['id'], item['organization'], {
                role: role?.slug,
            });
            setSelectedRole(role);
        } catch (e) {
            toast('Ошибка', errorToastOptions);
        }
    };

    return headers.map((header, index) => {
        if (header.field === 'role') {
            return (
                <td
                    key={index}
                    style={{ borderBottom: 'none', paddingBottom: 0 }}
                    className={scss.row_td}
                >
                    <InputSelect
                        disabled={selectedRole?.name === 'Владелец'}
                        css={{ paddingBottom: '20px' }}
                        needErrorLabel={false}
                        style="hollow"
                        listValues={RolesConst.slice(1)}
                        onChange={handleRoleChange}
                        value={selectedRole?.name as string}
                        name="select-role"
                    />
                </td>
            );
        }
        return (
            <td className={scss.row_td} key={index}>
                {item[header.field]}
            </td>
        );
    });
};
