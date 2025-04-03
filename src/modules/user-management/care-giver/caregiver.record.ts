import { Types } from "mongoose";

export interface CareGiverRecord {
    _id: Types.ObjectId;
    id?: string; // reference to users collection
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    address: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
}