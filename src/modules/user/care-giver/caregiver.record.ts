import { Types } from "mongoose";
import { UserRecord } from "../base/model/user.record";

export interface CareGiverRecord {
    _id: Types.ObjectId;
    id: string;
    user_id: string | UserRecord;
    is_active: boolean;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}