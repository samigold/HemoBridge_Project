import mongoose from 'mongoose';
import { DonationScheduleCreator, DonationScheduleRecord, DonationScheduleStatus, DonationScheduleUrgency } from './donation-schedule.record';
import { DonorBloodTypes } from 'src/modules/user/donor/model/donor.record';

const DonationScheduleSchema = new mongoose.Schema<DonationScheduleRecord>({
    donor_id: {
        type: String,
        ref: "donors"
    },
    facility_id: {
        type: String,
        ref: "health_care_facilities",
        required: true
    },
    created_by: {
        type: String,
        enum: DonationScheduleCreator,
        required: true
    },
    blood_type: {
        type: String,
        enum: DonorBloodTypes,
        required: true
    },
    units_requested: {
        type: Number,
        required: true
    },
    additional_notes: {
        type: String,
    },
    preferred_date: {
        type: Date,
        required: true
    },
    urgency_level: {
        type: String,
        enum: DonationScheduleUrgency,
        required: true
    },
    status: {
        type: String,
        enum: DonationScheduleStatus,
        default: DonationScheduleStatus.PENDING
    }

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})
export const DonationScheduleModel = mongoose.model('donation_schedules', DonationScheduleSchema);