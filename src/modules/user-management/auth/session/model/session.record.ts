export interface SessionRecord {
    id: string; //uuid
    user_id: string; //uuid
    access_token: string;
    refresh_token: string;
    revoked: boolean;
    last_used_at: Date;
    created_at: Date;
    expires_at: Date;
}