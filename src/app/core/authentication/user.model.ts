export interface User {
    username: string;
    password: string;
}

export interface ChangePasswordModel {
    username?: string;
    password: string;
    newPassword: string;
}
