export interface RegisterUserBody {
    username: string;
    password: string;
    verified_password: string;
    name: string;
    surname: string;
    patronymic: string;
    phone: string;
    pvc: string;
    remember: boolean;
}

export interface RegisterUserResponse {
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

export interface AuthUserBody {
    username: string;
    password: string;
}

export type AuthUser = (
    body: AuthUserBody
) => Promise<Omit<RegisterUserResponse, 'user'>>;

export interface ChangePasswordBody {
    pvc: string;
    email: string;
    password: string;
    verified_password: string;
}

export type ChangePassword = (body: ChangePasswordBody) => Promise<void>;

export type UpdateTokens = (
    refresh: string
) => Promise<false | Omit<RegisterUserResponse, 'user'>>;

interface ValidateFieldsBody {
    password: string;
    phone?: string;
}

export type ValidateFields = (body: ValidateFieldsBody) => Promise<void>;

export interface UserType {
    id: number;
    username: string;
    first_name: string;
    surname: string;
    patronymic: string;
    phone: string;
    avatar: string;
    birthday: string;
}

export type GetUser = () => Promise<UserType>;

export type GetServerUser = (access: string) => Promise<UserType>;
