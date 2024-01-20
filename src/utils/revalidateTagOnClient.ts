'use server';

import { revalidateTag } from 'next/cache';

const revalidate = (tag: string) => {
    revalidateTag(tag);
};

export default revalidate;
