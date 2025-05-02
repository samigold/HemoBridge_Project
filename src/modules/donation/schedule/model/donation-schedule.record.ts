import { Types } from "mongoose";
import { FacilityRecord } from "src/modules/health-care-facility/base/model/facility.record";
import { DonorBloodTypes, DonorRecord } from "src/modules/user/donor/model/donor.record";
import { USER_ROLE } from "src/shared/constants/user-role.enum";

export interface DonationScheduleRecord {
    _id?: Types.ObjectId;
    id?: string;
    donor_id: string | Partial<DonorRecord>;
    facility_id: string | Partial<FacilityRecord>;
    created_by: DonationScheduleCreator;
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

export enum DonationScheduleCreator {
    DONOR = USER_ROLE.DONOR,
    FACILITY_STAFF = USER_ROLE.FACILITY_STAFF
}