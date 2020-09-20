export interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    token: string;
}

export interface ChangePasswordModel {
    username?: string;
    password: string;
    newPassword: string;
}
