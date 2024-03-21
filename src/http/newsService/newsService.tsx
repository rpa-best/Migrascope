import { AxiosResponse } from 'axios';
import { GetNews } from 'http/newsService/types';
import { $serverNews } from 'http/indexes/serverIndex';

export const getNews: GetNews = async () => {
    try {
        const res: AxiosResponse<ReturnType<typeof getNews>> =
            await $serverNews.get('news');

        return res.data;
    } catch (e) {
        console.log(e);
    }
};
