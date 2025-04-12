import mongoose, { Model, Schema } from "mongoose";
import { SessionRecord } from "./session.record";

const SessionModel:Model<SessionRecord> = mongoose.models.sessions || mongoose.model('sessions', new Schema<SessionRecord>({
    user_id: {
        type: String,
        required: true,
        ref: "users"
    },
    access_token: {
        type: String,
        required: true,
        unique: true
    },
    revoked: {
        type: Boolean,
        required: true,
        default: false
    },
    last_used_at: {
        type: Date,
    },
    created_at: {
        type: Date,
    },
    expires_at: {
        type: Date,
    }

}, { timestamps:{
    createdAt: "created_at",
    updatedAt: false
} }));

export default SessionModel;