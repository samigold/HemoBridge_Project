import mongoose from 'mongoose';
import { HealthCareFacilityRecord } from './health-care-facility.record';

const HealthCareFacilitySchema = new mongoose.Schema<HealthCareFacilityRecord>({
    name: {
        type: String,
        required: true
    },
    contact_info: {
        email: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
    },
    address: {
        type: String,
        required: true
    },
    operational_hours: {
        type: String,
        required: true
    },
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
export const HealthCareFacilityModel = mongoose.model('health-care-facilities', HealthCareFacilitySchema);