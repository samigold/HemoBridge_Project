import { Types } from "mongoose";

export interface CareGiverRecord {
    _id: Types.ObjectId;
    id: string;
    user_id: string;
    is_active: boolean;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}