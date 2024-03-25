import { cookies } from 'next/headers';

export async function getCookieAccess() {
    const cookieStore = cookies();
    return cookieStore.get('access')?.value as string;
}
