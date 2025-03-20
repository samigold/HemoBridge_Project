import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // users collection schema

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },  // unique, indexed
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["donor", "healthcare_staff", "blood_bank_staff", "admin"],
        default: "donor",
        required: true
    },  // "donor", "healthcare_staff", "blood_bank_staff", "admin"
    status:{
        type:String,
        enum:["active", "pending", "suspended", "inactive"],
        default:"pending",
        required:true
    }, // "active", "pending", "suspended", "inactive"
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    resetToken: String,
    resetTokenExpires: Date,
    failedLoginAttempts: Number,
    lastLogin: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    
    // Notification preferences embedded document
    notificationPreferences: {
      email: Boolean,
      sms: Boolean,
      push: Boolean,
      donationReminders: Boolean, 
      eligibilityUpdates: Boolean,
      emergencyAlerts: Boolean,
      marketingCommunications: Boolean
    },
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);