import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
    // donorProfiles collection
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },  // reference to users collection
    phone:{
      type: String,
      required: true
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true
    },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },  // "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
    weight: Number,  // in kg
    address: {
      type: String,
      required: true
    },
    isEligible: Boolean,
    lastDonationDate: Date,
    nextEligibleDate: Date,
    
    // Medical history embedded document
    medicalHistory: {
      hasChronicCondition: Boolean,
      hasInfectiousDisease: Boolean,
      hasRecentSurgery: Boolean,
      hasRecentTattoo: Boolean,
      hasRecentPiercing: Boolean,
      hasRecentTravel: Boolean,
      isPregnant: Boolean,
      isTakingMedication: Boolean,
      otherConditions: String,
      lastUpdated: {
        type: Date,
        default: Date.now
      }
    },
  }, {timestamps: true});

export const Donor = mongoose.model('Donor', donorSchema);