import { HealthCareFacilityRecord } from "./model/health-care-facility.record";

export interface HealthCareFacilityEntity {
    id: string;
    name: string;
    address: string;
    contactInfo: {
        email: string;
        phoneNumber: string;
    };
    operationalHours: string;
    createdAt: Date;
    updatedAt: Date;
}

export const HealthCareFacilityEntity = {
    fromRecordToEntity(record: HealthCareFacilityRecord): HealthCareFacilityEntity {
        return {
            id: record.id,
            name: record.name,
            address: record.address,
            contactInfo: {
                email: record.contact_info.email,
                phoneNumber: record.contact_info.phone_number
            },
            operationalHours: record.operational_hours,
            createdAt: record.created_at,
            updatedAt: record.updated_at
        };
    }
}