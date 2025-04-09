import mongoose from 'mongoose';
import { FacilityStaffRecord } from './facility-staff.record';

const FacilityStaffSchema = new mongoose.Schema<FacilityStaffRecord>({
    facility_id: {
        type: String,
        ref: "health_care_facilities",
        required: true
    },
    user_id: {
        type: String,
        ref: "users",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
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
export const FacilityStaffModel = mongoose.model('health_care_facilities', FacilityStaffSchema);