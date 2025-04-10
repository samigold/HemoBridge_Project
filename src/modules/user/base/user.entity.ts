import { USER_ROLE } from "src/shared/constants/user-role.enum";
import { UserRecord } from "./model/user.record";

export interface UserEntity {
    id: string;
    isActive: boolean;
    isSuspended: boolean;
    email: string;
    passwordHash?: string;
    role: USER_ROLE;
    createdAt: Date;
    updatedAt: Date;
    lastSeen: Date;
}

export const UserEntity = {
    fromRecordToEntity(record: UserRecord): UserEntity {
        return {
            id: record.id,
            isActive: record.is_active,
            isSuspended: record.is_suspended,
            email: record.email,
            passwordHash: record.password_hash,
            role: record.role,
            createdAt: record.created_at,
            updatedAt: record.updated_at,
            lastSeen: record.last_seen
        };
    }
}