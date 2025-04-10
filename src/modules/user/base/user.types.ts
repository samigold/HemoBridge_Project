import { USER_ROLE as UserRoles } from 'src/shared/constants/user-role.enum';


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