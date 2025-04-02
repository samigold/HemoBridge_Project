import { Types } from "mongoose";

export interface DonorRecord {
    _id: Types.ObjectId;
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    blood_type: string; // should be an enum
    created_at: Date;
    updated_at: Date;
}

// TODO: create enums for fields with specific options