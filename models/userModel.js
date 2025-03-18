import { timeStamp } from 'console';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // users collection schema
    _id: ObjectId,  // MongoDB's default unique identifier
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
        required
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
    verificationExpires: Date,
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
    timeStamps: true
});

export const User = mongoose.model('User', userSchema);