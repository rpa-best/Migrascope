import { ChangeEventHandler, FC, useEffect, useState } from 'react';

import {
    createOrganizationAddresses,
    deleteOrganizationAddresses,
    editOrganizationAddresses,
} from 'http/organizationService/organizationService';

import { MigrationAddressItemProps } from 'app/(Main)/companies/components/CompanyMigrationAddresses/types';

import EditSvg from 'app/(Main)/workers/[id]/svg/edit-2.svg';
import DeleteSvg from 'app/(Main)/workers/[id]/svg/trash.svg';
import CheckSvg from '/public/svg/check.svg';

import scss from 'app/(Main)/companies/components/CompanyMigrationAddresses/CompanyMigrationAddresses.module.scss';

export const MigrationAddressItem: FC<MigrationAddressItemProps> = ({
    name,
    addressId,
    orgId,
    index,
    setCurrentAddresses,
}) => {
    const [currentValue, setCurrentValue] = useState(name);
    const [isEdit, setIsEdit] = useState(!name);

    const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCurrentValue(e.target.value);
    };

    const handleConfirm = async () => {
        if (addressId) {
            await editOrganizationAddresses(
                addressId,
                orgId,
                currentValue as string
            );
        } else {
            await createOrganizationAddresses(orgId, currentValue as string);
        }
        setIsEdit(false);
    };

    const handleDelete = async () => {
        if (addressId) {
            try {
                await deleteOrganizationAddresses(addressId);
                setCurrentAddresses((prevState) =>
                    prevState.filter((_, indx) => indx !== index)
                );
            } catch (e) {
                console.log(e);
            }
            return;
        }
        setCurrentAddresses((prevState) =>
            prevState.filter((_, indx) => indx !== index)
        );
    };

    return (
        <div className={scss.address_item_layout}>
            {!isEdit ? (
                <div className={scss.address_item}>{currentValue}</div>
            ) : (
                <textarea
                    value={currentValue}
                    onChange={handleInputChange}
                    className={scss.address_item}
                />
            )}
            <div className={scss.migration_actions_wrapper}>
                {!isEdit ? (
                    <EditSvg
                        className={scss.svg_edit}
                        onClick={() => setIsEdit(true)}
                    />
                ) : (
                    <CheckSvg
                        onClick={handleConfirm}
                        className={scss.svg_confirm}
                    />
                )}
                <DeleteSvg onClick={handleDelete} className={scss.svg_delete} />
            </div>
        </div>
    );
};
