import mongoose from 'mongoose';
import { FacilityRecord } from './facility.record';
import { DonorBloodTypes } from 'src/modules/user/donor/model/donor.record';

const FacilitySchema = new mongoose.Schema<FacilityRecord>({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    operational_hours: {
        type: String,
        required: true
    },
    blood_types: [{
        type: String,
        enum: DonorBloodTypes,
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    },

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})
export const FacilityModel = mongoose.model('health_care_facilities', FacilitySchema);