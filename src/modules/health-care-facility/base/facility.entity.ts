import { FacilityRecord } from "./model/facility.record";

export interface FacilityEntity {
    id: string;
    name: string;
    address: string;
    // contactInfo: {
    //     email: string;
    //     phoneNumber: string;
    // };
    operationalHours: string;
    createdAt: Date;
    updatedAt: Date;
}

export const FacilityEntity = {
    fromRecordToEntity(record: FacilityRecord): FacilityEntity {
        return {
            id: record.id,
            name: record.name,
            address: record.address,
            // contactInfo: {
            //     email: record.contact_info.email,
            //     phoneNumber: record.contact_info.phone_number
            // },
            operationalHours: record.operational_hours,
            createdAt: record.created_at,
            updatedAt: record.updated_at
        };
    }
}