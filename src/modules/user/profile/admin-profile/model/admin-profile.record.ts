import { Types } from "mongoose";
import { UserRecord } from "src/modules/user/base/model/user.record";

export interface AdminProfileRecord {
    _id: Types.ObjectId;
    id: string;
    user_id: string | UserRecord;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
}