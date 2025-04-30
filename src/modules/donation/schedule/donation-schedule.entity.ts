import { Types } from "mongoose";
import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";
import { DonationScheduleRecord, DonationScheduleStatus, DonationScheduleUrgency } from "./model/donation-schedule.record";

interface PopulatedDonor {
    firstName: string;
    lastName: string;
}

export interface DonationScheduleEntity {
    _id?: Types.ObjectId;
    id?: string;
    donorId?: string | PopulatedDonor;
    facilityId: string;
    bloodType: DonorBloodTypes;
    unitsRequested: number;
    additionalNotes?: string;
    preferredDate: Date;
    urgencyLevel: DonationScheduleUrgency;
    status: DonationScheduleStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export const DonationScheduleEntity = {
    fromRecord(record: DonationScheduleRecord): DonationScheduleEntity {
        const donor = record.donor_id 
            ?   typeof record.donor_id === 'string' 
                ? record.donor_id 
                : {
                    firstName: record.donor_id.first_name!,
                    lastName: record.donor_id.last_name!
                }
            :   undefined


        return {
            id: record.id,
            donorId: donor,
            facilityId: record.facility_id,
            bloodType: record.blood_type,
            unitsRequested: record.units_requested,
            additionalNotes: record.additional_notes,
            preferredDate: record.preferred_date,
            urgencyLevel: record?.urgency_level,
            status: record.status,
            createdAt: record.created_at,
            updatedAt: record.updated_at
        };
    }
}