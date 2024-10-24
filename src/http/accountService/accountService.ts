import {
    AuthUser,
    ChangePassword,
    GetServerUser,
    GetUser,
    RegisterUser,
    RegisterUserResponse,
    UpdateTariff,
    UpdateTokens,
    ValidateFields,
} from 'http/accountService/types';
import { $account } from 'http/indexes/clientIndex';
import { AxiosResponse } from 'axios';
import { $serverAccount } from 'http/indexes/serverIndex';

export const registerUser: RegisterUser = async (body) => {
    const res: AxiosResponse<ReturnType<typeof registerUser>> =
        await $serverAccount.post('create/', body);

    return res.data;
};

export const changePassword: ChangePassword = async (body) => {
    const res: AxiosResponse<ReturnType<typeof changePassword>> =
        await $serverAccount.post('change-password/', body);

    return res.data;
};

export const updateTokens: UpdateTokens = async (refresh) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}refresh-token/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ refresh }),
        }
    );

    const parsedRes: Omit<RegisterUserResponse, 'user'> = await response.json();

    if (response.status === 200) {
        return parsedRes;
    }

    return false;
};

export const validateFields: ValidateFields = async (body) => {
    const res: AxiosResponse<ReturnType<typeof validateFields>> =
        await $account.post('password-and-phone-validation/', body);

    return res.data;
};

export const getUser: GetUser = async () => {
    const res: AxiosResponse<ReturnType<typeof getUser>> =
        await $account.get('me/');

    return res.data;
};
export const getServerUser: GetServerUser = async (access) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}me/`,
        {
            headers: {
                Authorization: `Bearer ${access}`,
            },
            method: 'GET',
            next: {
                tags: ['server-user'],
            },
        }
    );
    return await response.json();
};

export const authUser: AuthUser = async (body) => {
    const res: AxiosResponse<ReturnType<typeof authUser>> =
        await $serverAccount.post('auth/', body);

    return res.data;
};

export const updateTariff: UpdateTariff = async (body) => {
    const res: AxiosResponse<ReturnType<UpdateTariff>> = await $account.post(
        'subscription/',
        body
    );

    return res.data;
};

export const updateAvatar = async (avatar: File) => {
    const body = new FormData();
    body.append('avatar', avatar);
    const res: AxiosResponse<{ avatar: string }> = await $account.put(
        'avatar/',
        body
    );

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
