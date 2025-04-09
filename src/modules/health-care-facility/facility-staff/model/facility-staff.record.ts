import { Types } from "mongoose";

export interface FacilityStaffRecord {
    _id?: Types.ObjectId;
    id: string;
    user_id: string;
    facility_id: string;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;
}