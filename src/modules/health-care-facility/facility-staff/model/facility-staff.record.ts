import { Types } from "mongoose";
import { UserRecord } from "src/modules/user/base/model/user.record";

export interface FacilityStaffRecord {
    _id?: Types.ObjectId;
    id: string;
    user_id: string | UserRecord;
    facility_id: string;
    first_name: string;
    last_name: string;
    address?: string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;
}