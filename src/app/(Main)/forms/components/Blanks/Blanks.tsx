'use client';

import Image from 'next/image';

import {
    blanksData,
    BlanksDescription,
} from 'app/(Main)/forms/components/Blanks/consts';
import { BlanksItem } from 'app/(Main)/forms/components/Blanks/BlanksItem';
import { useBlankWorkerStore } from 'app/(Main)/forms/components/store/useBlankWorkerStore';

import BlanksImage from '/public/images/blanks/Checklist.png';

import scss from './Blanks.module.scss';

export const Blanks = () => {
    const [worker] = useBlankWorkerStore((state) => [state.worker]);

    return !worker.worker ? (
        <section className={scss.empty_blanks}>
            <div>
                <h2 className={scss.blanks_title}>
                    Добро пожаловать в раздел бланки!
                </h2>
                <ul className={scss.blanks_descriptions}>
                    {BlanksDescription.map((el, index) => (
                        <li
                            key={index}
                            className={scss.blanks_description_item}
                        >
                            {el}
                        </li>
                    ))}
                </ul>
            </div>
            <Image
                width={140}
                height={190}
                src={BlanksImage}
                alt="Изображение Чеклиста"
            />
        </section>
    ) : (
        <ul className={scss.blanks_list}>
            {blanksData.map((el, index) => (
                <BlanksItem name={el} key={index} />
            ))}
        </ul>
    );
};
