import mongoose from "mongoose";
import { DonorRecord, DonorBloodTypes } from "./donor.record";

// TODO: create a schema with donor record
const donorSchema = new mongoose.Schema<DonorRecord>({
  user_id: {
    type: String,
    ref: "users",
    unique: true
  },
  phone_number:{
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
  blood_type: {
    type: String,
    enum: DonorBloodTypes,
    required: true,
  }, 
  is_eligible: {
    type: Boolean,
    default: true,
    required: true
  },
  last_donation_date: Date,
  next_eligible_date: Date,
    
  // Medical history embedded document
  medical_history: {
    hasChronicCondition: Boolean,
    hasInfectiousDisease: Boolean,
    hasRecentSurgery: Boolean,
    hasRecentTattoo: Boolean,
    hasRecentPiercing: Boolean,
    hasRecentTravel: Boolean,
    isPregnant: Boolean,
    isTakingMedication: Boolean,
    otherConditions: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
}, {
  timestamps:{
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

export const DonorModel = mongoose.model('donor', donorSchema);