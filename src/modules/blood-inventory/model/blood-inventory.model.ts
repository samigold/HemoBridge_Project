import mongoose from "mongoose";
import { BloodInventoryRecord } from "./blood-inventory.record";

const BloodInventorySchema = new mongoose.Schema<BloodInventoryRecord>({
    facility_id: {
        type: String,
        ref: "health_care_facility",
        required: true,
    },
    blood_type: {
        type: String,
        required: true,
    },
    stock_level: {
        type: Number,
        required: true,
    },
    urgency_level: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
    },
    location: {
        type: String,
        ref: "health_care_facility",
        required: true,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
})

export const BloodInventoryModel = mongoose.model<BloodInventoryRecord>("blood_inventory", BloodInventorySchema);