import { DonationScheduleEntity } from "./donation-schedule.entity";
import { DonationScheduleModel } from "./model/donation-schedule.model";
import { InternalServerError } from "src/shared/errors";

export const DonationScheduleService = {
    create: async (scheduleData: Omit<DonationScheduleEntity, '_id' | 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
        const schedule = await DonationScheduleModel.create({
            donor_id: scheduleData.donorId,
            facility_id: scheduleData.facilityId,
            blood_type: scheduleData.bloodType,
            units_requested: scheduleData.unitsRequested,
            preferred_date: scheduleData.preferredDate,
            additional_notes: scheduleData.additionalNotes

        })
        .catch((error)=> {
            console.error("Error creating donation schedule: ", error);
            throw new InternalServerError("Failed to create donation schedule");
        })
        
        return DonationScheduleEntity.fromRecord(schedule);
    }
}