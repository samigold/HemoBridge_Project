import { Types } from "mongoose";
import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";

export interface DonationScheduleRecord {
    _id?: Types.ObjectId;
    id?: string;
    donor_id: string;
    facility_id: string;
    blood_type: DonorBloodTypes;
    units_requested: number;
    additional_notes?: string;
    preferred_date: Date;
    status: DonationScheduleStatus;
    created_at?: Date;
    updated_at?: Date;
}

export enum DonationScheduleStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}