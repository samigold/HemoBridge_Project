import { Types } from "mongoose";
import { FacilityRecord } from "src/modules/health-care-facility/base/model/facility.record";
import { DonorBloodTypes, DonorRecord } from "src/modules/user/donor/model/donor.record";

export interface DonationScheduleRecord {
    _id?: Types.ObjectId;
    id?: string;
    donor_id: string | Partial<DonorRecord>;
    facility_id: string | Partial<FacilityRecord>;
    blood_type: DonorBloodTypes;
    units_requested: number;
    additional_notes?: string;
    preferred_date: Date;
    urgency_level: DonationScheduleUrgency;
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

export enum DonationScheduleUrgency {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}