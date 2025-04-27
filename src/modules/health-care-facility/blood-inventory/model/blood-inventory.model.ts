import mongoose from 'mongoose';
import { BloodInventoryRecord } from './blood-inventory.record';
import { DonorBloodTypes } from 'src/modules/user/donor/model/donor.record';

const BloodInventorySchema = new mongoose.Schema<BloodInventoryRecord>({
    facility_id: {
        type: String,
        ref: "facilities",
        required: true
    },
    blood_type: {
        type: String,
        enum: DonorBloodTypes,
        required: true
    },
    units_available: {
        type: Number,
        required: true
    }

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

export const BloodInventoryModel = mongoose.model('blood_inventory', BloodInventorySchema);

// RULES:
// 1. multiple records cannot have the same facility_id and blood_type, one has to be different, 
// since the donor blood types is limited (8) it means there can only be a 8 or less records in this collection
// per facility.