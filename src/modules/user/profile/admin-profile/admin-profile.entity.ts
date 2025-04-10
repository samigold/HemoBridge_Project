import { AdminProfileRecord } from "./model/admin-profile.record";

export interface AdminProfileEntity {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

export const AdminProfileEntity = {
    fromRecordToEntity(record: AdminProfileRecord): AdminProfileEntity {
        return {
            id: record.id!,
            userId: record.user_id,
            firstName: record.first_name,
            lastName: record.last_name,
            createdAt: record.created_at,
            updatedAt: record.updated_at,
        };
    }
}