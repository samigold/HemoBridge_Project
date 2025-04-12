import { Types } from "mongoose";

export interface EmailVerificationRecord {
    _id: Types.ObjectId;
    id: string;
    user_id: string;
    is_verified: boolean;
    verified_at: Date;
}