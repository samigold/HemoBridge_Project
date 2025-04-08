import mongoose from "mongoose";
import { CareGiverRecord } from "./caregiver.record";

const caregiverSchema = new mongoose.Schema<CareGiverRecord>({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    phone_number: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
        lowercase: true
    },
    last_name: {
        type: String,
        required: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export const CareGiverModel = mongoose.model('care_giver', caregiverSchema);