import { CareGiverRecord } from "./caregiver.record";

export interface CareGiverEntity {
    id: string;
    userId: string;
    isActive: boolean;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export const CareGiverEntity = {
    fromRecordToEntity(record: CareGiverRecord): CareGiverEntity {
        return {
            id: record.id!,
            userId: record.user_id,
            isActive: record.is_active,
            firstName: record.first_name,
            lastName: record.last_name,
            phoneNumber: record.phone_number,
            address: record.address,
            createdAt: record.created_at,
            updatedAt: record.updated_at,
        };
    }
}