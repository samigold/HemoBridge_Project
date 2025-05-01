import { Types } from "mongoose";
import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";
import { DonationScheduleRecord, DonationScheduleStatus, DonationScheduleUrgency } from "./model/donation-schedule.record";
import { FacilityEntity } from "src/modules/health-care-facility/base/facility.entity";

interface PopulatedDonor {
    firstName: string;
    lastName: string;
}

interface PopulatedFacility {
    name: string;
    address: string;
    operationalHours: string;
    bloodTypes: DonorBloodTypes[];
}

export interface DonationScheduleEntity {
    _id?: Types.ObjectId;
    id?: string;
    donorId?: string | PopulatedDonor;
    facilityId?: string | PopulatedFacility;
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
                ?   record.donor_id 
                :   {
                        firstName: record.donor_id.first_name!,
                        lastName: record.donor_id.last_name!
                    }
            :   undefined

        const facility = record.facility_id 
            ?   typeof record.facility_id === 'string' 
                ?   record.facility_id
                :   {
                        name: record.facility_id.name!,
                        address: record.facility_id.address!,
                        operationalHours: record.facility_id.operational_hours!,
                        bloodTypes: record.facility_id.blood_types!,
                    }
            :   undefined


        return {
            id: record.id,
            donorId: donor,
            facilityId: facility,
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