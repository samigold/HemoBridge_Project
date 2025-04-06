import { USER_ROLE } from "../constants/user-role.enum";


export const UserRoleHelper = {
    USER_ROLES: USER_ROLE,

    isValidRole(role: string): boolean {
        return Object.values(this.USER_ROLES).includes(role as USER_ROLE);
    },
  
    isAdminRole(role: string): boolean {
        return role === this.USER_ROLES.ADMIN;
    }
}