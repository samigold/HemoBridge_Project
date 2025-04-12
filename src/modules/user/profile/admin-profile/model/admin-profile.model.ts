import { model, models, Schema } from "mongoose";
import { AdminProfileRecord } from "./admin-profile.record";

const AdminProfileModel = models["admin_profiles"] || model("admin_profiles", new Schema<AdminProfileRecord>({
    user_id: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
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
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
}))

export default AdminProfileModel;