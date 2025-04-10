import { Types } from "mongoose";

export interface AdminProfileRecord {
    _id: Types.ObjectId;
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}