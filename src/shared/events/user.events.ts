import { UserRoles } from "src/modules/user-management/user/model/user.record";

export enum USER_EVENTS {
    CREATED = "user_created"
}

export interface DonorUserCreatedEvent {
    user_id: string;
    first_name: string;
    last_name: string;
    blood_type: string;
    phone_number: string;
    address: string;
    role: UserRoles.DONOR;
}

export interface AdminUserCreatedEvent {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRoles.ADMIN;
}

export interface CareGiverUserCreatedEvent {
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    role: UserRoles.CARE_GIVER;
}