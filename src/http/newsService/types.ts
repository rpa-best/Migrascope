import { Response } from 'http/types';

export interface NewsType {
    id: number;
    tags: { tagName: string }[];
    content: string;
    author: string;
    title: string;
    datePublication: string;
}

export type GetNews = () => Promise<Response<NewsType> | undefined>;
