import { Types } from "mongoose";

export interface DonorRecord {
    _id?: Types.ObjectId;
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    blood_type: DonorBloodTypes; // should be an enum
    is_eligible: boolean;
    last_donation_date: Date;
    next_eligible_date: Date;
    medical_history: object;
    created_at: Date;
    updated_at: Date;
}

// TODO: create enums for fields with specific options

export enum DonorBloodTypes {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-"
}
