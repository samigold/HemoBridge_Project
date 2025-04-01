import { UserRoles } from "./model/user.record";

export interface ICreateUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: UserRoles;
}