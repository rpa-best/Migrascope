import { getNews } from 'http/newsService/newsService';

import { NewsWrapper } from 'components/News/components/NewsWrapper';

import { NewsType } from 'http/newsService/types';

export const News = async () => {
    const news = await getNews();

    return <NewsWrapper news={news?.results as NewsType[]} />;
};
