import React, { ChangeEvent } from 'react';
import Image from 'next/image';

import DropzoneContentSvg from '/public/svg/dropzoneContent.svg';
import XSvg from '/public/svg/x.svg';
import { WorkerImageProps } from 'app/(Main)/workers/components/WorkerForm/WorkerForm.types';

import scss from './WorkerForm.module.scss';

export const WorkerImage: React.FC<WorkerImageProps> = ({
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
                    {image ? (
                        <div className={scss.user_preview_image}>
                            <XSvg
                                onClick={(e: ChangeEvent<HTMLOrSVGElement>) => {
                                    e.stopPropagation();
                                    deleteImage();
                                }}
                                className={scss.user_image_delete}
                            />
                            <div className={scss.user_image}>
                                <Image
                                    fill
                                    src={image.preview}
                                    alt="user image"
                                />
                            </div>
                            <p>{image.img.name}</p>
                        </div>
                    ) : (
                        <div className={scss.dropzone_font}>
                            <DropzoneContentSvg className={scss.dropzone_svg} />
                            <p>
                                Перетащите элемент или нажмите, чтобы выбрать
                                файлы
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
