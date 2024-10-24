import { ChangeEventHandler, FC, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

import {
    createOrganizationMiaAddresses,
    deleteOrganizationMiaAddresses,
    editOrganizationMiaAddresses,
} from 'http/organizationService/organizationService';
import revalidate from 'utils/revalidate';

import { errorToastOptions } from 'config/toastConfig';
import EditSvg from 'app/(Main)/workers/[id]/svg/edit-2.svg';
import DeleteSvg from 'app/(Main)/workers/[id]/svg/trash.svg';
import CheckSvg from '/public/svg/check.svg';
import { AddressItemProps } from 'app/(Main)/companies/components/CompanyAddresses/types';

import scss from 'app/(Main)/companies/components/CompanyAddresses/CompanyAddresses.module.scss';

export const AddressItem: FC<AddressItemProps> = ({
    name,
    addressId,
    orgId,
    index,
    setCurrentAddresses,
}) => {
    const path = usePathname();
    const [currentValue, setCurrentValue] = useState(name);
    const [isEdit, setIsEdit] = useState(!name);

    const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCurrentValue(e.target.value);
    };

    const handleConfirm = async () => {
        if (addressId) {
            if (!currentValue) {
                toast('Адрес не может быть пустым', errorToastOptions);
                return;
            }
            const newAddress = await editOrganizationMiaAddresses(
                addressId,
                orgId,
                currentValue as string
            );
            setCurrentAddresses((prevState) =>
                prevState.map((value, i) =>
                    value.id === addressId ? newAddress : value
                )
            );
            setCurrentValue(newAddress.name);
        } else {
            if (!currentValue) {
                toast('Адрес не может быть пустым', errorToastOptions);
                return;
            }
            const newAddress = await createOrganizationMiaAddresses(
                orgId,
                currentValue as string
            );
            setCurrentAddresses((prevState) =>
                prevState.map((value, i) =>
                    i === prevState.length - 1 ? newAddress : value
                )
            );
            setCurrentValue(newAddress.name);
        }
        revalidate(path);
        setIsEdit(false);
    };

    const handleDelete = async () => {
        if (addressId) {
            try {
                await deleteOrganizationMiaAddresses(addressId);
                setCurrentAddresses((prevState) =>
                    prevState.filter((address) => address.id !== addressId)
                );
                return;
            } catch (e) {
                console.log(e);
            }
        } else {
            setCurrentAddresses((prevState) =>
                prevState.filter((_, i) => i !== index)
            );
        }
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
