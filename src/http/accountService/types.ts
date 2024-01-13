export interface RegisterUserBody {
    username: string;
    password: string;
    verified_password: string;
    name: string;
    surname: string;
    lastname: string;
    phone: string;
    pvc: string;
    remember: boolean;
}

interface RegisterUserResponse {
    access: string;
    refresh: string;
    user: {
        username: string;
        name: string;
        surname: string;
        lastname: string;
    };
}

export type RegisterUser = (
    body: RegisterUserBody
) => Promise<RegisterUserResponse>;
