'use client';
import { FC } from 'react';

import { NewsItem } from 'components/News/components/NewsItem';

import { NewsType } from 'http/newsService/types';

import { useShowNewsStore } from 'store/showNewsStore/modalVisibleStore';

import scss from 'components/News/News.module.scss';

export const NewsWrapper: FC<{ news: NewsType[] }> = ({ news }) => {
    const [visible] = useShowNewsStore((state) => [state.visible]);

    return (
        visible && (
            <aside className={scss.news_layout}>
                <div className={scss.news}>
                    <h3 className={scss.news_title}>Новости</h3>
                    {news?.map((el, index) => (
                        <NewsItem
                            last={index === news?.length - 1}
                            key={index}
                            {...el}
                        />
                    ))}
                </div>
            </aside>
        )
    );
};
