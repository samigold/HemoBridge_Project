import mongoose from 'mongoose';
import { UserRecord, UserRoles } from './user.record';

const userSchema = new mongoose.Schema<UserRecord>({
    // users collection schema
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
    email: {
        type:String,
        required:true,
        unique:true
    },  // unique, indexed
    password_hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: UserRoles,
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

export const UserModel = mongoose.model('users', userSchema);

    // verificationToken: String,
    // verificationTokenExpiresAt: Date,
    // resetToken: String,
    // resetTokenExpires: Date,
    // failedLoginAttempts: Number,
    // lastLogin: {
    //     type: Date,
    //     default: Date.now
    // },
    
    // // Notification preferences embedded document
    // notificationPreferences: {
    //   email: Boolean,
    //   sms: Boolean,
    //   push: Boolean,
    //   donationReminders: Boolean, 
    //   eligibilityUpdates: Boolean,
    //   emergencyAlerts: Boolean,
    //   marketingCommunications: Boolean
    // },