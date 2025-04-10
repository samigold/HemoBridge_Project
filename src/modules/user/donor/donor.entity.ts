import { DonorBloodTypes, DonorRecord } from "./donor.record";

export interface DonorEntity {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    bloodType: DonorBloodTypes; // should be an enum
    isEligible: boolean;
    lastDonationDate: Date;
    nextEligibleDate: Date;
    medicalHistory: object;
    createdAt: Date;
    updatedAt: Date;
}

export const DonorEntity = {
    fromRecordToEntity(record: DonorRecord): DonorEntity {
        return {
            id: record.id!,
            firstName: record.first_name,
            lastName: record.last_name,
            phoneNumber: record.phone_number,
            bloodType: record.blood_type,
            isEligible: record.is_eligible,
            lastDonationDate: record.last_donation_date,
            nextEligibleDate: record.next_eligible_date,
            medicalHistory: record.medical_history,
            createdAt: record.created_at,
            updatedAt: record.updated_at,
        };
    }
}