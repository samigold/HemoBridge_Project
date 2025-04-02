import { UserRoles } from "./model/user.record";

export interface ICreateUser {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    blood_type: string;
    password: string;
    role: UserRoles;
}