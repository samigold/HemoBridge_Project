import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    facilityName: {
        type: String,
        required: true
    },
    personnelName: {
        type: String,
        required: true
    },
    personnelRole: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: String,
        default: ''
    },
    facilityType: {
        type: String,
        enum: ['hospital', 'blood_bank', 'clinic'],
        default: 'hospital',
    }
}, { timestamps: true });

export const Facility = mongoose.model('Facility', facilitySchema);