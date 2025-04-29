import { BloodInventoryRecord } from "./model/blood-inventory.record";
import { FacilityRecord } from "../base/model/facility.record";
import { DonorBloodTypes } from "src/modules/user/donor/model/donor.record";

export interface BloodInventoryEntity {
    id: string;
    facilityId: string | FacilityRecord;
    bloodType: DonorBloodTypes;
    unitsAvailable: number;
    createdAt: Date;
    updatedAt: Date;
}

export const BloodInventoryEntity = {
    fromRecord(record: BloodInventoryRecord): BloodInventoryEntity {
        return {
            id: record.id,
            facilityId: record.facility_id,
            bloodType: record.blood_type,
            unitsAvailable: record.units_available,
            createdAt: record.created_at,
            updatedAt: record.updated_at
        };
    }
}