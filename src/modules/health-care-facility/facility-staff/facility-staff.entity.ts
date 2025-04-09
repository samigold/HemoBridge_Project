import { FacilityStaffRecord } from "./model/facility-staff.record";

export interface FacilityStaffEntity {
    id: string;
    userId: string;
    facilityId: string;
    address: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export const FacilityStaffEntity = {
    fromRecordToEntity(record: FacilityStaffRecord): FacilityStaffEntity {
        return {
            id: record.id,
            address: record.address,
            userId: record.user_id,
            facilityId: record.facility_id,
            phoneNumber: record.phone_number,
            createdAt: record.created_at,
            updatedAt: record.updated_at
        };
    }
}