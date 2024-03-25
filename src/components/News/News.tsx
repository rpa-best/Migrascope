import { NewsItem } from 'components/News/components/NewsItem';

import { getNews } from 'http/newsService/newsService';

import scss from './News.module.scss';

export const News = async () => {
    const news = await getNews();


    return (
        <aside className={scss.news_layout}>
            <div className={scss.news}>
                <h3 className={scss.news_title}>Новости</h3>
                {news?.results.map((el, index) => (
                    <NewsItem
                        last={index === news?.results.length - 1}
                        key={index}
                        {...el}
                    />
                ))}
            </div>
        </aside>
    );
};
