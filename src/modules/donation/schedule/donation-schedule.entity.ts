import { Types } from "mongoose";
import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";
import { DonationScheduleRecord, DonationScheduleStatus } from "./model/donation-schedule.record";

export interface DonationScheduleEntity {
    _id?: Types.ObjectId;
    id?: string;
    donorId: string;
    facilityId: string;
    bloodType: DonorBloodTypes;
    unitsRequested: number;
    additionalNotes?: string;
    preferredDate: Date;
    status: DonationScheduleStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export const DonationScheduleEntity = {
    fromRecord(record: DonationScheduleRecord): DonationScheduleEntity {
        return {
            id: record.id,
            donorId: record.donor_id,
            facilityId: record.facility_id,
            bloodType: record.blood_type,
            unitsRequested: record.units_requested,
            additionalNotes: record.additional_notes,
            preferredDate: record.preferred_date,
            status: record.status,
            createdAt: record.created_at,
            updatedAt: record.updated_at
        };
    }
}