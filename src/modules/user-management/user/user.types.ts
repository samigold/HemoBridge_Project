import { UserRoles } from "./model/user.record";

export interface ICreateUser {
    email: string;
    phone_number?: string;
    password: string;
    role: UserRoles;
}

// export interface ICreateAdminUser {
//     email: string;
//     password: string;
// }