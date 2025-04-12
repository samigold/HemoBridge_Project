import { Types } from "mongoose";
import { USER_ROLE } from "src/shared/constants/user-role.enum";

export interface UserRecord {
    _id?: Types.ObjectId;
    id: string;
    is_active: boolean;
    is_suspended: boolean;
    email: string;
    phone_number: string;
    blood_type: string;
    password_hash: string;
    role: USER_ROLE;
    last_seen: Date;
    created_at: Date;
    updated_at: Date;
}