import { SessionRecord } from "./model/session.record";

export interface SessionEntity {
    id: string; //uuid
    userId: string;
    accessToken: string;
    revoked: boolean;
    lastUsedAt: Date;
    createdAt: Date;
    expiresAt: Date;
}

export const SessionEntity = {
    fromRecordToEntity(record: SessionRecord): SessionEntity {
        return {
            id: record.id,
            userId: record.user_id,
            accessToken: record.access_token,
            revoked: record.revoked,
            lastUsedAt: record.last_used_at,
            createdAt: record.created_at,
            expiresAt: record.expires_at
        }
    }
}