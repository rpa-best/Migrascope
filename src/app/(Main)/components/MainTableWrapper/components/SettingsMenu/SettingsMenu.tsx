'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSearchQuery } from 'hooks/useSearchQuery';

import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { InputCheckbox } from 'components/UI/Inputs/InputCheckbox';
import { Button } from 'components/UI/Buttons/Button';

import {
    RolesType,
    SelectedUserType,
    SettingsMenuProps,
} from 'app/(Main)/components/MainTableWrapper/components/SettingsMenu/types';

import scss from './SettingsMenu.module.scss';

const testUsers = [
    {
        id: 1,
        name: 'Это я',
    },
    {
        id: 2,
        name: 'И это я',
    },
];

export const SettingsMenu: FC<SettingsMenuProps> = ({
    opacity,
    visible,
    setVisible,
}) => {
    const { has, setSearchParams, deleteSearchParams, getSearchParams } =
        useSearchQuery();

    const queryUser = has('user')
        ? testUsers.find((u) => u.name === getSearchParams('user'))
        : testUsers[0];

    const roles = useMemo(() => {
        return getSearchParams('roles')?.split(',') ?? [];
    }, [getSearchParams]);

    const [selectedUser, setSelectedUser] = useState<SelectedUserType>(
        queryUser as SelectedUserType
    );

    const [selectedRoles, setSelectedRoles] = useState<RolesType>({
        owner: roles?.includes('owner'),
        admin: roles?.includes('admin'),
        observer: roles?.includes('observer'),
    });

    const unsavedChanges = useRef(false);

    const handleChangeCheckbox = (
        fieldName: 'owner' | 'admin' | 'observer',
        value: boolean
    ) => {
        unsavedChanges.current = true;
        const newRoles = { ...selectedRoles };
        newRoles[fieldName] = value;
        setSelectedRoles(newRoles);
    };

    useEffect(() => {
        return () => {
            if (unsavedChanges.current) {
                setSelectedRoles({
                    owner: roles?.includes('owner'),
                    admin: roles?.includes('admin'),
                    observer: roles?.includes('observer'),
                });
                setSelectedUser(queryUser as SelectedUserType);
            }
        };
    }, [queryUser, roles, visible]);

    const handleSave = () => {
        unsavedChanges.current = false;
        const roles = Object.entries(selectedRoles)
            .filter((el) => el[1])
            .map((el) => el[0])
            .join(',');
        setSearchParams('roles', roles);
        setSearchParams('user', selectedUser.name);
        setVisible(false);
    };

    const handleReset = () => {
        unsavedChanges.current = false;
        deleteSearchParams('roles');
        deleteSearchParams('user');
        setSelectedUser(testUsers[0]);
        setSelectedRoles({
            admin: false,
            observer: false,
            owner: false,
        });
        setVisible(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ opacity }}
            transition={{ duration: 1 }}
            className={scss.settings_menu}
        >
            <h4 className={scss.settings_title}>Фильтрация списка компаний</h4>
            <div className={scss.select_user_wrapper}>
                <InputSelect
                    needErrorLabel={false}
                    listValues={testUsers}
                    onChange={(v) => {
                        unsavedChanges.current = true;
                        setSelectedUser(v);
                    }}
                    value={selectedUser.name}
                    name="Select user"
                />
            </div>
            <InputCheckbox
                name="owner checkbox"
                label="Владелец"
                value={selectedRoles.owner}
                onChange={(v) => handleChangeCheckbox('owner', v)}
            />
            <InputCheckbox
                name="admin checkbox"
                label="Админ"
                value={selectedRoles.admin}
                onChange={(v) => handleChangeCheckbox('admin', v)}
            />
            <InputCheckbox
                name="observer checkbox"
                label="Наблюдатель"
                value={selectedRoles.observer}
                onChange={(v) => handleChangeCheckbox('observer', v)}
            />
            <div className={scss.buttons_wrapper}>
                <Button onClick={handleSave} type="button">
                    Сохранить
                </Button>
                <button onClick={handleReset}>Сбросить</button>
            </div>
        </motion.div>
    );
};
