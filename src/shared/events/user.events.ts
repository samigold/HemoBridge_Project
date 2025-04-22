import { USER_ROLE } from "../constants/user-role.enum";

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
    role: USER_ROLE.DONOR;
}

export interface AdminUserCreatedEvent {
    user_id: string;
    first_name: string;
    last_name: string;
    role: USER_ROLE.ADMIN;
}

export interface CareGiverUserCreatedEvent {
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    role: USER_ROLE.CARE_GIVER;
}

export interface FacilityStaffUserCreatedEvent {
    facility_id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    role: USER_ROLE.FACILITY_STAFF;
}