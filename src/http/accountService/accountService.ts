import { RegisterUser } from 'http/accountService/types';
import { $account } from 'http/indexes/clientIndex';
import { AxiosResponse } from 'axios';

export const registerUser: RegisterUser = async (body) => {
    const res: AxiosResponse<ReturnType<typeof registerUser>> =
        await $account.post('create/', body);

    return res.data;
};

export const checkEmail = async (
    email: string,
    place: 'change_password' | 'register'
) => {
    const res = await $account.post(`check-email/?place=${place}`, {
        email,
    });

    return res.data;
};
