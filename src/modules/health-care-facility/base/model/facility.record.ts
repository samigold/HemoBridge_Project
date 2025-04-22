import { Types } from "mongoose";

export interface FacilityRecord {
    _id?: Types.ObjectId;
    id: string;
    name: string;
    address: string;
    // contact_info: {
    //     email: string;
    //     phone_number: string;
    // };
    operational_hours: string;
    created_at: Date;
    updated_at: Date;
}