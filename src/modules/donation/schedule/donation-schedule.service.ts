import { PaginationUtils } from "src/shared/utils/pagination.utils";
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
    },

    findByFacilityId: async(facilityId: string, page: number = 1) => {
        const pagination = PaginationUtils.calculatePage(page);

        const schedules = await DonationScheduleModel.find({ facility_id: facilityId })
            .populate({
                path: 'donor_id',
                select: 'first_name last_name'
            })
            .skip(pagination.list_offset)
            .limit(pagination.results_per_page)
            .sort({ created_at: "desc" })
            .catch((error)=> {
                console.error("Error fetching facility donation schedules:", error);
                throw new InternalServerError("Failed to fetch donation schedules");
            });

        const total = await DonationScheduleModel.countDocuments({ facility_id: facilityId });

        return {
            list: schedules.map(schedule => DonationScheduleEntity.fromRecord(schedule)),
            currentPage: page,
            totalPages: Math.ceil(total / pagination.results_per_page)
        };
    },

    findByDonorId: async(donorId: string, page: number = 1) => {
        const pagination = PaginationUtils.calculatePage(page);

        const schedules = await DonationScheduleModel.find({ donor_id: donorId })
            .populate({
                path: 'donor_id',
                select: 'first_name last_name'
            })
            .skip(pagination.list_offset)
            .limit(pagination.results_per_page)
            .sort({ created_at: "desc" })
            .catch((error)=> {
                console.error("Error fetching donor donation schedules:", error);
                throw new InternalServerError("Failed to fetch donation schedules");
            });

        const total = await DonationScheduleModel.countDocuments({ donor_id: donorId });

        return {
            list: schedules.map(schedule => DonationScheduleEntity.fromRecord(schedule)),
            currentPage: page,
            totalPages: Math.ceil(total / pagination.results_per_page)
        };
    }
}