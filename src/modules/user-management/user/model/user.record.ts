import { Types } from "mongoose";

export interface UserRecord {
    _id?: Types.ObjectId;
    id: string;
    is_active: boolean;
    is_suspended: boolean;
    email: string;
    password_hash: string;
    role: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}

export enum UserRoles {
    DONOR = "donor",
    CARE_GIVER = "care_giver",
    STAFF = "staff",
    ADMIN = "admin"
}