import React from 'react';

import { checkType } from 'components/DropImage/DropImage.utils';

import DropzoneContentSvg from '/public/svg/dropzoneContent.svg';

import { ImageProps } from 'components/DropImage/types';

import scss from './DropImage.module.scss';

export const DropImage: React.FC<ImageProps> = ({
    image,
    isDragActive,
    rootProps,
    deleteImage,
}) => {
    return (
        <div className={scss.dropzone_image_wrapper} {...rootProps()}>
            {isDragActive ? (
                <div className={scss.dropzone_border}>
                    <div className={scss.dropzone_active}>
                        <input />
                        <div className={scss.dropdown_content}>
                            <DropzoneContentSvg
                                className={scss.dropzone_svg_active}
                            />
                            <p className={scss.dropdown_content_text}>
                                Перетащите файл сюда..
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={scss.dropzone}>
                    {checkType(image, deleteImage)}
                </div>
            )}
        </div>
    );
};
