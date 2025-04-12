import { UserRecord } from "../../base/model/user.record";
import { UserEntity } from "../../base/user.entity";
import { AdminProfileRecord } from "./model/admin-profile.record";

export interface AdminProfileEntity {
    id: string;
    userId: string | UserEntity;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

export const AdminProfileEntity = {
    fromRecordToEntity(record: AdminProfileRecord): AdminProfileEntity {
        return {
            id: record.id!,
            userId: {...UserEntity.fromRecordToEntity(record.user_id as UserRecord), passwordHash: undefined },
            firstName: record.first_name,
            lastName: record.last_name,
            createdAt: record.created_at,
            updatedAt: record.updated_at,
        };
    }
}