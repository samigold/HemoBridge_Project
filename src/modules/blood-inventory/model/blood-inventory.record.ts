import { Types } from 'mongoose';
import { DonorBloodTypes } from 'src/modules/user/donor/model/donor.record';
import { FacilityRecord } from 'src/modules/health-care-facility/base/model/facility.record';


export interface BloodInventoryRecord {
    facility_id: string | FacilityRecord;
    blood_type: DonorBloodTypes;
    stock_level: number;
    urgency_level: "low" | "medium" | "high";
    location: string | FacilityRecord;
    created_at: Date;
    updated_at: Date;
}
