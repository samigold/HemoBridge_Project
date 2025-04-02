import { UserRecord } from "./model/user.record";

interface UserEntity {
    id: string;
    isActive: boolean;
    isSuspended: boolean;
    email: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const UserEntity:UserEntity|null = {
    id: "",
    isActive: false,
    isSuspended: false,
    email: "",
    role: "",
    createdAt: undefined,
    updatedAt: undefined
}

export function fromRecordToEntity(record: UserRecord): UserEntity {
    return {
        id: record.id,
        isActive: record.is_active,
        isSuspended: record.is_suspended,
        email: record.email,
        role: record.role,
        createdAt: record.created_at,
        updatedAt: record.updated_at
    }
}