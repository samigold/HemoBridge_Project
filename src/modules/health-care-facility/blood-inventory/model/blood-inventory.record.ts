import { Types } from 'mongoose';
import { DonorBloodTypes } from 'src/modules/user/donor/model/donor.record';
import { FacilityRecord } from 'src/modules/health-care-facility/base/model/facility.record';

export interface BloodInventoryRecord {
    _id?: Types.ObjectId;
    id: string;
    facility_id: string | FacilityRecord;
    blood_type: DonorBloodTypes;
    units_available: number;
    created_at: Date;
    updated_at: Date;
}