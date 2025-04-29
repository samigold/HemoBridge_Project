import { Types } from "mongoose";
import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";

export interface FacilityRecord {
    _id?: Types.ObjectId;
    id: string;
    name: string;
    address: string;
    operational_hours: string;
    blood_types: DonorBloodTypes[];
    created_at: Date;
    updated_at: Date;
}