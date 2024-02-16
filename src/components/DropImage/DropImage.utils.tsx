import React from 'react';

import { ImageProps } from 'components/DropImage/types';

import DropzoneContentSvg from '/public/svg/dropzoneContent.svg';

import scss from 'components/DropImage/DropImage.module.scss';
import { DropImageCard } from 'components/DropImage/DropImageCard';

export const checkType = (
    value: ImageProps['image'],
    deleteImage: ImageProps['deleteImage']
) => {
    const empty = (
        <div className={scss.dropzone_font}>
            <DropzoneContentSvg className={scss.dropzone_svg} />
            <p>Перетащите элемент или нажмите, чтобы выбрать файлы</p>
        </div>
    );

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return empty;
        }
        return value.map((image, index) => (
            <DropImageCard
                multiple={true}
                key={index}
                image={image}
                deleteImage={() => deleteImage(index)}
            />
        ));
    }

    if (value)
        return (
            <DropImageCard image={value as string} deleteImage={deleteImage} />
        );

    return empty;
};
