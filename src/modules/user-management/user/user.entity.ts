import { UserRecord } from "./model/user.record";

interface UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    bloodType: string;
    isActive: boolean;
    isSuspended: boolean;
    email: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}



export function fromRecordToEntity(record: UserRecord): UserEntity {
    return {
        id: record.id,
        firstName: record.first_name,
        lastName: record.last_name,
        phoneNumber: record.phone_number,
        bloodType: record.blood_type,
        isActive: record.is_active,
        isSuspended: record.is_suspended,
        email: record.email,
        role: record.role,
        createdAt: record.created_at,
        updatedAt: record.updated_at
    };
}