import React, { ChangeEvent, FC } from 'react';
import Image from 'next/image';

import XSvg from '/public/svg/x.svg';

import { ImageCardProps } from 'components/DropImage/types';

import scss from 'components/DropImage/DropImage.module.scss';

export const DropImageCard: FC<ImageCardProps> = ({
    index,
    multiple = false,
    image,
    deleteImage,
}) => {
    return (
        <div className={scss.user_preview_image}>
            <XSvg
                onClick={(e: ChangeEvent<HTMLOrSVGElement>) => {
                    e.stopPropagation();
                    if (multiple) {
                        deleteImage(index!);
                    } else {
                        // @ts-expect-error - idk?
                        deleteImage();
                    }
                }}
                className={scss.user_image_delete}
            />
            <div className={scss.user_image}>
                <Image
                    fill
                    src={typeof image === 'string' ? image : image.preview}
                    alt="user image"
                />
            </div>
            {typeof image !== 'string' && <p>{image?.img?.name}</p>}
        </div>
    );
};
