import { UserEntity } from "src/modules/user/base/user.entity";
import { FacilityStaffRecord } from "./model/facility-staff.record";
import { UserRecord } from "src/modules/user/base/model/user.record";

export interface FacilityStaffEntity {
    id: string;
    userId: string | UserEntity;
    facilityId: string;
    firstName: string;
    lastName: string;
    address?: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    // Adding these properties to fix TypeScript errors
    facilityName?: string;
    staffName?: string;
}

export const FacilityStaffEntity = {
    fromRecordToEntity(record: FacilityStaffRecord): FacilityStaffEntity {
        return {
            id: record.id,
            address: record.address,
            userId: {...UserEntity.fromRecordToEntity(record.user_id as UserRecord), passwordHash: undefined },
            facilityId: record.facility_id,
            firstName: record.first_name,
            lastName: record.last_name,
            phoneNumber: record.phone_number,
            createdAt: record.created_at,
            updatedAt: record.updated_at
        };
    }
}